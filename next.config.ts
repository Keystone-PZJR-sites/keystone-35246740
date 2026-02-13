import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No 'output: export' - this enables SSR
  images: { unoptimized: true },
  trailingSlash: true,
  // Transpile the design-bootstrap package (standard for TypeScript packages in Next.js)
  transpilePackages: ['keystone-design-bootstrap'],
};

export default nextConfig;
