// Authored values for the Rebookings service page (spec 037).

import { CalendarCheck01, Clock, Repeat01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const REBOOKINGS: ServicePageContent = {
  slug: 'rebookings',
  metaTitle: 'Rebookings | Keystone',
  metaDescription:
    'Keystone reminds customers to come back and makes rebooking effortless — so your schedule stays full without the chasing.',

  hero: {
    eyebrow: 'Rebookings',
    title: 'Fill your calendar with repeat visits.',
    subtitle:
      'Keystone reminds customers to come back and makes rebooking effortless — so your schedule stays full without the chasing.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.bikeRepair.src,
      alt: 'A mechanic servicing a bicycle',
      statement: 'Automatic reminders, right on schedule. One-tap rebooking. A calendar that fills itself.',
      tagline: 'Rebookings, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'Customers mean to come back — they just need a nudge',
    media: { image: MEDIA.productScreens.leads.src, alt: 'Keystone contacts view used to prompt repeat bookings' },
    mediaSide: 'end',
    panel: 'cream',
    features: [
      {
        id: 'effortless',
        icon: <CalendarCheck01 />,
        title: 'Effortless rebooking',
        description: 'Customers get a simple prompt to book their next visit.',
      },
      {
        id: 'timed',
        icon: <Clock />,
        title: 'Perfectly timed',
        description: 'Reminders land right when they are due to come back.',
      },
      {
        id: 'rhythm',
        icon: <Repeat01 />,
        title: 'A steady rhythm',
        description: 'Turn one-time visits into a regular, predictable cadence.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Keep your calendar full',
    columns: 2,
    tiles: [
      {
        id: 'automatic',
        background: {
          kind: 'image',
          src: MEDIA.scenes.storefrontWindow.src,
          alt: 'A boutique storefront window',
        },
        aspect: 12 / 5,
        eyebrow: 'Automatic',
        title: 'Reminders that bring customers back on schedule.',
        colSpan: 2,
      },
      {
        id: 'one-tap',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'message',
        eyebrow: 'One tap',
        title: 'Rebooking made effortless.',
        caption: 'Customers book their next visit in a single step.',
      },
      {
        id: 'fewer-gaps',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'metric',
        eyebrow: 'Fewer gaps',
        title: 'A fuller, steadier calendar.',
        caption: 'Less downtime, more booked appointments.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'how',
        question: 'How do reminders go out?',
        answer: 'By text and email, timed to each customer\u2019s visit cycle.',
      },
      {
        id: 'bug',
        question: 'Will it bug my customers?',
        answer: 'No — helpful, well-timed, and easy to opt out of.',
      },
      {
        id: 'system',
        question: 'Does it work with my booking system?',
        answer: 'We fit your existing flow so rebooking is one easy step.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Keep your calendar full',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
