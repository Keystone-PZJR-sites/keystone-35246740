import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // No 'output: export' - this enables SSR
  images: { unoptimized: true },
  trailingSlash: true,
  // Transpile the design-bootstrap package (standard for TypeScript packages in Next.js)
  transpilePackages: ['keystone-design-bootstrap'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      [path.resolve(__dirname, 'node_modules/keystone-design-bootstrap/src/lib/consumer-session.ts')]:
        path.resolve(__dirname, 'lib/consumer-session.ts'),
    };
    return config;
  },
};

export default nextConfig;
