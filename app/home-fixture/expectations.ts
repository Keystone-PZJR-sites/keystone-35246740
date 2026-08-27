/** The assembled homepage's designed page anatomy (spec 010 §2, read
 * off the five anchor frames 2026-08-27 and verified against rendered
 * bounds — the current record, superseding plan.md's 2026-08-22 page
 * totals). This module is the single home of the §2 table; the
 * /home-fixture self-test reads it as its expectations (§3.2).
 *
 * Rows are zero-based page ticks. The nav is overlay chrome and never
 * appears here (the material-vs-tick-riding-vs-overlay-chrome law);
 * row 40 is the page-owned rd2-only lattice row (007 §8.8 as amended
 * by 009 §9). Sections are listed in the DOM order home.tsx mounts. */

import type { GridExpectations } from "../grid/expectations";

export const PAGE_EXPECTATIONS: GridExpectations = {
  totals: { rm: 101, rs: 74, rt: 53, rd1: 51, rd2: 52 },
  sections: [
    {
      id: "hero",
      rows: {
        rm: { top: 0, h: 26 },
        rs: { top: 0, h: 20 },
        rt: { top: 0, h: 13 },
        rd1: { top: 0, h: 13 },
        rd2: { top: 0, h: 12 },
      },
    },
    {
      id: "portfolio",
      rows: {
        rm: { top: 26, h: 19 },
        rs: { top: 20, h: 11 },
        rt: { top: 13, h: 9 },
        rd1: { top: 13, h: 9 },
        rd2: { top: 12, h: 9 },
      },
    },
    {
      id: "engine",
      rows: {
        rm: { top: 45, h: 21 },
        rs: { top: 31, h: 13 },
        rt: { top: 22, h: 9 },
        rd1: { top: 22, h: 9 },
        rd2: { top: 21, h: 8 },
      },
    },
    {
      id: "testimonials",
      rows: {
        rm: { top: 66, h: 11 },
        rs: { top: 44, h: 9 },
        rt: { top: 31, h: 7 },
        rd1: { top: 31, h: 8 },
        rd2: { top: 29, h: 11 },
      },
    },
    {
      id: "row-40",
      rows: {
        rd2: { top: 40, h: 1 },
      },
    },
    {
      id: "footer",
      rows: {
        rm: { top: 77, h: 24 },
        rs: { top: 53, h: 21 },
        rt: { top: 38, h: 15 },
        rd1: { top: 39, h: 12 },
        rd2: { top: 41, h: 11 },
      },
    },
  ],
};
