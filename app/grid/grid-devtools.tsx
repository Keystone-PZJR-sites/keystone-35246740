"use client";

/** /grid devtools (spec 002 §3.2–3.3) — dev only, excluded from the
 * production bundle by the build-time gate in page.tsx.
 *
 * Self-test readout: runs the v5 §8 checks (adapted to container-query
 * gating) in-page against the fixtures and renders pass/fail. Results are
 * exposed on window.__GRID_SELFTEST__ so the scripted sweep
 * (scripts/grid-selftest.mjs) can assert the same checks in CI.
 *
 * Debug overlay: press "g" for a full-lattice layer over the page —
 * real 1px elements on the engine's k·t geometry, for eyeballing any
 * section against the grid.
 */

import "./devtools.css";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { INTERP_LADDER, STACK_TOTAL_TICKS, bandForWidth, type Band } from "./fixtures";

interface Result {
  id: string;
  label: string;
  pass: boolean;
  detail: string;
}

interface Meta {
  band: Band;
  containerW: number;
  t: number;
  rows: number;
}

interface RunOutput {
  meta: Meta;
  results: Result[];
  pass: boolean;
}

declare global {
  interface Window {
    __GRID_SELFTEST__?: RunOutput & { run: () => RunOutput };
  }
}

const BAND_CLASSES: Band[] = ["rm", "rs", "rt", "rd1", "rd2"];

/** Distance from v to the nearest multiple of step. */
function offGrid(v: number, step: number): number {
  const frac = ((v % step) + step) % step;
  return Math.min(frac, step - frac);
}

/** Whole half-tick, or half-tick + 1px (line-inclusive sizing). */
function onLattice(v: number, t: number, tol = 0.26): boolean {
  const d = offGrid(v, t / 2);
  return d <= tol || Math.abs(d - 1) <= tol;
}

function runSelfTests(page: HTMLElement, root: HTMLElement, probes: HTMLElement): RunOutput {
  const results: Result[] = [];
  const containerW = root.getBoundingClientRect().width;
  const band = bandForWidth(containerW);
  const probe = (name: string) =>
    (probes.querySelector(`[data-probe="${name}"]`) as HTMLElement).getBoundingClientRect().width;

  // 1 · tick: --t must read container width ÷ 12 (not viewport width).
  const t = probe("t");
  const tExpected = containerW / 12;
  results.push({
    id: "tick",
    label: "tick = container ÷ 12",
    pass: Math.abs(t - tExpected) <= 0.05,
    detail: `t ${t.toFixed(3)}px · expected ${tExpected.toFixed(3)}px`,
  });

  // 2 · weights. Inside interpolating bands the collapse identity
  // wA + wB = 1 holds; above the last anchor (rd2) the band is pure zoom:
  // wA = 0 and wB rides t/112 uncapped (v5 §2).
  const wA = probe("wa") / 100;
  const wB = probe("wb") / 100;
  const weightsPass =
    band === "rd2"
      ? Math.abs(wA) <= 0.002 && Math.abs(wB - t / 112) <= 0.002
      : Math.abs(wA + wB - 1) <= 0.002;
  results.push({
    id: "weights",
    label: band === "rd2" ? "weights: pure zoom" : "wA + wB = 1",
    pass: weightsPass,
    detail: `wA ${wA.toFixed(4)} · wB ${wB.toFixed(4)}`,
  });

  // 3 · sample interpolated value resolves on the band's wA/wB line
  // (per-band pairs from the ladder; continuity across switches is
  // asserted by the scripted sweep).
  const interp = probe("interp");
  const [v0, v1] = INTERP_LADDER[band];
  const interpExpected = wA * v0 + wB * v1;
  results.push({
    id: "interp",
    label: "interpolated sample on the line",
    pass: Math.abs(interp - interpExpected) <= 0.1,
    detail: `sample ${interp.toFixed(3)}px · line ${interpExpected.toFixed(3)}px`,
  });

  // 4 · stack sum: page height = designed tick total for the band.
  const pageH = page.getBoundingClientRect().height;
  const expectedTicks = STACK_TOTAL_TICKS[band];
  results.push({
    id: "stack",
    label: `stack sum = ${expectedTicks}t`,
    pass: Math.abs(pageH - expectedTicks * t) <= 2,
    detail: `page ${(pageH / t).toFixed(4)}t (${pageH.toFixed(1)}px)`,
  });

  // 5 · landmark audit: tops and sizes land on (half-)ticks, ±1px for
  // +1-sized boxes. Cards scroll horizontally, so only their vertical
  // geometry is audited.
  const pageTop = page.getBoundingClientRect().top;
  let landmarks = 0;
  const drifted: string[] = [];
  page.querySelectorAll<HTMLElement>("[data-landmark]").forEach((el, i) => {
    const kind = el.dataset.landmark!;
    const rect = el.getBoundingClientRect();
    const anchorTop = kind === "sec" ? pageTop : el.closest(".sec")!.getBoundingClientRect().top;
    const checks: Array<[string, number]> = [
      ["top", rect.top - anchorTop],
      ["height", rect.height],
    ];
    for (const [what, v] of checks) {
      landmarks++;
      if (!onLattice(v, t)) drifted.push(`${kind}#${i} ${what} ${(v / t).toFixed(3)}t`);
    }
  });
  results.push({
    id: "landmarks",
    label: "landmark audit",
    pass: drifted.length === 0,
    detail: drifted.length ? drifted.join(" · ") : `${landmarks} checks on grid`,
  });

  // 6 · band-gate sweep: exactly one band class visible, including .decor.
  const visibleBands = new Set<string>();
  page
    .querySelectorAll<HTMLElement>(".grid-region, .grid-fill, .grid-cellx, .decor")
    .forEach((el) => {
      if (el.getClientRects().length === 0) return;
      for (const b of BAND_CLASSES) if (el.classList.contains(b)) visibleBands.add(b);
    });
  results.push({
    id: "bandgate",
    label: `band gate: only ${band}`,
    pass: visibleBands.size === 1 && visibleBands.has(band),
    detail: `visible: ${[...visibleBands].join(", ") || "none"}`,
  });

  // 7 · seams: adjacent regions drawing a shared edge coincide into the
  // same pixel (a.far − 1px = b.near, from line-inclusive sizing).
  let seams = 0;
  const seamFails: string[] = [];
  page.querySelectorAll<HTMLElement>(".gx").forEach((gx) => {
    const regions = [...gx.querySelectorAll<HTMLElement>(".grid-region")]
      .filter((el) => el.getClientRects().length > 0)
      .map((el) => ({
        rect: el.getBoundingClientRect(),
        gx: parseFloat(el.style.getPropertyValue("--gx")),
        gy: parseFloat(el.style.getPropertyValue("--gy")),
        gw: parseFloat(el.style.getPropertyValue("--gw")),
        gh: parseFloat(el.style.getPropertyValue("--gh")),
      }));
    for (const a of regions) {
      for (const b of regions) {
        if (a === b) continue;
        const rowsMeet = a.gy < b.gy + b.gh && b.gy < a.gy + a.gh;
        const colsMeet = a.gx < b.gx + b.gw && b.gx < a.gx + a.gw;
        if (a.gx + a.gw === b.gx && rowsMeet) {
          seams++;
          if (Math.abs(a.rect.right - 1 - b.rect.left) > 0.1)
            seamFails.push(`v(${a.gx},${a.gy})→(${b.gx},${b.gy})`);
        }
        if (a.gy + a.gh === b.gy && colsMeet) {
          seams++;
          if (Math.abs(a.rect.bottom - 1 - b.rect.top) > 0.1)
            seamFails.push(`h(${a.gx},${a.gy})→(${b.gx},${b.gy})`);
        }
      }
    }
  });
  results.push({
    id: "seams",
    label: "shared edges coincide",
    pass: seamFails.length === 0,
    detail: seamFails.length ? seamFails.join(" · ") : `${seams} seams, one pixel each`,
  });

  const meta: Meta = { band, containerW, t, rows: Math.round(pageH / t) };
  return { meta, results, pass: results.every((r) => r.pass) };
}

export default function GridDevtools() {
  const probesRef = useRef<HTMLDivElement>(null);
  const [output, setOutput] = useState<RunOutput | null>(null);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const probes = probesRef.current;
    if (!probes) return;
    const page = probes.closest<HTMLElement>(".page");
    const root = probes.closest<HTMLElement>(".v2-root");
    if (!page || !root) return;

    const run = () => {
      const out = runSelfTests(page, root, probes);
      setOutput(out);
      window.__GRID_SELFTEST__ = { ...out, run };
      return out;
    };
    run();
    const ro = new ResizeObserver(() => run());
    ro.observe(root);
    document.fonts?.ready.then(() => run()).catch(() => {});
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) setOverlay((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      ro.disconnect();
      window.removeEventListener("keydown", onKey);
      delete window.__GRID_SELFTEST__;
    };
  }, []);

  return (
    <>
      <div ref={probesRef} className="gdt-probe" aria-hidden="true">
        <div data-probe="t" style={{ width: "calc(var(--t))" }} />
        <div data-probe="wa" style={{ width: "calc(var(--wA) * 100)" }} />
        <div data-probe="wb" style={{ width: "calc(var(--wB) * 100)" }} />
        <div data-probe="interp" />
      </div>

      {overlay && output && (
        <div className="gdt-overlay" aria-hidden="true">
          {Array.from({ length: 11 }, (_, i) => (
            <i key={`v${i + 1}`} className="v" style={{ "--n": i + 1 } as CSSProperties} />
          ))}
          {Array.from({ length: Math.max(0, output.meta.rows - 1) }, (_, i) => (
            <i key={`h${i + 1}`} className="h" style={{ "--n": i + 1 } as CSSProperties} />
          ))}
        </div>
      )}

      <aside className="gdt-panel">
        <h2>
          grid self-test{" "}
          {output ? (output.pass ? "\u2713" : "\u2717") : "\u2026"}
        </h2>
        {output && (
          <ul>
            <li>
              <span>band {output.meta.band}</span>
              <span>
                {output.meta.containerW.toFixed(0)}px · t {output.meta.t.toFixed(2)}px
              </span>
            </li>
            {output.results.map((r) => (
              <li key={r.id} data-pass={r.pass}>
                <span>
                  {r.pass ? "\u2713" : "\u2717"} {r.label}
                </span>
                <span>{r.detail}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="gdt-hint">g toggles the lattice overlay</p>
      </aside>
    </>
  );
}
