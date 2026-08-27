/** Self-test expectations (spec 010 §3.2/§6.1) — the typed designed
 * stacks the grid devtools audit against. The devtools read everything
 * through this shape; no magic numbers live in the test body.
 *
 * FIXTURE_EXPECTATIONS drives /grid (derived from the transcribed
 * fixtures); the assembled homepage's table (spec 010 §2) lives in
 * app/home-fixture/expectations.ts. */

import { BANDS, FIXTURES, type Band } from "./fixtures";

export interface SectionRows {
  /** Zero-based page tick of the section's top. */
  top: number;
  /** Section height in ticks. */
  h: number;
}

export interface SectionExpectation {
  id: string;
  /** Designed rows per band. A band with no entry means the section
   * does not render there (the audit asserts it is hidden). */
  rows: Partial<Record<Band, SectionRows>>;
}

export interface GridExpectations {
  /** Designed page total in ticks per band — the stack-sum expectation. */
  totals: Record<Band, number>;
  /** Designed section boundaries, matched against the page's `.sec`
   * flow children in DOM order (spec 010 §3.2). */
  sections: SectionExpectation[];
}

const [GALLERY_FX, FOOTER_FX] = FIXTURES;

/** The /grid fixture page: two transcribed sections, gallery over
 * footer, nothing else in flow (spec 002 §3). */
export const FIXTURE_EXPECTATIONS: GridExpectations = {
  totals: Object.fromEntries(
    BANDS.map((b) => [b, GALLERY_FX.heights[b] + FOOTER_FX.heights[b]]),
  ) as Record<Band, number>,
  sections: [
    {
      id: GALLERY_FX.id,
      rows: Object.fromEntries(
        BANDS.map((b) => [b, { top: 0, h: GALLERY_FX.heights[b] }]),
      ),
    },
    {
      id: FOOTER_FX.id,
      rows: Object.fromEntries(
        BANDS.map((b) => [b, { top: GALLERY_FX.heights[b], h: FOOTER_FX.heights[b] }]),
      ),
    },
  ],
};
