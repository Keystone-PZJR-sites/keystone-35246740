// Authored values for the Smart Re-Engagement service page (spec 037).

import { Target04, Send01, Repeat04 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const SMART_RE_ENGAGEMENT: ServicePageContent = {
  slug: 'smart-re-engagement',
  metaTitle: 'Smart Re-Engagement | Keystone',
  metaDescription:
    'Keystone spots customers who have gone quiet and reaches out at the perfect moment to bring them back.',

  hero: {
    eyebrow: 'Smart re-engagement',
    title: 'Win back the customers you already earned.',
    subtitle:
      'Keystone spots customers who have gone quiet and reaches out at the perfect moment — across email and text — to bring them back.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.bikeTireRepair.src,
      alt: 'A mechanic repairing a bicycle tire',
      statement: 'We notice when customers go quiet. Reaching out at the right moment. Win-backs that run themselves.',
      tagline: 'Smart Re-Engagement, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'Most lost customers never get a second invite',
    media: { image: MEDIA.productScreens.leads.src, alt: 'Keystone contacts pipeline highlighting customers who need attention' },
    mediaSide: 'start',
    panel: 'cream-strong',
    features: [
      {
        id: 'spot',
        icon: <Target04 />,
        title: 'Spot the drop-off',
        description: 'We identify customers slipping away before they are gone for good.',
      },
      {
        id: 'reach',
        icon: <Send01 />,
        title: 'Reach out at the right time',
        description: 'The right nudge at the right moment, across email and text.',
      },
      {
        id: 'bring-back',
        icon: <Repeat04 />,
        title: 'Bring them back',
        description: 'Win-back offers that turn quiet customers into repeat ones.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Recover revenue automatically',
    columns: 2,
    tiles: [
      {
        id: 'watching',
        background: {
          kind: 'image',
          src: MEDIA.socialProof.stills.s06.src,
          alt: 'An esthetician giving a facial treatment',
        },
        aspect: 12 / 5,
        eyebrow: 'Always watching',
        title: 'We notice when a customer goes quiet.',        colSpan: 2,
      },
      {
        id: 'timing',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'message',
        eyebrow: 'Perfect timing',
        title: 'Reach out before they are gone.',
        caption: 'Timing is everything — we catch customers at the right moment.',
      },
      {
        id: 'hands-off',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'metric',
        eyebrow: 'Hands-off',
        title: 'Win-backs that run themselves.',
        caption: 'It works quietly in the background, recovering revenue for you.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'who',
        question: 'How do you know who to contact?',
        answer: 'We track activity and flag customers whose visits have dropped off.',
      },
      {
        id: 'what',
        question: 'What do you send them?',
        answer: 'A timely, relevant message — often with an offer worth coming back for.',
      },
      {
        id: 'annoying',
        question: 'Is it annoying?',
        answer: 'No — it is well-paced, relevant, and easy to opt out of.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Bring quiet customers back',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
