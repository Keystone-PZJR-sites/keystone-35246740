// Authored values for the Rebookings service page (spec 037).

import { CalendarCheck01, Clock, Repeat01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const REBOOKINGS: ServicePageContent = {
  slug: 'rebookings',
  metaTitle: 'Rebookings | Keystone',
  metaDescription:
    "Keystone reminds customers when it's time to come back and makes rebooking a single tap — so your calendar stays full without the chasing.",

  hero: {
    eyebrow: 'Rebookings',
    title: 'A calendar that fills itself.',
    subtitle:
      "We remind customers when it's time to return and make rebooking a single tap — so your schedule stays full without the chasing.",
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.bikeRepair.src,
      alt: 'A mechanic servicing a bicycle',
      statement: "Reminders timed to each customer's rhythm, rebooking down to one tap, fewer empty slots.",
      tagline: 'Goodbye gaps. Hello regulars.',
    },
  },

  featureSection: {
    eyebrow: 'Just a nudge',
    title: 'Customers mean to come back — they just forget',
    media: { image: MEDIA.productScreens.leads.src, alt: 'Keystone contacts view used to prompt repeat bookings' },
    mediaSide: 'end',
    features: [
      {
        id: 'effortless',
        icon: <CalendarCheck01 />,
        title: 'Rebooking in one tap',
        description: 'Customers get a simple prompt and book their next visit on the spot.',
      },
      {
        id: 'timed',
        icon: <Clock />,
        title: 'Timed to their rhythm',
        description: 'Reminders land right when each customer is due to return.',
      },
      {
        id: 'rhythm',
        icon: <Repeat01 />,
        title: 'A steady cadence',
        description: 'Turn one-off visits into a predictable, repeating habit.',
      },
    ],
  },

  bento: {
    eyebrow: 'Always on',
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
        answer: "By text and email, timed to each customer's visit cycle.",
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
    title: 'Keep every week booked solid',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
