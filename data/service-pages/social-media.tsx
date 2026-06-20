// Authored values for the Social Media service page (spec 037).

import { Calendar, MessageSmileCircle, Users01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const SOCIAL_MEDIA: ServicePageContent = {
  slug: 'social-media',
  metaTitle: 'Social Media | Keystone',
  metaDescription:
    'Keystone plans, creates, and posts to Instagram, Facebook, and TikTok — so your business stays top of mind without you touching your phone.',

  hero: {
    eyebrow: 'Social media',
    title: 'Show up everywhere your customers scroll.',
    subtitle:
      'Keystone plans, creates, and posts to Instagram, Facebook, and TikTok — so your business stays top of mind without you ever touching your phone.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.artistStudio.src,
      alt: 'An artist painting in her studio',
      statement: 'Daily posts. On-brand hashtags and mentions. Customized to your business.',
      tagline: 'Social Media, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'Posting consistently is the hard part',
    media: { image: MEDIA.productScreens.social.src, alt: 'Keystone social media composer and content calendar' },
    mediaSide: 'start',
    panel: 'cream-strong',
    features: [
      {
        id: 'calendar',
        icon: <Calendar />,
        title: 'An always-on calendar',
        description: 'A steady stream of posts scheduled across every platform — never a quiet week.',
      },
      {
        id: 'voice',
        icon: <MessageSmileCircle />,
        title: 'Content in your voice',
        description: 'Captions and creative that sound like you, approved before they go live.',
      },
      {
        id: 'grow',
        icon: <Users01 />,
        title: 'Built to grow your following',
        description: 'Posts designed to get seen, saved, and shared by your local audience.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Social that works while you work',
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
        title: 'One calendar across every platform.',        colSpan: 2,
      },
      {
        id: 'done-for-you',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'review',
        eyebrow: 'Done for you',
        title: 'Posts created, scheduled, and published.',
        caption: 'From idea to live post — handled end to end by your Keystone team.',
      },
      {
        id: 'top-of-mind',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'metric',
        eyebrow: 'Stay top of mind',
        title: 'Show up every week, automatically.',
        caption: 'Consistency keeps your business the first one customers think of.',
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
    title: 'Stay top of mind on social',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
