// Authored values for the Maps & local search service page (spec 037).

import { MarkerPin01, Building02, Map01 } from '@untitledui/icons';
import type { ServicePageContent } from '@/design-system/patterns/services';
import { MEDIA } from '@/data/media';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const MAPS: ServicePageContent = {
  slug: 'maps',
  metaTitle: 'Maps & Local Search | Keystone',
  metaDescription:
    'Keystone gets your business showing up in Google Maps and local search — accurate, complete, and ahead of the competition.',

  hero: {
    eyebrow: 'Maps',
    title: 'Be the first business they find on the map.',
    subtitle:
      'Keystone gets your business showing up in Google Maps and local search — accurate, complete, and ahead of the competition.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.coffeeShop.src,
      alt: 'A barista brewing coffee at a café',
      statement: 'Ranked in the local map pack. Listings accurate everywhere. Every location, perfectly placed.',
      tagline: 'Maps, Optimized.',
    },
  },

  featureSection: {
    eyebrow: 'Why it works',
    title: 'If they cannot find you, they cannot book you',
    media: { image: MEDIA.productScreens.reviews.src, alt: 'Keystone listings dashboard with a Google Business Profile and locations' },
    mediaSide: 'end',
    panel: 'cream',
    features: [
      {
        id: 'own-map',
        icon: <MarkerPin01 />,
        title: 'Own the local map',
        description: 'We optimize your profile so you appear when nearby customers search.',
      },
      {
        id: 'accurate',
        icon: <Building02 />,
        title: 'Every location, accurate',
        description: 'Hours, address, and details stay correct across all of your listings.',
      },
      {
        id: 'everywhere',
        icon: <Map01 />,
        title: 'Found everywhere',
        description: 'Consistent information across the maps and directories customers use.',
      },
    ],
  },

  bento: {
    eyebrow: 'The system',
    title: 'Get found, get chosen',
    columns: 2,
    tiles: [
      {
        id: 'map-pack',
        background: {
          kind: 'image',
          src: MEDIA.scenes.storefrontStreet.src,
          alt: 'A storefront on a city street',
        },
        aspect: 12 / 5,
        eyebrow: 'Local search',
        title: 'Rank in the map pack where it counts.',        colSpan: 2,
      },
      {
        id: 'source-truth',
        background: { kind: 'solid', tone: 'ink' },
        mock: 'search',
        eyebrow: 'Always accurate',
        title: 'One source of truth for every listing.',
        caption: 'Update once and your details stay consistent everywhere.',
      },
      {
        id: 'multi-location',
        background: { kind: 'solid', tone: 'cream-strong' },
        mock: 'review',
        eyebrow: 'Multi-location',
        title: 'Every storefront, perfectly listed.',
        caption: 'Each location shows up correctly, with its own hours and details.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'ranking',
        question: 'How do you improve my ranking?',
        answer: 'We optimize your profile, keep listings consistent, and build the signals Google rewards.',
      },
      {
        id: 'locations',
        question: 'What if I have several locations?',
        answer: 'We manage each one so every storefront shows up correctly.',
      },
      {
        id: 'timeline',
        question: 'How long until I rank higher?',
        answer: 'Most businesses see movement within the first month.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  closing: {
    title: 'Get found first on the map',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
