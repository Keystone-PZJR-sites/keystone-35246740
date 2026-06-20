import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CardGridProps {
  children: ReactNode;
  /**
   * Desktop column count the spans are measured against. Cards flow into this
   * many equal columns at ≥985px; below that the grid collapses to one column.
   * Defaults to 3.
   */
  columns?: 2 | 3 | 4 | 6;
  /** Accessible name when the grid is a meaningful region. */
  ariaLabel?: string;
  className?: string;
}

export interface CardGridItemProps {
  children: ReactNode;
  /** Columns this item spans (clamped to the grid's column count). Default 1. */
  colSpan?: number;
  /** Rows this item spans. Default 1. */
  rowSpan?: number;
  className?: string;
}

// ── Components ─────────────────────────────────────────────────────────────────

/**
 * A responsive grid that composes cards. By default every child is an equal
 * 1×1 cell; wrap a child in `CardGridItem` to span multiple columns (or rows)
 * for bento arrangements. At ≥985px the grid is `columns` wide with spans
 * honored; below 985px it collapses to a single full-width column in source
 * order and spans are ignored. Layout only — it never styles its cards. See
 * spec 036.
 */
export function CardGrid({ children, columns = 3, ariaLabel, className }: CardGridProps) {
  return (
    <div
      className={clsx('ks-card-grid', className)}
      style={{ '--cg-cols': columns } as CSSProperties}
      role={ariaLabel ? 'group' : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

/**
 * An optional wrapper that makes its card span multiple grid columns / rows.
 * Only needed for spanned cells — unspanned cards can sit in `CardGrid`
 * directly.
 */
export function CardGridItem({ children, colSpan = 1, rowSpan = 1, className }: CardGridItemProps) {
  return (
    <div
      className={clsx('ks-card-grid__item', className)}
      style={{ '--cg-col-span': colSpan, '--cg-row-span': rowSpan } as CSSProperties}
    >
      {children}
    </div>
  );
}
