// Runs the in-page grid checks at every anchor and structural slice:
//
//   /
//   /pricing
//   /our-work
//   /case-studies/palm-coast-zivel
//
// The sweep forces a layout-consuming scrollbar, verifies interpolation
// around anchor joints, waits for load motion to settle, and exercises
// each page's stable interactive states. External embeds are never loaded.
//
// Usage:
//   node scripts/grid-selftest.mjs            # starts `next dev` itself
//   GRID_URL=http://localhost:3000 node scripts/grid-selftest.mjs
//   GRID_ROUTE=/blog …                        # one page (`/` is home only)
//   GRID_STATES=0 …                           # rest geometry; skip drives
//   CHROME_PATH=/path/to/chrome …             # override browser binary
//
// The devtools ship in development only, so the sweep runs against a
// dev server by design.

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const ANCHORS = [384, 576, 768, 960, 1344];
// One width per structural slice: 369 below-384
// extrapolation · 420 rm stretched · 520 rs compressed · 620 rs
// stretched · 700 rt compressed · 810 rt stretched · 900 rd1
// compressed · 1050 rd1 stretched · 1200 rd2 compressed — plus the
// capped wide widths: 1456 just past the cap (half-column gutters) and
// 1920 deep (the side fields ~2.6 columns a side).
const SLICES = [369, 420, 520, 620, 700, 810, 900, 1050, 1200, 1456, 1920];
// Continuity joints: the anchors, where a compressed slice hands over
// to its band's designed interpolation line.
const JOINTS = [576, 768, 960, 1344];
const SCROLLBAR = 15;
const PORT = 4823;
// The engine spring settles in about 400ms. Slide and drawer transitions
// are shorter. 700ms
// covers them all with margin — rest-state audits only run at rest.
const SETTLE_MS = 700;
// One-page lattice work uses GRID_ROUTE so a blog change does not drive
// the home engines. `/` is home only; other values are path prefixes.
const ROUTE_FILTERS = (process.env.GRID_ROUTE ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const DRIVE_STATES = process.env.GRID_STATES !== "0";

function matchesRoute(path) {
  if (ROUTE_FILTERS.length === 0) return true;
  return ROUTE_FILTERS.some((filter) => {
    if (filter === "/") return path === "/";
    return path === filter || path.startsWith(`${filter}?`) || path.startsWith(`${filter}/`);
  });
}

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
  await waitForServer(`${base}/`);

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
          `.site-root{max-width:calc(100vw - ${w}px)}`;
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
          const root = document.querySelector(".site-root");
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

    // Open and close a footer drawer at accordion bands.
    async function driveFooterDrawer(assertState, band) {
      if (band !== "rm" && band !== "rs") return;
      if (!(await clickVisible(".fnav-trigger"))) return;
      await sleep(SETTLE_MS);
      await assertState("footer drawer open");
      await clickVisible(".fnav-trigger");
      await sleep(SETTLE_MS);
      await assertState("footer drawer closed");
    }

    // The mobile nav is an overlay, so page geometry must not change.
    async function driveMobileNav(assertState) {
      if (!(await clickVisible('.knav-mtoggle[aria-label="Menu"]'))) return;
      await sleep(SETTLE_MS);
      await assertState("mobile nav open");
      await clickVisible('.knav-mtoggle[aria-label="Close menu"]');
      await sleep(SETTLE_MS);
      await assertState("mobile nav closed");
    }

    // Pricing stable states.
    async function drivePricingStates(route, width, band) {
      const assertState = makeAssert(route, width);

      // Move through each price-scale position, then return with keys.
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

      if (await clickVisible(".faq-questions .fq:nth-child(1) .fq-trigger")) {
        await sleep(SETTLE_MS);
        await assertState("faq drawer 1 open");
        await clickVisible(".faq-questions .fq:nth-child(2) .fq-trigger");
        await sleep(SETTLE_MS);
        await assertState("faq drawer 2 open");
        await clickVisible(".faq-questions .fq:nth-child(2) .fq-trigger");
        await sleep(SETTLE_MS);
        await assertState("faq drawers closed");
      }

      await driveFooterDrawer(assertState, band);
      await driveMobileNav(assertState);
    }

    // Our Work stable states.
    async function driveWorkStates(route, width, band) {
      const assertState = makeAssert(route, width);

      // At rm/rs, move the strip with a card click and arrow keys.
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

      // Viewer: open → paged → view-switched → closed. An
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

    // Case-study stable states.
    async function driveCaseStudyStates(route, width, band) {
      const assertState = makeAssert(route, width);

      // Verify external and internal links without navigating.
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

      // The sticky table of contents renders only at rd2.
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

    async function driveBlogStates(route, width) {
      const assertState = makeAssert(route, width);
      const state = await page.evaluate(() => {
        const category = document.querySelector(".blog-category");
        const pager = document.querySelector(".bc-pagination");
        const visibleArrow = (selector) =>
          [...document.querySelectorAll(selector)].find(
            (element) => element.getClientRects().length > 0,
          );
        return {
          landing: Boolean(document.querySelector(".blog-top")),
          filtered: Boolean(category),
          mode: category?.getAttribute("data-mode") ?? null,
          current: pager?.getAttribute("data-current-page") ?? null,
          currentCount: pager?.querySelectorAll('[aria-current="page"]').length ?? 0,
          previousTag: visibleArrow(".bc-page-previous .btn-arrow")?.tagName ?? null,
          nextTag: visibleArrow(".bc-page-next .btn-arrow")?.tagName ?? null,
        };
      });
      const filteredRoute = route.includes("?tag=") || route.includes("?q=");
      if (filteredRoute) {
        if (!state.filtered || state.landing) {
          fail(`${route} ${width} · filtered route did not replace the landing`);
        }
        if (state.currentCount !== 1) {
          fail(`${route} ${width} · ${state.currentCount} current-page cells`);
        }
        if (state.current === "1" && state.previousTag !== "SPAN") {
          fail(`${route} ${width} · first-page back control is ${state.previousTag}`);
        }
      } else if (!state.landing || state.filtered) {
        fail(`${route} ${width} · landing route changed surface`);
      }
      await assertState("blog rest");
    }

    // Homepage stable states: system bloom, engine stops, deck cycle,
    // carousel cycle, footer drawer, and mobile navigation.
    async function driveHomeStates(route, width, band) {
      const assertState = makeAssert(route, width);

      // Bloom runs once when the below-fold diagram enters view.
      const bloom = await page.evaluate(
        () => document.querySelector(".system-section")?.dataset.bloom ?? "none",
      );
      if (bloom === "armed") {
        await assertState("bloom pre-fire");
        await page.evaluate(() => {
          document
            .querySelector(".sys-diagram")
            ?.scrollIntoView({ block: "center", behavior: "instant" });
        });
        try {
          await page.waitForFunction(
            () => document.querySelector(".system-section")?.dataset.bloom === "settled",
            { timeout: 10000 },
          );
        } catch {
          fail(`${route} ${width} · bloom did not settle`);
        }
        await sleep(SETTLE_MS);
        await assertState("bloom settled");
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await sleep(SETTLE_MS);
      }

      // the engine stops — the interactive construction (rd1/rd2 only)
      const io = await page.evaluate(() => {
        const el = document.querySelector(".e2-io");
        return !!el && el.offsetParent !== null;
      });
      if (io) {
        // scroll so the column's travel past the engine-1 rest reads
        // k half-strides (s = pinLine − body.top — the island's own
        // mapping)
        const scrollToStop = (k) =>
          page.evaluate((kk) => {
            const body = document.querySelector(".e2-body");
            const stage = document.querySelector(".e2-stage");
            const cssPin = parseFloat(getComputedStyle(stage).top) || 0;
            const t = document.querySelector(".page").getBoundingClientRect().width / 12;
            const halfP = (6 * t) / 2; // half an engine's 6t panel
            const bodyTop = body.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: Math.round(bodyTop - cssPin + kk * halfP),
              behavior: "instant",
            });
          }, k);
        const activeStage = () =>
          page.evaluate(() =>
            Number(
              document.querySelector(".e2-drawing[data-active]")?.dataset.stageIndex ?? -1,
            ),
          );

        // The parked top end approaches the pin threshold.
        await scrollToStop(-2);
        await sleep(SETTLE_MS);
        let active = await activeStage();
        if (active !== 0) fail(`${route} ${width} · engine parked top shows ${active} ≠ 0`);
        await assertState("engine parked top");

        for (let k = 0; k < 10; k++) {
          await scrollToStop(k);
          await sleep(SETTLE_MS);
          active = await activeStage();
          if (active !== k) fail(`${route} ${width} · engine stop ${k} shows ${active}`);
          await assertState(`engine stop ${k}`);
        }

        // the parked bottom end: past the release the last b stands
        await scrollToStop(12);
        await sleep(SETTLE_MS);
        active = await activeStage();
        if (active !== 9) fail(`${route} ${width} · engine parked bottom shows ${active} ≠ 9`);
        await assertState("engine parked bottom");

        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await sleep(SETTLE_MS);
      }

      // One complete deck cycle.
      const deckSites = await page.evaluate(() =>
        [...document.querySelectorAll(".wd-card")].map((c) => c.dataset.site),
      );
      if (deckSites.length > 0) {
        for (let k = 1; k <= deckSites.length; k++) {
          await clickVisible(".wd-deck");
          await sleep(SETTLE_MS);
          const front = await page.evaluate(
            () => document.querySelector('.wd-card[data-slot="0"]')?.dataset.site,
          );
          const expected = deckSites[k % deckSites.length];
          if (front !== expected)
            fail(`${route} ${width} · deck front ${front} ≠ ${expected}`);
          await assertState(`deck position ${k % deckSites.length}`);
        }
      }

      // the circular carousel: a full revolution forward, then a full
      // revolution backward through the start. K is virtual, so
      // assertions are relative to the entry value.
      const ccCount = await page.evaluate(
        () => document.querySelectorAll(".cc-card").length,
      );
      if (ccCount > 1) {
        const ccMod = (n) => ((n % ccCount) + ccCount) % ccCount;
        const k0 = await page.evaluate(() => {
          document
            .querySelector('.cc-card[data-state="active"] .cc-link')
            ?.focus({ preventScroll: true });
          const v = parseInt(
            document.querySelector(".cc-strip")?.style.getPropertyValue("--cc-k") ?? "",
            10,
          );
          return Number.isInteger(v) ? v : 0;
        });
        const ccState = () =>
          page.evaluate(() => ({
            k: document.querySelector(".cc-strip")?.style.getPropertyValue("--cc-k"),
            active: document.querySelector('.cc-card[data-state="active"]')?.dataset.index,
          }));
        const steps = [];
        for (let s = 1; s <= ccCount; s++) steps.push(["ArrowRight", k0 + s]);
        for (let s = 1; s <= 2 * ccCount; s++) steps.push(["ArrowLeft", k0 + ccCount - s]);
        for (const [key, K] of steps) {
          await page.keyboard.press(key);
          await sleep(SETTLE_MS);
          const st = await ccState();
          if (st.k !== String(K)) fail(`${route} ${width} · carousel K ${st.k} ≠ ${K}`);
          if (st.active !== String(ccMod(K)))
            fail(`${route} ${width} · carousel active ${st.active} ≠ ${ccMod(K)}`);
          await assertState(`carousel K=${K - k0 >= 0 ? "+" : ""}${K - k0}`);
        }
      }

      await driveFooterDrawer(assertState, band);
      await driveMobileNav(assertState);
    }

    let topTagRoute = null;
    if (matchesRoute("/blog")) {
      await page.goto(`${base}/blog`, { waitUntil: "networkidle0" });
      topTagRoute = await page.evaluate(
        () => document.querySelector('.bl-catsec a[href*="?tag="]')?.getAttribute("href") ?? null,
      );
    }

    const ROUTES = [
      { path: "/", drives: driveHomeStates },
      { path: "/pricing", drives: drivePricingStates },
      // Live gallery embeds never load during the sweep.
      { path: "/our-work", drives: driveWorkStates, blockRemote: true },
      { path: "/case-studies/palm-coast-zivel", drives: driveCaseStudyStates },
      { path: "/blog", drives: driveBlogStates },
      ...(topTagRoute ? [{ path: topTagRoute, drives: driveBlogStates }] : []),
      { path: "/blog?q=business", drives: driveBlogStates },
    ].filter((entry) => matchesRoute(entry.path));

    console.log(
      `Sweep ${ROUTES.map((entry) => entry.path).join(" · ") || "(no routes)"}` +
        (DRIVE_STATES ? "" : " · states off") +
        (ROUTE_FILTERS.length ? ` · GRID_ROUTE=${ROUTE_FILTERS.join(",")}` : ""),
    );

    // Block non-localhost requests on routes with external embeds.
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

      // Wait for load motion before reading geometry. The `load-sequence*`
      // prefix identifies pages with a load sequence.
      await page.waitForFunction(
        () => {
          const p = document.querySelector(".page");
          return (
            p &&
            (![...p.classList].some((c) => c.startsWith("load-sequence")) ||
              p.classList.contains("load-settled"))
          );
        },
        { timeout: 30000 },
      );

      const settleAfterResize = drives !== null;

      // 1 · anchors: pixel-exact tick, all checks green.
      for (const anchor of ANCHORS) {
        const out = await runAt(anchor, settleAfterResize);
        const tickExact = Math.abs(out.t - anchor / 12) < 0.01;
        const ok = out.pass && tickExact && out.containerW === anchor;
        if (!ok)
          fail(
            `${route} anchor ${anchor} · band ${out.band} · t ${out.t}` +
              (out.fails.length ? ` · ${out.fails.join(" · ")}` : ""),
          );
        else console.log(`PASS ${route} anchor ${anchor} · band ${out.band} · t ${out.t}`);
        if (drives && DRIVE_STATES) await drives(route, anchor, out.band);
      }

      // 2 · one width per structural slice.
      for (const w of SLICES) {
        const out = await runAt(w, settleAfterResize);
        if (!out.pass) fail(`${route} slice ${w} · band ${out.band} · ${out.fails.join(" · ")}`);
        else console.log(`PASS ${route} slice ${w} · band ${out.band}`);
        if (drives && DRIVE_STATES) await drives(route, w, out.band);
      }

      // 3 · continuity across every anchor joint: the sample walks a
      // line; one px of width moves it a fraction, never a jump. (The
      // gates are designed downward steps and are not asserted.)
      if (route === "/") {
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

    const fixtureCases = [
      {
        path: "/blog?tag=grid-category&_grid=twenty-five-page-category",
        current: "1",
        cells: "1|2|3|...|25",
        cards: 6,
        featured: true,
        previousTag: "SPAN",
        nextTag: "A",
      },
      {
        path: "/blog?tag=grid-category&page=13&_grid=twenty-five-page-category",
        current: "13",
        cells: "1|...|13|...|25",
        cards: 6,
        featured: false,
        previousTag: "A",
        nextTag: "A",
      },
      {
        path: "/blog?tag=grid-category&page=25&_grid=twenty-five-page-category",
        current: "25",
        cells: "1|...|23|24|25",
        cards: 6,
        featured: false,
        previousTag: "A",
        nextTag: "SPAN",
      },
      {
        path: "/blog?tag=grid-category&_grid=two-post-category",
        current: "1",
        cells: "1",
        cards: 1,
        featured: true,
        previousTag: "SPAN",
        nextTag: "SPAN",
      },
      {
        path: "/blog?q=grid-empty&_grid=empty-search",
        current: "1",
        cells: "1",
        cards: 0,
        featured: false,
        previousTag: "SPAN",
        nextTag: "SPAN",
        empty: true,
      },
    ].filter((fixture) => matchesRoute(fixture.path));

    if (ROUTES.length === 0 && fixtureCases.length === 0) {
      throw new Error(`GRID_ROUTE=${process.env.GRID_ROUTE} matched no sweep paths.`);
    }

    for (const fixture of fixtureCases) {
      await page.goto(`${base}${fixture.path}`, { waitUntil: "networkidle0" });
      for (const width of [384, 768, 1344]) {
        const out = await runAt(width, true);
        if (!out.pass) {
          fail(`${fixture.path} ${width} · ${out.fails.join(" · ")}`);
        }
        const state = await page.evaluate(() => {
          const section = document.querySelector(".blog-category");
          const cards = section?.querySelector(".bc-cards-frame");
          const t = document.querySelector(".page").getBoundingClientRect().width / 12;
          const visibleArrow = (selector) =>
            [...document.querySelectorAll(selector)].find(
              (element) => element.getClientRects().length > 0,
            );
          return {
            current: section
              ?.querySelector(".bc-pagination")
              ?.getAttribute("data-current-page"),
            cells: [...(section?.querySelectorAll(".bc-page-cell") ?? [])]
              .map((cell) => cell.textContent.trim())
              .join("|"),
            cards: section?.querySelectorAll(".bc-cards > li").length ?? 0,
            featured: Boolean(section?.querySelector(".bc-featured")),
            previousTag:
              visibleArrow(".bc-page-previous .btn-arrow")?.tagName ?? null,
            nextTag: visibleArrow(".bc-page-next .btn-arrow")?.tagName ?? null,
            empty: Boolean(section?.querySelector(".bc-empty")),
            cardsTopTicks:
              section && cards
                ? (cards.getBoundingClientRect().top -
                    section.getBoundingClientRect().top) /
                  t
                : null,
          };
        });
        for (const key of [
          "current",
          "cells",
          "cards",
          "featured",
          "previousTag",
          "nextTag",
        ]) {
          if (state[key] !== fixture[key]) {
            fail(
              `${fixture.path} ${width} · ${key} ${state[key]} ≠ ${fixture[key]}`,
            );
          }
        }
        if (Boolean(state.empty) !== Boolean(fixture.empty)) {
          fail(`${fixture.path} ${width} · empty state mismatch`);
        }
        const shiftedTop = width === 384 ? 8 : 4;
        if (!fixture.featured && Math.abs(state.cardsTopTicks - shiftedTop) > 0.02) {
          fail(
            `${fixture.path} ${width} · cards top ${state.cardsTopTicks.toFixed(3)}t ≠ ${shiftedTop}t`,
          );
        }
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
