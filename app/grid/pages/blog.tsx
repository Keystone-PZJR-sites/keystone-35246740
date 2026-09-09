import type {
  BlogCardModel,
  BlogFilteredModel,
  BlogPageModel,
} from "@/design-system/sections/blog-data";
import GridMount from "../mount";
import { blogExpectations } from "./blog-expectations";

const GRID_CATEGORY_NAME = "Grid Category";
const GRID_CATEGORY_SLUG = "grid-category";
const GRID_SEARCH_QUERY = "grid-empty";
const GRID_PAGE_COUNT = 25;
const GRID_POSTS_PER_PAGE = 6;

export interface BlogGridCheckProps {
  model: BlogPageModel;
}

function fixturePost(seed: BlogCardModel, index: number): BlogCardModel {
  return {
    ...seed,
    slug: `${seed.slug}-grid-${index}`,
    topic: GRID_CATEGORY_NAME,
    tags: [{ name: GRID_CATEGORY_NAME, slug: GRID_CATEGORY_SLUG }],
  };
}

export function getBlogGridFixture(
  name: string,
  page: number,
  seed: BlogCardModel | null,
): BlogFilteredModel | null {
  if (name === "empty-search") {
    if (page !== 1) return null;
    return {
      type: "search",
      heading: GRID_SEARCH_QUERY,
      featured: null,
      posts: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        query: GRID_SEARCH_QUERY,
      },
    };
  }
  if (!seed || page < 1) return null;
  if (name === "two-post-category") {
    if (page !== 1) return null;
    return {
      type: "category",
      heading: GRID_CATEGORY_NAME,
      featured: fixturePost(seed, 0),
      posts: [fixturePost(seed, 1)],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        tag: GRID_CATEGORY_SLUG,
      },
    };
  }
  if (name !== "twenty-five-page-category" || page > GRID_PAGE_COUNT) return null;
  const firstIndex = 1 + (page - 1) * GRID_POSTS_PER_PAGE;
  return {
    type: "category",
    heading: GRID_CATEGORY_NAME,
    featured: page === 1 ? fixturePost(seed, 0) : null,
    posts: Array.from({ length: GRID_POSTS_PER_PAGE }, (_, index) =>
      fixturePost(seed, firstIndex + index),
    ),
    pagination: {
      currentPage: page,
      totalPages: GRID_PAGE_COUNT,
      tag: GRID_CATEGORY_SLUG,
    },
  };
}

/** Development-only blog grid check. */
export default function BlogGridCheck({ model }: BlogGridCheckProps) {
  return <GridMount expectations={blogExpectations(model)} />;
}
