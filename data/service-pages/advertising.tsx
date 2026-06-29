// Authored values for the Advertising service page (spec 037).

import { TrendUp01, Globe01, Zap } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const ADVERTISING: ServicePageContent = {
  slug: 'advertising',
  metaTitle: 'Advertising | Keystone',
  metaDescription:
    'Keystone runs your Google and social ads end to end — built, targeted, and optimized to turn local attention into booked, paying customers.',

  hero: {
    eyebrow: 'Advertising',
    title: 'Ads that bring in customers, not just clicks.',
    subtitle:
      'Keystone runs your Google and social ads end to end — built, targeted, and optimized to turn local attention into booked, paying customers.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.furnitureShowroom.src,
      alt: 'A salesperson helping customers in a furniture showroom',
      statement: 'Google and social ads. Built, targeted, and tested. Tuned to your budget.',
      tagline: 'Advertising, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'Stop guessing what your ads are doing',
    media: { image: MEDIA.productScreens.ads.src, alt: 'Keystone ad campaign manager with cost-per-lead and targeting' },
    mediaSide: 'end',
    features: [
      {
        id: 'spend-pays',
        icon: <TrendUp01 />,
        title: 'Spend that pays for itself',
        description:
          'We watch cost-per-lead daily and shift budget to whatever is winning, so your money chases results.',
      },
      {
        id: 'local-reach',
        icon: <Globe01 />,
        title: 'Reach the right neighborhood',
        description:
          'Hyper-local targeting puts you in front of the people most likely to walk in or order.',
      },
      {
        id: 'live-fast',
        icon: <Zap />,
        title: 'Live in days, not months',
        description:
          'Creative, copy, and targeting are handled for you — campaigns launch fast and improve every week.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Advertising that compounds',
    columns: 2,
    tiles: [
      {
        id: 'every-platform',
        background: {
          kind: 'image',
          src: MEDIA.socialProof.stills.s02.src,
          alt: 'A business owner on the phone at her laptop',
        },
        aspect: 12 / 5,
        eyebrow: 'Meta + Google',
        title: 'One team running every ad platform in sync.',        colSpan: 2,
      },
      {
        id: 'optimizing',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'metric',
        eyebrow: 'Always optimizing',
        title: 'Budget that follows what is working.',
        caption: 'We move spend toward your best-performing ads automatically, week after week.',
      },
      {
        id: 'visibility',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'message',
        eyebrow: 'Full visibility',
        title: 'See every lead an ad brings in.',
        caption: 'Each campaign is tied to real leads and bookings — not vanity metrics.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'budget',
        question: 'How much should I spend on ads?',
        answer:
          "We start where your budget is comfortable and scale up only as the numbers prove out — you're never locked in.",
      },
      {
        id: 'creative',
        question: 'Do you make the ad creative?',
        answer: 'Yes. Copy, images, and targeting are all handled by your Keystone team.',
      },
      {
        id: 'timeline',
        question: 'How soon will I see leads?',
        answer: 'Most campaigns start producing leads within the first week of going live.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Put your ad budget to work today',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
