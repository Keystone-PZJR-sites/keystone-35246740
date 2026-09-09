/** Band tables and interpolation ladder for the live-page sweep.
 * Values come from the five anchor frames in the Figma file
 * `ks-MarketingSite` (`IBO39siJYDhiCRtuLWUTW2`):
 * 384 = 230:12906 · 576 = 359:29494 · 768 = 142:4180 · 960 = 142:3151 ·
 * 1344 = 378:34835. Cell rectangles were absolute-positioned, divided by
 * the anchor tick (32/48/64/80/112 — zero off-grid cells at any anchor),
 * and merged into maximal rectangles. Rows are section-local. Rendered
 * bounds are authoritative because auto-layout metadata coordinates can
 * be stale.
 *
 * The gallery map is the portfolio-gallery zone: full field on top, a
 * notched sub-field below (the 1×2 notch is exactly the carousel control:
 * forward arrow above, back arrow directly below), and the card scroll
 * strip.
 * The footer map uses full fields, the lockup channel flanked
 * by 1-wide columns (384/576), and the sparser designed maps (768+).
 */

export type Band = "rm" | "rs" | "rt" | "rd1" | "rd2";

/** Structural gates at the geometric midpoints between anchors. */
const BAND_FLOORS: Record<Band, number> = {
  rm: 0,
  rs: 470,
  rt: 665,
  rd1: 860,
  rd2: 1130,
};

/** Anchor widths per band — the designed widths (tick = anchor ÷ 12).
 * Between a band's gate floor and its anchor the engine renders a
 * compressed pure zoom of the anchor: --wA collapses to t ÷ (anchor ÷ 12)
 * and --wB to 0px. Above 1344 the capped tick pins the rd2 render. */
export const BAND_ANCHORS: Record<Band, number> = {
  rm: 384,
  rs: 576,
  rt: 768,
  rd1: 960,
  rd2: 1344,
};

/** Engine test ladder for the interpolation probe: an arbitrary value
 * designed at every anchor (384→36 · 576→42 · 768→48 · 960→56 · 1344→64),
 * so each band interpolates its own pair and neighbors share the switch
 * anchor. Above 1344 the capped tick pins wB at 1. */
export const INTERP_LADDER: Record<Band, [number, number]> = {
  rm: [36, 42],
  rs: [42, 48],
  rt: [48, 56],
  rd1: [56, 64],
  rd2: [0, 64],
};

export function bandForWidth(w: number): Band {
  if (w >= BAND_FLOORS.rd2) return "rd2";
  if (w >= BAND_FLOORS.rd1) return "rd1";
  if (w >= BAND_FLOORS.rt) return "rt";
  if (w >= BAND_FLOORS.rs) return "rs";
  return "rm";
}
