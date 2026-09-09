/** A coordinate-only hash keeps side-field ornaments deterministic across
 * server renders and viewport growth. Density is 4%; shapes follow a
 * 2:1:1 outlined-circle, filled-square, filled-circle mix. */

/** Rendered columns per strip: covers gutters up to 12 whole cells a
 * side (a 4032px container at the 112px capped tick); wider viewports
 * show paper past the strip. */
export const FIELD_COLS = 12;

/** Rendered rows per strip: covers the tallest rd2 page (the 74t case
 * study) plus drawer growth, clipped to the live page height. A page
 * outgrowing this fails the devtools' field-coverage check loudly. */
export const FIELD_ROWS = 96;

/** 1 = west strip · 2 = east strip. */
export type FieldSide = 1 | 2;

/** The `.f-cell` class list for the ornament at (side, col, row), or
 * null for the (common) empty cell. `col` counts outward from the page
 * edge (1 = adjacent); `row` is the zero-based global page row. */
export function fieldCellClass(side: FieldSide, col: number, row: number): string | null {
  let h =
    (Math.imul(col, 0x9e3779b1) ^ Math.imul(row, 0x85ebca6b) ^ Math.imul(side, 0xc2b2ae35)) >>> 0;
  h = Math.imul(h ^ (h >>> 15), 0x27d4eb2f) >>> 0;
  h = (h ^ (h >>> 15)) >>> 0;
  const v = h % 1000;
  if (v >= 40) return null;
  const s = v % 4;
  // 0,1 → outlined circle · 2 → filled square · 3 → filled circle
  return s === 2 ? "f-cell fill" : s === 3 ? "f-cell fill round" : "f-cell round";
}
