import type { MetadataRoute } from "next";
import { LEGAL_DOCUMENTS } from "@/site/legal/documents";
import { SITE_URL } from "@/site/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...Object.values(LEGAL_DOCUMENTS).map((document) => document.href)].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
