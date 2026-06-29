// Authored values for the Reviews service page (spec 037).

import { Star01, Globe01, RefreshCcw05 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const REVIEWS: ServicePageContent = {
  slug: 'reviews',
  metaTitle: 'Maps & Reviews | Keystone',
  metaDescription:
    'Keystone asks every happy customer for a review at the right moment and keeps your Google profile sharp — so new customers find you on the map and pick you first.',

  hero: {
    eyebrow: 'Maps & Reviews',
    title: 'More 5-star reviews, on autopilot.',
    subtitle:
      'We ask every happy customer for a review at the right moment and keep your Google profile sharp — so new customers pick you first.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.dogGrooming.src,
      alt: 'A groomer washing a dog',
      statement: 'Every happy customer asked at the right moment, your profile kept sharp, every review answered for you.',
      tagline: 'Let your reputation do the selling.',
    },
  },

  featureSection: {
    eyebrow: 'How customers decide',
    title: 'Reviews are the first thing customers check',
    media: { image: MEDIA.productScreens.reviews.src, alt: 'Keystone listings and reviews dashboard with a Google Business Profile' },
    mediaSide: 'end',
    features: [
      {
        id: 'right-moment',
        icon: <Star01 />,
        title: 'Asked at the perfect moment',
        description:
          'We request reviews right after a great experience, when customers are most likely to say yes.',
      },
      {
        id: 'win-the-click',
        icon: <Globe01 />,
        title: 'A profile that wins the click',
        description:
          'Your Google Business Profile stays complete, current, and a step ahead of the competition.',
      },
      {
        id: 'respond-all',
        icon: <RefreshCcw05 />,
        title: 'Every review answered',
        description: 'Thoughtful replies to every review — glowing or not — handled for you.',
      },
    ],
  },

  bento: {
    eyebrow: 'Your reputation',
    title: 'A reputation that sells while you sleep',
    columns: 2,
    tiles: [
      {
        id: 'around-clock',
        background: {
          kind: 'image',
          src: MEDIA.scenes.barbershop.src,
          alt: 'A barber with a client in the chair',
        },
        aspect: 12 / 5,
        eyebrow: 'Reputation engine',
        title: 'Your reviews, working around the clock.',
        colSpan: 2,
      },
      {
        id: 'every-location',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'search',
        eyebrow: 'Listings',
        title: 'Every location, one polished profile.',
        caption: 'Hours, photos, and details stay right everywhere customers look.',
      },
      {
        id: 'feedback',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'review',
        eyebrow: 'Always learning',
        title: 'Turn feedback into your next fix.',
        caption: 'Patterns in your reviews show exactly what to improve and what to lean into.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'negative',
        question: 'What about negative reviews?',
        answer:
          'We respond professionally and fast, and flag patterns so you can fix the root cause.',
      },
      {
        id: 'only-google',
        question: 'Is this just for Google?',
        answer: 'Google leads, but we keep your key listings consistent everywhere customers look.',
      },
      {
        id: 'how-many',
        question: 'How many more reviews will I get?',
        answer: 'Most businesses see a steady, ongoing lift within the first month.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Become the obvious choice in town',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
