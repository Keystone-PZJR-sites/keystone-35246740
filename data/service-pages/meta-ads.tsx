// Authored values for the Instagram & Facebook Ads service page (spec 037).

import { Target04, MessageSmileCircle, TrendUp01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const META_ADS: ServicePageContent = {
  slug: 'meta-ads',
  metaTitle: 'Instagram & Facebook Ads | Keystone',
  metaDescription:
    'Keystone builds and runs your Instagram and Facebook ads — creative, targeting, and budget handled — to bring new local customers through the door.',

  hero: {
    eyebrow: 'Instagram & Facebook Ads',
    title: 'Turn the scroll into booked customers.',
    subtitle:
      'Keystone builds and runs your Instagram and Facebook ads — creative, targeting, and budget all handled — to bring new local customers through your door.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.nailSalon.src,
      alt: 'A nail technician working with a client',
      statement: 'Instagram and Facebook in sync. Winning creative, always tested. Every dollar tied to leads.',
      tagline: 'Instagram & Facebook Ads, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'Most social ads just burn budget',
    media: { image: MEDIA.productScreens.ads.src, alt: 'Keystone ad manager with a Facebook ad preview and cost per lead' },
    mediaSide: 'start',
    panel: 'cream-strong',
    features: [
      {
        id: 'right-people',
        icon: <Target04 />,
        title: 'Reach the right people',
        description: 'Precise local targeting puts your ad in front of likely customers, not everyone.',
      },
      {
        id: 'creative',
        icon: <MessageSmileCircle />,
        title: 'Scroll-stopping creative',
        description: 'Eye-catching ad creative and copy, made and tested for you.',
      },
      {
        id: 'performs',
        icon: <TrendUp01 />,
        title: 'Spend that performs',
        description: 'We watch cost-per-lead daily and push budget to the winning ads.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Ads built to convert',
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
        title: 'One team running both platforms in sync.',        colSpan: 2,
      },
      {
        id: 'testing',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'metric',
        eyebrow: 'Always testing',
        title: 'Winning creative gets more budget.',
        caption: 'We test variations constantly and double down on what works.',
      },
      {
        id: 'real-results',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'message',
        eyebrow: 'Real results',
        title: 'Every dollar tied to real leads.',
        caption: 'You see the customers your ads bring in, not just clicks.',
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
    title: 'Put Instagram & Facebook to work',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
