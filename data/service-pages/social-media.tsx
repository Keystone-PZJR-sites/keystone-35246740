// Authored values for the Social Media service page (spec 037).

import { Calendar, MessageSmileCircle, Users01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const SOCIAL_MEDIA: ServicePageContent = {
  slug: 'social-media',
  metaTitle: 'Social Media | Keystone',
  metaDescription:
    'Keystone plans, creates, and posts to Instagram, Facebook, and TikTok in your voice — so your business stays in front of customers without you touching your phone.',

  hero: {
    eyebrow: 'Social media',
    title: 'Always posting. Never you.',
    subtitle:
      'We plan, create, and publish to Instagram, Facebook, and TikTok in your voice — so your business stays in front of customers all week long.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.artistStudio.src,
      alt: 'An artist painting in her studio',
      statement: 'A full content calendar, written in your voice, posted across every platform — handled end to end.',
      tagline: 'Consistency, without the camera roll.',
    },
  },

  featureSection: {
    eyebrow: 'The hard part',
    title: 'Consistency is what kills most accounts',
    media: { image: MEDIA.productScreens.social.src, alt: 'Keystone social media composer and content calendar' },
    mediaSide: 'start',
    features: [
      {
        id: 'calendar',
        icon: <Calendar />,
        title: 'A calendar that never goes quiet',
        description: 'A steady stream of posts scheduled across every platform — no dry spells, no scrambling.',
      },
      {
        id: 'voice',
        icon: <MessageSmileCircle />,
        title: 'Sounds exactly like you',
        description: 'Captions and creative in your voice, yours to approve before anything goes live.',
      },
      {
        id: 'grow',
        icon: <Users01 />,
        title: 'Made to get seen',
        description: 'Posts built to be saved, shared, and discovered by customers in your area.',
      },
    ],
  },

  bento: {
    eyebrow: 'How it runs',
    title: 'Social that runs while you work',
    columns: 2,
    tiles: [
      {
        id: 'one-calendar',
        background: {
          kind: 'image',
          src: MEDIA.scenes.cornerStore.src,
          alt: 'An owner behind the counter of a corner store',
        },
        aspect: 12 / 5,
        eyebrow: 'IG • FB • TikTok',
        title: 'One calendar across every platform.',
        colSpan: 2,
      },
      {
        id: 'done-for-you',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'review',
        eyebrow: 'Done for you',
        title: 'Created, scheduled, posted.',
        caption: 'From first idea to live post — handled end to end by your Keystone team.',
      },
      {
        id: 'top-of-mind',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'metric',
        eyebrow: 'Top of mind',
        title: 'Show up every week, automatically.',
        caption: 'Stay the first name customers think of — without the weekly scramble.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'camera',
        question: 'Do I have to be on camera?',
        answer: 'No — we work with what you have, and can guide simple photo and video if you want it.',
      },
      {
        id: 'platforms',
        question: 'Which platforms do you cover?',
        answer: 'Instagram, Facebook, and TikTok, tailored to where your customers actually are.',
      },
      {
        id: 'voice',
        question: 'Will it sound like me?',
        answer: 'Yes — everything is written in your voice and approved before posting.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Be everywhere your customers scroll',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
