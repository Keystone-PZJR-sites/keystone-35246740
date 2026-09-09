import { getBlogPosts } from "@keystone-sites/core/lib/server-api";

export interface BlogCardModel {
  slug: string;
  title: string;
  topic: string;
  readMinutes: number;
  description: string;
  imageUrl: string;
  publishedAt: number;
  tags: { name: string; slug: string }[];
}

interface BlogCategoryModel {
  name: string;
  slug: string;
  posts: BlogCardModel[];
}

export interface BlogLandingModel {
  featured: BlogCardModel | null;
  recent: BlogCardModel[];
  categories: BlogCategoryModel[];
}

const RECENT_COUNT = 3;
const CATEGORY_COUNT = 5;
const CATEGORY_POST_COUNT = 3;
const WORDS_PER_MINUTE = 200;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function nonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

interface BlogTag {
  name: string;
  slug: string;
}

function isBlogTag(value: unknown): value is BlogTag {
  return isRecord(value) && nonEmptyString(value.name) && nonEmptyString(value.slug);
}

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
  return tags.filter(isBlogTag).map(({ name, slug }) => ({ name, slug }));
}

function readMinutesOf(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

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

function parsePost(raw: unknown): BlogCardModel | null {
  if (!isRecord(raw)) return null;
  if (!nonEmptyString(raw.slug) || !nonEmptyString(raw.title)) return null;
  if (typeof raw.content_markdown !== "string") return null;
  const imageUrl = imageUrlOf(raw);
  if (imageUrl === null) return null;
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

async function getBlogPostList(): Promise<BlogCardModel[]> {
  const raw: unknown = await getBlogPosts();
  const posts = Array.isArray(raw)
    ? raw
        .map((r) => parsePost(r))
        .filter((p): p is BlogCardModel => p !== null)
        .sort((a, b) => b.publishedAt - a.publishedAt)
    : [];

  return posts;
}

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
      posts: tagged.slice(0, CATEGORY_POST_COUNT),
    }));
}

export async function getBlogLanding(): Promise<BlogLandingModel> {
  const posts = await getBlogPostList();
  const featured = posts[0] ?? null;
  return {
    featured,
    recent: posts.slice(1, 1 + RECENT_COUNT),
    categories: topCategories(posts),
  };
}
