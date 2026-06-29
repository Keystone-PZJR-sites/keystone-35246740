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
    'Keystone builds your website to drive sales — proven design that grows your Google traffic, converts more visitors, and beats your competition.',

  hero: {
    eyebrow: 'Websites',
    title: 'Websites built for sales first, style second.',
    subtitle:
      'Keystone builds your site to drive sales. Our proven design grows your Google traffic, converts more visitors, and beats your competition.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.shopOwner.src,
      alt: 'A shop owner managing her business on a laptop',
      statement: 'Built to sell, not just to look good. Growing your search traffic. Turning visitors into customers.',
      tagline: 'Websites, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'Your website could be driving more sales',
    media: { image: MEDIA.productScreens.web.src, alt: 'Keystone website management dashboard' },
    mediaSide: 'start',
    features: [
      {
        id: 'proven-design',
        icon: <Award01 />,
        title: 'Upgrade to our proven design',
        description:
          'Thousands of local businesses trust Keystone. We know exactly how to design sites that drive more bookings and orders.',
      },
      {
        id: 'google-loves',
        icon: <SearchLg />,
        title: 'Built so Google loves you',
        description:
          "We've analyzed the algorithm and build your site with world-class SEO that earns top rankings.",
      },
      {
        id: 'always-better',
        icon: <RefreshCcw05 />,
        title: 'A website that keeps getting better',
        description:
          'We never stop studying what converts. When we learn something new, we add it to your site right away.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: "A website that's built to grow your business",
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
        eyebrow: 'AI SEO',
        title: 'We use AI to grow your SEO and Google traffic.',
        colSpan: 2,
      },
      {
        id: 'ordering',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'product',
        eyebrow: 'Online ordering built in',
        title: 'A great ordering experience that grows online sales.',
      },
      {
        id: 'best-practices',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'metric',
        eyebrow: 'Never stops improving',
        title: "You'll always get the latest best practices.",
        caption: 'Every improvement we learn ships to your site automatically — no rebuilds, no extra cost.',
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
    title: 'The easiest way to grow your business online',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
