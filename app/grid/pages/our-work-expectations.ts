/** Our Work page grid expectations. Rows use zero-based page ticks.
 * Overlay navigation and the modal viewer do not participate in page
 * flow.
 *
 * Case-study cards, header content, gallery slides, and footer ornaments
 * intentionally overlap exposed lattice cells. Header copy and CTA rows
 * use material offsets, so the half-tick landmark audit excludes them.
 * All other landmark kinds remain on the half-tick grid. */

import type { GridExpectations } from "../expectations";

export const OUR_WORK_EXPECTATIONS: GridExpectations = {
  totals: { rm: 113, rs: 87, rt: 63, rd1: 53, rd2: 48 },
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
        rm: { top: 87, h: 26 },
        rs: { top: 64, h: 23 },
        rt: { top: 45, h: 18 },
        rd1: { top: 41, h: 12 },
        rd2: { top: 37, h: 11 },
      },
    },
  ],
  clearanceExceptions: ["card", "head", "cta", "gallery", "top", "nav"],
  latticeExempt: ["head", "cta"],
};
