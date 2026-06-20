// Blog gallery page — /blog
// =========================
// Server Component. Fetches all published posts server-side, then renders one
// of two modes: an editorial "index" (featured story, recent posts, top-topic
// sections, and the full tag list) when no filter is active, or a focused
// results grid when a search query or tag filter is present. No client-side
// data loading after the initial render. See spec 038.

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { serverApi } from 'keystone-design-bootstrap/lib/server-api';
import type { BlogPost } from 'keystone-design-bootstrap/types';
import { CtaBand } from '@/design-system/sections';
import {
  BlogGalleryHeader,
  BlogFeatureHero,
  BlogHighlightCard,
  BlogRecentList,
  BlogTopicBand,
  BlogCategorySection,
  BlogAllTopics,
  BlogPostCard,
  BlogFilterBar,
  BlogPagination,
  extractUniqueTags,
  tagsWithCounts,
  topTagsByCount,
  postsForTag,
  filterPosts,
  byNewestFirst,
} from '@/design-system/patterns/blog';

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Insights | Keystone',
  description:
    'Guides, playbooks, and stories from the Keystone team on growing your local business.',
};

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const POSTS_PER_PAGE = 12;
const TOP_TOPIC_COUNT = 5;
const HIGHLIGHT_COUNT = 3;
const RECENT_COUNT = 5;

const GALLERY_TITLE = 'Insights';
const GALLERY_SUBTITLE =
  'Guides, playbooks, and stories on growing your local business.';

const CLOSING_TITLE = 'The easiest way to grow your business';

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

interface BlogPageProps {
  searchParams: Promise<{ q?: string; tag?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { q, tag, page: pageParam } = await searchParams;

  const allPosts = (await serverApi.get<BlogPost[]>('/public/blog_posts')) ?? [];

  // ── Empty state — no posts at all ──────────────────────────────────────────
  if (allPosts.length === 0) {
    return (
      <div className="blog-page" data-theme="custom">
        <BlogGalleryHeader title={GALLERY_TITLE} subtitle={GALLERY_SUBTITLE} />
        <main className="blog-shell">
          <div className="blog-empty-state">
            <p className="blog-empty-title">Content coming soon.</p>
            <p className="blog-empty-body">
              Our team is working on it — check back soon.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const isFiltered = !!(q || tag);

  // ══ Filtered mode — focused results grid ═══════════════════════════════════
  if (isFiltered) {
    const allTags = extractUniqueTags(allPosts);
    const activeTag = tag ? allTags.find((t) => t.slug === tag) : null;
    const filtered = filterPosts(allPosts, q, tag);

    const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
    const currentPage = Math.max(1, Math.min(Number(pageParam) || 1, totalPages));
    const paginated = filtered.slice(
      (currentPage - 1) * POSTS_PER_PAGE,
      currentPage * POSTS_PER_PAGE,
    );

    const resultsTitle = tag
      ? `Posts tagged “${activeTag?.name ?? tag}”`
      : `Results for “${q}”`;
    const count = filtered.length;
    const resultsSubtitle = `${count} article${count === 1 ? '' : 's'}`;
    const noResults = filtered.length === 0;

    return (
      <div className="blog-page" data-theme="custom">
        <BlogGalleryHeader title={resultsTitle} subtitle={resultsSubtitle} />
        <main className="blog-shell">
          <Suspense fallback={<div className="blog-filter-bar" />}>
            <BlogFilterBar tags={allTags} currentQuery={q} currentTag={tag} />
          </Suspense>

          {noResults ? (
            <div className="blog-no-results">
              <p className="blog-no-results-title">No posts matched.</p>
              <p className="blog-no-results-body">
                Try clearing your filters to see all posts.
              </p>
            </div>
          ) : (
            <>
              <section
                className="blog-grid"
                aria-label={`Posts${currentPage > 1 ? `, page ${currentPage}` : ''}`}
              >
                {paginated.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </section>
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                searchParams={{ q, tag }}
              />
            </>
          )}
        </main>
        <CtaBand tone="accent" fullBleed title={CLOSING_TITLE} />
      </div>
    );
  }

  // ══ Index mode — editorial layout ══════════════════════════════════════════
  const sorted = [...allPosts].sort(byNewestFirst);
  const featured = allPosts.find((p) => p.featured) ?? sorted[0];

  const used = new Set<number>([featured.id]);
  const highlights = sorted.filter((p) => !used.has(p.id)).slice(0, HIGHLIGHT_COUNT);
  highlights.forEach((p) => used.add(p.id));
  const recent = sorted.filter((p) => !used.has(p.id)).slice(0, RECENT_COUNT);

  const topTags = topTagsByCount(allPosts, TOP_TOPIC_COUNT);
  const allTags = tagsWithCounts(allPosts);

  return (
    <div className="blog-page" data-theme="custom">
      <BlogGalleryHeader
        title={GALLERY_TITLE}
        subtitle={GALLERY_SUBTITLE}
        showSearch
      />

      <main>
        <div className="blog-shell">
          <BlogFeatureHero post={featured} />

          {highlights.length > 0 && (
            <section className="blog-highlight-row" aria-label="Latest posts">
              {highlights.map((post) => (
                <BlogHighlightCard key={post.id} post={post} />
              ))}
            </section>
          )}

          <BlogRecentList posts={recent} />
        </div>

        <BlogTopicBand tags={topTags} />

        <div className="blog-shell">
          {topTags.map((topTag) => (
            <BlogCategorySection
              key={topTag.id}
              tag={topTag}
              posts={postsForTag(allPosts, topTag.slug)}
            />
          ))}

          {allTags.length > TOP_TOPIC_COUNT && <BlogAllTopics tags={allTags} />}
        </div>
      </main>

      <CtaBand tone="accent" fullBleed title={CLOSING_TITLE} />
    </div>
  );
}
