/** v2 sections — the blog data layer (spec 025 §5). Server-only.
 *
 * One FULL-SET fetch through the package's `getBlogPosts()` (the
 * pagination walk on the standing 60-second revalidate — §9 R2 F5:
 * the bare endpoint paginates server-side, and a single GET truncates
 * at one page, corrupting the top-5-tags selection), validated at the
 * boundary against the package's `BlogPost` shape (the rules'
 * boundary law: the raw body is `unknown`, records are checked
 * field-by-field, and a malformed record DROPS without crashing the
 * page — including an imageless record, per the §7 R2 ruling: the
 * backend guarantees an image, so its absence is malformation).
 *
 * Selection (§5, the planning-pass rulings): featured = the newest
 * published post; recent = the next three (the featured excluded);
 * the category sections are the top-5 tags by post count, each with
 * its three newest (overlap with recent allowed — the live
 * behavior); empty tags drop their sections (§7 R3).
 *
 * Mappers (§5): topic = the first tag's name (bare — §7 F3: the
 * drawn `ON AI` was placeholder); read time = max(1, ceil(words /
 * 200)) over `content_markdown` (the live algorithm, reimplemented —
 * the old util was purged with the old tree); description =
 * `excerpt_markdown` as plain text; image = the featured (else
 * first) photo attachment's largest available cut.
 */

import { getBlogPosts } from "@keystone-sites/core/lib/server-api";

export interface BlogCardModel {
  slug: string;
  title: string;
  /** The first tag's name, bare (§7 F3); empty when the post carries
   * no tags (the eyebrow renders the read time alone). */
  topic: string;
  readMinutes: number;
  description: string;
  imageUrl: string;
  /** Epoch ms of `published_at ?? created_at` — the sort key. */
  publishedAt: number;
  tags: { name: string; slug: string }[];
}

export interface BlogCategoryModel {
  name: string;
  slug: string;
  posts: BlogCardModel[];
}

export interface BlogLandingModel {
  featured: BlogCardModel | null;
  recent: BlogCardModel[];
  categories: BlogCategoryModel[];
}

/* ---- §5 constants (the drawn archetype counts) ---- */

export const RECENT_COUNT = 3;
export const CATEGORY_COUNT = 5;
export const CATEGORY_POST_COUNT = 3;
const WORDS_PER_MINUTE = 200;

/* ---- boundary validation ---- */

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function nonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

/** The image URL (§9 R2 F6): the `featured: true` attachment, falling
 * back to the first by `sort_order`; URL preference large → original
 * → medium (the largest drawn box is 640 CSS px — ~1280 at 2×; a
 * thumbnail-only record is "imageless" and drops). */
function imageUrlOf(raw: Record<string, unknown>): string | null {
  const attachments = raw.photo_attachments;
  if (!Array.isArray(attachments)) return null;
  const usable = attachments
    .filter(
      (a): a is { featured?: boolean; sort_order?: number; photo: Record<string, unknown> } =>
        isRecord(a) && isRecord(a.photo),
    )
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  const pick = usable.find((a) => a.featured === true) ?? usable[0];
  if (!pick) return null;
  const p = pick.photo;
  const url = p.large_url ?? p.original_url ?? p.medium_url;
  return nonEmptyString(url) ? url : null;
}

function tagsOf(raw: Record<string, unknown>): { name: string; slug: string }[] {
  const tags = raw.blog_post_tags;
  if (!Array.isArray(tags)) return [];
  return tags
    .filter(
      (t): t is Record<string, unknown> =>
        isRecord(t) && nonEmptyString(t.name) && nonEmptyString(t.slug),
    )
    .map((t) => ({ name: t.name as string, slug: t.slug as string }));
}

function readMinutesOf(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** The §9 B4 (F7) description fallback: a plain-text lead from
 * `content_markdown` when a post carries no excerpt (live data:
 * 99/100 posts carry one; the lone excerptless post is an authoring
 * gap, not a malformed record). Minimal markdown stripping — the
 * drawn clamps own the display truncation; the slice only bounds the
 * DOM payload. */
const LEAD_MAX_CHARS = 240;
function plainLead(content: string): string {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ") // fenced code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → text
    .replace(/^#{1,6}\s+/gm, "") // headings
    .replace(/[*_`>~]/g, "") // emphasis/code/quote marks
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= LEAD_MAX_CHARS) return plain;
  const cut = plain.slice(0, LEAD_MAX_CHARS);
  return cut.slice(0, cut.lastIndexOf(" ")).trimEnd();
}

/** One record through the boundary; null = malformed, drops (§5). */
function parsePost(raw: unknown): BlogCardModel | null {
  if (!isRecord(raw)) return null;
  if (!nonEmptyString(raw.slug) || !nonEmptyString(raw.title)) return null;
  if (typeof raw.content_markdown !== "string") return null;
  const imageUrl = imageUrlOf(raw);
  if (imageUrl === null) return null; // §7 R2: imageless = malformed
  const dateSource =
    (nonEmptyString(raw.published_at) && raw.published_at) ||
    (nonEmptyString(raw.created_at) && raw.created_at) ||
    null;
  const publishedAt = dateSource ? Date.parse(dateSource) : NaN;
  if (Number.isNaN(publishedAt)) return null;
  const tags = tagsOf(raw);
  return {
    slug: raw.slug,
    title: raw.title,
    topic: tags[0]?.name ?? "",
    readMinutes: readMinutesOf(raw.content_markdown),
    description: nonEmptyString(raw.excerpt_markdown)
      ? raw.excerpt_markdown
      : plainLead(raw.content_markdown),
    imageUrl,
    publishedAt,
    tags,
  };
}

/** The validated, newest-first post list. Exported for the coming 026
 * surfaces (category/search modes share the one full-set fetch and
 * parse). The fetch is the package's `getBlogPosts()` — the full-set
 * pagination walk on the standing 60s revalidate (§9 R2 F5: the bare
 * endpoint paginates server-side and a single GET truncates at one
 * page, corrupting the top-5-tags selection). */
export async function getBlogPostList(): Promise<BlogCardModel[]> {
  // typed at the boundary — the parse trusts nothing (a bad record
  // drops, the page renders)
  const raw: unknown = await getBlogPosts();
  const posts = Array.isArray(raw)
    ? raw
        .map((r) => parsePost(r))
        .filter((p): p is BlogCardModel => p !== null)
        .sort((a, b) => b.publishedAt - a.publishedAt)
    : [];

  // the §9 R6/B2 dev fallback: when the backend yields nothing IN
  // DEVELOPMENT, the pinned fixture mounts so the built surfaces are
  // reviewable through an outage (§9 R2 F8). The import is dynamic and
  // the gate compile-constant — production never loads the module.
  if (posts.length === 0 && process.env.NODE_ENV === "development") {
    const { BLOG_FIXTURE } = await import("./blog-fixture");
    console.warn(
      "[blog] the backend returned no posts — the dev fixture is mounted (spec 025 §9 B2)",
    );
    return BLOG_FIXTURE;
  }
  return posts;
}

/** The top tags by post count (count desc, name asc for determinism —
 * the live `topTagsByCount` behavior). */
function topCategories(posts: BlogCardModel[]): BlogCategoryModel[] {
  const byTag = new Map<string, { name: string; posts: BlogCardModel[] }>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const entry = byTag.get(tag.slug) ?? { name: tag.name, posts: [] };
      entry.posts.push(post);
      byTag.set(tag.slug, entry);
    }
  }
  return [...byTag.entries()]
    .sort(
      ([aSlug, a], [bSlug, b]) =>
        b.posts.length - a.posts.length ||
        a.name.localeCompare(b.name) ||
        aSlug.localeCompare(bSlug),
    )
    .slice(0, CATEGORY_COUNT)
    .map(([slug, { name, posts: tagged }]) => ({
      name,
      slug,
      // the posts arrive newest-first; empty tags never reach here
      posts: tagged.slice(0, CATEGORY_POST_COUNT),
    }));
}

/** The landing's §5 selection over one fetch. */
export async function getBlogLanding(): Promise<BlogLandingModel> {
  const posts = await getBlogPostList();
  const featured = posts[0] ?? null;
  return {
    featured,
    recent: posts.slice(1, 1 + RECENT_COUNT),
    categories: topCategories(posts),
  };
}
