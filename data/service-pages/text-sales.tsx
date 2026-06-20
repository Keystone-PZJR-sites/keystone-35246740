// Authored values for the Text-Based Sales service page (spec 037).

import { MessageChatCircle, MessageTextSquare01, Repeat04 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const TEXT_SALES: ServicePageContent = {
  slug: 'text-sales',
  metaTitle: 'Text-Based Sales | Keystone',
  metaDescription:
    'Keystone follows up with every lead by text within minutes — friendly, fast, and in your voice — so more conversations turn into bookings.',

  hero: {
    eyebrow: 'Text-based sales',
    title: 'Close more customers right from their texts.',
    subtitle:
      'Keystone follows up with every lead by text within minutes — friendly, fast, and in your voice — so more conversations turn into bookings.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.hairSalon.src,
      alt: "A stylist washing a client's hair",
      statement: 'Meet customers by text. Replies in minutes, day or night. Every message followed up.',
      tagline: 'Text-Based Sales, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'Customers reply to texts, not voicemails',
    media: { image: MEDIA.productScreens.sales.src, alt: 'Keystone messaging workspace with a live text conversation' },
    mediaSide: 'end',
    panel: 'cream',
    features: [
      {
        id: 'reply-fast',
        icon: <MessageChatCircle />,
        title: 'Reply in minutes',
        description: 'New leads get a text back fast, while they are still paying attention.',
      },
      {
        id: 'on-brand',
        icon: <MessageTextSquare01 />,
        title: 'Natural and on-brand',
        description: 'Messages written in your voice, with a real person ready to step in.',
      },
      {
        id: 'persistent',
        icon: <Repeat04 />,
        title: 'Persistent follow-up',
        description: 'Friendly nudges keep the conversation going until they book.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Win the conversation by text',
    columns: 2,
    tiles: [
      {
        id: 'sms-first',
        background: {
          kind: 'image',
          src: MEDIA.scenes.deliveryVan.src,
          alt: 'A driver making a delivery',
        },
        aspect: 12 / 5,
        eyebrow: 'SMS-first',
        title: 'Meet customers in the channel they prefer.',
        colSpan: 2,
      },
      {
        id: 'fast',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'metric',
        eyebrow: 'Fast',
        title: 'Replies in minutes, day or night.',
        caption: 'Speed is what turns a curious lead into a booked one.',
      },
      {
        id: 'never-dropped',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'message',
        eyebrow: 'Never dropped',
        title: 'Every text gets a follow-up.',
        caption: 'Quiet threads are nudged back to life automatically.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'automated',
        question: 'Will it sound automated?',
        answer: 'No — texts are written in your voice, and a real person handles anything nuanced.',
      },
      {
        id: 'hours',
        question: 'What hours are covered?',
        answer: 'Around the clock, so late-night leads still get a fast reply.',
      },
      {
        id: 'opt-out',
        question: 'Can customers opt out?',
        answer: 'Always — every message makes opting out simple.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Turn texts into customers',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
