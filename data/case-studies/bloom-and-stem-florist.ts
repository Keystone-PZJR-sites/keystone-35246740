// Placeholder case study (spec 051). Fictional local business; original copy.
// All imagery reuses the central media registry — no new assets.

import type { CaseStudyContent } from '@/design-system/patterns/case-studies';
import { MEDIA } from '@/data/media';

export const BLOOM_AND_STEM_FLORIST: CaseStudyContent = {
  slug: 'bloom-and-stem-florist',
  metaTitle: 'Bloom & Stem tripled holiday orders | Keystone',
  metaDescription:
    'How a neighborhood florist turned its busiest weeks into its best by putting ordering, ads, and reminders on one system with Keystone.',

  card: {
    summary:
      'One system for ordering, ads, and reminders turned the holiday rush from chaos into the shop’s best season yet.',
    stats: [
      { value: '3×', label: 'holiday orders' },
      { value: '+44%', label: 'repeat customers' },
      { value: '$31k', label: 'peak-week revenue' },
    ],
    person: 'Priya Nair',
    business: 'Bloom & Stem',
    media: {
      image: MEDIA.scenes.florist.src,
      alt: 'Priya Nair arranging a bouquet at Bloom & Stem',
    },
  },

  hero: {
    eyebrow: 'Case study',
    title: 'How Bloom & Stem tripled holiday orders without the chaos',
    subtitle:
      'A neighborhood florist turned its busiest weeks of the year into its most profitable.',
    stats: [
      { value: '3×', label: 'holiday orders' },
      { value: '+44%', label: 'repeat customers' },
      { value: '$31k', label: 'peak-week revenue' },
    ],
    media: {
      image: MEDIA.scenes.florist.src,
      alt: 'Priya arranging flowers in the studio',
    },
  },

  comparison: {
    eyebrow: 'The shift',
    title: 'How their online experience changed',
    before: {
      label: 'Before Keystone',
      stats: [
        { value: '12', label: 'orders / peak day' },
        { value: '0', label: 'ads running' },
        { value: '22%', label: 'repeat rate' },
      ],
      points: [
        'Orders taken by hand on busy days',
        'No way to reach last year’s customers',
        'The website looked nothing like the shop',
      ],
    },
    after: {
      label: 'With Keystone',
      stats: [
        { value: '38', label: 'orders / peak day' },
        { value: '4', label: 'campaigns live' },
        { value: '44%', label: 'repeat rate' },
      ],
      points: [
        'Online ordering that handles the rush',
        'Ads and emails that bring buyers back',
        'A site that finally feels like Bloom & Stem',
      ],
    },
  },

  narrative: {
    blocks: [
      {
        id: 'why',
        heading: 'Why they needed to change',
        body: 'Priya’s busiest weeks were also her most stressful. Orders came in by phone and walk-in, last year’s customers were impossible to reach, and the website undersold the work in the shop.',
      },
      {
        id: 'switch',
        heading: 'What the switch looked like',
        body: 'Keystone launched a shop-true site with online ordering, set up seasonal ads, and built an email list from past buyers. Everything ran from one place, so a busy week no longer meant a scramble.',
      },
      {
        id: 'result',
        heading: 'Where they are now',
        body: 'Holiday orders tripled, nearly half of buyers come back, and the peak week set a revenue record. Priya spends her time arranging flowers, not chasing orders.',
      },
    ],
    media: {
      image: MEDIA.businesses.shopOwner.src,
      alt: 'Priya managing orders on a laptop',
    },
    mediaSide: 'end',
  },

  quote: {
    quote:
      'The holidays used to run me. This year they were our best week ever — and I still made it home for dinner.',
    attribution: 'Priya Nair, Owner — Bloom & Stem',
    results: [
      { value: '3×', label: 'holiday orders' },
      { value: '+44%', label: 'repeat customers' },
    ],
    media: {
      image: MEDIA.scenes.florist.src,
      alt: 'A finished bouquet at Bloom & Stem',
    },
  },

  closing: {
    title: 'The easiest way to grow your business online',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
