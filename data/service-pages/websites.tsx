// Authored values for the Websites service page (spec 037). JSX here is limited
// to the feature-list icons (data-as-content per the rules).

import { Award01, SearchLg, RefreshCcw05 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const WEBSITES: ServicePageContent = {
  slug: 'websites',
  metaTitle: 'Websites | Keystone',
  metaDescription:
    'Keystone designs, builds, and runs a website proven to rank on Google and turn visitors into booked customers — with improvements shipped for you.',

  hero: {
    eyebrow: 'Websites',
    title: 'A website that books customers while you work.',
    subtitle:
      'We design, build, and run a site proven to climb Google and turn visitors into bookings and orders — then keep sharpening it for you.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.shopOwner.src,
      alt: 'A shop owner managing her business on a laptop',
      statement: 'Designed to convert, built to rank, and sharpened every week — without you lifting a finger.',
      tagline: 'Built to book, not just to browse.',
    },
  },

  featureSection: {
    eyebrow: 'Why it converts',
    title: 'Most local websites look fine and sell nothing',
    media: { image: MEDIA.productScreens.web.src, alt: 'Keystone website management dashboard' },
    mediaSide: 'start',
    features: [
      {
        id: 'proven-design',
        icon: <Award01 />,
        title: "A design that's been proven to sell",
        description:
          "We've tested what drives bookings across thousands of local businesses. Your site starts from what already works.",
      },
      {
        id: 'google-loves',
        icon: <SearchLg />,
        title: 'Engineered to climb Google',
        description:
          'Real technical SEO is built into every page, so customers find you before they find your competitors.',
      },
      {
        id: 'always-better',
        icon: <RefreshCcw05 />,
        title: 'Gets sharper every month',
        description:
          'When we learn what converts, we ship it to your site — no rebuild, no change order, no extra invoice.',
      },
    ],
  },

  bento: {
    eyebrow: 'Under the hood',
    title: 'A site that earns its keep',
    columns: 2,
    tiles: [
      {
        id: 'ai-seo',
        background: {
          kind: 'image',
          src: MEDIA.scenes.counterConsult.src,
          alt: 'Owners reviewing work at a shop counter',
        },
        aspect: 12 / 5,
        eyebrow: 'Search-first',
        title: 'We grow your Google traffic with AI-built SEO.',
        colSpan: 2,
      },
      {
        id: 'ordering',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'product',
        eyebrow: 'Conversion built in',
        title: 'Booking and ordering flows that turn clicks into customers.',
      },
      {
        id: 'best-practices',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'metric',
        eyebrow: 'Always improving',
        title: 'Your site never goes stale.',
        caption: 'Every conversion win we find ships to your site automatically — no rebuilds, no extra cost.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'current-site',
        question: 'What happens to my current website?',
        answer:
          'We migrate everything and redirect your old pages, so you keep your rankings and lose no traffic in the move.',
      },
      {
        id: 'customize',
        question: 'How much can I customize my design?',
        answer:
          'Plenty. Your brand, photos, copy, and layout are all yours — we handle the parts that are proven to drive conversions.',
      },
      {
        id: 'timeline',
        question: 'How long will this take?',
        answer: 'Most sites go live within a couple of weeks of your kickoff call.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Turn your website into your best salesperson',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
