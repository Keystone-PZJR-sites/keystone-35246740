import type { NextConfig } from "next";

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
};

export default nextConfig;
