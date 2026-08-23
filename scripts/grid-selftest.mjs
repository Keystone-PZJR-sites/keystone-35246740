// Grid engine self-test sweep (spec 002 §3.3) — runs the /grid harness's
// in-page checks (window.__GRID_SELFTEST__, see app/grid/grid-devtools.tsx)
// across all five anchors and a mid-band width per band, with a classic
// layout-consuming scrollbar forced on, and asserts interpolation
// continuity across all four band switches. Exits nonzero on any failure,
// so CI can gate on it.
//
// Usage:
//   node scripts/grid-selftest.mjs            # starts `next dev` itself
//   GRID_URL=http://localhost:3000/grid node scripts/grid-selftest.mjs
//   CHROME_PATH=/path/to/chrome …             # override browser binary
//
// The harness devtools ship in development only, so the sweep runs
// against a dev server by design.

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const ANCHORS = [384, 576, 768, 960, 1344];
const MID_BAND = [470, 660, 850, 1150, 1600];
const SWITCHES = [576, 768, 960, 1344];
const SCROLLBAR = 15;
const PORT = 4823;

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
  let url = process.env.GRID_URL;
  if (!url) {
    url = `http://localhost:${PORT}/grid`;
    server = spawn("npx", ["next", "dev", "-p", String(PORT)], {
      stdio: "ignore",
      detached: false,
    });
  }
  await waitForServer(url);

  const browser = await puppeteer.launch({
    executablePath: chromePath(),
    headless: true,
    args: ["--hide-scrollbars=false"],
  });

  let failures = 0;
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
    await page.goto(url, { waitUntil: "networkidle0" });

    async function runAt(container) {
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
      return page.evaluate(
        () =>
          new Promise((res) =>
            requestAnimationFrame(() => {
              const o = window.__GRID_SELFTEST__.run();
              res({
                band: o.meta.band,
                containerW: o.meta.containerW,
                t: o.meta.t,
                pass: o.pass,
                fails: o.results.filter((r) => !r.pass).map((r) => `${r.id}: ${r.detail}`),
                interp: o.results.find((r) => r.id === "interp"),
              });
            }),
          ),
      );
    }

    function interpSample(out) {
      return parseFloat(out.interp.detail.match(/sample ([\d.]+)px/)[1]);
    }

    // 1 · anchors: pixel-exact tick, all checks green.
    for (const anchor of ANCHORS) {
      const out = await runAt(anchor);
      const tickExact = Math.abs(out.t - anchor / 12) < 0.01;
      const ok = out.pass && tickExact && out.containerW === anchor;
      if (!ok) failures++;
      console.log(
        `${ok ? "PASS" : "FAIL"} anchor ${anchor} · band ${out.band} · t ${out.t}` +
          (out.fails.length ? ` · ${out.fails.join(" · ")}` : ""),
      );
    }

    // 2 · one arbitrary mid-band width per band.
    for (const w of MID_BAND) {
      const out = await runAt(w);
      if (!out.pass) failures++;
      console.log(
        `${out.pass ? "PASS" : "FAIL"} mid-band ${w} · band ${out.band}` +
          (out.fails.length ? ` · ${out.fails.join(" · ")}` : ""),
      );
    }

    // 3 · continuity across every band switch: the sample walks a line;
    // one px of width moves it a fraction, never a jump.
    for (const sw of SWITCHES) {
      const below = interpSample(await runAt(sw - 1));
      const at = interpSample(await runAt(sw));
      const above = interpSample(await runAt(sw + 1));
      const ok = Math.abs(at - below) < 0.5 && Math.abs(above - at) < 0.5;
      if (!ok) failures++;
      console.log(
        `${ok ? "PASS" : "FAIL"} switch ${sw} · sample ${below.toFixed(3)} → ${at.toFixed(3)} → ${above.toFixed(3)}`,
      );
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
