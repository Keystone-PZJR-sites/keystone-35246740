import type { BlogPostAuthor } from 'keystone-design-bootstrap/types';
import { BlogAvatar } from './BlogAvatar';
import { BlogArticleToc } from './BlogArticleToc';
import { BlogPromoCard } from './BlogPromoCard';
import { getAuthorAvatar } from './utils';
import type { TocHeading } from './utils';

interface BlogPostSidebarProps {
  author?: BlogPostAuthor;
  headings: TocHeading[];
}

/**
 * The sticky right column on a blog post: the author byline, an "In this
 * article" table of contents derived from the post markdown, and the universal
 * promo card.
 */
export function BlogPostSidebar({ author, headings }: BlogPostSidebarProps) {
  const { url, initial } = getAuthorAvatar(author);
  return (
    <aside className="blog-sidebar">
      <div className="blog-sidebar__sticky">
        {author && (
          <div className="blog-byline">
            <BlogAvatar url={url} initial={initial} size={40} />
            <span className="blog-byline__text">
              <span className="blog-byline__by">By</span> {author.name}
            </span>
          </div>
        )}
        <BlogArticleToc headings={headings} />
        <BlogPromoCard />
      </div>
    </aside>
  );
}
