// Reusable numbered pagination (Previous / page nums / Next). Prop-driven
// href builder so any route can page without baking in a path. Mirrors the
// blog pagination look — cream-page Previous/Next pills and brand-tinted
// page numbers — without the blog-specific query-string wiring.

import Link from 'next/link';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Build the href for a given 1-based page. Page 1 may omit the query. */
  hrefForPage: (page: number) => string;
  /** Accessible name for the nav landmark. Defaults to "Pagination". */
  ariaLabel?: string;
}

/** Compact page-number list with ellipsis for large counts. */
export function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | '...')[] = [1];
  if (current > 3) pages.push('...');
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  hrefForPage,
  ariaLabel = 'Pagination',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="ks-pagination" aria-label={ariaLabel}>
      {currentPage > 1 ? (
        <Link
          href={hrefForPage(currentPage - 1)}
          className="ks-pagination__btn"
          aria-label="Previous page"
        >
          ← Previous
        </Link>
      ) : (
        <span
          className="ks-pagination__btn is-disabled"
          aria-disabled="true"
          aria-label="Previous page, disabled"
        >
          ← Previous
        </span>
      )}

      <div className="ks-pagination__numbers">
        {pages.map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="ks-pagination__ellipsis">
              …
            </span>
          ) : (
            <Link
              key={page}
              href={hrefForPage(Number(page))}
              className={
                Number(page) === currentPage
                  ? 'ks-pagination__num is-active'
                  : 'ks-pagination__num'
              }
              aria-current={Number(page) === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={hrefForPage(currentPage + 1)}
          className="ks-pagination__btn"
          aria-label="Next page"
        >
          Next →
        </Link>
      ) : (
        <span
          className="ks-pagination__btn is-disabled"
          aria-disabled="true"
          aria-label="Next page, disabled"
        >
          Next →
        </span>
      )}
    </nav>
  );
}
