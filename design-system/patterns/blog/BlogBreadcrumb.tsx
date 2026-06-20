import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BlogBreadcrumbProps {
  items: BreadcrumbItem[];
}

/** A simple "Blog / Topic" breadcrumb trail of links at the top of a post. */
export function BlogBreadcrumb({ items }: BlogBreadcrumbProps) {
  if (items.length === 0) return null;
  return (
    <nav className="blog-breadcrumb" aria-label="Breadcrumb">
      <ol className="blog-breadcrumb__list">
        {items.map((item, i) => (
          <li key={item.href} className="blog-breadcrumb__item">
            {i > 0 && (
              <span className="blog-breadcrumb__sep" aria-hidden="true">
                /
              </span>
            )}
            <Link href={item.href} className="blog-breadcrumb__link">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
