import path from "node:path";
import type { NextConfig } from "next";

const QA_STUB = path.resolve(__dirname, "app/qa.prod");
const QA_WRAPPERS = ["home-qa", "pricing-qa", "our-work-qa", "case-study-qa"];

const nextConfig: NextConfig = {
  // This repo sits next to a parent lockfile. Pin tracing here so
  // Next does not treat the parent as the workspace root.
  outputFileTracingRoot: path.join(__dirname),
  // Dev-only sweep hooks. Production aliases every `*-qa` wrapper and
  // the grid mount to a server null stub, so live pages stay the bare
  // composition — no expectations table, no panel, no chunk edge
  // (spec 010 §4.2).
  webpack(config, { dev }) {
    if (!dev) {
      config.resolve.alias[path.resolve(__dirname, "app/grid/devtools-mount")] =
        path.resolve(__dirname, "app/grid/devtools-mount.prod");
      for (const name of QA_WRAPPERS) {
        config.resolve.alias[path.resolve(__dirname, `app/${name}`)] = QA_STUB;
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
