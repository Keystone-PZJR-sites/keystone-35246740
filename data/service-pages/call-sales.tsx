// Authored values for the Call-Based Sales service page (spec 037).

import { PhoneCall01, Clock, CalendarCheck01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const CALL_SALES: ServicePageContent = {
  slug: 'call-sales',
  metaTitle: 'Call-Based Sales | Keystone',
  metaDescription:
    'Keystone answers and follows up by phone — so every caller reaches a real, helpful voice and more calls turn into booked customers.',

  hero: {
    eyebrow: 'Call-based sales',
    title: 'Never let another call go unanswered.',
    subtitle:
      'Keystone answers and follows up by phone — so every caller reaches a real, helpful voice and more calls turn into booked customers.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.barber.src,
      alt: 'A barber giving a client a haircut',
      statement: 'Every call answered. Fast callbacks on the ones you miss. Booked right on the phone.',
      tagline: 'Call-Based Sales, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'A missed call is a missed customer',
    media: { image: MEDIA.productScreens.sales.src, alt: 'Keystone workspace showing a call transcript and lead status' },
    mediaSide: 'start',
    panel: 'cream-strong',
    features: [
      {
        id: 'answered',
        icon: <PhoneCall01 />,
        title: 'Always answered',
        description: 'Callers reach a real, helpful voice instead of voicemail.',
      },
      {
        id: 'callbacks',
        icon: <Clock />,
        title: 'Fast callbacks',
        description: 'Missed a call? We follow up before the lead moves on.',
      },
      {
        id: 'booked',
        icon: <CalendarCheck01 />,
        title: 'Booked on the call',
        description: 'Conversations are guided toward the next appointment.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Make every call count',
    columns: 2,
    tiles: [
      {
        id: 'live-coverage',
        background: {
          kind: 'image',
          src: MEDIA.scenes.cafeCounter.src,
          alt: 'A cafe owner at the counter by the window',
        },
        aspect: 12 / 5,
        eyebrow: 'Live coverage',
        title: 'Real people answering your calls.',
        colSpan: 2,
      },
      {
        id: 'no-black-hole',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'message',
        eyebrow: 'No voicemail black hole',
        title: 'Missed calls get a quick callback.',
        caption: 'We reach back out fast, before the lead calls a competitor.',
      },
      {
        id: 'more-bookings',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'metric',
        eyebrow: 'More bookings',
        title: 'Conversations that end in appointments.',
        caption: 'Every call is an opportunity to fill your calendar.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'greeting',
        question: 'Do you answer in my business name?',
        answer: 'Yes — callers hear a warm greeting in your brand.',
      },
      {
        id: 'after-hours',
        question: 'What about after hours?',
        answer: 'We capture and follow up so no lead is lost overnight.',
      },
      {
        id: 'book',
        question: 'Can you book appointments?',
        answer: 'Yes — we guide callers straight to your calendar.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Answer every call, win every lead',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
