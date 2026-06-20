// Authored content for the redesigned /about/team leadership page (spec 042).
// The page file composes design-system sections and feeds them this data —
// nothing is hardcoded inside the components.
//
// NOTE: `backed.items` are real investors (see data/investors.ts). The investor
// `quotes` are attributed to real Keystone investors with confirmed
// affiliations; the quote wording is authored representative copy until each
// investor supplies a final approved quote. Swap the arrays for live data
// without touching a component.

import type { QuoteTile, Backer } from '@/design-system';
import { INVESTORS } from '@/data/investors';

export interface LeadershipPageContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; subtitle: string };
  team: { eyebrow: string; title: string; description: string };
  quotes: { eyebrow: string; title: string; description: string; items: QuoteTile[] };
  backed: {
    eyebrow: string;
    title: string;
    description: string;
    items: Backer[];
  };
  closing: { title: string; actionLabel: string; actionHref: string };
}

export const LEADERSHIP_PAGE: LeadershipPageContent = {
  meta: {
    title: 'Leadership & Team | Keystone',
    description:
      'Meet the engineers, marketers, and designers behind Keystone, and the investors and advisors on the journey with us.',
  },

  hero: {
    eyebrow: 'Leadership',
    title: 'Meet our leadership team',
    subtitle:
      'We\'ve spent our careers building local businesses and category-defining technology companies.',
  },

  team: {
    eyebrow: 'The team',
    title: "A small, passionate group of builders.",
    description:
      'We are a small, passionate group of builders that love what we do.',
  },

  quotes: {
    eyebrow: 'In their words',
    title: 'A bit about us',
    description: 'Perspective from some of the leaders on this journey with us.',
    items: [
      {
        id: 'q1',
        quote:
          'Keystone is automating the real economy from the ground up by giving local businesses the expertise and resources that used to be reserved for the biggest companies.',
        name: 'Adeyemi Ajao',
        role: 'Managing Partner - Base10 Partners',
      },
      {
        id: 'q2',
        quote:
          'Local is not for the faint of heart. The Keystone team is tenacious.',
        name: 'John Gleeson',
        role: 'Managing Partner - Success Venture Partners',
      },
      {
        id: 'q3',
        quote:
          'This makes a ton of sense.',
        name: 'Tanuj Thapliyal',
        role: 'Founding CEO - Spot.ai & Kos.ai',
      },
      {
        id: 'q4',
        quote:
          'I wish we had Keystone when we started launching MedSpas.',
        name: 'Praveen Ramineni',
        role: 'Founding CEO - Portrait',
      },
    ],
  },

  backed: {
    eyebrow: 'Investors',
    title: "Backed by some of the leading AI and software investors of the last 20 years.",
    description: 'The founders, operators, and investors who have supported us from the very beginning.',
    items: INVESTORS,
  },

  closing: {
    title: 'Want this team in your corner?',
    actionLabel: 'Get in touch',
    actionHref: '/get-in-touch',
  },
};
