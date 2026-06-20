import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from 'keystone-design-bootstrap/types';
import { Heading } from '@/design-system/primitives/Heading';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { MOBILE_MEDIA } from '@/design-system/tokens/breakpoints';
import { BlogMeta } from './BlogMeta';
import { getFeaturedImage, formatDate, estimateReadingTime } from './utils';

interface BlogRecentListProps {
  posts: BlogPost[];
  title?: string;
}

/** A single wide "Most Recent" row: thumbnail on the left, copy on the right. */
function BlogRecentRow({ post }: { post: BlogPost }) {
  const image = getFeaturedImage(post);
  const tag = post.blog_post_tags?.[0];
  const date = post.published_at ? formatDate(post.published_at) : null;
  const readingTime = estimateReadingTime(post.content_markdown);

  return (
    <article className="blog-recent-row">
      <Link href={`/blog/${post.slug}`} className="blog-recent-row__link" aria-label={post.title}>
        <div className="blog-recent-row__thumb">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || post.title}
              fill
              sizes={`${MOBILE_MEDIA} 88px, 132px`}
              className="blog-recent-row__img"
            />
          ) : (
            <div className="blog-thumb-ph" aria-hidden="true" />
          )}
        </div>
        <div className="blog-recent-row__body">
          {tag && <Eyebrow tone="brand">{tag.name}</Eyebrow>}
          <h3 className="blog-recent-row__title">{post.title}</h3>
          <BlogMeta parts={[`${readingTime} min read`, date]} />
        </div>
      </Link>
    </article>
  );
}

/**
 * The "Most Recent" block — a left-aligned section heading above a vertical
 * stack of wide rows. Renders nothing when there are no posts to show.
 */
export function BlogRecentList({ posts, title = 'Most Recent' }: BlogRecentListProps) {
  if (posts.length === 0) return null;
  return (
    <section className="blog-recent" aria-label={title}>
      <Heading level={2} size="md" className="blog-section-heading">
        {title}
      </Heading>
      <div className="blog-recent__list">
        {posts.map((post) => (
          <BlogRecentRow key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
