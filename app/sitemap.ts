import type { MetadataRoute } from "next";
import { getBlogPostIndex } from "@/site/sections/blog-data";
import { CASE_STUDIES } from "@/site/sections/case-study-data";
import { SITE_URL } from "@keystone-sites/marketing-design-system/site";

const STATIC_PATHS = [
  "/",
  "/our-work/",
  "/pricing/",
  "/pricing/price-list/",
  "/company/",
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
