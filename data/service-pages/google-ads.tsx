// Authored values for the Google Ads service page (spec 037).

import { SearchLg, Target04, BarChartSquare02 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const GOOGLE_ADS: ServicePageContent = {
  slug: 'google-ads',
  metaTitle: 'Google Ads | Keystone',
  metaDescription:
    'Keystone runs your Google Ads so your business shows up first when local customers search for exactly what you offer.',

  hero: {
    eyebrow: 'Google Ads',
    title: 'Be there the moment they search.',
    subtitle:
      'Keystone runs your Google Ads so your business shows up first when local customers search for exactly what you offer.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.autoRepair.src,
      alt: 'A mechanic repairing a car',
      statement: 'Top of search when they look. Budget aimed at what converts. Every click tied to a lead.',
      tagline: 'Google Ads, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'Capture customers with high intent',
    media: { image: MEDIA.productScreens.ads.src, alt: 'Keystone ad manager showing campaign performance and cost per lead' },
    mediaSide: 'end',
    features: [
      {
        id: 'show-up',
        icon: <SearchLg />,
        title: 'Show up on the search',
        description: 'Appear at the top of results when customers search for what you do.',
      },
      {
        id: 'intent',
        icon: <Target04 />,
        title: 'Only pay for intent',
        description: 'We target the searches most likely to become paying customers.',
      },
      {
        id: 'optimized',
        icon: <BarChartSquare02 />,
        title: 'Optimized every day',
        description: 'Bids and budget tuned continuously to lower your cost per lead.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Search ads that pay back',
    columns: 2,
    tiles: [
      {
        id: 'high-intent',
        background: {
          kind: 'image',
          src: MEDIA.scenes.ownerCall.src,
          alt: 'A business owner taking a call by the window',
        },
        aspect: 12 / 5,
        eyebrow: 'High intent',
        title: 'Catch customers at the moment of need.',        colSpan: 2,
      },
      {
        id: 'efficient',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'metric',
        eyebrow: 'Efficient spend',
        title: 'Budget aimed at what converts.',
        caption: 'We cut the wasted clicks and feed what works.',
      },
      {
        id: 'clear-roi',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'message',
        eyebrow: 'Clear ROI',
        title: 'See the leads every click brings.',
        caption: 'Each campaign ties straight to real bookings.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'vs-social',
        question: 'How is this different from social ads?',
        answer:
          'Google catches people actively searching; social builds awareness. Many businesses do both.',
      },
      {
        id: 'waste',
        question: 'Will I waste money on clicks?',
        answer: 'We target high-intent searches and filter out the rest to protect your budget.',
      },
      {
        id: 'speed',
        question: 'How fast are results?',
        answer: 'Search ads can bring leads within days of going live.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Win the search results',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
