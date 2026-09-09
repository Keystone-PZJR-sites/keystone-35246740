/** The assembled pricing page's designed anatomy (spec 013 §7.1, read
 * off the five anchor frames and verified against rendered bounds
 * 2026-08-28 — the current record). This module is the single home of
 * the §7.1 table; `/pricing` reads it through pricing-qa (dev-only).
 *
 * Rows are zero-based page ticks; the nav is overlay chrome and never
 * appears here. Sections are listed in the DOM order pricing.tsx
 * mounts. Drawer growth (the FAQ items, the footer accordion) is not
 * in this table — open drawers publish --drawer-extra and the audit
 * adds it (spec 013 §7.2).
 *
 * Declared §7.3 clearance exceptions (013 §9 build record): the 012
 * carousel strip and cards paint over the exposed staircase by design
 * (012 §2); the 011 header and included-list boxes sit over the
 * staircase per the lattices-behind-content revision (011 §9 R13);
 * the footer's top block and nav column carry their designed ornament
 * cells inside their own bounds (004 §2/§3).
 *
 * latticeExempt (013 §9 build record): the 011/012 landmark boxes that
 * are designed content offsets, not tick geometry — the offer header's
 * designed px tops (011 §3, --po-head-top-*), the chat rows (011 §6
 * content rows), and the persona strip/cards whose hanging tag rides
 * outside the tick box (012 §5). The FAQ landmarks and every other
 * kind stay fully audited. */

import type { GridExpectations } from "./grid/expectations";

export const PRICING_EXPECTATIONS: GridExpectations = {
  totals: { rm: 117, rs: 70, rt: 48, rd1: 43, rd2: 38 },
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
        rm: { top: 93, h: 24 },
        rs: { top: 49, h: 21 },
        rt: { top: 33, h: 15 },
        rd1: { top: 31, h: 12 },
        rd2: { top: 27, h: 11 },
      },
    },
  ],
  clearanceExceptions: ["strip", "card", "head", "list", "top", "nav"],
  latticeExempt: ["head", "chat", "strip", "card"],
};
