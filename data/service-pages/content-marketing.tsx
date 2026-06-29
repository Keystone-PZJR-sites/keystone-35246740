// Authored values for the Content Marketing service page (spec 037).

import { SearchLg, RefreshCcw05, Award01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const CONTENT_MARKETING: ServicePageContent = {
  slug: 'content-marketing',
  metaTitle: 'Content Marketing | Keystone',
  metaDescription:
    'Keystone plans, writes, and publishes the articles that earn lasting Google traffic — so customers keep finding you long after each post goes live.',

  hero: {
    eyebrow: 'Content marketing',
    title: 'Earn traffic that keeps paying you back.',
    subtitle:
      'We plan, write, and publish the articles that answer what your customers are searching for — and keep ranking long after they go live.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.espressoBar.src,
      alt: 'A barista pulling a shot of espresso',
      statement: 'Articles built around real search demand, published on schedule, ranking for years.',
      tagline: 'Write once. Get found for years.',
    },
  },

  featureSection: {
    eyebrow: 'Beyond a website',
    title: "A site alone won't get you found",
    media: { image: MEDIA.productScreens.content.src, alt: 'Keystone blog post generator and content scheduler' },
    mediaSide: 'start',
    features: [
      {
        id: 'for-search',
        icon: <SearchLg />,
        title: 'Aimed at real searches',
        description: 'Every piece targets what your customers actually type into Google — not guesses.',
      },
      {
        id: 'drumbeat',
        icon: <RefreshCcw05 />,
        title: 'Published like clockwork',
        description: 'Fresh articles ship on a steady schedule, so your search footprint keeps growing.',
      },
      {
        id: 'your-voice',
        icon: <Award01 />,
        title: 'In your voice, on your terms',
        description: 'Written to sound like you and approved by your team before anything publishes.',
      },
    ],
  },

  bento: {
    eyebrow: 'The compounding',
    title: 'Content that pays off for years',
    columns: 2,
    tiles: [
      {
        id: 'earns-traffic',
        background: {
          kind: 'image',
          src: MEDIA.scenes.workshopTable.src,
          alt: 'A maker working at a studio table',
        },
        aspect: 12 / 5,
        eyebrow: 'Evergreen',
        title: 'Articles that keep pulling in traffic for years.',
        colSpan: 2,
      },
      {
        id: 'calendar',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'metric',
        eyebrow: 'Always publishing',
        title: 'A schedule that never goes dark.',
        caption: 'A planned, approved calendar keeps you visible week after week.',
      },
      {
        id: 'real-demand',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'search',
        eyebrow: 'Search-led',
        title: 'Topics pulled from real Google demand.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'write',
        question: 'Do I have to write anything?',
        answer: 'No — we handle it end to end, with your approval before anything publishes.',
      },
      {
        id: 'vs-social',
        question: 'How is this different from social posts?',
        answer:
          'Social keeps you visible; content marketing earns lasting search traffic. We do both.',
      },
      {
        id: 'results',
        question: 'When will I see results?',
        answer: 'Search traffic builds over a few months and keeps compounding from there.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Get found by customers already searching',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
