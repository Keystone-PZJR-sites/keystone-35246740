// Authored values for the Loyalty & Rewards service page (spec 037).

import { Gift01, Heart, TrendUp01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const LOYALTY_REWARDS: ServicePageContent = {
  slug: 'loyalty-rewards',
  metaTitle: 'Loyalty & Rewards | Keystone',
  metaDescription:
    'Keystone runs a loyalty program that rewards repeat customers and turns your best ones into lifelong fans.',

  hero: {
    eyebrow: 'Loyalty & rewards',
    title: 'Give your regulars a reason to stay.',
    subtitle:
      'Keystone runs a loyalty program that rewards repeat customers and turns your best ones into lifelong fans.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.shipping.src,
      alt: 'A small-business owner packing a shipment',
      statement: 'Rewards that bring regulars back. Running in the background. More value per customer.',
      tagline: 'Loyalty & Rewards, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'It costs less to keep a customer than to find one',
    media: { image: MEDIA.productScreens.leads.src, alt: 'Keystone contacts view tracking loyal repeat customers' },
    mediaSide: 'start',
    features: [
      {
        id: 'rewards',
        icon: <Gift01 />,
        title: 'Rewards they actually want',
        description: 'Points and perks that give customers a reason to return.',
      },
      {
        id: 'loyalty',
        icon: <Heart />,
        title: 'Build real loyalty',
        description: 'Turn happy customers into devoted, repeat regulars.',
      },
      {
        id: 'ltv',
        icon: <TrendUp01 />,
        title: 'Grow lifetime value',
        description: 'More visits, bigger baskets, and longer relationships.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Turn customers into fans',
    columns: 2,
    tiles: [
      {
        id: 'program',
        background: {
          kind: 'image',
          src: MEDIA.scenes.bikeService.src,
          alt: 'A mechanic servicing a bicycle',
        },
        aspect: 12 / 5,
        eyebrow: 'Loyalty program',
        title: 'Rewards that keep customers coming back.',        colSpan: 2,
      },
      {
        id: 'effortless',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'product',
        eyebrow: 'Effortless',
        title: 'Runs in the background for you.',
        caption: 'We set it up and run it — no extra work on your plate.',
      },
      {
        id: 'more-value',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'metric',
        eyebrow: 'More value',
        title: 'Higher lifetime value per customer.',
        caption: 'Loyal customers spend more and refer their friends.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'hard',
        question: 'Is a loyalty program hard to run?',
        answer: 'No — we set it up and run it, so it works without extra effort from you.',
      },
      {
        id: 'rewards',
        question: 'What kind of rewards?',
        answer: 'Points, perks, and offers tailored to your business and customers.',
      },
      {
        id: 'repeat',
        question: 'Will it actually drive repeat visits?',
        answer: 'Yes — rewards give customers a concrete reason to choose you again.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Reward your best customers',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
