/** The blog landing's page anatomy (spec 025 §8 — the first
 * DATA-DEPENDENT expectations: the lists' totals derive from the
 * fetched landing model through `blogListsTicks` (blog-lists.tsx),
 * never restated by hand — the plan's 2026-09-08 tick-rounding
 * ruling's first application. The qa wrapper receives the same model
 * the page rendered, so the sweep audits one data snapshot.
 *
 * The fixed heights defer to the built sections (code is the source
 * of truth): blog-top 28 · 28 · 15 · 11 · 11 (blog-top.css §1 frame
 * rules; rs rides the 384 re-lay, rd1 the 1344 zoom — the v2 two-gate
 * construction) and the footer's five drawn bands (spec 004; the
 * home-expectations values, unchanged).
 *
 * Declared §7.3 clearance exceptions:
 * - `feat` — the featured card rides the drawn full-lattice field
 *   (025 §2: the field spans the featured rows at every anchor).
 * - `top` · `nav` — the footer's standing in-block ornament overlaps
 *   (004 §2/§3, carried from every page's tables).
 * The `.sec` roots carry `data-landmark` as identity (blog-top ·
 * blog-lists), excluded from the clearance audit per the standing
 * flag. */

import type { GridExpectations } from "./grid/expectations";
import type { Band } from "./grid/fixtures";
import { blogListsTicks } from "@/design-system/v2/sections/blog-lists";
import type { BlogLandingModel } from "@/design-system/v2/sections/blog-data";

const BANDS: readonly Band[] = ["rm", "rs", "rt", "rd1", "rd2"];

/** Built frame heights per band (ticks). */
const TOP: Record<Band, number> = { rm: 28, rs: 28, rt: 15, rd1: 11, rd2: 11 };
const FOOTER: Record<Band, number> = { rm: 24, rs: 21, rt: 15, rd1: 12, rd2: 11 };

export function blogExpectations(landing: BlogLandingModel): GridExpectations {
  const lists = blogListsTicks(landing);
  const LISTS: Record<Band, number> = {
    rm: lists.rm,
    rs: lists.rm,
    rt: lists.rt,
    rd1: lists.rd,
    rd2: lists.rd,
  };

  const stack: { id: string; h: Record<Band, number> }[] = [
    { id: "blog-top", h: TOP },
    // an empty backend renders no lists section (025 §5)
    ...(LISTS.rm > 0 ? [{ id: "blog-lists", h: LISTS }] : []),
    { id: "footer", h: FOOTER },
  ];

  const tops = Object.fromEntries(BANDS.map((b) => [b, 0])) as Record<
    Band,
    number
  >;
  const sections = stack.map(({ id, h }) => {
    const rows = Object.fromEntries(
      BANDS.map((b) => {
        const top = tops[b];
        tops[b] += h[b];
        return [b, { top, h: h[b] }];
      }),
    );
    return { id, rows };
  });

  return {
    totals: { ...tops },
    sections,
    clearanceExceptions: ["feat", "top", "nav"],
    secLandmarksAreIdentity: true,
  };
}
