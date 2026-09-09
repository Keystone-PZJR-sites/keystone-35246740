"use client";

/** Development-only grid validation. Results are exposed through
 * `window.__GRID_SELFTEST__` for the browser sweep. Press `g` to toggle
 * a full-lattice overlay drawn from the same geometry as the page.
 *
 * Open drawers publish their extra height, so every stable UI state can
 * be checked against the same section and page totals. */

import "./panel.css";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { BAND_ANCHORS, INTERP_LADDER, bandForWidth, type Band } from "./bands";
import {
  FIELD_COLS,
  FIELD_ROWS,
  fieldCellClass,
  type FieldSide,
} from "@/design-system/grid/field-hash";
import type { GridExpectations } from "./expectations";

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
  /** False while a load choreography is running. */
  settled: boolean;
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

/** True when `g` would type into the focused field — skip the lattice
 * toggle. `/` mounts these tools and hosts the grader input. */
function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

/** Whole half-tick, or half-tick + 1px (line-inclusive sizing). */
function onLattice(v: number, t: number, tol = 0.26): boolean {
  const d = offGrid(v, t / 2);
  return d <= tol || Math.abs(d - 1) <= tol;
}

/** On the designed row within the line-inclusive allowance. The margin
 * also absorbs the subpixel that
 * stacked flow boxes accumulate at fractional ticks; a real
 * misplacement is half a tick or more away. */
function onRow(v: number, ticks: number, t: number, tol = 1.1): boolean {
  return Math.abs(v - ticks * t) <= tol;
}

/** Extra ticks from open drawers inside the scope. */
function drawerExtraTicks(scope: HTMLElement): number {
  let extra = 0;
  scope.querySelectorAll<HTMLElement>("[data-drawer][data-open]").forEach((d) => {
    if (d.getClientRects().length === 0) return;
    const v = parseFloat(getComputedStyle(d).getPropertyValue("--drawer-extra"));
    if (Number.isFinite(v)) extra += v;
  });
  return extra;
}

function runSelfTests(
  page: HTMLElement,
  root: HTMLElement,
  probes: HTMLElement,
  expectations: GridExpectations,
): RunOutput {
  const results: Result[] = [];
  const containerW = root.getBoundingClientRect().width;
  const band = bandForWidth(containerW);
  const probe = (name: string) =>
    (probes.querySelector(`[data-probe="${name}"]`) as HTMLElement).getBoundingClientRect().width;
  // Weights use margin-left because below 384 the base band's line
  // extrapolates and wB goes negative, which a
  // width would clamp to zero.
  const probesLeft = probes.getBoundingClientRect().left;
  const probeOffset = (name: string) =>
    (probes.querySelector(`[data-probe="${name}"]`) as HTMLElement).getBoundingClientRect().left -
    probesLeft;

  // 1 · tick: --t must read container width ÷ 12 (not viewport width),
  // capped at 112px above a 1344 container.
  const tProbe = probe("t");
  // The exact tick for the row assertions below: the probe box's
  // rendered width rounds to 1/64px. On a tall page that rounding
  // scales past the row tolerance. The probe still verifies resolution;
  // the assertions ride the exact ratio.
  const t = Math.min(containerW / 12, 112);
  results.push({
    id: "tick",
    label: "tick = min(container ÷ 12, 112)",
    pass: Math.abs(tProbe - t) <= 0.05,
    detail: `t ${tProbe.toFixed(3)}px · expected ${t.toFixed(3)}px`,
  });

  // 2 · weights per structural slice. Stretched slices and
  // interpolating widths carry the collapse identity wA + wB = 1 (the rm
  // band extrapolates below 384 on the same line). In a compressed slice
  // (gate → anchor) the weights are a pure zoom of the slice's anchor:
  // wA = t / (anchor ÷ 12), wB = 0. rd2 rides the zoom on wB at every
  // width, including compressed slices and the capped wide slice.
  const wA = probeOffset("wa") / 100;
  const wB = probeOffset("wb") / 100;
  const anchorT = BAND_ANCHORS[band] / 12;
  // rm has no gate below its anchor — below 384 the base band's line
  // extrapolates (wB goes negative, the sum identity holds); rd2 rides
  // its zoom construction at every width.
  const compressed =
    band !== "rm" && band !== "rd2" && containerW < BAND_ANCHORS[band];
  let weightsPass: boolean;
  let weightsLabel: string;
  if (band === "rd2") {
    weightsPass = Math.abs(wA) <= 0.002 && Math.abs(wB - t / anchorT) <= 0.002;
    weightsLabel = "weights: rd2 pure zoom";
  } else if (compressed) {
    weightsPass = Math.abs(wA - t / anchorT) <= 0.002 && Math.abs(wB) <= 0.002;
    weightsLabel = `weights: compressed ${band} zoom`;
  } else {
    weightsPass = Math.abs(wA + wB - 1) <= 0.002;
    weightsLabel = "wA + wB = 1";
  }
  results.push({
    id: "weights",
    label: weightsLabel,
    pass: weightsPass,
    detail: `wA ${wA.toFixed(4)} · wB ${wB.toFixed(4)}`,
  });

  // 3 · sample interpolated value resolves on the band's wA/wB line
  // (per-band pairs from the ladder; in a compressed slice the probed
  // weights collapse, so the same expression asserts the pure zoom).
  // Continuity across the anchors is asserted by the scripted sweep.
  const interp = probe("interp");
  const [v0, v1] = INTERP_LADDER[band];
  const interpExpected = wA * v0 + wB * v1;
  results.push({
    id: "interp",
    label: "interpolated sample on the line",
    pass: Math.abs(interp - interpExpected) <= 0.1,
    detail: `sample ${interp.toFixed(3)}px · line ${interpExpected.toFixed(3)}px`,
  });

  // Sections hold their designed rows as minimums and grow only when
  // their copy needs more room. At an anchor the design fits, so the
  // rows are exact; between anchors a section may run past its rows,
  // and every later section moves down by that growth.
  const atAnchor = Math.abs(containerW - BAND_ANCHORS[band]) < 0.5 || containerW >= 1344;

  // 4 · section boundaries: every .sec flow child tops on its designed
  // row plus the growth of the sections above it, matched in DOM order;
  // a section with no rows at this band must be hidden. An open drawer
  // grows its own section by its published ticks. A section that runs
  // past its rows between anchors publishes that growth to the sections
  // below and to the stack sum; at an anchor any growth fails.
  const pageTop = page.getBoundingClientRect().top;
  const secs = [...page.querySelectorAll<HTMLElement>(".sec")];
  const secFails: string[] = [];
  const grown = new Set<HTMLElement>();
  let growthPx = 0;
  if (secs.length !== expectations.sections.length) {
    secFails.push(`${secs.length} .sec in DOM, ${expectations.sections.length} expected`);
  } else {
    let priorExtra = 0;
    expectations.sections.forEach((exp, i) => {
      const el = secs[i];
      const designed = exp.rows[band];
      const rect = el.getBoundingClientRect();
      const ownExtra = drawerExtraTicks(el);
      if (!designed) {
        if (el.getClientRects().length > 0 && rect.height > 0.5)
          secFails.push(`${exp.id}: renders at ${band}`);
        return;
      }
      const top = rect.top - pageTop;
      const expectedTop = designed.top + priorExtra;
      const h = designed.h + ownExtra;
      if (Math.abs(top - (expectedTop * t + growthPx)) > 1.1)
        secFails.push(`${exp.id} top ${(top / t).toFixed(3)}t ≠ ${expectedTop}t`);
      const growth = rect.height - h * t;
      if (atAnchor || growth < 0) {
        if (!onRow(rect.height, h, t))
          secFails.push(`${exp.id} h ${(rect.height / t).toFixed(3)}t ≠ ${h}t`);
      } else if (growth > 1.1) {
        grown.add(el);
        growthPx += growth;
      }
      priorExtra += ownExtra;
    });
  }
  results.push({
    id: "sections",
    label: atAnchor ? "section boundaries on designed rows" : "sections stack from designed rows",
    pass: secFails.length === 0,
    detail: secFails.length
      ? secFails.join(" · ")
      : grown.size
        ? `${expectations.sections.length} sections · ${grown.size} grown by ${(growthPx / t).toFixed(3)}t`
        : `${expectations.sections.length} sections on rows`,
  });

  // 5 · stack sum: page height = designed tick total for the band, plus
  // any open drawer's designed growth, plus between-anchor growth.
  const pageH = page.getBoundingClientRect().height;
  const expectedTicks = expectations.totals[band] + drawerExtraTicks(page);
  results.push({
    id: "stack",
    label: `stack sum = ${expectedTicks}t${growthPx ? " + growth" : ""}`,
    pass: Math.abs(pageH - expectedTicks * t - growthPx) <= 2,
    detail: `page ${(pageH / t).toFixed(4)}t (${pageH.toFixed(1)}px)`,
  });

  // 6 · landmark audit: tops and sizes land on (half-)ticks, ±1px for
  // +1-sized boxes. Cards scroll horizontally, so only their vertical
  // geometry is audited. Zero landmarks means attributes were lost.
  // Kinds the expectations declare latticeExempt are designed content
  // offsets, not tick geometry — skipped here,
  // still covered by the stack and section-boundary checks. A grown
  // section is content-sized, so its landmarks are audited at anchors.
  const latticeExempt = new Set(expectations.latticeExempt ?? []);
  let landmarks = 0;
  const drifted: string[] = [];
  page.querySelectorAll<HTMLElement>("[data-landmark]").forEach((el, i) => {
    const kind = el.dataset.landmark!;
    if (latticeExempt.has(kind)) return;
    const rect = el.getBoundingClientRect();
    if (el.getClientRects().length === 0) return; // band-hidden variant
    const sec = el.closest<HTMLElement>(".sec");
    if (sec && grown.has(sec)) return;
    const anchorTop = kind === "sec" ? pageTop : sec!.getBoundingClientRect().top;
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
    pass: drifted.length === 0 && landmarks > 0,
    detail: drifted.length ? drifted.join(" · ") : `${landmarks} checks on grid`,
  });

  // 7 · band-gate sweep: exactly one band class visible, including .decor.
  const visibleBands = new Set<string>();
  page
    .querySelectorAll<HTMLElement>(".grid-region, .decor")
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

  // 8 · seams: adjacent regions drawing a shared edge coincide into the
  // same pixel (a.far − 1px = b.near, from line-inclusive sizing) — run
  // over whatever .gx lattices the page renders.
  let seams = 0;
  const seamFails: string[] = [];
  // Tick coordinates come from rendered boxes so top-, bottom-, and
  // stretch-anchored regions compare on one grid.
  page.querySelectorAll<HTMLElement>(".gx").forEach((gx) => {
    const origin = gx.getBoundingClientRect();
    const regions = [...gx.querySelectorAll<HTMLElement>(".grid-region")]
      .filter((el) => el.getClientRects().length > 0)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          rect,
          gx: Math.round((rect.left - origin.left) / t),
          gy: Math.round((rect.top - origin.top) / t),
          gw: Math.round((rect.width - 1) / t),
          gh: Math.round((rect.height - 1) / t),
        };
      });
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

  // 9 · exposed-cell clearance: no landmark content box
  // intersects a rendered exposed cell. The exposure layer is the
  // engine vocabulary (regions, fills, cells, decors) outside landmark
  // boxes — contained lattice (a section's own field inside a landmark,
  // like the 011 card mosaic) does not participate. Shared edges are
  // not intersections (the line-inclusive ±1px tolerance); designed
  // overlaps are declared in the expectations (clearanceExceptions),
  // never tolerated silently.
  const exceptions = new Set(expectations.clearanceExceptions ?? []);
  // A landmark on a .sec root identifies the section. Under the flag,
  // its cells stay exposed
  // and the root skips the clearance audit (check 5 covers its box)
  const secIdentity = expectations.secLandmarksAreIdentity === true;
  const isSecRoot = (el: HTMLElement) => secIdentity && el.classList.contains("sec");
  const pageLeft = page.getBoundingClientRect().left;
  const exposure: DOMRect[] = [];
  page
    .querySelectorAll<HTMLElement>(".grid-region, .decor")
    .forEach((el) => {
      if (el.getClientRects().length === 0) return;
      const lm = el.closest<HTMLElement>("[data-landmark]");
      if (lm && !isSecRoot(lm)) return;
      exposure.push(el.getBoundingClientRect());
    });
  const clearFails: string[] = [];
  let clearChecks = 0;
  page.querySelectorAll<HTMLElement>("[data-landmark]").forEach((lm, i) => {
    if (lm.getClientRects().length === 0) return;
    if (isSecRoot(lm)) return;
    const kind = lm.dataset.landmark!;
    if (exceptions.has(kind)) return;
    const r = lm.getBoundingClientRect();
    clearChecks++;
    for (const cell of exposure) {
      const w = Math.min(r.right, cell.right) - Math.max(r.left, cell.left);
      const h = Math.min(r.bottom, cell.bottom) - Math.max(r.top, cell.top);
      if (w > 1.1 && h > 1.1) {
        clearFails.push(
          `${kind}#${i} ∩ cell@(${((cell.left - pageLeft) / t).toFixed(1)},${((cell.top - pageTop) / t).toFixed(1)})t`,
        );
        break;
      }
    }
  });
  results.push({
    id: "clearance",
    label: "landmarks clear exposed cells",
    pass: clearFails.length === 0,
    detail: clearFails.length
      ? clearFails.join(" · ")
      : `${clearChecks} landmarks × ${exposure.length} cells clear`,
  });

  // 10 · wide-viewport side fields: hidden at
  // and below a 1344 container; above it, both strips' inner borders
  // coincide with the page's col-0/col-12 line pixels (one geometry),
  // rows sit in global page phase, coverage exceeds the live stack,
  // and the ornaments reproduce the field hash exactly — position and
  // shape through deterministic population. The field's own classes
  // keep it out of the choreographies and the clearance exposure set.
  const gfield = page.querySelector<HTMLElement>(".gfield");
  const fieldVisible = !!gfield && gfield.getClientRects().length > 0;
  if (containerW <= 1344) {
    results.push({
      id: "field",
      label: "side fields hidden at ≤ 1344",
      pass: !fieldVisible,
      detail: fieldVisible ? "gfield visible below the cap" : "hidden",
    });
  } else {
    const fieldFails: string[] = [];
    const pr = page.getBoundingClientRect();
    if (!fieldVisible) {
      fieldFails.push("gfield missing or hidden above the cap");
    } else {
      if (getComputedStyle(gfield).pointerEvents !== "none")
        fieldFails.push("pointer-events ≠ none");
      // The field's negative z-index needs the page stacking context;
      // otherwise the root's paper background buries it.
      if (getComputedStyle(page).isolation !== "isolate")
        fieldFails.push(".page not isolated — the field cannot paint");
      const west = gfield.querySelector<HTMLElement>(".gf-strip.gf-w");
      const east = gfield.querySelector<HTMLElement>(".gf-strip.gf-e");
      if (!west || !east) {
        fieldFails.push("strip missing");
      } else {
        const wr = west.getBoundingClientRect();
        const er = east.getBoundingClientRect();
        // inner-edge coincidence (line-inclusive: the west strip's right
        // border shares the col-0 pixel; the east strip's left border
        // shares the col-12 pixel)
        if (Math.abs(wr.right - 1 - pr.left) > 0.1)
          fieldFails.push(`west edge ${(wr.right - 1 - pr.left).toFixed(2)}px off col-0`);
        if (Math.abs(er.left - pr.right) > 0.1)
          fieldFails.push(`east edge ${(er.left - pr.right).toFixed(2)}px off col-12`);
        // full height, both strips (they stretch with the live page)
        for (const [name, r] of [
          ["west", wr],
          ["east", er],
        ] as const) {
          if (Math.abs(r.top - pr.top) > 0.1 || Math.abs(r.bottom - pr.bottom) > 0.1)
            fieldFails.push(`${name} strip not full height`);
        }
        // Rendered rows cover the full stack, including open drawers.
        if (FIELD_ROWS * t < pageH - 1)
          fieldFails.push(`coverage ${FIELD_ROWS}t < page ${(pageH / t).toFixed(1)}t`);
        // row phase: sampled interior h-lines land on k·t from the page
        // top (children measure from the padding box — rendered top is
        // exactly k·t; one geometry makes three samples sufficient)
        const hLines = west.querySelectorAll<HTMLElement>("i.h");
        const lastRow = Math.min(Math.floor(pageH / t), FIELD_ROWS - 1);
        for (const k of [1, Math.max(1, Math.floor(lastRow / 2)), lastRow]) {
          const line = hLines[k - 1];
          if (!line) {
            fieldFails.push(`h-line ${k} missing`);
            continue;
          }
          const top = line.getBoundingClientRect().top - pr.top;
          if (Math.abs(top - k * t) > 0.1)
            fieldFails.push(`row ${k} at ${(top / t).toFixed(3)}t`);
        }
        // ornaments: exact hash reproduction, both strips
        for (const [side, strip] of [
          [1, west],
          [2, east],
        ] as [FieldSide, HTMLElement][]) {
          const expected: { gx: number; gy: number; shape: string }[] = [];
          for (let col = 1; col <= FIELD_COLS; col++) {
            for (let row = 0; row < FIELD_ROWS; row++) {
              const shape = fieldCellClass(side, col, row);
              if (shape)
                expected.push({
                  gx: side === 1 ? FIELD_COLS - col : col - 1,
                  gy: row,
                  shape,
                });
            }
          }
          const cells = [...strip.querySelectorAll<HTMLElement>(".gf-cell")];
          const label = side === 1 ? "west" : "east";
          if (cells.length !== expected.length) {
            fieldFails.push(`${label} ornaments ${cells.length} ≠ ${expected.length}`);
            continue;
          }
          // DOM order is col-major then row, matching the render loop
          expected.sort((a, b) =>
            (side === 1 ? b.gx - a.gx : a.gx - b.gx) || a.gy - b.gy,
          );
          for (let i = 0; i < expected.length; i++) {
            const e = expected[i];
            const c = cells[i];
            const gx = parseFloat(c.style.getPropertyValue("--gx"));
            const gy = parseFloat(c.style.getPropertyValue("--gy"));
            const shape = c.firstElementChild?.className ?? "";
            if (gx !== e.gx || gy !== e.gy || shape !== e.shape) {
              fieldFails.push(
                `${label} cell ${i}: (${gx},${gy}) "${shape}" ≠ (${e.gx},${e.gy}) "${e.shape}"`,
              );
              break;
            }
          }
        }
      }
    }
    results.push({
      id: "field",
      label: "side fields: edges, phase, hash",
      pass: fieldFails.length === 0,
      detail: fieldFails.length ? fieldFails.slice(0, 4).join(" · ") : "strips + ornaments exact",
    });
  }

  // any load-sequence* guard marks a page with a load choreography (the
  // homepage's load-sequence, Our Work's load-sequence-rise, the case study's
  // Prefix matching also waits for rise-only pages.
  const settled =
    ![...page.classList].some((c) => c.startsWith("load-sequence")) ||
    page.classList.contains("load-settled");
  const meta: Meta = { band, containerW, t, rows: Math.round(pageH / t), settled };
  return { meta, results, pass: results.every((r) => r.pass) };
}

export default function GridPanel({
  expectations,
}: {
  expectations: GridExpectations;
}) {
  const probesRef = useRef<HTMLDivElement>(null);
  const [output, setOutput] = useState<RunOutput | null>(null);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const probes = probesRef.current;
    if (!probes) return;
    const page = probes.closest<HTMLElement>(".page");
    const root = probes.closest<HTMLElement>(".site-root");
    if (!page || !root) return;

    const run = () => {
      const out = runSelfTests(page, root, probes, expectations);
      setOutput(out);
      window.__GRID_SELFTEST__ = { ...out, run };
      return out;
    };
    run();
    const ro = new ResizeObserver(() => run());
    ro.observe(root);
    document.fonts?.ready.then(() => run()).catch(() => {});
    // re-run when the load choreography settles (the page class flips)
    const mo = new MutationObserver(() => run());
    mo.observe(page, { attributes: true, attributeFilter: ["class"] });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "g" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditableTarget(e.target)) return;
      setOverlay((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("keydown", onKey);
      delete window.__GRID_SELFTEST__;
    };
  }, [expectations]);

  return (
    <>
      <div ref={probesRef} className="gdt-probe" aria-hidden="true">
        <div data-probe="t" style={{ width: "calc(var(--t))" }} />
        <div data-probe="wa" style={{ marginLeft: "calc(var(--wA) * 100)" }} />
        <div data-probe="wb" style={{ marginLeft: "calc(var(--wB) * 100)" }} />
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

    </>
  );
}
