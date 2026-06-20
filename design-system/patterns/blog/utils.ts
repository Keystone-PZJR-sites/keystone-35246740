import type {
  BlogPost,
  BlogPostTag,
  BlogPostAuthor,
} from 'keystone-design-bootstrap/types';

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

/** Returns an author's avatar URL (or null) plus their uppercase initial. */
export function getAuthorAvatar(author?: BlogPostAuthor): {
  url: string | null;
  initial: string;
} {
  const attachment = author?.photo_attachments?.[0];
  const url =
    attachment?.photo?.thumbnail_url ?? attachment?.photo?.medium_url ?? null;
  const initial = author?.name?.[0]?.toUpperCase() ?? '';
  return { url, initial };
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

/** A tag plus how many posts carry it (for top-tag ranking + chip counts). */
export interface TagWithCount extends BlogPostTag {
  count: number;
}

/** Counts posts per tag across the list, returned by tag id. */
function countTags(posts: BlogPost[]): Map<number, TagWithCount> {
  const counts = new Map<number, TagWithCount>();
  for (const post of posts) {
    for (const tag of post.blog_post_tags ?? []) {
      const existing = counts.get(tag.id);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(tag.id, { ...tag, count: 1 });
      }
    }
  }
  return counts;
}

/**
 * Returns every unique tag with its post count, ordered by count (desc)
 * then name (asc). Used for the "all topics" chips.
 */
export function tagsWithCounts(posts: BlogPost[]): TagWithCount[] {
  return [...countTags(posts).values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );
}

/**
 * Returns the `n` tags with the most posts, ordered by count (desc) then
 * name (asc). Powers the top-five topic band and rich topic sections.
 */
export function topTagsByCount(posts: BlogPost[], n: number): TagWithCount[] {
  return tagsWithCounts(posts).slice(0, n);
}

/** Returns posts carrying a given tag slug, most recent first. */
export function postsForTag(posts: BlogPost[], slug: string): BlogPost[] {
  return posts
    .filter((p) => p.blog_post_tags?.some((t) => t.slug === slug))
    .sort(byNewestFirst);
}

/** Sort comparator: newest `published_at` first; undated posts sort last. */
export function byNewestFirst(a: BlogPost, b: BlogPost): number {
  const at = a.published_at ? Date.parse(a.published_at) : 0;
  const bt = b.published_at ? Date.parse(b.published_at) : 0;
  return bt - at;
}

// ---------------------------------------------------------------------------
// Article table of contents (derived from the post markdown)
// ---------------------------------------------------------------------------

export interface TocHeading {
  level: 2 | 3;
  id: string;
  text: string;
}

/** Strips light inline markdown so a heading's anchor text matches what renders. */
export function stripInlineMarkdown(text: string): string {
  return text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links / images → label
    .replace(/[*_`~]/g, '') // emphasis / code markers
    .trim();
}

/** Slugifies heading text into a URL-fragment-safe id. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Creates a slugger that de-duplicates repeated headings deterministically
 * (`intro`, `intro-1`, `intro-2`). Build one per pass; the article body and the
 * TOC walk the headings in the same order, so their ids line up.
 */
export function createSlugger(): (text: string) => string {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base = slugify(text) || 'section';
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}

/**
 * Extracts the level-2 and level-3 headings from a post's markdown, each with a
 * stable, de-duplicated id. Fenced code blocks are skipped so `#` comments in
 * code are not mistaken for headings. The "In this article" TOC renders the
 * level-2 entries; the body renderer applies the same ids to its headings.
 */
export function extractHeadings(markdown: string): TocHeading[] {
  const slug = createSlugger();
  const headings: TocHeading[] = [];
  let inFence = false;
  for (const rawLine of markdown.split('\n')) {
    const line = rawLine.trimEnd();
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.*)$/.exec(line);
    if (!match) continue;
    const level = match[1].length === 2 ? 2 : 3;
    const text = stripInlineMarkdown(match[2]);
    if (!text) continue;
    headings.push({ level: level as 2 | 3, id: slug(text), text });
  }
  return headings;
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
