/** The assembled Our Work page's designed anatomy (spec 016 §7.1 —
 * the 014/015 landmark records, rendered-bounds re-verified
 * 2026-08-28). This module is the single home of the §7.1 table; the
 * `/our-work` reads it through our-work-qa (dev-only).
 *
 * Rows are zero-based page ticks; the nav is overlay chrome and never
 * appears here — and neither does the 016 viewer (a portal on
 * --z-modal outside the page flow: the §7.2 drives assert the stack
 * beneath it is unchanged). Sections are listed in the DOM order
 * our-work.tsx mounts. Footer heights are the 004 record, as on the
 * pricing page.
 *
 * Declared §7.3 clearance exceptions (every citation in the source
 * specs): the case-study boxes over the staircase's inner columns
 * (card — 014 §2), the rt subhead's weight-riding wrap box over [8,5]
 * (head — 014 §2), the header CTA row's hugging flex box over the
 * staircase's top cells (cta — 014 §2/§3; the assertion's first run on
 * this page, 2026-08-29: the box reaches [8,5] rt/rd2 and [10,~5] rm
 * while its ink — the two buttons — ends 1.5–2t clear; the same
 * lattices-behind-content class as head, amended into 016 §7.1), the
 * strip's ghost slides over the col-11 rail at rm/rs (gallery — 015
 * §2), and the footer's own ornament cells (top · nav — 004 §2/§3).
 *
 * latticeExempt (the 013 precedent's kind): the 014 header block's
 * px-riding tops and hugging content rows (head · cta). Every other
 * landmark kind (card · gallery-head · gallery · logo · item …) stays
 * on the half-tick law. */

import type { GridExpectations } from "./grid/expectations";

export const OUR_WORK_EXPECTATIONS: GridExpectations = {
  totals: { rm: 111, rs: 85, rt: 60, rd1: 53, rd2: 48 },
  sections: [
    {
      id: "work-header",
      rows: {
        rm: { top: 0, h: 17 },
        rs: { top: 0, h: 11 },
        rt: { top: 0, h: 8 },
        rd1: { top: 0, h: 8 },
        rd2: { top: 0, h: 7 },
      },
    },
    {
      id: "work-cases",
      rows: {
        rm: { top: 17, h: 58 },
        rs: { top: 11, h: 42 },
        rt: { top: 8, h: 21 },
        rd1: { top: 8, h: 18 },
        rd2: { top: 7, h: 15 },
      },
    },
    {
      id: "work-gallery",
      rows: {
        rm: { top: 75, h: 12 },
        rs: { top: 53, h: 11 },
        rt: { top: 29, h: 16 },
        rd1: { top: 26, h: 15 },
        rd2: { top: 22, h: 15 },
      },
    },
    {
      id: "footer",
      rows: {
        rm: { top: 87, h: 24 },
        rs: { top: 64, h: 21 },
        rt: { top: 45, h: 15 },
        rd1: { top: 41, h: 12 },
        rd2: { top: 37, h: 11 },
      },
    },
  ],
  clearanceExceptions: ["card", "head", "cta", "gallery", "top", "nav"],
  latticeExempt: ["head", "cta"],
};
