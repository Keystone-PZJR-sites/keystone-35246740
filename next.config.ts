import type { NextConfig } from "next";

/**
 * 301s for historical dead blog interlinks (2026-07 dead-interlink audit —
 * sor-service docs/blog-dead-interlinks-analysis-2026-07-09.md). The AI blog
 * generator wrote links using title-derived slugs that never matched the real
 * post slugs; the content is backfilled, but crawlers (Google Search Console)
 * remember the dead URLs for months. Redirecting recovers link equity and
 * clears GSC faster than waiting for recrawl.
 *
 * Host-scoped so the map is a no-op on every other customer site built from
 * this template.
 */
const DEAD_BLOG_SLUG_REDIRECTS: Array<{ host: string; from: string; to: string }> = [
  // ── www.keystone.app ──
  { host: '(www\\.)?keystone\\.app', from: 'daily-ops-to-lock-hot-leads-a-24-hour-activation-playbook-for-local-business-owners', to: 'daily-ops-to-lock-hot-leads-a-24hour' },
  { host: '(www\\.)?keystone\\.app', from: 'turn-your-booking-confirmation-into-a-revenue-engine-exact-tactics-to-lift-same-week-bookings-upsells-and-show-rates', to: 'turn-your-booking-confirmation' },
  { host: '(www\\.)?keystone\\.app', from: 'who-owns-the-lead-a-practical-lead-ownership-playbook-for-small-local-businesses', to: 'who-owns-the-lead' },
  { host: '(www\\.)?keystone\\.app', from: 'a-9-touch-booking-confirmation-sequence-that-cuts-no-shows-and-lifts-same-week-bookings', to: 'a-9touch-booking-confirmation-sequence' },
  { host: '(www\\.)?keystone\\.app', from: 'how-to-use-booking-confirmation-pages-and-micro-commitments-to-lock-bookings-lift-show-rates-and-increase-aov', to: 'how-to-use-booking-confirmation-pages' },
  { host: '(www\\.)?keystone\\.app', from: 'a-monthly-slot-release-system-how-to-fill-same-week-openings-without-discounting', to: 'a-monthly-slotrelease-system' },
  { host: '(www\\.)?keystone\\.app', from: 'the-rebooking-playbook-how-local-service-businesses-turn-one-visit-into-months-of-repeat-revenue', to: 'the-rebooking-playbook-how-local-businesses-turn-one-visit-into-months-of-repeat-revenue' },
  { host: '(www\\.)?keystone\\.app', from: 'the-rebooking-playbook-how-local-businesses-turn-one-visit-into-months-of-repeat-customers', to: 'the-rebooking-playbook-how-local-businesses-turn-one-visit-into-months-of-repeat-revenue' },
  { host: '(www\\.)?keystone\\.app', from: 'the-front-desk-playbook-how-to-turn-walk-ins-and-phone-enquiries-and-more-revenue', to: 'the-front-desk-playbook-how-to-turn-walk-ins-and-phone-enquiries-into-booked-appointments-and-more-revenue' },
  // ── www.oasismadeleine.com ──
  { host: '(www\\.)?oasismadeleine\\.com', from: 'monthly-mini-treatments-a-practical-luxury-routine-to-keep-your-skin-glowing-between-in-office-sessions', to: 'monthly-mini-treatments-a-practical' },
  // ── www.leanandlovelyaesthetics.com ──
  { host: '(www\\.)?leanandlovelyaesthetics\\.com', from: 'keeping-your-face-balanced-on-glp-1-weight-loss-medications-a-nurse-practitioners-guide-to-preventing-and-treating-facial-volume-loss', to: 'keeping-your-face-balanced-on-glp-1-weight-loss-medications-a-nurse-practitioner-s-guide-to-preventing-and-treating-facial-volume-loss' },
  // ── your-health-solutions (workers.dev) ──
  { host: 'your-health-solutions-.*\\.workers\\.dev', from: 'fueling-your-aesthetic-results-what-to-eat-and-avoid-before-and-after-injectables-fillers-body', to: 'fueling-your-aesthetic-results-what-to-eat-and-avoid-before-and-after-injectables-fillers-body-contouring' },
];

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
      // A past version of the blog rendered relative "blog/<slug>" hrefs
      // (missing leading slash), so crawlers indexed /blog/blog/<slug> and
      // /blog/<carrier>/blog/<slug>. The bug is long fixed; permanently fold
      // the remembered URLs onto the canonical path.
      {
        source: '/blog/blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/blog/:carrier/blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // Historical dead interlink slugs -> real slugs (see map above).
      ...DEAD_BLOG_SLUG_REDIRECTS.map(({ host, from, to }) => ({
        source: `/blog/${from}`,
        destination: `/blog/${to}`,
        permanent: true,
        has: [{ type: 'host' as const, value: host }],
      })),
    ];
  },
};

export default nextConfig;
