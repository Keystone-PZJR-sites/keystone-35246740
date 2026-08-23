/** /grid harness — fixture exposure maps (spec 002 §3).
 *
 * Transcribed 2026-08-22 from fresh MCP reads of the five anchor frames in
 * the live Figma file ks-MarketingSite (IBO39siJYDhiCRtuLWUTW2):
 * 384 = 230:12906 · 576 = 359:29494 · 768 = 142:4180 · 960 = 142:3151 ·
 * 1344 = 378:34835. Cell rectangles were absolute-positioned, divided by
 * the anchor tick (32/48/64/80/112 — zero off-grid cells at any anchor),
 * and merged into maximal rectangles; rows are section-local (v5 §4).
 * Re-verified 2026-08-22 against rendered bounds through the console
 * bridge (the lattice layers are Figma grid auto-layouts, whose metadata
 * x/y can be stale — see plan.md, "Special cells"): every cell matched;
 * only the back-arrow decor positions were corrected.
 *
 * Fixture "gallery" is the portfolio-gallery zone: full field on top, a
 * notched sub-field below (the 1×2 notch is exactly the carousel control:
 * forward arrow above, back arrow directly below), and the card scroll
 * strip.
 * Fixture "footer" is the footer: full fields, the lockup channel flanked
 * by 1-wide columns (384/576), and the sparser designed maps (768+).
 */

export type Band = "rm" | "rs" | "rt" | "rd1" | "rd2";

export const BANDS: Band[] = ["rm", "rs", "rt", "rd1", "rd2"];

/** Band floors in px of container width; rm is the base (no floor). */
export const BAND_FLOORS: Record<Band, number> = {
  rm: 0,
  rs: 576,
  rt: 768,
  rd1: 960,
  rd2: 1344,
};

export interface RegionSpec {
  gx: number;
  gy: number;
  gw: number;
  gh: number;
}

export interface DecorSpec {
  gx: number;
  gy: number;
  dir: "fwd" | "back";
}

export interface FixtureBandMap {
  regions: RegionSpec[];
  decors?: DecorSpec[];
}

export interface Fixture {
  id: string;
  /** Section height in ticks, per band — read off each anchor. */
  heights: Record<Band, number>;
  maps: Record<Band, FixtureBandMap>;
}

export const GALLERY: Fixture = {
  id: "gallery",
  // Section rows at the anchors: 384 r26–44 · 576 r20–30 · 768 r13–22 ·
  // 960 r13–22 · 1344 r12–20.
  heights: { rm: 19, rs: 11, rt: 10, rd1: 10, rd2: 9 },
  maps: {
    rm: {
      regions: [
        { gx: 0, gy: 0, gw: 12, gh: 16 },
        { gx: 0, gy: 16, gw: 10, gh: 3 },
        { gx: 11, gy: 16, gw: 1, gh: 3 },
        { gx: 10, gy: 18, gw: 1, gh: 1 },
      ],
      decors: [
        { gx: 10, gy: 16, dir: "fwd" },
        { gx: 10, gy: 17, dir: "back" },
      ],
    },
    rs: {
      regions: [
        { gx: 0, gy: 0, gw: 12, gh: 7 },
        { gx: 0, gy: 7, gw: 10, gh: 4 },
        { gx: 11, gy: 7, gw: 1, gh: 4 },
        { gx: 10, gy: 9, gw: 1, gh: 2 },
      ],
      decors: [
        { gx: 10, gy: 7, dir: "fwd" },
        { gx: 10, gy: 8, dir: "back" },
      ],
    },
    rt: {
      regions: [
        { gx: 0, gy: 0, gw: 12, gh: 7 },
        { gx: 0, gy: 7, gw: 10, gh: 3 },
        { gx: 11, gy: 7, gw: 1, gh: 3 },
        { gx: 10, gy: 9, gw: 1, gh: 1 },
      ],
      decors: [
        { gx: 10, gy: 7, dir: "fwd" },
        { gx: 10, gy: 8, dir: "back" },
      ],
    },
    rd1: {
      regions: [
        { gx: 0, gy: 0, gw: 12, gh: 7 },
        { gx: 0, gy: 7, gw: 10, gh: 3 },
        { gx: 11, gy: 7, gw: 1, gh: 3 },
        { gx: 10, gy: 9, gw: 1, gh: 1 },
      ],
      decors: [
        { gx: 10, gy: 7, dir: "fwd" },
        { gx: 10, gy: 8, dir: "back" },
      ],
    },
    rd2: {
      regions: [
        { gx: 0, gy: 0, gw: 12, gh: 6 },
        { gx: 0, gy: 6, gw: 9, gh: 3 },
        { gx: 10, gy: 6, gw: 2, gh: 3 },
        { gx: 9, gy: 8, gw: 1, gh: 1 },
      ],
      decors: [
        { gx: 9, gy: 6, dir: "fwd" },
        { gx: 9, gy: 7, dir: "back" },
      ],
    },
  },
};

/** Card strip geometry per band, in ticks — read off each anchor's
 * portfolio-gallery: card size, strip top offset, left padding. The gap
 * is always one tick, compensated in CSS (v5 §5.4). Lives in
 * harness.css as band constants; duplicated here for the self-tests. */
export const STRIP: Record<
  Band,
  { top: number; cardW: number; cardH: number; pad: number }
> = {
  rm: { top: 4, cardW: 9.5, cardH: 12, pad: 0.5 },
  rs: { top: 3, cardW: 9, cardH: 6, pad: 1 },
  rt: { top: 2, cardW: 9, cardH: 6, pad: 1 },
  rd1: { top: 2, cardW: 9, cardH: 6, pad: 1 },
  rd2: { top: 2, cardW: 8, cardH: 5, pad: 1 },
};

export const FOOTER: Fixture = {
  id: "footer",
  // Footer rows at the anchors: 384 r77–100 · 576 r53–73 · 768 r39–53 ·
  // 960 r40–51 · 1344 r41–51.
  heights: { rm: 24, rs: 21, rt: 15, rd1: 12, rd2: 11 },
  maps: {
    rm: {
      regions: [
        { gx: 0, gy: 0, gw: 11, gh: 19 },
        { gx: 11, gy: 0, gw: 1, gh: 23 },
        { gx: 0, gy: 19, gw: 1, gh: 4 },
        { gx: 1, gy: 22, gw: 10, gh: 1 },
      ],
    },
    rs: {
      regions: [
        { gx: 0, gy: 0, gw: 12, gh: 16 },
        { gx: 0, gy: 16, gw: 1, gh: 4 },
        { gx: 11, gy: 16, gw: 1, gh: 4 },
        { gx: 1, gy: 19, gw: 10, gh: 1 },
      ],
    },
    rt: {
      regions: [
        { gx: 0, gy: 0, gw: 12, gh: 1 },
        { gx: 0, gy: 1, gw: 1, gh: 5 },
        { gx: 11, gy: 1, gw: 1, gh: 5 },
        { gx: 3, gy: 9, gw: 1, gh: 2 },
        { gx: 0, gy: 10, gw: 3, gh: 1 },
        { gx: 4, gy: 10, gw: 8, gh: 1 },
        { gx: 0, gy: 11, gw: 1, gh: 4 },
        { gx: 11, gy: 11, gw: 1, gh: 3 },
        { gx: 1, gy: 14, gw: 5, gh: 1 },
      ],
    },
    rd1: {
      regions: [
        { gx: 0, gy: 0, gw: 12, gh: 1 },
        { gx: 3, gy: 6, gw: 1, gh: 2 },
        { gx: 0, gy: 7, gw: 3, gh: 1 },
        { gx: 4, gy: 7, gw: 8, gh: 1 },
        { gx: 0, gy: 8, gw: 1, gh: 4 },
        { gx: 11, gy: 8, gw: 1, gh: 3 },
        { gx: 1, gy: 11, gw: 6, gh: 1 },
      ],
    },
    rd2: {
      regions: [
        { gx: 0, gy: 0, gw: 12, gh: 1 },
        { gx: 3, gy: 5, gw: 1, gh: 2 },
        { gx: 0, gy: 6, gw: 3, gh: 1 },
        { gx: 4, gy: 6, gw: 8, gh: 1 },
        { gx: 0, gy: 7, gw: 1, gh: 4 },
        { gx: 11, gy: 7, gw: 1, gh: 3 },
        { gx: 1, gy: 10, gw: 6, gh: 1 },
      ],
    },
  },
};

export const FIXTURES = [GALLERY, FOOTER];

/** Designed page total in ticks per band — the stack-sum expectation. */
export const STACK_TOTAL_TICKS: Record<Band, number> = Object.fromEntries(
  BANDS.map((b) => [b, FIXTURES.reduce((sum, f) => sum + f.heights[b], 0)]),
) as Record<Band, number>;

/** Engine test ladder for the interpolation probe: an arbitrary value
 * designed at every anchor (384→36 · 576→42 · 768→48 · 960→56 · 1344→64),
 * so each band interpolates its own pair and neighbors share the switch
 * anchor — the v5 §2 continuity contract. Above 1344 it rides pure zoom
 * (wA is 0, so [0, 64] resolves to wB·64 = t/112·64). Probe widths are
 * band-gated in harness.css from the same numbers. */
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
