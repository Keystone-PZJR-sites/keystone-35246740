// Placeholder case study (spec 051). Fictional local business; original copy.
// All imagery reuses the central media registry — no new assets.

import type { CaseStudyContent } from '@/design-system/patterns/case-studies';
import { MEDIA } from '@/data/media';

export const NORTH_LOOP_COFFEE: CaseStudyContent = {
  slug: 'north-loop-coffee',
  metaTitle: 'North Loop Coffee grew online orders 62% | Keystone',
  metaDescription:
    'How a neighborhood café traded a patchwork of apps for one system and turned quiet weekday mornings into a steady stream of online orders.',

  card: {
    summary:
      'Switching to Keystone turned quiet weekday mornings into a steady stream of online orders — without hiring anyone new.',
    stats: [
      { value: '+62%', label: 'online orders' },
      { value: '$18k', label: 'added monthly revenue' },
      { value: '4.9★', label: 'average rating' },
    ],
    person: 'Mara Quinn',
    business: 'North Loop Coffee',
    media: {
      image: MEDIA.businesses.coffeeShop.src,
      alt: 'A barista brewing coffee at North Loop Coffee',
    },
  },

  hero: {
    eyebrow: 'Case study',
    title: 'How North Loop Coffee grew online orders 62% in one season',
    subtitle:
      'A neighborhood café traded a patchwork of apps for one system — and watched mornings get busier.',
    stats: [
      { value: '+62%', label: 'online orders' },
      { value: '$18k', label: 'added monthly revenue' },
      { value: '4.9★', label: 'average rating' },
    ],
    media: {
      image: MEDIA.scenes.cafeCounter.src,
      alt: 'Mara Quinn at the counter of North Loop Coffee',
    },
  },

  comparison: {
    eyebrow: 'The shift',
    title: 'How their online experience changed',
    before: {
      label: 'Before Keystone',
      stats: [
        { value: '3.2k', label: 'monthly visits' },
        { value: '1.4%', label: 'order rate' },
        { value: '6', label: 'tools juggled' },
      ],
      points: [
        'A slow site that buried the menu',
        'Orders scattered across three different apps',
        'No clear picture of what was actually working',
      ],
    },
    after: {
      label: 'With Keystone',
      stats: [
        { value: '9.1k', label: 'monthly visits' },
        { value: '4.8%', label: 'order rate' },
        { value: '1', label: 'place to run it' },
      ],
      points: [
        'A fast site built to turn visitors into orders',
        'Every order landing in one inbox',
        'A weekly read on exactly what to do next',
      ],
    },
  },

  narrative: {
    blocks: [
      {
        id: 'why',
        heading: 'Why they needed to change',
        body: 'North Loop had loyal regulars but a website that worked against them. The menu was hard to find on a phone, online ordering lived in a separate app, and nobody could say which channel was bringing people in.',
      },
      {
        id: 'switch',
        heading: 'What the switch looked like',
        body: 'Keystone rebuilt the site around ordering, pulled reviews and social into one place, and set up a simple weekly rhythm. Mara kept her brand and her voice — the team handled everything proven to move sales.',
      },
      {
        id: 'result',
        heading: 'Where they are now',
        body: 'Within a season, online orders were up 62% and the morning rush started earlier. Mara spends Sunday nights at home instead of reconciling three dashboards.',
      },
    ],
    media: {
      image: MEDIA.businesses.espressoBar.src,
      alt: 'A barista pulling a shot of espresso',
    },
    mediaSide: 'end',
  },

  quote: {
    quote:
      'I used to spend Sunday nights stitching together orders from three different apps. Now it just works — and I get my evenings back.',
    attribution: 'Mara Quinn, Owner — North Loop Coffee',
    results: [
      { value: '+62%', label: 'online orders' },
      { value: '8 hrs', label: 'saved each week' },
    ],
    media: {
      image: MEDIA.businesses.retailLaptop.src,
      alt: 'Mara reviewing orders on a laptop at the counter',
    },
  },

  closing: {
    title: 'The easiest way to grow your business online',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
