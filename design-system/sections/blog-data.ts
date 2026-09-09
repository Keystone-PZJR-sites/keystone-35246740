import { getBlogPosts } from "@keystone-sites/core/lib/server-api";
import { cache } from "react";
import { SITE_LINKS } from "../site-links";

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

export interface BlogLandingFilter {
  query?: string;
  tag?: string;
}

export interface BlogFilteredRequest extends BlogLandingFilter {
  page: number;
}

export interface BlogPaginationModel {
  currentPage: number;
  totalPages: number;
  query?: string;
  tag?: string;
}

interface BlogFilteredBase {
  heading: string;
  posts: BlogCardModel[];
  pagination: BlogPaginationModel;
}

export interface BlogCategoryPageModel extends BlogFilteredBase {
  type: "category";
  featured: BlogCardModel | null;
}

export interface BlogSearchPageModel extends BlogFilteredBase {
  type: "search";
  featured: null;
}

export type BlogFilteredModel = BlogCategoryPageModel | BlogSearchPageModel;

export type BlogPageModel =
  | { type: "landing"; landing: BlogLandingModel }
  | { type: "filtered"; filtered: BlogFilteredModel };

export type BlogPageWindowItem =
  | { type: "page"; page: number }
  | { type: "ellipsis"; key: "leading" | "trailing" };

const RECENT_COUNT = 3;
const CATEGORY_COUNT = 5;
const CATEGORY_POST_COUNT = 3;
const WORDS_PER_MINUTE = 200;
export const BLOG_POSTS_PER_PAGE = 6;

interface ParsedBlogPost extends BlogCardModel {
  searchText: string;
}

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

function parsePost(raw: unknown): ParsedBlogPost | null {
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
    searchText: [raw.title, raw.excerpt_markdown, raw.content_markdown]
      .filter((value): value is string => typeof value === "string")
      .join(" ")
      .toLocaleLowerCase(),
  };
}

const getBlogPostList = cache(async function getBlogPostList(): Promise<ParsedBlogPost[]> {
  const raw: unknown = await getBlogPosts();
  const posts = Array.isArray(raw)
    ? raw
        .map((r) => parsePost(r))
        .filter((p): p is ParsedBlogPost => p !== null)
        .sort((a, b) => b.publishedAt - a.publishedAt)
    : [];

  return posts;
});

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

function filterPosts(posts: ParsedBlogPost[], filter: BlogLandingFilter): ParsedBlogPost[] {
  const query = filter.query?.trim().toLocaleLowerCase() ?? "";
  const tag = filter.tag?.trim().toLocaleLowerCase() ?? "";
  return posts.filter((post) => {
    const matchesTag =
      !tag || post.tags.some((postTag) => postTag.slug.toLocaleLowerCase() === tag);
    if (!matchesTag || !query) return matchesTag;
    return post.searchText.includes(query);
  });
}

export async function getBlogLanding(filter: BlogLandingFilter = {}): Promise<BlogLandingModel> {
  const posts = filterPosts(await getBlogPostList(), filter);
  const featured = posts[0] ?? null;
  return {
    featured,
    recent: posts.slice(1, 1 + RECENT_COUNT),
    categories: topCategories(posts),
  };
}

function tagBySlug(posts: ParsedBlogPost[], slug: string): BlogTag | null {
  const normalized = slug.toLocaleLowerCase();
  for (const post of posts) {
    const tag = post.tags.find((candidate) => candidate.slug.toLocaleLowerCase() === normalized);
    if (tag) return tag;
  }
  return null;
}

function totalPages(itemCount: number): number {
  return Math.max(1, Math.ceil(itemCount / BLOG_POSTS_PER_PAGE));
}

export async function getBlogFiltered(
  request: BlogFilteredRequest,
): Promise<BlogFilteredModel | null> {
  if (!Number.isInteger(request.page) || request.page < 1) return null;

  const allPosts = await getBlogPostList();
  const rawQuery = request.query ?? "";
  const query = rawQuery.trim();
  const requestedTag = request.tag?.trim() ?? "";
  const tag = requestedTag ? tagBySlug(allPosts, requestedTag) : null;
  if (requestedTag && !tag) return null;

  const matches = filterPosts(allPosts, {
    query,
    tag: tag?.slug,
  });

  if (query) {
    const pages = totalPages(matches.length);
    if (request.page > pages) return null;
    const start = (request.page - 1) * BLOG_POSTS_PER_PAGE;
    return {
      type: "search",
      heading: rawQuery,
      featured: null,
      posts: matches.slice(start, start + BLOG_POSTS_PER_PAGE),
      pagination: {
        currentPage: request.page,
        totalPages: pages,
        query: rawQuery,
        ...(tag && { tag: tag.slug }),
      },
    };
  }

  if (!tag) return null;
  const rows = matches.slice(1);
  const pages = totalPages(rows.length);
  if (request.page > pages) return null;
  const start = (request.page - 1) * BLOG_POSTS_PER_PAGE;
  return {
    type: "category",
    heading: tag.name,
    featured: request.page === 1 ? matches[0] ?? null : null,
    posts: rows.slice(start, start + BLOG_POSTS_PER_PAGE),
    pagination: {
      currentPage: request.page,
      totalPages: pages,
      tag: tag.slug,
    },
  };
}

export function blogPageHref(pagination: BlogPaginationModel, page: number): string {
  const params = new URLSearchParams();
  if (pagination.tag) params.set("tag", pagination.tag);
  if (pagination.query) params.set("q", pagination.query);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${SITE_LINKS.blog}?${query}` : SITE_LINKS.blog;
}

export function blogPageWindow(
  currentPage: number,
  totalPageCount: number,
): BlogPageWindowItem[] {
  if (totalPageCount <= 5) {
    return Array.from({ length: totalPageCount }, (_, index) => ({
      type: "page" as const,
      page: index + 1,
    }));
  }
  if (currentPage <= 3) {
    return [
      { type: "page", page: 1 },
      { type: "page", page: 2 },
      { type: "page", page: 3 },
      { type: "ellipsis", key: "trailing" },
      { type: "page", page: totalPageCount },
    ];
  }
  if (currentPage >= totalPageCount - 2) {
    return [
      { type: "page", page: 1 },
      { type: "ellipsis", key: "leading" },
      { type: "page", page: totalPageCount - 2 },
      { type: "page", page: totalPageCount - 1 },
      { type: "page", page: totalPageCount },
    ];
  }
  return [
    { type: "page", page: 1 },
    { type: "ellipsis", key: "leading" },
    { type: "page", page: currentPage },
    { type: "ellipsis", key: "trailing" },
    { type: "page", page: totalPageCount },
  ];
}
