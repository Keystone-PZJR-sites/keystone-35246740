// Authored values for the Email Campaigns service page (spec 037).

import { Mail01, Target04, BarChartSquare02 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const EMAIL_CAMPAIGNS: ServicePageContent = {
  slug: 'email-campaigns',
  metaTitle: 'Email Campaigns | Keystone',
  metaDescription:
    'Keystone designs and sends the emails that keep your business top of mind — promotions, updates, and offers that drive repeat visits.',

  hero: {
    eyebrow: 'Email campaigns',
    title: 'Email that brings customers back.',
    subtitle:
      'Keystone designs and sends the emails that keep your business top of mind — promotions, updates, and offers that drive repeat visits.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.furnitureMaker.src,
      alt: 'A woodworker crafting furniture by hand',
      statement: 'Campaigns planned, designed, and sent. Offers timed to convert. Revenue you can measure.',
      tagline: 'Email Campaigns, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'Your customer list is an asset you are not using',
    media: { image: MEDIA.productScreens.leads.src, alt: 'Keystone contacts view with customers to re-engage' },
    mediaSide: 'end',
    panel: 'cream',
    features: [
      {
        id: 'done-for-you',
        icon: <Mail01 />,
        title: 'Done-for-you sends',
        description: 'We design, write, and schedule every campaign for you.',
      },
      {
        id: 'right-message',
        icon: <Target04 />,
        title: 'The right message',
        description: 'Offers matched to the right customers at the right time.',
      },
      {
        id: 'drives-sales',
        icon: <BarChartSquare02 />,
        title: 'Built to drive sales',
        description: 'Every send aims at bookings and repeat revenue, not just opens.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Repeat business on autopilot',
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
        title: 'Campaigns planned, designed, and sent.',        colSpan: 2,
      },
      {
        id: 'timing',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'message',
        eyebrow: 'Right time',
        title: 'Offers timed to drive action.',
        caption: 'We send when customers are most likely to act.',
      },
      {
        id: 'measurable',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'metric',
        eyebrow: 'Measurable',
        title: 'See the revenue each send brings.',
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
    title: 'Turn your list into revenue',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
