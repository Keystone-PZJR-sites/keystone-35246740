/** The assembled homepage's designed page anatomy (spec 010 §2 as
 * amended 2026-08-28, read off the five anchor frames and verified
 * against rendered bounds — the current record, superseding plan.md's
 * 2026-08-22 page totals; the rd1 column dropped 1t at the page-load
 * streamline). This module is the single home of the §2 table; the
 * /home-fixture self-test reads it as its expectations (§3.2).
 *
 * Rows are zero-based page ticks. The nav is overlay chrome and never
 * appears here (the material-vs-tick-riding-vs-overlay-chrome law);
 * row 40 is the page-owned rd2-only lattice row (007 §8.8 as amended
 * by 009 §9). Sections are listed in the DOM order home.tsx mounts.
 *
 * Declared §7.3 clearance exceptions (spec 013 §9 build record —
 * designed overlaps between outer content boxes and their sections'
 * own exposed lattice): the hero carousel over its cell field (006
 * §2), the portfolio gallery window over the east cells (007 §2), the
 * engine rows over the east cells (008 §2), the testimonial strip
 * over its corner/rule cells (009 §2/§9), and the footer's top block
 * and nav column over their in-block ornament cells (004 §2/§3). The
 * finer landmarks (bar, ctrl, logo, card, item) stay fully audited. */

import type { GridExpectations } from "../grid/expectations";

export const PAGE_EXPECTATIONS: GridExpectations = {
  totals: { rm: 101, rs: 74, rt: 53, rd1: 50, rd2: 52 },
  sections: [
    {
      id: "hero",
      rows: {
        rm: { top: 0, h: 26 },
        rs: { top: 0, h: 20 },
        rt: { top: 0, h: 13 },
        rd1: { top: 0, h: 12 },
        rd2: { top: 0, h: 12 },
      },
    },
    {
      id: "portfolio",
      rows: {
        rm: { top: 26, h: 19 },
        rs: { top: 20, h: 11 },
        rt: { top: 13, h: 9 },
        rd1: { top: 12, h: 9 },
        rd2: { top: 12, h: 9 },
      },
    },
    {
      id: "engine",
      rows: {
        rm: { top: 45, h: 21 },
        rs: { top: 31, h: 13 },
        rt: { top: 22, h: 9 },
        rd1: { top: 21, h: 9 },
        rd2: { top: 21, h: 8 },
      },
    },
    {
      id: "testimonials",
      rows: {
        rm: { top: 66, h: 11 },
        rs: { top: 44, h: 9 },
        rt: { top: 31, h: 7 },
        rd1: { top: 30, h: 8 },
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
        rd1: { top: 38, h: 12 },
        rd2: { top: 41, h: 11 },
      },
    },
  ],
  clearanceExceptions: ["carousel", "gallery", "row", "strip", "top", "nav"],
};
