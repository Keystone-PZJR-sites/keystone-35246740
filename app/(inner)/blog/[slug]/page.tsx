// Blog post detail page — /blog/[slug]
// =====================================
// Server Component. All data is fetched before render; the article body
// is rendered as static HTML via ReactMarkdown (no client hydration needed).

import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { serverApi } from 'keystone-design-bootstrap/lib/server-api';
import type { BlogPost } from 'keystone-design-bootstrap/types';
import { BlogPostCard } from '@/components/blog';
import {
  getFeaturedImage,
  formatDate,
  estimateReadingTime,
} from '@/components/blog';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await serverApi.get<BlogPost>(
    `/public/blog_posts/by_slug/${encodeURIComponent(slug)}`,
  );
  if (!post) return {};

  const title = post.seo_title ?? post.title;
  const description =
    post.seo_description ?? post.excerpt_markdown ?? undefined;
  const featuredImage = getFeaturedImage(post);

  return {
    title: `${title} | Keystone Blog`,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.published_at,
      ...(featuredImage && {
        images: [{ url: featuredImage.url, alt: featuredImage.alt }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(featuredImage && { images: [featuredImage.url] }),
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Fetch the individual post by slug
  const post = await serverApi.get<BlogPost>(
    `/public/blog_posts/by_slug/${encodeURIComponent(slug)}`,
  );

  if (!post) {
    notFound();
  }

  // Fetch all posts to build related posts (excludes current)
  const allPosts =
    (await serverApi.get<BlogPost[]>('/public/blog_posts')) ?? [];

  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  // Derived values
  const featuredImage = getFeaturedImage(post);
  const tags = post.blog_post_tags ?? [];
  const author = post.blog_post_authors?.[0];
  const authorImage = author?.photo_attachments?.[0];
  const authorAvatarUrl =
    authorImage?.photo?.thumbnail_url ??
    authorImage?.photo?.medium_url ??
    null;
  const authorInitial = author?.name?.[0]?.toUpperCase() ?? '';
  const publishDate = post.published_at ? formatDate(post.published_at) : null;
  const readingTime = estimateReadingTime(post.content_markdown);

  return (
    <div className="blog-post-page" data-theme="custom">
      {/* ── Post header (maroon — continuous block with InnerNav) ── */}
      <header className="blog-post-header">
        <div className="blog-post-header-inner">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="blog-post-tags" aria-label="Tags">
              {tags.map((tag) => (
                <span key={tag.id} className="blog-tag">
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="blog-post-title">{post.title}</h1>

          {/* Metadata row */}
          <div className="blog-post-meta">
            {author && (
              <>
                {/* Author avatar */}
                <div
                  className="blog-post-author-avatar"
                  aria-hidden="true"
                >
                  {authorAvatarUrl ? (
                    <Image
                      src={authorAvatarUrl}
                      alt=""
                      width={28}
                      height={28}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span>{authorInitial}</span>
                  )}
                </div>
                <span>{author.name}</span>
              </>
            )}
            {author && publishDate && (
              <span className="blog-post-meta-sep" aria-hidden="true">·</span>
            )}
            {publishDate && (
              <time dateTime={post.published_at}>{publishDate}</time>
            )}
            {(author || publishDate) && (
              <span className="blog-post-meta-sep" aria-hidden="true">·</span>
            )}
            <span>{readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* ── Featured image ── */}
      {featuredImage && (
        <div className="blog-post-featured-image">
          <div className="blog-post-featured-image-inner">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* ── Article body ── */}
      <article className="blog-article">
        {/*
          prose prose-lg applies @tailwindcss/typography base styles.
          blog-prose overrides fonts and colors to match the site's design system.
          The content is rendered server-side — no client hydration required.
        */}
        <div className="prose prose-lg blog-prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content_markdown}
          </ReactMarkdown>
        </div>
      </article>

      {/* ── Related posts ── */}
      {relatedPosts.length > 0 && (
        <section className="blog-related" aria-label="More posts">
          <div className="blog-related-wrapper">
            <h2 className="blog-related-heading">More posts</h2>
            <div className="blog-related-grid">
              {relatedPosts.map((related) => (
                <BlogPostCard key={related.id} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
