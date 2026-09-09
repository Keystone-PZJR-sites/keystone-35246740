import type { Metadata } from "next";
import { BlogPage } from "@/design-system/v2/blog";

/** `/blog` — the blog landing (spec 024 §8; the live blog URL kept by
 * owner ruling, plan.md 2026-09-08 — no `/resources` routes). The
 * post lists arrive with spec 025; the `blog-qa` sweep hook lands
 * with the 025 assembly. */
export const metadata: Metadata = {
  title: "Blog | Keystone",
};

export default function Blog() {
  return <BlogPage />;
}
