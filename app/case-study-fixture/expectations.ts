/** The assembled case-study page's designed anatomy (spec 017 §7.1 —
 * the §1 landmark table, rendered-bounds re-verified at build
 * 2026-08-31; the rs Shift→CTA rows carry the build erratum: the F5c
 * rs body normalization grew The Business 1t and the run below rode
 * down — Shift 67 · Funnel 80 · Stack 90 · Result 103 · CTA 126, the
 * footer and total unchanged, the §2 ornaments moved with it). This
 * module is the single home of the §7.1 table; the
 * /case-study-fixture self-test reads it as its expectations.
 *
 * Rows are zero-based page ticks; the nav is overlay chrome and never
 * appears here. Sections span top → the next section's top (§1: the
 * content-hugging interiors sit inside whole-tick section boxes —
 * "the tick wins"); footer heights are the 004 record.
 *
 * The exposure (§2 as corrected at build — the §9 record): the
 * east-edge staircase, the col-11 rail, the designed widenings
 * beside the stat rows, and the full-lattice row directly above the
 * footer. The §2 "full-field" claim was the presence read (the hero
 * §2 erratum class); the painted map lives in case-study-lattice.tsx.
 *
 * Declared §7.3 clearance exceptions (drawn behind-content overlaps,
 * re-read from stroke visibility 2026-08-31 — the 014 declared-
 * overlap class): header — the staircase's inner columns pass behind
 * the photo box and the H1's transparent rows at every band; intro —
 * the rt widening (rows 4–6 cols 7–10) rides behind the transparent
 * stat cells; overview — the widenings beside the stat rows (rm rows
 * 19–26 col 10 · rs rows 14–15 cols 6–10 · rt rows 7–9 col 10) sit
 * inside the landmark column as drawn; business — the §3.4 bleed
 * class: at rt+ the quote image runs to the page's right edge over
 * the col-11 rail (rt rows 6–12 · rd1 5–10 · rd2 5–8), so the
 * bleed-wide wrapper covers rail cells whose ink stays clear beside
 * the head and body (the 016 cta box-reaches/ink-clear class);
 * cta — at the below-384 extrapolation slice the band's type holds
 * 1:1 (wA+wB = 1) while the tick shrinks, so the hugging box reaches
 * the pre-footer full-lattice row (the v5 §2 extrapolation squeeze;
 * at 384 and every gate-up width the drawn 2t/1t gap holds — checked
 * at the anchors); top · nav — the footer's own ornament cells (004
 * §2/§3, the standing exceptions).
 *
 * latticeExempt: toc — the §4 chrome (30px items on material pads;
 * sticky geometry off the tick lattice by design; its clearance
 * assertion — the col-1 seat clear of the east rail — still runs);
 * cta — the §3.9 band hugs its drawn box (2.39t at rd2) inside the
 * whole-tick section (the §7.1 anticipation), which keeps its
 * clearance against the pre-footer full-lattice row a real
 * assertion. */

import type { GridExpectations } from "../grid/expectations";

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
