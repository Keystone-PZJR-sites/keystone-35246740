// Placeholder case study (spec 051). Fictional local business; original copy.
// All imagery reuses the central media registry — no new assets.

import type { CaseStudyContent } from '@/design-system/patterns/case-studies';
import { MEDIA } from '@/data/media';

export const CEDAR_AND_CO_BARBERSHOP: CaseStudyContent = {
  slug: 'cedar-and-co-barbershop',
  metaTitle: 'Cedar & Co. cut no-shows in half | Keystone',
  metaDescription:
    'How a two-chair barbershop filled its calendar, halved no-shows, and stopped answering the phone all day by moving booking and reminders onto Keystone.',

  card: {
    summary:
      'Online booking and automatic reminders filled the calendar and cut no-shows in half — so the chairs stay busy.',
    stats: [
      { value: '2×', label: 'more bookings' },
      { value: '−51%', label: 'no-shows' },
      { value: '320', label: 'new reviews' },
    ],
    person: 'Devon Pierce',
    business: 'Cedar & Co. Barbershop',
    media: {
      image: MEDIA.businesses.barber.src,
      alt: 'A barber giving a client a haircut at Cedar & Co.',
    },
  },

  hero: {
    eyebrow: 'Case study',
    title: 'How Cedar & Co. doubled bookings and cut no-shows in half',
    subtitle:
      'A two-chair barbershop stopped answering the phone all day and let the calendar fill itself.',
    stats: [
      { value: '2×', label: 'more bookings' },
      { value: '−51%', label: 'no-shows' },
      { value: '320', label: 'new reviews' },
    ],
    media: {
      image: MEDIA.scenes.barbershop.src,
      alt: 'Devon Pierce with a client in the chair',
    },
  },

  comparison: {
    eyebrow: 'The shift',
    title: 'How their online experience changed',
    before: {
      label: 'Before Keystone',
      stats: [
        { value: '40%', label: 'chairs idle' },
        { value: '18%', label: 'no-show rate' },
        { value: '30+', label: 'calls a day' },
      ],
      points: [
        'Booking meant a phone call during a haircut',
        'No reminders, so clients forgot',
        'Reviews trickled in once in a while',
      ],
    },
    after: {
      label: 'With Keystone',
      stats: [
        { value: '92%', label: 'chairs booked' },
        { value: '9%', label: 'no-show rate' },
        { value: '0', label: 'phone tag' },
      ],
      points: [
        'Clients book in seconds from their phone',
        'Automatic reminders keep the calendar full',
        'A steady stream of five-star reviews',
      ],
    },
  },

  narrative: {
    blocks: [
      {
        id: 'why',
        heading: 'Why they needed to change',
        body: 'Devon was great with clippers and buried by logistics. Every booking interrupted a cut, no-shows left gaps in the day, and the shop barely showed up on Google when someone searched nearby.',
      },
      {
        id: 'switch',
        heading: 'What the switch looked like',
        body: 'Keystone set up online booking, automatic text reminders, and a steady review request after every visit. The shop’s listing got a refresh so new clients could find it and book without a single call.',
      },
      {
        id: 'result',
        heading: 'Where they are now',
        body: 'Bookings doubled, no-shows fell by half, and the second chair pays for itself. Devon spends the day cutting hair instead of managing a calendar.',
      },
    ],
    media: {
      image: MEDIA.businesses.hairSalon.src,
      alt: 'A stylist finishing a client’s cut',
    },
    mediaSide: 'start',
  },

  quote: {
    quote:
      'My phone used to ring all day. Now the calendar fills itself and people actually show up. I just cut hair.',
    attribution: 'Devon Pierce, Owner — Cedar & Co. Barbershop',
    results: [
      { value: '2×', label: 'more bookings' },
      { value: '−51%', label: 'no-shows' },
    ],
    media: {
      image: MEDIA.scenes.barbershop.src,
      alt: 'The chairs at Cedar & Co. Barbershop',
    },
  },

  closing: {
    title: 'The easiest way to grow your business online',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
