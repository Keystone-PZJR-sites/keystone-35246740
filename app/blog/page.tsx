import type { Metadata } from "next";
import { BlogPage } from "@/design-system/v2/blog";
import { getBlogLanding } from "@/design-system/v2/sections/blog-data";
import BlogQa from "../blog-qa";

/** `/blog` — the blog landing (specs 024 + 025; the live blog URL kept
 * by owner ruling, plan.md 2026-09-08 — no `/resources` routes). The
 * page fetches the landing model (one 60s-revalidated fetch,
 * boundary-validated) and feeds it to the composition AND the qa
 * expectations, so the sweep audits the same data snapshot the page
 * rendered. BlogQa is the dev-only sweep hook (production aliases it
 * to the null stub). The category/search modes arrive with spec 026
 * on this route's searchParams. */
export const metadata: Metadata = {
  title: "Blog | Keystone",
};

export default async function Blog() {
  const landing = await getBlogLanding();
  return <BlogPage landing={landing} qa={<BlogQa landing={landing} />} />;
}
