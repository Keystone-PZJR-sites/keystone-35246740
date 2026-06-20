import { SearchLg } from '@untitledui/icons';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';

interface BlogGalleryHeaderProps {
  title: string;
  subtitle?: string;
  /** Render a compact native search form (GET → /blog?q=…). */
  showSearch?: boolean;
  searchQuery?: string;
}

/**
 * The centered, light editorial header at the top of the blog gallery. Sits on
 * the cream page surface under the floating site nav. Optionally carries a
 * compact search field — a plain GET form so it works without JavaScript.
 */
export function BlogGalleryHeader({
  title,
  subtitle,
  showSearch = false,
  searchQuery,
}: BlogGalleryHeaderProps) {
  return (
    <header className="blog-gallery-header">
      <div className="blog-gallery-header__inner">
        <Heading level={1} size="xl" className="blog-gallery-header__title">
          {title}
        </Heading>
        {subtitle && (
          <Text variant="lead" tone="tertiary" className="blog-gallery-header__subtitle">
            {subtitle}
          </Text>
        )}
        {showSearch && (
          <form action="/blog" method="get" className="blog-header-search" role="search">
            <label htmlFor="blog-header-search-input" className="sr-only">
              Search articles
            </label>
            <input
              id="blog-header-search-input"
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search articles…"
              className="blog-header-search__input"
              autoComplete="off"
            />
            <button type="submit" className="blog-header-search__btn" aria-label="Search">
              <SearchLg className="blog-search-icon" aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
