// Authored values for the Loyalty & Rewards service page (spec 037).

import { Gift01, Heart, TrendUp01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const LOYALTY_REWARDS: ServicePageContent = {
  slug: 'loyalty-rewards',
  metaTitle: 'Loyalty & Rewards | Keystone',
  metaDescription:
    'Keystone runs a loyalty program that rewards repeat customers and turns your best ones into regulars who spend more and refer their friends.',

  hero: {
    eyebrow: 'Loyalty & rewards',
    title: 'Give your regulars a reason to stay.',
    subtitle:
      'We run a loyalty program that rewards repeat customers and turns your best ones into lifelong regulars.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.shipping.src,
      alt: 'A small-business owner packing a shipment',
      statement: 'Rewards customers actually want, running in the background, more value from every regular.',
      tagline: 'Reward the customers worth keeping.',
    },
  },

  featureSection: {
    eyebrow: 'The math',
    title: 'Keeping a customer costs far less than finding one',
    media: { image: MEDIA.productScreens.leads.src, alt: 'Keystone contacts view tracking loyal repeat customers' },
    mediaSide: 'start',
    features: [
      {
        id: 'rewards',
        icon: <Gift01 />,
        title: 'Rewards they actually want',
        description: 'Points and perks that give customers a real reason to come back.',
      },
      {
        id: 'loyalty',
        icon: <Heart />,
        title: 'Loyalty that sticks',
        description: 'Turn happy customers into regulars who keep choosing you.',
      },
      {
        id: 'ltv',
        icon: <TrendUp01 />,
        title: 'More from every customer',
        description: 'More visits, bigger orders, and longer relationships.',
      },
    ],
  },

  bento: {
    eyebrow: 'How it runs',
    title: 'Turn customers into regulars',
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
        title: 'Rewards that keep customers coming back.',
        colSpan: 2,
      },
      {
        id: 'effortless',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'product',
        eyebrow: 'Hands-off',
        title: 'Runs in the background for you.',
        caption: 'We set it up and run it — nothing extra on your plate.',
      },
      {
        id: 'more-value',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'metric',
        eyebrow: 'More value',
        title: 'Higher lifetime value per customer.',
        caption: 'Loyal customers spend more and bring their friends.',
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
    title: 'Turn your best customers into regulars',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
