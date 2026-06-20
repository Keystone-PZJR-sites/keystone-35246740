// Blog post detail page — /blog/[slug]
// =====================================
// Server Component. All data is fetched before render; the article body is
// rendered as static HTML (no client hydration for content). The layout is a
// light editorial header, a full-width featured image, and a two-column body
// (article + sticky sidebar), then the author bio and the closing CTA band.
// See spec 038.

import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  serverApi,
  getCompanyInformation,
} from 'keystone-design-bootstrap/lib/server-api';
import type { BlogPost } from 'keystone-design-bootstrap/types';
import { MOBILE_MEDIA } from '@/design-system/tokens/breakpoints';
import { CtaBand } from '@/design-system/sections';
import {
  ArticleBody,
  BlogBreadcrumb,
  BlogPostSidebar,
  BlogAuthorBio,
  getFeaturedImage,
  formatDate,
  estimateReadingTime,
  extractHeadings,
} from '@/design-system/patterns/blog';
import type { BreadcrumbItem, BlogSocialLinks } from '@/design-system/patterns/blog';

const CLOSING_TITLE = 'The easiest way to grow your business';

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
  const description = post.seo_description ?? post.excerpt_markdown ?? undefined;
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

  const post = await serverApi.get<BlogPost>(
    `/public/blog_posts/by_slug/${encodeURIComponent(slug)}`,
  );

  if (!post) {
    notFound();
  }

  // Company social URLs for the author bio (optional).
  const companyInfo = await getCompanyInformation();
  const social: BlogSocialLinks = {
    youtubeUrl: companyInfo?.youtube_url,
    instagramUrl: companyInfo?.instagram_url,
    facebookUrl: companyInfo?.facebook_url,
    linkedinUrl: companyInfo?.linkedin_url,
  };

  // Derived values
  const featuredImage = getFeaturedImage(post);
  const leadingTag = post.blog_post_tags?.[0];
  const author = post.blog_post_authors?.[0];
  const publishDate = post.published_at ? formatDate(post.published_at) : null;
  const readingTime = estimateReadingTime(post.content_markdown);
  const headings = extractHeadings(post.content_markdown);

  const breadcrumb: BreadcrumbItem[] = [
    { label: 'Blog', href: '/blog' },
    ...(leadingTag
      ? [{ label: leadingTag.name, href: `/blog?tag=${leadingTag.slug}` }]
      : []),
  ];

  return (
    <div className="blog-post-page" data-theme="custom">
      <div className="blog-post-shell">
        <div className="blog-post-main">
          {/* ── Header ── */}
          <header className="blog-post-header">
            <BlogBreadcrumb items={breadcrumb} />
            <h1 className="blog-post-title">{post.title}</h1>
            <div className="blog-post-meta">
              <span>{readingTime} min read</span>
              {publishDate && (
                <>
                  <span className="blog-post-meta__sep" aria-hidden="true">
                    ·
                  </span>
                  <time dateTime={post.published_at}>{publishDate}</time>
                </>
              )}
            </div>
          </header>

          {/* ── Featured image ── */}
          {featuredImage && (
            <div className="blog-post-featured">
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt || post.title}
                fill
                sizes={`${MOBILE_MEDIA} 100vw, 760px`}
                className="blog-post-featured__img"
                priority
              />
            </div>
          )}

          {/* ── Article body ── */}
          <ArticleBody markdown={post.content_markdown} />

          {/* ── Author bio ── */}
          {author && <BlogAuthorBio author={author} social={social} />}
        </div>

        {/* ── Sticky sidebar ── */}
        <BlogPostSidebar author={author} headings={headings} />
      </div>

      {/* ── Closing CTA ── */}
      <CtaBand tone="accent" fullBleed title={CLOSING_TITLE} />
    </div>
  );
}
