/** Homepage grid expectations. Rows use zero-based page ticks. The nav
 * is overlay chrome and does not participate in page flow.
 *
 * Engine totals come from `engines-data.ts`; other heights match their
 * section CSS. The following landmarks intentionally cross exposed cells:
 * - `carousel` — the hero strip rides the full-lattice field, frames
 *   bleeding past the page edge.
 * - `strip` · `card` — the case-carousel strip crosses the east rail
 *   and the full-lattice field; off-canvas cards overhang the clip,
 *   and the rail runs through the base lead clearance.
 * - `top` · `nav` — the footer's top block and nav column over their
 *   in-block ornament cells.
 * Section roots use `data-landmark` for identity rather than content
 * geometry, so the clearance audit excludes `.sec` roots. */

import type { GridExpectations } from "../expectations";
import { ENGINE_TICKS } from "@/design-system/sections/engines-data";

/** Engine flow height includes its leading seam. */
const ENG = {
  rm: ENGINE_TICKS.seam + ENGINE_TICKS.rm,
  rt: ENGINE_TICKS.seam + ENGINE_TICKS.rt,
  rd: ENGINE_TICKS.seam + ENGINE_TICKS.interactive,
} as const;

/** Built section heights in ticks. */
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

/** Cumulative section tops in DOM order. */
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
  totals: SECTIONS[SECTIONS.length - 1].totalAfter,
  sections: SECTIONS.map(({ id, rows }) => ({ id, rows })),
  clearanceExceptions: ["carousel", "strip", "card", "top", "nav"],
  secLandmarksAreIdentity: true,
};
