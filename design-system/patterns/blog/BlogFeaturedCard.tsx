import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from 'keystone-design-bootstrap/types';
import { getFeaturedImage, formatDate } from './utils';
import { MOBILE_MEDIA } from '@/design-system/tokens/breakpoints';

interface BlogFeaturedCardProps {
  post: BlogPost;
}

export function BlogFeaturedCard({ post }: BlogFeaturedCardProps) {
  const featuredImage = getFeaturedImage(post);
  const tags = post.blog_post_tags ?? [];
  const author = post.blog_post_authors?.[0];
  const publishDate = post.published_at ? formatDate(post.published_at) : null;

  return (
    <article className="blog-featured-card">
      <Link
        href={`/blog/${post.slug}`}
        className="blog-featured-link"
        aria-label={`Featured post: ${post.title}`}
      >
        {/* Image */}
        <div className="blog-featured-thumb">
          {featuredImage ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              sizes={`${MOBILE_MEDIA} 100vw, 50vw`}
              className="blog-featured-thumb-img"
              priority
            />
          ) : (
            <div className="blog-card-thumb-placeholder" aria-hidden="true" />
          )}
        </div>

        {/* Body */}
        <div className="blog-featured-body">
          {tags.length > 0 && (
            <div className="blog-card-tags" aria-label="Tags">
              {tags.map((tag) => (
                <span key={tag.id} className="blog-tag">
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <h2 className="blog-featured-title">{post.title}</h2>

          {post.excerpt_markdown && (
            <p className="blog-featured-excerpt">{post.excerpt_markdown}</p>
          )}

          <div className="blog-card-meta">
            {author && (
              <span className="blog-card-author">{author.name}</span>
            )}
            {author && publishDate && (
              <span className="blog-card-meta-sep" aria-hidden="true">·</span>
            )}
            {publishDate && (
              <time dateTime={post.published_at} className="blog-card-date">
                {publishDate}
              </time>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
