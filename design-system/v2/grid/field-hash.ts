/** v2 grid — side-field population hash (spec 002.r2 §4.2).
 *
 * One pure function decides, for every side-field cell, whether it
 * carries an ornament and which shape — deterministic on the cell's
 * grid coordinates alone, so the pattern is identical across server
 * renders (hydration-safe with zero client JS), stable while the
 * viewport grows (columns index outward from the page edges — §4.1),
 * and reproducible by the devtools' field audit, which recomputes it.
 *
 * The mix is a multiply–xor–shift avalanche (the spec draft's raw
 * prime-XOR left a structured three-cell run in the near columns —
 * 002.r2 §9 build record). Density 40/1000 ≈ 4% (§9 F1); shapes are
 * the standing `.f-cell` vocabulary at the approved 2:1:1 mix —
 * outlined circle : filled square : filled circle.
 */

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
