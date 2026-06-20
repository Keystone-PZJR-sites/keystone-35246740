import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from 'keystone-design-bootstrap/types';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { MOBILE_MEDIA } from '@/design-system/tokens/breakpoints';
import { BlogMeta } from './BlogMeta';
import { getFeaturedImage, formatDate, estimateReadingTime } from './utils';

interface BlogHighlightCardProps {
  post: BlogPost;
}

/**
 * Compact horizontal card — topic, title, and meta on the left with a small
 * rounded thumbnail on the right. Used in the gallery highlight row and as the
 * secondary posts inside a topic section. The whole card is one link.
 */
export function BlogHighlightCard({ post }: BlogHighlightCardProps) {
  const image = getFeaturedImage(post);
  const tag = post.blog_post_tags?.[0];
  const date = post.published_at ? formatDate(post.published_at) : null;
  const readingTime = estimateReadingTime(post.content_markdown);

  return (
    <article className="blog-highlight">
      <Link href={`/blog/${post.slug}`} className="blog-highlight__link" aria-label={post.title}>
        <div className="blog-highlight__body">
          {tag && <Eyebrow tone="brand">{tag.name}</Eyebrow>}
          <h3 className="blog-highlight__title">{post.title}</h3>
          <BlogMeta parts={[`${readingTime} min read`, date]} />
        </div>
        <div className="blog-highlight__thumb">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || post.title}
              fill
              sizes={`${MOBILE_MEDIA} 96px, 120px`}
              className="blog-highlight__img"
            />
          ) : (
            <div className="blog-thumb-ph" aria-hidden="true" />
          )}
        </div>
      </Link>
    </article>
  );
}
