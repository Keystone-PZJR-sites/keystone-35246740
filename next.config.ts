import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare/OpenNext serves static assets directly; the tier-set
  // <picture> markup (art-directed WebP exports) does its own sizing.
  images: { unoptimized: true },
  trailingSlash: true,
  // The Keystone packages ship TypeScript; Next transpiles them.
  transpilePackages: [
    "@keystone-sites/core",
    "@keystone-sites/services",
    "@keystone-sites/widgets",
  ],
};

export default nextConfig;
