import Link from 'next/link';
import { getPageNumbers } from './utils';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: { q?: string; tag?: string };
}

function buildPageUrl(
  page: number,
  params: { q?: string; tag?: string },
): string {
  const urlParams = new URLSearchParams();
  if (params.q) urlParams.set('q', params.q);
  if (params.tag) urlParams.set('tag', params.tag);
  if (page > 1) urlParams.set('page', String(page));
  const qs = urlParams.toString();
  return `/blog${qs ? `?${qs}` : ''}`;
}

export function BlogPagination({
  currentPage,
  totalPages,
  searchParams,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="blog-pagination" aria-label="Post pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={buildPageUrl(currentPage - 1, searchParams)}
          className="blog-page-btn"
          aria-label="Previous page"
        >
          ← Previous
        </Link>
      ) : (
        <span
          className="blog-page-btn is-disabled"
          aria-disabled="true"
          aria-label="Previous page, disabled"
        >
          ← Previous
        </span>
      )}

      {/* Page numbers */}
      <div className="blog-page-numbers">
        {pages.map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="blog-page-ellipsis">
              …
            </span>
          ) : (
            <Link
              key={page}
              href={buildPageUrl(Number(page), searchParams)}
              className={`blog-page-num${Number(page) === currentPage ? ' is-active' : ''}`}
              aria-current={Number(page) === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildPageUrl(currentPage + 1, searchParams)}
          className="blog-page-btn"
          aria-label="Next page"
        >
          Next →
        </Link>
      ) : (
        <span
          className="blog-page-btn is-disabled"
          aria-disabled="true"
          aria-label="Next page, disabled"
        >
          Next →
        </span>
      )}
    </nav>
  );
}
