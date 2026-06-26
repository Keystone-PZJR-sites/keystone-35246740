import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // No 'output: export' - this enables SSR
  images: { unoptimized: true },
  trailingSlash: true,
  // Transpile the design-bootstrap package (standard for TypeScript packages in Next.js)
  transpilePackages: ['keystone-design-bootstrap'],
  async redirects() {
    return [
      // Campaign / influencer links (e.g. 1stcollab) point at /landing-page,
      // which has no page. Send it to the homepage. Temporary (307) so a real
      // landing page can replace this later without fighting cached 308s.
      // Query strings (utm_*, etc.) are forwarded automatically.
      {
        source: '/landing-page',
        destination: '/',
        permanent: false,
      },
    ];
  },
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
