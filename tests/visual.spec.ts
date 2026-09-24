import { expect, test } from "@playwright/test";

/** Every route at every grid anchor, gate, and one width past the cap.
 * A page is one full-height screenshot; the diff budget allows a hairline
 * of anti-aliasing and nothing else. */

const ROUTES = [
  "/",
  "/pricing/",
  "/our-work/",
  "/company/",
  "/design/",
  "/design/#primitives",
  "/design/#rules",
  "/contact/",
  "/blog/",
  "/blog/resell-cancellations-without-discounting/",
  "/case-studies/bare-lux-studio/",
  "/terms/",
  "/accessibility/",
];

/* Anchors 384 · 576 · 768 · 960 · 1344, gates 470 · 665 · 860 · 1130, a
 * mid-run width in every band (type mid-interpolation, fractional tick),
 * and 1600 past the cap. */
const WIDTHS = [
  384, 430, 470, 520, 576, 620, 665, 717, 768, 810, 860, 900, 960, 1024, 1080, 1130, 1200, 1344,
  1600,
];

for (const route of ROUTES) {
  for (const width of WIDTHS) {
    test(`${route} @${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      /* A dev server's issue badge is not part of the page. */
      await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
      /* Load every image now, reach every intersection entrance, return to the top. */
      await page.evaluate(async () => {
        for (const img of document.images) img.loading = "eager";
        const h = document.documentElement.scrollHeight;
        for (let y = 0; y < h; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
        window.scrollTo(0, 0);
        /* Every image decoded before the shot. */
        const settled = (img: HTMLImageElement) =>
          img.complete && img.naturalWidth
            ? Promise.resolve()
            : new Promise<void>((r) => {
                img.addEventListener("load", () => r(), { once: true });
                img.addEventListener("error", () => r(), { once: true });
              });
        await Promise.all(
          [...document.images].map((img) =>
            settled(img).then(() => img.decode().catch(() => undefined)),
          ),
        );
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        await new Promise((r) => setTimeout(r, 300));
      });
      const name = `${route.replace(/\//g, "_").replace("#", "-") || "_"}@${width}.png`;
      await expect(page).toHaveScreenshot(name, { fullPage: true, maxDiffPixelRatio: 0.0002 });
    });
  }
}

/* /design/#sections mounts every section on one ~50k px page. Chrome's tiled
 * full-page capture is not pixel-stable at that height (photos drift by a
 * hair between runs), and each section is already pixel-gated on its own
 * route, so the chapter is checked structurally: it renders every mount,
 * throws nothing, and never overflows the viewport. */
for (const width of WIDTHS) {
  test(`/design/#sections mounts @${width}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/design/#sections", { waitUntil: "networkidle" });
    await expect(page.locator("#sections")).toBeVisible();
    expect(await page.locator("#sections .ds-kind-frame").count()).toBeGreaterThan(30);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(sw).toBe(width);
    expect(errors).toEqual([]);
  });
}
