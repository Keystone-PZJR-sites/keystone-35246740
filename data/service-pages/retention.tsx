// Authored values for the Retention service page (spec 037).

import { RefreshCcw05, Star01, LineChartUp01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const RETENTION: ServicePageContent = {
  slug: 'retention',
  metaTitle: 'Retention | Keystone',
  metaDescription:
    'Keystone brings past customers back with timely email, texts, and offers — so your best growth comes from people who already love you.',

  hero: {
    eyebrow: 'Retention',
    title: 'Turn one-time customers into regulars.',
    subtitle:
      'Keystone brings past customers back with timely email, texts, and offers — so your best growth comes from people who already love you.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.pilatesStudio.src,
      alt: 'An instructor leading a pilates class',
      statement: 'Email and text that bring people back. Offers timed just right. Loyalty that runs itself.',
      tagline: 'Retention, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'Your next sale is a customer you already have',
    media: { image: MEDIA.productScreens.leads.src, alt: 'Keystone contacts pipeline showing customers to re-engage' },
    mediaSide: 'end',
    panel: 'cream',
    features: [
      {
        id: 'win-back',
        icon: <RefreshCcw05 />,
        title: 'Win back quiet customers',
        description:
          'We spot customers who have gone quiet and bring them back with the right message.',
      },
      {
        id: 'reward',
        icon: <Star01 />,
        title: 'Reward loyalty',
        description: 'Offers and rewards that give regulars a reason to keep choosing you.',
      },
      {
        id: 'repeat-revenue',
        icon: <LineChartUp01 />,
        title: 'Grow repeat revenue',
        description: 'Email and text campaigns that turn one visit into many.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Keep customers coming back',
    columns: 2,
    tiles: [
      {
        id: 'bring-back',
        background: {
          kind: 'image',
          src: MEDIA.scenes.petGroom.src,
          alt: 'A dog at a pet grooming studio',
        },
        aspect: 12 / 5,
        eyebrow: 'Email + text',
        title: 'Messages that bring people back.',
        colSpan: 2,
      },
      {
        id: 'offers',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'message',
        eyebrow: 'Perfect timing',
        title: 'Offers timed to the perfect moment.',
      },
      {
        id: 'loyalty',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'product',
        eyebrow: 'Hands-off',
        title: 'Loyalty that runs itself.',
        caption: 'Rewards and re-engagement keep working in the background, automatically.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'annoy',
        question: 'Will this annoy my customers?',
        answer:
          'No — we keep it relevant and well-paced, and every message is easy to opt out of.',
      },
      {
        id: 'channels',
        question: 'Do you handle email and texts?',
        answer: 'Both, plus the offers and timing behind them.',
      },
      {
        id: 'results',
        question: 'What results should I expect?',
        answer: 'More repeat visits and a steady lift in revenue from existing customers.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Bring your customers back for more',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
