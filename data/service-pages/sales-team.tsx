// Authored values for the Sales Team service page (spec 037).

import { Users01, LineChartUp01, CalendarCheck01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const SALES_TEAM: ServicePageContent = {
  slug: 'sales-team',
  metaTitle: 'Sales Team | Keystone',
  metaDescription:
    'Keystone gives you a trained team that works every lead — answering, following up, and booking — so your marketing turns into revenue.',

  hero: {
    eyebrow: 'Sales team',
    title: 'A full sales team, minus the payroll.',
    subtitle:
      'We give you a trained team that works every lead — answering, following up, and booking — so your marketing turns into revenue.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.woodworking.src,
      alt: 'A craftsman cutting wood on a bench saw',
      statement: 'Real people working every lead end to end, hottest first, with the next appointment as the goal.',
      tagline: 'Headcount results, without the headcount.',
    },
  },

  featureSection: {
    eyebrow: 'Leads need working',
    title: 'A lead nobody works is money left on the table',
    media: { image: MEDIA.productScreens.sales.src, alt: 'Keystone sales workspace with lead scoring and a live conversation' },
    mediaSide: 'start',
    features: [
      {
        id: 'team',
        icon: <Users01 />,
        title: 'Real people on every lead',
        description: 'Trained reps work your leads like the business is their own.',
      },
      {
        id: 'priorities',
        icon: <LineChartUp01 />,
        title: 'Hottest leads first',
        description: 'Lead scoring tells the team exactly who to prioritize.',
      },
      {
        id: 'booked',
        icon: <CalendarCheck01 />,
        title: 'Booked, not just contacted',
        description: 'The goal is always the next appointment on your calendar.',
      },
    ],
  },

  bento: {
    eyebrow: 'Done for you',
    title: 'Turn leads into booked revenue',
    columns: 2,
    tiles: [
      {
        id: 'end-to-end',
        background: {
          kind: 'image',
          src: MEDIA.scenes.bikeShop.src,
          alt: 'Mechanics servicing a bike in a bike shop',
        },
        aspect: 12 / 5,
        eyebrow: 'Done for you',
        title: 'A team that runs every lead end to end.',
        colSpan: 2,
      },
      {
        id: 'priorities',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'metric',
        eyebrow: 'Priorities first',
        title: 'The hottest leads get worked first.',
        caption: 'No more guessing who to call — the team already knows.',
      },
      {
        id: 'calendar-full',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'message',
        eyebrow: 'Calendar full',
        title: 'More booked appointments, less chasing.',
        caption: 'You focus on the work; we keep the schedule filling up.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'replace-staff',
        question: 'Do you replace my staff?',
        answer: 'We extend them — covering overflow, follow-up, and after-hours so nothing slips.',
      },
      {
        id: 'how-handled',
        question: 'How are leads handled?',
        answer: 'Every lead is contacted quickly, worked persistently, and pushed toward a booking.',
      },
      {
        id: 'personal',
        question: 'Will it feel personal?',
        answer: 'Yes — real people, in your voice, never a stiff script.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Give every lead a real sales team',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
