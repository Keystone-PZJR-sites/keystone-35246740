// Authored values for the Email Campaigns service page (spec 037).

import { Mail01, Target04, BarChartSquare02 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const EMAIL_CAMPAIGNS: ServicePageContent = {
  slug: 'email-campaigns',
  metaTitle: 'Email Campaigns | Keystone',
  metaDescription:
    'Keystone designs and sends the emails that keep your business top of mind — promotions, updates, and offers that drive repeat visits and real revenue.',

  hero: {
    eyebrow: 'Email campaigns',
    title: 'Turn your customer list into repeat revenue.',
    subtitle:
      'We design, write, and send the campaigns that keep you top of mind — promotions, updates, and offers that drive customers back.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.furnitureMaker.src,
      alt: 'A woodworker crafting furniture by hand',
      statement: 'Campaigns designed and sent for you, offers timed to convert, revenue you can actually measure.',
      tagline: 'Your list, finally working.',
    },
  },

  featureSection: {
    eyebrow: 'An asset, unused',
    title: 'Your customer list is your most valuable asset',
    media: { image: MEDIA.productScreens.leads.src, alt: 'Keystone contacts view with customers to re-engage' },
    mediaSide: 'end',
    features: [
      {
        id: 'done-for-you',
        icon: <Mail01 />,
        title: 'Designed and sent for you',
        description: 'We write, design, and schedule every campaign — you just approve.',
      },
      {
        id: 'right-message',
        icon: <Target04 />,
        title: 'The right offer, the right time',
        description: "Offers matched to the right customers at the moment they'll act.",
      },
      {
        id: 'drives-sales',
        icon: <BarChartSquare02 />,
        title: 'Built to drive sales',
        description: 'Every send aims at bookings and repeat revenue — not just opens.',
      },
    ],
  },

  bento: {
    eyebrow: 'How it runs',
    title: 'Repeat business, on autopilot',
    columns: 2,
    tiles: [
      {
        id: 'done',
        background: {
          kind: 'image',
          src: MEDIA.socialProof.stills.s04.src,
          alt: 'A baker working a wood-fired oven',
        },
        aspect: 12 / 5,
        eyebrow: 'Done for you',
        title: 'Campaigns planned, designed, and sent.',
        colSpan: 2,
      },
      {
        id: 'timing',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'message',
        eyebrow: 'Right time',
        title: 'Offers timed to drive action.',
        caption: 'We send when customers are most ready to act.',
      },
      {
        id: 'measurable',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'metric',
        eyebrow: 'Measurable',
        title: 'See the revenue behind every send.',
        caption: 'Every campaign ties back to real bookings and sales.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'write',
        question: 'Do I have to write the emails?',
        answer: 'No — we handle copy and design, with your approval before sending.',
      },
      {
        id: 'cadence',
        question: 'How often will you email?',
        answer: 'A sensible cadence that stays welcome and never spammy.',
      },
      {
        id: 'list',
        question: 'Whose list is it?',
        answer: "It's yours — always, and you keep it if you ever leave.",
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Turn your list into repeat revenue',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
