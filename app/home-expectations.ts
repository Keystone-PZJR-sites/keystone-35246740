/** The assembled homepage's page anatomy (spec 023 §1 — the v2
 * expectations, serving `/` through home-qa; the spec 010 v1 tables
 * retired with their page).
 *
 * Every value defers to the built sections — code is the source of
 * truth (023 §1): the engine section's totals import from
 * `engines-data.ts` (ENGINES_V2_TICKS — the §1 rule: the runway/stop
 * constants are never restated by hand); the other sections' heights
 * are the built frame rules (hero-v2.css · system.css · work-deck.css
 * · case-carousel.css · footer.css), each read at assembly
 * (2026-09-08, post the 384 restructures — 018 §9 R16 · 019 §9 R7).
 *
 * Rows are zero-based page ticks; the nav is overlay chrome and never
 * appears here (the material-vs-tick-riding-vs-overlay-chrome law).
 * The v2 sections gate at 665/860 only, so rs rides the 384 re-lay
 * (rm's tick counts) and rd1 the 1344 zoom (rd2's) — the 018 §9 R9
 * derivation split; the footer keeps its five drawn bands (spec 004).
 *
 * Declared §7.3 clearance exceptions (023 §1 — designed overlaps
 * between landmark content boxes and exposed lattice, each cited):
 * - `carousel` — the hero strip rides the full-lattice field, frames
 *   bleeding past the page edge (018 §2/§4).
 * - `strip` · `card` — the case-carousel strip crosses the east rail
 *   and the full-lattice field; off-canvas cards overhang the clip,
 *   and the rail runs through the base lead clearance (022 §2/§9
 *   B15/B16).
 * - `top` · `nav` — the footer's top block and nav column over their
 *   in-block ornament cells (004 §2/§3, carried from the v1 tables).
 * The v2 section roots carry `data-landmark` as section identity, not
 * content boxes — the devtools exclude `.sec` roots from the
 * clearance audit while keeping their exposure live (023 §9 build
 * record; the boundary check already covers the roots). */

import type { GridExpectations } from "./grid/expectations";
import { ENGINES_V2_TICKS } from "@/design-system/v2/sections/engines-data";

/** The engine section's flow height per band (023 §1): the leading
 * seam row plus the construction the band mounts (020 §1/§9 R19). */
const ENG = {
  rm: ENGINES_V2_TICKS.seam + ENGINES_V2_TICKS.rm,
  rt: ENGINES_V2_TICKS.seam + ENGINES_V2_TICKS.rt,
  rd: ENGINES_V2_TICKS.seam + ENGINES_V2_TICKS.interactive,
} as const;

/** The built section heights (ticks per band; rs = rm, rd1 = rd2 by
 * the v2 gate construction — see the module comment). */
const H = {
  hero: { rm: 21, rs: 21, rt: 13, rd1: 12, rd2: 12 },
  system: { rm: 19, rs: 19, rt: 12, rd1: 6, rd2: 6 },
  engines: { rm: ENG.rm, rs: ENG.rm, rt: ENG.rt, rd1: ENG.rd, rd2: ENG.rd },
  work: { rm: 20, rs: 20, rt: 16, rd1: 7, rd2: 7 },
  cc: { rm: 25, rs: 25, rt: 12, rd1: 9, rd2: 9 },
  footer: { rm: 24, rs: 21, rt: 15, rd1: 12, rd2: 11 },
} as const;

const ORDER = ["hero", "system", "engines", "work", "cc", "footer"] as const;
const BANDS = ["rm", "rs", "rt", "rd1", "rd2"] as const;

const IDS: Record<(typeof ORDER)[number], string> = {
  hero: "hero",
  system: "system",
  engines: "engines",
  work: "work",
  cc: "case-carousel",
  footer: "footer",
};

/** Cumulative tops in DOM order — the §1 section-top table. */
function stack() {
  const tops = Object.fromEntries(BANDS.map((b) => [b, 0])) as Record<
    (typeof BANDS)[number],
    number
  >;
  return ORDER.map((key) => {
    const rows = Object.fromEntries(
      BANDS.map((b) => {
        const top = tops[b];
        tops[b] += H[key][b];
        return [b, { top, h: H[key][b] }];
      }),
    );
    return { id: IDS[key], rows, totalAfter: { ...tops } };
  });
}

const SECTIONS = stack();

export const PAGE_EXPECTATIONS: GridExpectations = {
  /** The §1 page-total table: 237 · 234 · 165 · 79 · 78 (the drawn
   * anchor totals plus the engine travels at rd — 020 §9 R19). */
  totals: SECTIONS[SECTIONS.length - 1].totalAfter,
  sections: SECTIONS.map(({ id, rows }) => ({ id, rows })),
  clearanceExceptions: ["carousel", "strip", "card", "top", "nav"],
  secLandmarksAreIdentity: true,
};
