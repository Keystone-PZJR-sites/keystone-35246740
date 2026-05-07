import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from 'keystone-design-bootstrap/types';
import { getFeaturedImage, formatDate } from './utils';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const featuredImage = getFeaturedImage(post);
  const tags = post.blog_post_tags ?? [];
  const author = post.blog_post_authors?.[0];
  const publishDate = post.published_at ? formatDate(post.published_at) : null;

  return (
    <article className="blog-card">
      <Link
        href={`/blog/${post.slug}`}
        className="blog-card-link"
        aria-label={post.title}
      >
        {/* Thumbnail */}
        <div className="blog-card-thumb">
          {featuredImage ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="blog-card-thumb-img"
            />
          ) : (
            <div className="blog-card-thumb-placeholder" aria-hidden="true" />
          )}
        </div>

        {/* Card body */}
        <div className="blog-card-body">
          {tags.length > 0 && (
            <div className="blog-card-tags" aria-label="Tags">
              {tags.map((tag) => (
                <span key={tag.id} className="blog-tag">
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <h2 className="blog-card-title">{post.title}</h2>

          {post.excerpt_markdown && (
            <p className="blog-card-excerpt">{post.excerpt_markdown}</p>
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
