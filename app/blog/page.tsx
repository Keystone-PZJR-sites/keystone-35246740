import type { Metadata } from "next";
import BlogGridCheck from "../grid/pages/blog";
import { BlogPage } from "@/design-system/pages/blog";
import { getBlogLanding } from "@/design-system/sections/blog-data";

export const metadata: Metadata = {
  title: "Blog | Keystone",
};

interface BlogRouteProps {
  searchParams: Promise<{
    q?: string | string[];
    tag?: string | string[];
  }>;
}

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function Blog({ searchParams }: BlogRouteProps) {
  const params = await searchParams;
  const query = firstValue(params.q);
  const landing = await getBlogLanding({
    query,
    tag: firstValue(params.tag),
  });
  return (
    <BlogPage
      landing={landing}
      searchQuery={query}
      gridCheck={<BlogGridCheck landing={landing} />}
    />
  );
}
