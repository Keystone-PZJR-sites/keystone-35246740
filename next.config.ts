import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep output tracing inside this project.
  outputFileTracingRoot: path.join(__dirname),
  // Cloudflare/OpenNext serves static assets directly; the tier-set
  // <picture> markup (art-directed WebP exports) does its own sizing.
  images: { unoptimized: true },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/gallery",
        destination: "/our-work/?gallery=1",
        permanent: true,
      },
      // Stripe Payment Links still return to these paths (configured in Stripe).
      // The dedicated success/cancel pages were removed in the brand rebuild.
      {
        source: "/pricing/success",
        destination: "/pricing/",
        permanent: false,
      },
      {
        source: "/pricing/cancel",
        destination: "/pricing/",
        permanent: false,
      },
    ];
  },
  // The Keystone packages ship TypeScript; Next transpiles them.
  transpilePackages: [
    "@keystone-sites/core",
    "@keystone-sites/services",
    "@keystone-sites/widgets",
  ],
};

export default nextConfig;
