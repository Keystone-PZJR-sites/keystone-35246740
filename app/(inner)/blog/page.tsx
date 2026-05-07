// Blog gallery page — /blog
// =========================
// Server Component. Reads URL search params, fetches all published posts
// server-side, then filters + paginates in memory. No client-side data
// loading after the initial render.

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { serverApi } from 'keystone-design-bootstrap/lib/server-api';
import type { BlogPost } from 'keystone-design-bootstrap/types';
import { BlogPostCard } from '@/components/blog';
import { BlogFeaturedCard } from '@/components/blog';
import { BlogFilterBar } from '@/components/blog';
import { BlogPagination } from '@/components/blog';
import { extractUniqueTags, filterPosts } from '@/components/blog';

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Blog | Keystone',
  description:
    'Insights, guides, and stories from the Keystone team on growing your local business.',
};

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const POSTS_PER_PAGE = 12;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

interface BlogPageProps {
  searchParams: Promise<{ q?: string; tag?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { q, tag, page: pageParam } = await searchParams;

  // Fetch all published posts (used for filtering, tags, featured detection)
  const allPosts =
    (await serverApi.get<BlogPost[]>('/public/blog_posts')) ?? [];

  // No posts at all → empty state
  if (allPosts.length === 0) {
    return (
      <div className="blog-page" data-theme="custom">
        <header className="blog-page-header">
          <div className="blog-page-header-inner">
            <h1 className="blog-page-title">Blog</h1>
            <p className="blog-page-subtitle">
              Insights, guides, and stories from the Keystone team.
            </p>
          </div>
        </header>
        <main>
          <div className="blog-content">
            <div className="blog-empty-state">
              <p className="blog-empty-title">Content coming soon.</p>
              <p className="blog-empty-body">
                Our team is working on it — check back soon.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // All available tags (for filter bar)
  const allTags = extractUniqueTags(allPosts);

  // Active filters
  const isFiltered = !!(q || tag);

  // Featured post — suppressed when any filter is active
  const featuredPost = !isFiltered
    ? (allPosts.find((p) => p.featured) ?? null)
    : null;

  // Filter the full post list
  const filteredPosts = filterPosts(allPosts, q, tag);

  // Remove the featured post from the grid to avoid duplication
  const gridPosts = featuredPost
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  // Pagination
  const totalPages = Math.max(1, Math.ceil(gridPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.max(
    1,
    Math.min(Number(pageParam) || 1, totalPages),
  );
  const paginatedPosts = gridPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const noResults = isFiltered && filteredPosts.length === 0;

  return (
    <div className="blog-page" data-theme="custom">
      {/* Page header — same maroon as InnerNav, reads as one block */}
      <header className="blog-page-header">
        <div className="blog-page-header-inner">
          <h1 className="blog-page-title">Blog</h1>
          <p className="blog-page-subtitle">
            Insights, guides, and stories from the Keystone team.
          </p>
        </div>
      </header>

      <main>
        <div className="blog-content">
          {/* Search + filter — client component wrapped in Suspense */}
          <Suspense fallback={<div className="blog-filter-bar" />}>
            <BlogFilterBar
              tags={allTags}
              currentQuery={q}
              currentTag={tag}
            />
          </Suspense>

          {/* Featured post */}
          {featuredPost && (
            <section className="blog-featured-section" aria-label="Featured post">
              <BlogFeaturedCard post={featuredPost} />
            </section>
          )}

          {/* No results */}
          {noResults ? (
            <div className="blog-no-results">
              <p className="blog-no-results-title">No posts matched.</p>
              <p className="blog-no-results-body">
                Try clearing your filters to see all posts.
              </p>
            </div>
          ) : (
            <>
              {/* Post grid */}
              <section
                className="blog-grid"
                aria-label={`Posts${currentPage > 1 ? `, page ${currentPage}` : ''}`}
              >
                {paginatedPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </section>

              {/* Pagination */}
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                searchParams={{ q, tag }}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
