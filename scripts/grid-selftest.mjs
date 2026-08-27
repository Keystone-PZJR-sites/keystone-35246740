// Grid self-test sweep (spec 002 §3.3, extended by spec 010 §3) — runs
// the in-page checks (window.__GRID_SELFTEST__, see
// app/grid/grid-devtools.tsx) on both audited routes:
//
//   /grid          — the fixture harness (spec 002)
//   /home-fixture  — the real assembled homepage (spec 010 §3.2)
//
// at all five anchors and one width per structural slice (spec 010
// §3.1 — stretched and compressed, 002.r1 nearest-anchor gates), with a
// classic layout-consuming scrollbar forced on. Interpolation
// continuity is asserted across the four anchors (a gate is a designed
// downward step, not a continuity point). On the homepage the sweep
// waits for the load choreography to settle (002.r1 §5), then drives
// the page through its rest states (spec 010 §3.2) and re-asserts at
// each: every engine row active, the portfolio strip scrolled, the
// testimonial strip on each offset, a footer drawer open and closed at
// the accordion bands, and the mobile nav open and closed (an overlay —
// the assertion is that the stack is unchanged). Exits nonzero on any
// failure, so CI can gate on it.
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
// compressed · 1050 rd1 stretched · 1200 rd2 compressed · 1600 rd2 zoom.
const SLICES = [369, 420, 520, 620, 700, 810, 900, 1050, 1200, 1600];
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

    // Rest-state drives (spec 010 §3.2), asserted per state. Heights
    // never move except the footer drawer, whose designed growth the
    // in-page audit adds to its expectation.
    async function driveRestStates(route, width, band) {
      const assertState = async (state) => {
        const out = await runChecks();
        if (!out.pass) fail(`${route} ${width} · ${state} · ${out.fails.join(" · ")}`);
        else console.log(`PASS ${route} ${width} · ${state}`);
      };

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

      // a footer drawer open, then closed (004 — accordion bands only)
      if (band === "rm" || band === "rs") {
        if (await clickVisible(".fnav-trigger")) {
          await sleep(SETTLE_MS);
          await assertState("footer drawer open");
          await clickVisible(".fnav-trigger");
          await sleep(SETTLE_MS);
          await assertState("footer drawer closed");
        }
      }

      // the mobile nav open and closed (005 — an overlay: the stack must
      // be unchanged, which is exactly what the checks assert)
      if (await clickVisible(".knav-mtoggle")) {
        await sleep(SETTLE_MS);
        await assertState("mobile nav open");
        await clickVisible(".knav-mtoggle");
        await sleep(SETTLE_MS);
        await assertState("mobile nav closed");
      }
    }

    for (const route of ["/grid", "/home-fixture"]) {
      console.log(`\n=== ${route} ===`);
      await page.goto(`${base}${route}`, { waitUntil: "networkidle0" });

      // the audits run at rest: wait out the load choreography (002.r1 §5)
      await page.waitForFunction(
        () => {
          const p = document.querySelector(".page");
          return (
            p && (!p.classList.contains("v2-choreo") || p.classList.contains("v2-settled"))
          );
        },
        { timeout: 30000 },
      );

      const isHome = route === "/home-fixture";

      // 1 · anchors: pixel-exact tick, all checks green.
      for (const anchor of ANCHORS) {
        const out = await runAt(anchor, isHome);
        const tickExact = Math.abs(out.t - anchor / 12) < 0.01;
        const ok = out.pass && tickExact && out.containerW === anchor;
        if (!ok)
          fail(
            `${route} anchor ${anchor} · band ${out.band} · t ${out.t}` +
              (out.fails.length ? ` · ${out.fails.join(" · ")}` : ""),
          );
        else console.log(`PASS ${route} anchor ${anchor} · band ${out.band} · t ${out.t}`);
        if (isHome) await driveRestStates(route, anchor, out.band);
      }

      // 2 · one width per structural slice.
      for (const w of SLICES) {
        const out = await runAt(w, isHome);
        if (!out.pass) fail(`${route} slice ${w} · band ${out.band} · ${out.fails.join(" · ")}`);
        else console.log(`PASS ${route} slice ${w} · band ${out.band}`);
        if (isHome) await driveRestStates(route, w, out.band);
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
