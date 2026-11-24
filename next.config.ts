import { INGEST_PATH, regionNamed } from "@keystonepzjr/web-product-analytics/regions";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare serves the images as they are.
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  // Analytics reach PostHog through the site's own origin, where a blocker that drops PostHog's
  // hosts lets them through. PostHog's paths end in a slash Next must not take off.
  async rewrites() {
    const region = regionNamed(process.env.NEXT_PUBLIC_POSTHOG_REGION);
    return [
      { source: `${INGEST_PATH}/static/:path*`, destination: `${region.assets}/static/:path*` },
      { source: `${INGEST_PATH}/:path*`, destination: `${region.ingest}/:path*` },
    ];
  },
  skipTrailingSlashRedirect: true,
  // These packages ship TypeScript source.
  transpilePackages: [
    "@keystonepzjr/marketing-design-system",
    "@keystone-sites/core",
    "@keystone-sites/services",
    "@keystone-sites/widgets",
  ],
};

export default nextConfig;
