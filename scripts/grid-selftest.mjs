// Grid self-test sweep (spec 002 §3.3, extended by specs 010 §3,
// 013 §7.4, 016 §7.2, and 017 §7.2) — runs the in-page checks
// (window.__GRID_SELFTEST__, see app/grid/grid-devtools.tsx) on the
// five audited routes:
//
//   /grid                — the fixture harness (spec 002)
//   /home-fixture        — the real assembled homepage (spec 010 §3.2)
//   /pricing-fixture     — the real assembled pricing page (spec 013 §7)
//   /our-work-fixture    — the real assembled Our Work page (spec 016 §7)
//   /case-study-fixture  — the assembled case-study page (spec 017 §7)
//
// at all five anchors and one width per structural slice (spec 010
// §3.1 — stretched and compressed, 002.r1 nearest-anchor gates), with a
// classic layout-consuming scrollbar forced on. Interpolation
// continuity is asserted across the four anchors (a gate is a designed
// downward step, not a continuity point). On the fixture routes the
// sweep waits for any load choreography to settle (002.r1 §5), then
// drives the page through its rest states and re-asserts at each.
// Homepage (spec 010 §3.2): every engine row active, the portfolio
// strip scrolled, the testimonial strip on each offset, a footer
// drawer open and closed at the accordion bands, and the mobile nav
// open and closed (an overlay — the assertion is that the stack is
// unchanged). Case study (spec 017 §7.2): the sticky TOC at the rd2
// widths — resting above the sticky line, fixed at 1t mid-page with
// the active item tracking the §4 rule (The Shift's range), an
// anchor click landing its target with the hash updated — and absent
// from view below the rd2 gate; the §3.8 live-site link and the §3.9
// Get Started href asserted as attributes, never loaded (the 016
// hermetic precedent). Pricing (spec 013 §7.4): the 012 machine on each k
// (card-overlay clicks to k = 1 and 2, arrow keys back to 0), an FAQ
// drawer open, a second (the single-open handoff), then closed, the
// footer drawer at the accordion bands, and the mobile nav. Our Work
// (spec 016 §7.2): the 015 strip machine at rm/rs (a ghost click to
// k=2, keys back with the clamp), the footer drawer and mobile nav,
// and the 016 viewer — open (s = the strip's k at rm/rs, 1 at rt+),
// paged, view-switched, closed, focus restored — an overlay on
// --z-modal: the stack beneath is unchanged in every state. During
// the Our Work leg every non-localhost request is blocked (puppeteer
// request interception), so CI never touches the nine live embeds —
// the iframe's src is asserted as a URL, never loaded. Exits nonzero
// on any failure, so CI can gate on it.
//
// Usage:
//   node scripts/grid-selftest.mjs            # starts `next dev` itself
//   GRID_URL=http://localhost:3000 node scripts/grid-selftest.mjs
//   CHROME_PATH=/path/to/chrome …             # override browser binary
//
// The devtools ship in development only, so the sweep runs against a
// dev server by design.

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const ANCHORS = [384, 576, 768, 960, 1344];
// One width per structural slice (spec 010 §3.1): 369 below-384
// extrapolation · 420 rm stretched · 520 rs compressed · 620 rs
// stretched · 700 rt compressed · 810 rt stretched · 900 rd1
// compressed · 1050 rd1 stretched · 1200 rd2 compressed — plus the
// capped wide widths (spec 002.r2 §6, replacing the uncapped 1600
// "rd2 zoom" leg): 1456 just past the cap (half-column gutters) and
// 1920 deep (the side fields ~2.6 columns a side).
const SLICES = [369, 420, 520, 620, 700, 810, 900, 1050, 1200, 1456, 1920];
// Continuity joints: the anchors, where a compressed slice hands over
// to its band's designed interpolation line.
const JOINTS = [576, 768, 960, 1344];
const SCROLLBAR = 15;
const PORT = 4823;
// Rest-state settle allowance: the engine spring settles ≈400ms
// (spec 008 §7.1); the slide/drawer transitions are shorter. 700ms
// covers them all with margin — rest-state audits only run at rest.
const SETTLE_MS = 700;

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) {
    console.error("No Chrome binary found; set CHROME_PATH.");
    process.exit(2);
  }
  return found;
}

async function waitForServer(url, timeoutMs = 60000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} not ready within ${timeoutMs}ms`);
}

async function main() {
  let server = null;
  let base = process.env.GRID_URL;
  if (!base) {
    base = `http://localhost:${PORT}`;
    server = spawn("npx", ["next", "dev", "-p", String(PORT)], {
      stdio: "ignore",
      detached: false,
    });
  }
  await waitForServer(`${base}/grid`);

  const browser = await puppeteer.launch({
    executablePath: chromePath(),
    headless: true,
    args: ["--hide-scrollbars=false"],
  });

  let failures = 0;
  const fail = (msg) => {
    failures++;
    console.log(`FAIL ${msg}`);
  };

  try {
    const page = await browser.newPage();
    // Classic scrollbar, forced. Headless Chrome never gives scrollbars
    // layout space, so the third rule reproduces the classic-scrollbar
    // geometry directly: the container is 15px narrower than the
    // viewport. On headful platforms the webkit rule makes the document
    // 15px narrower and 100vw still spans the full viewport, so both
    // rules resolve to the same container width — no double subtraction.
    await page.evaluateOnNewDocument((w) => {
      const attach = () => {
        const s = document.createElement("style");
        s.textContent =
          `html{overflow-y:scroll} html::-webkit-scrollbar{width:${w}px} ` +
          `.v2-root{max-width:calc(100vw - ${w}px)}`;
        document.head.appendChild(s);
      };
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", attach);
      } else {
        attach();
      }
    }, SCROLLBAR);

    const sleep = (ms) => page.evaluate((m) => new Promise((r) => setTimeout(r, m)), ms);

    // Click the first visible match (band variants keep hidden copies in
    // the DOM). DOM click, so off-viewport controls still activate.
    const clickVisible = (selector) =>
      page.evaluate((sel) => {
        const el = [...document.querySelectorAll(sel)].find(
          (e) => e.getClientRects().length > 0,
        );
        if (!el) return false;
        el.click();
        return true;
      }, selector);

    const clickEngineHit = (i) =>
      page.evaluate((idx) => {
        const hits = [...document.querySelectorAll(".eng-hit")];
        if (!hits[idx]) return false;
        hits[idx].click();
        return true;
      }, i);

    // Run the in-page checks after a paint and report compactly.
    const runChecks = () =>
      page.evaluate(
        () =>
          new Promise((res) =>
            requestAnimationFrame(() => {
              const o = window.__GRID_SELFTEST__.run();
              res({
                band: o.meta.band,
                containerW: o.meta.containerW,
                t: o.meta.t,
                settled: o.meta.settled,
                pass: o.pass,
                fails: o.results.filter((r) => !r.pass).map((r) => `${r.id}: ${r.detail}`),
                interp: o.results.find((r) => r.id === "interp"),
              });
            }),
          ),
      );

    async function runAt(container, settleAfterResize = false) {
      await page.setViewport({ width: container + SCROLLBAR, height: 900 });
      await page.waitForFunction(
        (target) => {
          const root = document.querySelector(".v2-root");
          return (
            window.__GRID_SELFTEST__ &&
            root &&
            Math.abs(root.getBoundingClientRect().width - target) < 0.5
          );
        },
        { timeout: 10000 },
        container,
      );
      // The real sections carry height transitions (the footer drawers'
      // grammar), which a resize retriggers on tick-dependent values —
      // the audits assert at rest (the audits-at-rest law), so let the
      // page settle before reading.
      if (settleAfterResize) await sleep(SETTLE_MS);
      return runChecks();
    }

    const interpSample = (out) => parseFloat(out.interp.detail.match(/sample ([\d.]+)px/)[1]);

    const makeAssert = (route, width) => async (state) => {
      const out = await runChecks();
      if (!out.pass) fail(`${route} ${width} · ${state} · ${out.fails.join(" · ")}`);
      else console.log(`PASS ${route} ${width} · ${state}`);
    };

    // a footer drawer open, then closed (004 — accordion bands only),
    // shared by both fixture routes
    async function driveFooterDrawer(assertState, band) {
      if (band !== "rm" && band !== "rs") return;
      if (!(await clickVisible(".fnav-trigger"))) return;
      await sleep(SETTLE_MS);
      await assertState("footer drawer open");
      await clickVisible(".fnav-trigger");
      await sleep(SETTLE_MS);
      await assertState("footer drawer closed");
    }

    // the mobile nav open and closed (005 — an overlay: the stack must
    // be unchanged, which is exactly what the checks assert)
    async function driveMobileNav(assertState) {
      if (!(await clickVisible(".knav-mtoggle"))) return;
      await sleep(SETTLE_MS);
      await assertState("mobile nav open");
      await clickVisible(".knav-mtoggle");
      await sleep(SETTLE_MS);
      await assertState("mobile nav closed");
    }

    // Homepage rest-state drives (spec 010 §3.2), asserted per state.
    async function driveHomeStates(route, width, band) {
      const assertState = makeAssert(route, width);

      // each engine row active, ending back on the first (008)
      for (const i of [1, 2, 3, 4, 0]) {
        if (!(await clickEngineHit(i))) continue;
        await sleep(SETTLE_MS);
        await assertState(`engine row ${i} active`);
      }

      // the portfolio strip scrolled (007)
      for (let k = 1; k <= 2; k++) {
        if (!(await clickVisible('.pf-ctrl .gbtn[data-direction="forward"]'))) break;
        await sleep(SETTLE_MS);
        await assertState(`portfolio strip +${k}`);
      }

      // the testimonial strip on each offset (009; rd2 is the static grid)
      for (let k = 1; k <= 2; k++) {
        if (!(await clickVisible('.tst-ctrl .gbtn[data-direction="forward"]'))) break;
        await sleep(SETTLE_MS);
        await assertState(`testimonials offset ${k}`);
      }

      await driveFooterDrawer(assertState, band);
      await driveMobileNav(assertState);
    }

    // Pricing rest-state drives (spec 013 §7.4), asserted per state.
    async function drivePricingStates(route, width, band) {
      const assertState = makeAssert(route, width);

      // the 012 machine on each k: overlay clicks to k = 1 and 2, then
      // arrow keys on the focused range input back to k = 0
      if (await clickVisible(".ps-slot:nth-child(2) .pcard-overlay")) {
        await sleep(SETTLE_MS);
        await assertState("price scale k=1");
        if (await clickVisible(".ps-slot:nth-child(3) .pcard-overlay")) {
          await sleep(SETTLE_MS);
          await assertState("price scale k=2");
        }
        await page.evaluate(() => {
          const input = [...document.querySelectorAll(".sldr-input")].find(
            (el) => el.getClientRects().length > 0,
          );
          input?.focus();
        });
        await page.keyboard.press("ArrowLeft");
        await page.keyboard.press("ArrowLeft");
        await sleep(SETTLE_MS);
        await assertState("price scale k=0 (keys)");
      }

      // an FAQ drawer open (item 1), a second (item 2 — the single-open
      // handoff), then closed (013 §7.4)
      if (await clickVisible(".faq-questions .fq:nth-child(1) .fq-trigger")) {
        await sleep(SETTLE_MS);
        await assertState("faq drawer 1 open");
        await clickVisible(".faq-questions .fq:nth-child(2) .fq-trigger");
        await sleep(SETTLE_MS);
        await assertState("faq drawer 2 open (handoff)");
        await clickVisible(".faq-questions .fq:nth-child(2) .fq-trigger");
        await sleep(SETTLE_MS);
        await assertState("faq drawers closed");
      }

      await driveFooterDrawer(assertState, band);
      await driveMobileNav(assertState);
    }

    // Our Work rest-state drives (spec 016 §7.2), asserted per state.
    async function driveWorkStates(route, width, band) {
      const assertState = makeAssert(route, width);

      // the 015 strip machine at rm/rs: a ghost click to k=2, arrow
      // keys back, clamped at the west end
      if (band === "rm" || band === "rs") {
        if (await clickVisible(".wg-slide:nth-child(2) .wg-show")) {
          await sleep(SETTLE_MS);
          await assertState("gallery strip k=2");
          await page.evaluate(() => {
            document.querySelector(".wg-view")?.focus();
          });
          await page.keyboard.press("ArrowLeft");
          await page.keyboard.press("ArrowLeft"); // the second clamps at 1
          await sleep(SETTLE_MS);
          await assertState("gallery strip k=1 (keys, clamped)");
        }
      }

      await driveFooterDrawer(assertState, band);
      await driveMobileNav(assertState);

      // the 016 viewer: open → paged → view-switched → closed. An
      // overlay on --z-modal outside the page flow — the stack beneath
      // is unchanged in every state. The embed's src is asserted as a
      // URL, never loaded (non-localhost requests are blocked for this
      // route). The first visible open-gallery match is the header CTA;
      // at rm/rs it opens on the strip's published k (1 at rest here).
      if (await clickVisible('[data-action="open-gallery"]')) {
        await sleep(SETTLE_MS);
        const src1 = await page.evaluate(
          () => document.querySelector(".gv-embed")?.getAttribute("src") ?? null,
        );
        if (!src1 || !/^https:\/\//.test(src1)) {
          fail(`${route} ${width} · viewer embed src missing or not a URL (${src1})`);
        }
        await assertState("viewer open (s=1)");
        await clickVisible('.gv-btn[aria-label="Next site"]');
        await sleep(SETTLE_MS);
        const src2 = await page.evaluate(
          () => document.querySelector(".gv-embed")?.getAttribute("src") ?? null,
        );
        if (src2 === src1) fail(`${route} ${width} · viewer paging did not swap the embed src`);
        await assertState("viewer paged (s=2)");
        // switch to any off view mode (the drawn default varies by band)
        await page.evaluate(() => {
          [...document.querySelectorAll(".gv-switch .gv-btn")]
            .find((b) => b.getAttribute("aria-checked") === "false")
            ?.click();
        });
        await sleep(SETTLE_MS);
        await assertState("viewer view-switched");
        await clickVisible('.gv-btn[aria-label="Close gallery"]');
        await sleep(SETTLE_MS);
        await assertState("viewer closed");
        const focusRestored = await page.evaluate(
          () => document.activeElement?.matches('[data-action="open-gallery"]') ?? false,
        );
        if (!focusRestored) fail(`${route} ${width} · viewer close did not restore focus`);
      }
    }

    // Case-study rest-state drives (spec 017 §7.2), asserted per state.
    async function driveCaseStudyStates(route, width, band) {
      const assertState = makeAssert(route, width);

      // the §3.8 live-site link and §3.9 CTA resolve as attributes
      // (the 016 hermetic precedent — the external URL never loads)
      const hrefs = await page.evaluate(() => ({
        live: document.querySelector(".csb")?.getAttribute("href") ?? null,
        started: [...document.querySelectorAll('.csc-ctas a.btn-fill')].find(
          (e) => e.getClientRects().length > 0,
        )?.getAttribute("href") ?? null,
      }));
      if (!hrefs.live || !/^https:\/\//.test(hrefs.live)) {
        fail(`${route} ${width} · live-site link missing or not a URL (${hrefs.live})`);
      }
      if (hrefs.started !== "/pricing") {
        fail(`${route} ${width} · Get Started href ${hrefs.started} ≠ /pricing`);
      }

      // the sticky TOC (§4): rd2-only
      const tocVisible = await page.evaluate(
        () => (document.querySelector(".toc")?.getClientRects().length ?? 0) > 0,
      );
      if (band === "rd2") {
        if (!tocVisible) {
          fail(`${route} ${width} · TOC hidden at rd2`);
        } else {
          // resting: above the sticky line, Overview active
          const resting = await page.evaluate(() => {
            const toc = document.querySelector(".toc");
            const t = document.querySelector(".page").getBoundingClientRect().width / 12;
            return {
              top: toc.getBoundingClientRect().top,
              active: toc.getAttribute("data-active"),
              t,
            };
          });
          if (resting.top <= resting.t + 1) {
            fail(`${route} ${width} · TOC already stuck at rest (top ${resting.top.toFixed(1)})`);
          }
          if (resting.active !== "overview") {
            fail(`${route} ${width} · TOC resting active ${resting.active} ≠ overview`);
          }
          await assertState("toc resting");

          // scrolled: drive The Shift's top past the one-third line;
          // the rail fixes at exactly 1t and the active id follows
          await page.evaluate(() => {
            const shift = document.getElementById("shift");
            const y = shift.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: y - window.innerHeight / 3 + 8, behavior: "instant" });
          });
          await sleep(SETTLE_MS);
          const scrolled = await page.evaluate(() => {
            const toc = document.querySelector(".toc");
            const t = document.querySelector(".page").getBoundingClientRect().width / 12;
            return {
              top: toc.getBoundingClientRect().top,
              active: toc.getAttribute("data-active"),
              t,
            };
          });
          if (Math.abs(scrolled.top - scrolled.t) > 1.5) {
            fail(
              `${route} ${width} · TOC not fixed at 1t (top ${scrolled.top.toFixed(1)} vs t ${scrolled.t.toFixed(1)})`,
            );
          }
          if (scrolled.active !== "shift") {
            fail(`${route} ${width} · TOC scrolled active ${scrolled.active} ≠ shift`);
          }
          await assertState("toc fixed mid-page");

          // anchor click: land the target with the hash updated
          await clickVisible('.toc a[href="#funnel"]');
          await sleep(SETTLE_MS);
          const anchored = await page.evaluate(() => ({
            hash: window.location.hash,
            top: document.getElementById("funnel").getBoundingClientRect().top,
          }));
          if (anchored.hash !== "#funnel") {
            fail(`${route} ${width} · anchor hash ${anchored.hash} ≠ #funnel`);
          }
          if (Math.abs(anchored.top) > 2) {
            fail(`${route} ${width} · anchor target top ${anchored.top.toFixed(1)} ≠ 0`);
          }
          await assertState("toc anchor landed");

          // restore (clear the hash scroll state for the next widths)
          await page.evaluate(() => {
            history.replaceState(null, "", window.location.pathname);
            window.scrollTo({ top: 0, behavior: "instant" });
          });
          await sleep(SETTLE_MS);
        }
      } else if (tocVisible) {
        fail(`${route} ${width} · TOC visible below the rd2 gate`);
      }

      await driveFooterDrawer(assertState, band);
      await driveMobileNav(assertState);
    }

    const ROUTES = [
      { path: "/grid", drives: null },
      { path: "/home-fixture", drives: driveHomeStates },
      { path: "/pricing-fixture", drives: drivePricingStates },
      // hermetic: the 016 viewer's live embeds never load in CI
      { path: "/our-work-fixture", drives: driveWorkStates, blockRemote: true },
      { path: "/case-study-fixture", drives: driveCaseStudyStates },
    ];

    // spec 016 §7.2: during a blockRemote leg every non-localhost
    // request aborts, so the sweep never touches the nine live sites
    const interceptor = (req) => {
      const { hostname } = new URL(req.url());
      if (hostname === "localhost" || hostname === "127.0.0.1") req.continue();
      else req.abort();
    };

    for (const { path: route, drives, blockRemote } of ROUTES) {
      console.log(`\n=== ${route} ===`);
      if (blockRemote) {
        await page.setRequestInterception(true);
        page.on("request", interceptor);
      }
      await page.goto(`${base}${route}`, { waitUntil: "networkidle0" });

      // the audits run at rest: wait out the load choreography (002.r1
      // §5; pages with no choreography are born settled). Any
      // v2-choreo* guard marks a choreographed page (prefix-matched —
      // the rise pages' guards too; 017 §7.2)
      await page.waitForFunction(
        () => {
          const p = document.querySelector(".page");
          return (
            p &&
            (![...p.classList].some((c) => c.startsWith("v2-choreo")) ||
              p.classList.contains("v2-settled"))
          );
        },
        { timeout: 30000 },
      );

      const isFixture = drives !== null;

      // 1 · anchors: pixel-exact tick, all checks green.
      for (const anchor of ANCHORS) {
        const out = await runAt(anchor, isFixture);
        const tickExact = Math.abs(out.t - anchor / 12) < 0.01;
        const ok = out.pass && tickExact && out.containerW === anchor;
        if (!ok)
          fail(
            `${route} anchor ${anchor} · band ${out.band} · t ${out.t}` +
              (out.fails.length ? ` · ${out.fails.join(" · ")}` : ""),
          );
        else console.log(`PASS ${route} anchor ${anchor} · band ${out.band} · t ${out.t}`);
        if (drives) await drives(route, anchor, out.band);
      }

      // 2 · one width per structural slice.
      for (const w of SLICES) {
        const out = await runAt(w, isFixture);
        if (!out.pass) fail(`${route} slice ${w} · band ${out.band} · ${out.fails.join(" · ")}`);
        else console.log(`PASS ${route} slice ${w} · band ${out.band}`);
        if (drives) await drives(route, w, out.band);
      }

      // 3 · continuity across every anchor joint: the sample walks a
      // line; one px of width moves it a fraction, never a jump. (The
      // gates are designed downward steps and are not asserted.)
      if (route === "/grid") {
        for (const joint of JOINTS) {
          const below = interpSample(await runAt(joint - 1));
          const at = interpSample(await runAt(joint));
          const above = interpSample(await runAt(joint + 1));
          const ok = Math.abs(at - below) < 0.5 && Math.abs(above - at) < 0.5;
          if (!ok)
            fail(
              `${route} joint ${joint} · sample ${below.toFixed(3)} → ${at.toFixed(3)} → ${above.toFixed(3)}`,
            );
          else
            console.log(
              `PASS ${route} joint ${joint} · sample ${below.toFixed(3)} → ${at.toFixed(3)} → ${above.toFixed(3)}`,
            );
        }
      }

      if (blockRemote) {
        page.off("request", interceptor);
        await page.setRequestInterception(false);
      }
    }
  } finally {
    await browser.close();
    if (server) server.kill("SIGTERM");
  }

  if (failures > 0) {
    console.error(`\n${failures} check(s) failed`);
    process.exit(1);
  }
  console.log("\nAll grid self-tests passed");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
