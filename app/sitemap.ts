import type { MetadataRoute } from "next";
import { getBlogPostIndex } from "@/design-system/sections/blog-data";
import { CASE_STUDIES } from "@/design-system/sections/case-study-data";
import { SITE_URL } from "@/design-system/site";

const STATIC_PATHS = [
  "/",
  "/our-work/",
  "/pricing/",
  "/company/",
  "/for-dentists/",
  "/blog/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/accessibility/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPostIndex();
  return [
    ...STATIC_PATHS.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...CASE_STUDIES.map((study) => ({ url: `${SITE_URL}/case-studies/${study.slug}/` })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: new Date(post.publishedAt),
    })),
  ];
}
