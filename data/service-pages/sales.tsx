// Authored values for the Sales service page (spec 037).

import { Zap, LineChartUp01, RefreshCcw05 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const SALES: ServicePageContent = {
  slug: 'sales',
  metaTitle: 'Sales | Keystone',
  metaDescription:
    'Keystone follows up with every lead by text and call within minutes — so the customers your marketing earns actually book.',

  hero: {
    eyebrow: 'Sales',
    title: 'A sales team that never lets a lead go cold.',
    subtitle:
      'Keystone follows up with every lead by text and call within minutes — so the customers your marketing earns actually book.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.retailLaptop.src,
      alt: 'A retail owner working on a laptop at the counter',
      statement: 'Every lead worked in minutes. Text and call follow-up. Nothing left to go cold.',
      tagline: 'Sales, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'Most leads never get a second touch',
    media: { image: MEDIA.productScreens.sales.src, alt: 'Keystone sales conversation with lead scoring and follow-up' },
    mediaSide: 'start',
    panel: 'cream-strong',
    features: [
      {
        id: 'reply-fast',
        icon: <Zap />,
        title: 'Reply in minutes, every time',
        description:
          'We respond to new leads instantly by text and call, while they are still paying attention.',
      },
      {
        id: 'who-is-ready',
        icon: <LineChartUp01 />,
        title: 'Know who is ready to buy',
        description:
          'Every lead is scored by intent, so the hottest prospects get a human touch first.',
      },
      {
        id: 'no-lead-left',
        icon: <RefreshCcw05 />,
        title: 'No lead left behind',
        description:
          'Automated, personal follow-up keeps nudging quiet leads until they book or opt out.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Turn interest into booked customers',
    columns: 2,
    tiles: [
      {
        id: 'one-thread',
        background: {
          kind: 'image',
          src: MEDIA.socialProof.stills.s05.src,
          alt: 'A focused business owner at work',
        },
        aspect: 12 / 5,
        eyebrow: 'Text + call + chat',
        title: 'Every conversation with a lead in one place.',
        colSpan: 2,
      },
      {
        id: 'scoring',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'metric',
        eyebrow: 'Lead scoring',
        title: 'Know exactly who to call first.',
        caption: 'Intent signals flag the hottest leads so nothing high-value waits.',
      },
      {
        id: 'auto-followup',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'message',
        eyebrow: 'Always following up',
        title: 'Follow-up that runs on its own.',
        caption: 'Personal, well-timed nudges keep working long after the first reply.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'robot',
        question: 'Will it sound like a robot?',
        answer:
          'No — messages are written in your voice, and a real person steps in the moment a lead needs one.',
      },
      {
        id: 'front-desk',
        question: 'Do you replace my front desk?',
        answer: 'We back them up — handling overflow and after-hours so nothing slips through.',
      },
      {
        id: 'speed',
        question: 'How fast is follow-up?',
        answer: 'Within minutes, day or night.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Never miss another lead',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
