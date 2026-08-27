import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The grid devtools ship in development only (specs 002/010). The
  // alias swaps the mount for a server null stub in production, so the
  // QA routes' prod graphs are identical to their bare pages — no
  // devtools chunk, and the shared-chunk attribution the route-JS
  // budget is measured on stays undisturbed (spec 010 §4.2).
  webpack(config, { dev }) {
    if (!dev) {
      config.resolve.alias[path.resolve(__dirname, "app/grid/devtools-mount")] =
        path.resolve(__dirname, "app/grid/devtools-mount.prod");
    }
    return config;
  },
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
