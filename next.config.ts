import path from "node:path";
import type { NextConfig } from "next";

const GRID_CHECK_DISABLED = path.resolve(__dirname, "app/grid/disabled");
const GRID_CHECK_WRAPPERS = [
  "home",
  "pricing",
  "our-work",
  "case-study",
  "blog",
];

const nextConfig: NextConfig = {
  // Keep output tracing inside this project.
  outputFileTracingRoot: path.join(__dirname),
  // Production replaces development-only grid validation with null
  // server components, keeping it out of the client graph.
  webpack(config, { dev }) {
    if (!dev) {
      config.resolve.alias[path.resolve(__dirname, "app/grid/mount")] =
        GRID_CHECK_DISABLED;
      for (const name of GRID_CHECK_WRAPPERS) {
        config.resolve.alias[path.resolve(__dirname, `app/grid/pages/${name}`)] =
          GRID_CHECK_DISABLED;
      }
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
