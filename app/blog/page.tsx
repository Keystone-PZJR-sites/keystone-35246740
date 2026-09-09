import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogGridCheck, { getBlogGridFixture } from "../grid/pages/blog";
import { BlogPage } from "@/design-system/pages/blog";
import {
  getBlogFiltered,
  getBlogLanding,
  type BlogPageModel,
} from "@/design-system/sections/blog-data";
import { SITE_LINKS } from "@/design-system/site-links";

interface BlogRouteProps {
  searchParams: Promise<{
    q?: string | string[];
    tag?: string | string[];
    page?: string | string[];
    _grid?: string | string[];
  }>;
}

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function hasFilter(params: { q?: string | string[]; tag?: string | string[] }): boolean {
  return Boolean(firstValue(params.q).trim() || firstValue(params.tag).trim());
}

function pageNumber(value: string | string[] | undefined): number | null {
  if (value === undefined) return 1;
  const raw = firstValue(value);
  if (!/^[1-9]\d*$/.test(raw)) return null;
  const page = Number(raw);
  return Number.isSafeInteger(page) ? page : null;
}

export async function generateMetadata({ searchParams }: BlogRouteProps): Promise<Metadata> {
  const params = await searchParams;
  return {
    title: "Blog | Keystone",
    ...(hasFilter(params) && {
      robots: { index: false, follow: true },
      alternates: { canonical: SITE_LINKS.blog },
    }),
  };
}

export default async function Blog({ searchParams }: BlogRouteProps) {
  const params = await searchParams;
  let model: BlogPageModel;
  if (hasFilter(params)) {
    const page = pageNumber(params.page);
    if (page === null) notFound();
    const fixtureName = firstValue(params._grid);
    const fixture = fixtureName
      ? getBlogGridFixture(fixtureName, page, (await getBlogLanding()).featured)
      : null;
    const filtered =
      fixture ??
      (await getBlogFiltered({
        query: firstValue(params.q),
        tag: firstValue(params.tag),
        page,
      }));
    if (!filtered) notFound();
    model = { type: "filtered", filtered };
  } else {
    model = { type: "landing", landing: await getBlogLanding() };
  }
  return (
    <BlogPage
      model={model}
      gridCheck={<BlogGridCheck model={model} />}
    />
  );
}
