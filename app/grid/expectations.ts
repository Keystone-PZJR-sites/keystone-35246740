/** Typed page geometry for the grid sweep. The test body reads all
 * expected values through this shape.
 *
 * Per-page tables live in `grid/pages/`. */

import type { Band } from "./bands";

interface SectionRows {
  /** Zero-based page tick of the section's top. */
  top: number;
  /** Section height in ticks. */
  h: number;
}

interface SectionExpectation {
  id: string;
  /** Designed rows per band. A band with no entry means the section
   * does not render there (the audit asserts it is hidden). */
  rows: Partial<Record<Band, SectionRows>>;
}

export interface GridExpectations {
  /** Designed page total in ticks per band — the stack-sum expectation. */
  totals: Record<Band, number>;
  /** Section boundaries matched against `.sec` children in DOM order. */
  sections: SectionExpectation[];
  /** Landmark kinds allowed to intersect exposed lattice cells. */
  clearanceExceptions?: string[];
  /** Landmark kinds whose boxes are designed content offsets, not tick
   * geometry. The half-tick landmark audit skips them. */
  latticeExempt?: string[];
  /** When true, a `data-landmark` on a `.sec` root is section identity,
   * not a content box. The root skips the clearance audit because the
   * section-boundary check already covers it. */
  secLandmarksAreIdentity?: boolean;
}
