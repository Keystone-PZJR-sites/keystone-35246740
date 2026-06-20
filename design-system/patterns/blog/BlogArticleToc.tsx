import type { TocHeading } from './utils';

interface BlogArticleTocProps {
  headings: TocHeading[];
}

/**
 * The "In this article" table of contents — the post's level-2 section
 * headings as in-page anchor links. Rendered only when there are enough
 * headings to be useful.
 */
export function BlogArticleToc({ headings }: BlogArticleTocProps) {
  const items = headings.filter((h) => h.level === 2);
  if (items.length < 2) return null;

  return (
    <nav className="blog-toc" aria-label="In this article">
      <p className="blog-toc__title">In this article</p>
      <ol className="blog-toc__list">
        {items.map((heading) => (
          <li key={heading.id} className="blog-toc__item">
            <a href={`#${heading.id}`} className="blog-toc__link">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
