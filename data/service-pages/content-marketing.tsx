// Authored values for the Content Marketing service page (spec 037).

import { SearchLg, RefreshCcw05, Award01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const CONTENT_MARKETING: ServicePageContent = {
  slug: 'content-marketing',
  metaTitle: 'Content Marketing | Keystone',
  metaDescription:
    'Keystone plans, writes, and publishes the posts and articles that grow your search traffic and keep your business top of mind.',

  hero: {
    eyebrow: 'Content marketing',
    title: 'Content that gets you found and remembered.',
    subtitle:
      'Keystone plans, writes, and publishes the posts and articles that grow your search traffic and keep your business top of mind.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.espressoBar.src,
      alt: 'A barista pulling a shot of espresso',
      statement: 'Posts and articles, planned and published. Written to rank. Keeping you top of mind.',
      tagline: 'Content Marketing, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'Showing up takes more than a website',
    media: { image: MEDIA.productScreens.content.src, alt: 'Keystone blog post generator and content scheduler' },
    mediaSide: 'start',
    features: [
      {
        id: 'for-search',
        icon: <SearchLg />,
        title: 'Built for search',
        description: 'Every piece targets what your customers are actually searching for.',
      },
      {
        id: 'drumbeat',
        icon: <RefreshCcw05 />,
        title: 'A steady drumbeat',
        description: 'Fresh posts publish on a consistent schedule — no blank months.',
      },
      {
        id: 'your-voice',
        icon: <Award01 />,
        title: 'In your voice',
        description: 'Content sounds like you, reviewed by your team before it goes live.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Content that compounds over time',
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
        title: 'Articles that keep earning traffic for years.',
        colSpan: 2,
      },
      {
        id: 'calendar',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'metric',
        eyebrow: 'Always publishing',
        title: 'A calendar that never goes quiet.',
        caption: 'A planned, approved schedule keeps your business visible every week.',
      },
      {
        id: 'real-demand',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'search',
        eyebrow: 'Search-led',
        title: 'Topics chosen from real search demand.',
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
    title: 'Start showing up where it counts',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
