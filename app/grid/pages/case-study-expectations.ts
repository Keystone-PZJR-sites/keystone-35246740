/** Case-study grid expectations. Rows use zero-based page ticks; the
 * overlay nav does not participate in page flow. Whole-tick section
 * boxes contain content-hugging interiors.
 *
 * The lattice exposes an east-edge staircase, the column-11 rail,
 * widenings beside stat rows, and a full row above the footer. Header,
 * intro, overview, business, CTA, and footer content intentionally
 * overlap parts of that lattice while keeping visible ink clear.
 *
 * The sticky table of contents uses material spacing rather than tick
 * geometry. The CTA hugs its content inside a whole-tick section. Those
 * kinds skip only the half-tick landmark check; their clearance checks
 * still run. */

import type { GridExpectations } from "../expectations";

export const CASE_STUDY_EXPECTATIONS: GridExpectations = {
  totals: { rm: 227, rs: 154, rt: 110, rd1: 89, rd2: 74 },
  sections: [
    {
      id: "header",
      rows: {
        rm: { top: 0, h: 25 },
        rs: { top: 0, h: 20 },
        rt: { top: 0, h: 12 },
        rd1: { top: 0, h: 9 },
        rd2: { top: 0, h: 7 },
      },
    },
    {
      id: "intro",
      rows: {
        rm: { top: 25, h: 14 },
        rs: { top: 20, h: 7 },
        rt: { top: 12, h: 8 },
        rd1: { top: 9, h: 4 },
        rd2: { top: 7, h: 3 },
      },
    },
    {
      id: "overview",
      rows: {
        rm: { top: 39, h: 29 },
        rs: { top: 27, h: 17 },
        rt: { top: 20, h: 11 },
        rd1: { top: 13, h: 9 },
        rd2: { top: 10, h: 7 },
      },
    },
    {
      id: "business",
      rows: {
        rm: { top: 68, h: 35 },
        rs: { top: 44, h: 23 },
        rt: { top: 31, h: 13 },
        rd1: { top: 22, h: 11 },
        rd2: { top: 17, h: 10 },
      },
    },
    {
      id: "shift",
      rows: {
        rm: { top: 103, h: 22 },
        rs: { top: 67, h: 13 },
        rt: { top: 44, h: 7 },
        rd1: { top: 33, h: 6 },
        rd2: { top: 27, h: 5 },
      },
    },
    {
      id: "funnel",
      rows: {
        rm: { top: 125, h: 15 },
        rs: { top: 80, h: 10 },
        rt: { top: 51, h: 8 },
        rd1: { top: 39, h: 7 },
        rd2: { top: 32, h: 6 },
      },
    },
    {
      id: "stack",
      rows: {
        rm: { top: 140, h: 22 },
        rs: { top: 90, h: 13 },
        rt: { top: 59, h: 10 },
        rd1: { top: 46, h: 9 },
        rd2: { top: 38, h: 7 },
      },
    },
    {
      id: "result",
      rows: {
        rm: { top: 162, h: 31 },
        rs: { top: 103, h: 23 },
        rt: { top: 69, h: 21 },
        rd1: { top: 55, h: 17 },
        rd2: { top: 45, h: 14 },
      },
    },
    {
      id: "cta",
      rows: {
        rm: { top: 193, h: 10 },
        rs: { top: 126, h: 7 },
        rt: { top: 90, h: 5 },
        rd1: { top: 72, h: 5 },
        rd2: { top: 59, h: 4 },
      },
    },
    {
      id: "footer",
      rows: {
        rm: { top: 203, h: 24 },
        rs: { top: 133, h: 21 },
        rt: { top: 95, h: 15 },
        rd1: { top: 77, h: 12 },
        rd2: { top: 63, h: 11 },
      },
    },
  ],
  clearanceExceptions: ["header", "intro", "overview", "business", "cta", "top", "nav"],
  latticeExempt: ["toc", "cta"],
};
