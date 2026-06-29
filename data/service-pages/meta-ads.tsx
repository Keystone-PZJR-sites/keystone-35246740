// Authored values for the Instagram & Facebook Ads service page (spec 037).

import { Target04, MessageSmileCircle, TrendUp01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const META_ADS: ServicePageContent = {
  slug: 'meta-ads',
  metaTitle: 'Instagram & Facebook Ads | Keystone',
  metaDescription:
    'Keystone builds and runs your Instagram and Facebook ads — creative, targeting, and budget handled — to turn the scroll into booked local customers.',

  hero: {
    eyebrow: 'Instagram & Facebook Ads',
    title: 'Turn the scroll into booked customers.',
    subtitle:
      'We build, target, and run your Instagram and Facebook ads — creative and budget handled — to bring new local customers through your door.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.nailSalon.src,
      alt: 'A nail technician working with a client',
      statement: 'Instagram and Facebook in lockstep, creative tested until it wins, every dollar traced to a real lead.',
      tagline: 'Make the scroll stop on you.',
    },
  },

  featureSection: {
    eyebrow: 'Stop the scroll',
    title: 'Most social ads just light money on fire',
    media: { image: MEDIA.productScreens.ads.src, alt: 'Keystone ad manager with a Facebook ad preview and cost per lead' },
    mediaSide: 'start',
    features: [
      {
        id: 'right-people',
        icon: <Target04 />,
        title: 'In front of the right people',
        description: 'Tight local targeting puts your ad before likely customers — not the whole internet.',
      },
      {
        id: 'creative',
        icon: <MessageSmileCircle />,
        title: 'Creative that stops the scroll',
        description: 'Eye-catching ads and copy, made and tested so people actually stop.',
      },
      {
        id: 'performs',
        icon: <TrendUp01 />,
        title: 'Budget that chases winners',
        description: 'We watch cost per lead daily and move spend to the ads that perform.',
      },
    ],
  },

  bento: {
    eyebrow: 'How we win',
    title: 'Ads built to book, not just to be seen',
    columns: 2,
    tiles: [
      {
        id: 'both-platforms',
        background: {
          kind: 'image',
          src: MEDIA.scenes.florist.src,
          alt: 'A florist arranging a bouquet',
        },
        aspect: 12 / 5,
        eyebrow: 'Instagram + Facebook',
        title: 'One team running both platforms in sync.',
        colSpan: 2,
      },
      {
        id: 'testing',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'metric',
        eyebrow: 'Always testing',
        title: 'Winners get the budget.',
        caption: "We test variations constantly and double down on what's working.",
      },
      {
        id: 'real-results',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'message',
        eyebrow: 'Real results',
        title: 'Every dollar traced to a real lead.',
        caption: 'You see the customers your ads bring in — not just clicks.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'creative',
        question: 'Do you create the ads?',
        answer: 'Yes — creative, copy, and targeting are all handled by your Keystone team.',
      },
      {
        id: 'budget',
        question: 'What budget do I need?',
        answer: "We start where you're comfortable and scale as the results prove out.",
      },
      {
        id: 'timeline',
        question: 'How soon will I see leads?',
        answer: 'Most campaigns start producing leads within the first week.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Put Instagram and Facebook to work',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
