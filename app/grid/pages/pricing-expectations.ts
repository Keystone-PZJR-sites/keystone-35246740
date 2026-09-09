/** Pricing page grid expectations. Rows use zero-based page ticks; the
 * overlay nav does not participate in page flow. Open drawers publish
 * `--drawer-extra`, which the audit adds to section heights.
 *
 * Carousel cards, offer content, and footer ornament cells intentionally
 * overlap exposed lattice cells. The offer header, chat rows, persona
 * strip, and persona cards use designed material offsets instead of tick
 * geometry, so the half-tick landmark audit excludes those kinds. */

import type { GridExpectations } from "../expectations";

export const PRICING_EXPECTATIONS: GridExpectations = {
  totals: { rm: 119, rs: 72, rt: 51, rd1: 43, rd2: 38 },
  sections: [
    {
      id: "pricing-offer",
      rows: {
        rm: { top: 0, h: 48 },
        rs: { top: 0, h: 27 },
        rt: { top: 0, h: 16 },
        rd1: { top: 0, h: 15 },
        rd2: { top: 0, h: 13 },
      },
    },
    {
      id: "pricing-scale",
      rows: {
        rm: { top: 48, h: 29 },
        rs: { top: 27, h: 13 },
        rt: { top: 16, h: 10 },
        rd1: { top: 15, h: 9 },
        rd2: { top: 13, h: 7 },
      },
    },
    {
      id: "faq",
      rows: {
        rm: { top: 77, h: 16 },
        rs: { top: 40, h: 9 },
        rt: { top: 26, h: 7 },
        rd1: { top: 24, h: 7 },
        rd2: { top: 20, h: 7 },
      },
    },
    {
      id: "footer",
      rows: {
        rm: { top: 93, h: 26 },
        rs: { top: 49, h: 23 },
        rt: { top: 33, h: 18 },
        rd1: { top: 31, h: 12 },
        rd2: { top: 27, h: 11 },
      },
    },
  ],
  clearanceExceptions: ["strip", "card", "head", "list", "top", "nav"],
  latticeExempt: ["head", "chat", "strip", "card"],
};
