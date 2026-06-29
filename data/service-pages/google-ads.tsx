// Authored values for the Google Ads service page (spec 037).

import { SearchLg, Target04, BarChartSquare02 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const GOOGLE_ADS: ServicePageContent = {
  slug: 'google-ads',
  metaTitle: 'Google Ads | Keystone',
  metaDescription:
    'Keystone runs your Google Ads so you show up first when local customers search for what you do — with every dollar aimed at the clicks that book.',

  hero: {
    eyebrow: 'Google Ads',
    title: 'Show up first the second they search.',
    subtitle:
      'We run your Google Ads so your business tops the results when local customers look for exactly what you offer.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.autoRepair.src,
      alt: 'A mechanic repairing a car',
      statement: 'Top of the results when intent is highest, budget aimed at the clicks that book, every dollar traced to a lead.',
      tagline: 'Be the first thing they find.',
    },
  },

  featureSection: {
    eyebrow: 'High intent',
    title: 'The best leads are already looking for you',
    media: { image: MEDIA.productScreens.ads.src, alt: 'Keystone ad manager showing campaign performance and cost per lead' },
    mediaSide: 'end',
    features: [
      {
        id: 'show-up',
        icon: <SearchLg />,
        title: 'First in line',
        description: 'Land at the top of results the moment someone searches for what you do.',
      },
      {
        id: 'intent',
        icon: <Target04 />,
        title: 'Pay only for buyers',
        description: 'We bid on the searches most likely to end in a booking — and skip the rest.',
      },
      {
        id: 'optimized',
        icon: <BarChartSquare02 />,
        title: 'Tuned daily',
        description: 'Bids and budget adjusted every day to drive your cost per lead down.',
      },
    ],
  },

  bento: {
    eyebrow: 'Where it pays',
    title: 'Search ads that pay for themselves',
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
        title: 'Catch customers at the exact moment of need.',
        colSpan: 2,
      },
      {
        id: 'efficient',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'metric',
        eyebrow: 'Lean spend',
        title: 'Budget aimed only at what converts.',
        caption: 'We cut the wasted clicks and feed the searches that book.',
      },
      {
        id: 'clear-roi',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'message',
        eyebrow: 'Clear ROI',
        title: 'See the leads behind every click.',
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
    title: 'Own the top of the search results',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
