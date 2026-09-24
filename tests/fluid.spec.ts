import { expect, test } from "@playwright/test";

/** The fluid gate. The visual gate pins the anchors and gates; this one
 * walks the widths between them, where the tick is fractional and the type
 * is mid-run, and asserts the invariants a page must hold at every size:
 * the page never scrolls sideways, no typeset element clips its own text,
 * every section, lattice region, and bleed row sits on the tick (k·t, or
 * k·t+1 where a hairline is drawn inside), and no painted hairline crosses
 * a button. A page may look different at 717 than at 768; it may not be
 * broken. Heights are not asserted here: content-sized sections are on the
 * design's terms, and the anchors are pixel-gated. */

const ROUTES = [
  "/",
  "/pricing/",
  "/our-work/",
  "/company/",
  "/contact/",
  "/blog/",
  "/blog/resell-cancellations-without-discounting/",
  "/case-studies/bare-lux-studio/",
  "/terms/",
];

/* Anchors, gates, and the widths between them, then past the cap. */
const WIDTHS = [
  384, 400, 430, 470, 500, 540, 576, 620, 665, 700, 717, 768, 810, 860, 900, 960, 1024, 1080, 1130,
  1200, 1300, 1344, 1600,
];

type Report = {
  scrollWidth: number;
  clipped: string[];
  offLattice: string[];
  crossedButtons: string[];
};

for (const route of ROUTES) {
  test(`${route} holds at every width`, async ({ page }) => {
    await page.setViewportSize({ width: 1344, height: 900 });
    await page.goto(route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
    /* Reach every intersection entrance once, so nothing is mid-transition. */
    await page.evaluate(async () => {
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y < h; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
      window.scrollTo(0, 0);
    });

    const failures: string[] = [];
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(150);
      const r = await page.evaluate<Report>(() => {
        /* `.page` is 12 ticks wide and centred past the cap; the lattice is
         * measured from its left edge. */
        const rootRect = document.querySelector(".page")!.getBoundingClientRect();
        const t = rootRect.width / 12;
        const visible = (el: Element) => {
          const cs = getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden") return false;
          const b = el.getBoundingClientRect();
          return b.width > 0 && b.height > 0;
        };
        const name = (el: Element) =>
          `${el.tagName.toLowerCase()}.${[...el.classList]
            .filter((c) => !/^(ts-|type$|hx-)/.test(c))
            .slice(0, 3)
            .join(".")}`;
        const offTick = (v: number) => {
          const m = ((v % t) + t) % t;
          return Math.min(m, t - m);
        };

        /* Lattice: left edge and width of every structural box, relative to
         * the page, within 1.5px of k·t (or k·t+1 for the width). */
        const offLattice: string[] = [];
        for (const el of document.querySelectorAll(".sec, .grid-region, .gx")) {
          if (!visible(el)) continue;
          const b = el.getBoundingClientRect();
          const bad: string[] = [];
          if (offTick(b.left - rootRect.left) > 1.5)
            bad.push(`x${(b.left - rootRect.left).toFixed(1)}`);
          if (Math.min(offTick(b.width), offTick(b.width - 1)) > 1.5)
            bad.push(`w${b.width.toFixed(1)}`);
          if (bad.length) offLattice.push(`${name(el)} ${bad.join(" ")}`);
        }

        /* Painted hairlines: region borders and the lattice's <i> strokes. */
        const abs = (b: DOMRect) => ({
          l: b.left,
          r: b.right,
          t: b.top + scrollY,
          b: b.bottom + scrollY,
        });
        const hl: { y: number; l: number; r: number }[] = [];
        const vl: { x: number; t: number; b: number }[] = [];
        for (const g of document.querySelectorAll(".grid-region")) {
          if (!visible(g)) continue;
          const b = abs(g.getBoundingClientRect());
          const cs = getComputedStyle(g);
          if (parseFloat(cs.borderTopWidth) > 0) hl.push({ y: b.t + 0.5, l: b.l, r: b.r });
          if (parseFloat(cs.borderBottomWidth) > 0) hl.push({ y: b.b - 0.5, l: b.l, r: b.r });
          if (parseFloat(cs.borderLeftWidth) > 0) vl.push({ x: b.l + 0.5, t: b.t, b: b.b });
          if (parseFloat(cs.borderRightWidth) > 0) vl.push({ x: b.r - 0.5, t: b.t, b: b.b });
          for (const i of g.querySelectorAll("i.h")) {
            if (!visible(i)) continue;
            const q = abs(i.getBoundingClientRect());
            if (q.b > b.b || q.t < b.t) continue;
            hl.push({ y: (q.t + q.b) / 2, l: q.l, r: q.r });
          }
          for (const i of g.querySelectorAll("i.v")) {
            if (!visible(i)) continue;
            const q = abs(i.getBoundingClientRect());
            vl.push({ x: (q.l + q.r) / 2, t: Math.max(q.t, b.t), b: Math.min(q.b, b.b) });
          }
        }
        const crossedButtons: string[] = [];
        for (const el of document.querySelectorAll(".btn")) {
          if (!visible(el) || el.closest("nav")) continue;
          const b = abs(el.getBoundingClientRect());
          const crossed =
            hl.some((h) => h.y > b.t + 1 && h.y < b.b - 1 && h.r > b.l + 1 && h.l < b.r - 1) ||
            vl.some((v) => v.x > b.l + 1 && v.x < b.r - 1 && v.b > b.t + 1 && v.t < b.b - 1);
          if (crossed)
            crossedButtons.push(`${name(el)} "${(el.textContent ?? "").trim().slice(0, 20)}"`);
        }

        /* Clipped type: a typeset element whose text is wider than its box
         * while its overflow hides it. */
        const clipped: string[] = [];
        for (const el of document.querySelectorAll<HTMLElement>(".type")) {
          if (!visible(el)) continue;
          const cs = getComputedStyle(el);
          if (cs.overflowX === "visible" || cs.textOverflow === "ellipsis") continue;
          if (el.scrollWidth > el.clientWidth + 1)
            clipped.push(`${name(el)} "${(el.textContent ?? "").trim().slice(0, 20)}"`);
        }

        return {
          scrollWidth: document.documentElement.scrollWidth,
          clipped,
          offLattice,
          crossedButtons,
        };
      });
      if (r.scrollWidth > width) failures.push(`@${width} scrolls sideways: ${r.scrollWidth}px`);
      for (const f of r.offLattice) failures.push(`@${width} off lattice: ${f}`);
      for (const f of r.crossedButtons) failures.push(`@${width} hairline crosses ${f}`);
      for (const f of r.clipped) failures.push(`@${width} clips ${f}`);
    }
    expect(failures, failures.join("\n")).toEqual([]);
  });
}
