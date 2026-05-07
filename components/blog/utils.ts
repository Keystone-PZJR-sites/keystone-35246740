import type { BlogPost, BlogPostTag } from 'keystone-design-bootstrap/types';

// ---------------------------------------------------------------------------
// Image
// ---------------------------------------------------------------------------

/** Returns the best available URL + alt text for the post's featured image. */
export function getFeaturedImage(post: BlogPost): { url: string; alt: string } | null {
  const attachments = post.photo_attachments;
  if (!attachments || attachments.length === 0) return null;
  const attachment = attachments.find((a) => a.featured) ?? attachments[0];
  const url =
    attachment.photo?.large_url ??
    attachment.photo?.medium_url ??
    attachment.photo?.thumbnail_url ??
    null;
  if (!url) return null;
  return { url, alt: attachment.photo?.alt_text ?? '' };
}

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ---------------------------------------------------------------------------
// Reading time
// ---------------------------------------------------------------------------

/** Estimates reading time in minutes (200 words/min). Minimum 1 min. */
export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// ---------------------------------------------------------------------------
// Tag utilities
// ---------------------------------------------------------------------------

/** Extracts all unique tags across a post list, sorted alphabetically. */
export function extractUniqueTags(posts: BlogPost[]): BlogPostTag[] {
  const seen = new Set<number>();
  const tags: BlogPostTag[] = [];
  for (const post of posts) {
    for (const tag of post.blog_post_tags ?? []) {
      if (!seen.has(tag.id)) {
        seen.add(tag.id);
        tags.push(tag);
      }
    }
  }
  return tags.sort((a, b) => a.name.localeCompare(b.name));
}

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

/** Filters posts by search query and/or tag slug. */
export function filterPosts(
  posts: BlogPost[],
  q: string | undefined,
  tag: string | undefined,
): BlogPost[] {
  let result = posts;

  if (q) {
    const lower = q.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.excerpt_markdown?.toLowerCase().includes(lower) ||
        p.content_markdown.toLowerCase().includes(lower),
    );
  }

  if (tag) {
    result = result.filter((p) =>
      p.blog_post_tags?.some((t) => t.slug === tag),
    );
  }

  return result;
}

// ---------------------------------------------------------------------------
// Pagination helpers
// ---------------------------------------------------------------------------

/** Generates page number ranges with ellipsis for large page counts. */
export function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | '...')[] = [];
  pages.push(1);
  if (current > 3) pages.push('...');
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}
