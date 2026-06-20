import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from 'keystone-design-bootstrap/types';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { MOBILE_MEDIA } from '@/design-system/tokens/breakpoints';
import { BlogMeta } from './BlogMeta';
import { getFeaturedImage, formatDate, estimateReadingTime } from './utils';

interface BlogFeatureHeroProps {
  post: BlogPost;
}

/**
 * The large featured story at the top of the gallery: the post image beside a
 * brand-gradient panel carrying the leading topic, title, excerpt, and meta.
 * The whole card is one link to the post.
 */
export function BlogFeatureHero({ post }: BlogFeatureHeroProps) {
  const image = getFeaturedImage(post);
  const tag = post.blog_post_tags?.[0];
  const author = post.blog_post_authors?.[0];
  const date = post.published_at ? formatDate(post.published_at) : null;
  const readingTime = estimateReadingTime(post.content_markdown);

  return (
    <article className="blog-feature">
      <Link href={`/blog/${post.slug}`} className="blog-feature__link" aria-label={post.title}>
        <div className="blog-feature__media">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || post.title}
              fill
              sizes={`${MOBILE_MEDIA} 100vw, 55vw`}
              className="blog-feature__img"
              priority
            />
          ) : (
            <div className="blog-thumb-ph" aria-hidden="true" />
          )}
        </div>

        <div className="blog-feature__panel">
          {tag && <Eyebrow tone="inverse-muted">{tag.name}</Eyebrow>}
          <Heading level={2} size="lg" font="body" tone="inverse" className="blog-feature__title">
            {post.title}
          </Heading>
          {post.excerpt_markdown && (
            <Text variant="bodyLg" tone="inverse-muted" className="blog-feature__excerpt">
              {post.excerpt_markdown}
            </Text>
          )}
          <BlogMeta
            tone="inverse"
            parts={[author?.name, `${readingTime} min read`, date]}
          />
        </div>
      </Link>
    </article>
  );
}
