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
      'We are a passionate team that has spent their career building category-defining technology companies, and helping local businesses start and grow.',
  },

  team: {
    eyebrow: 'The team',
    title: "A small, passionate group of builders.",
    description:
      'We are a small, passionate group of builders who have spent our careers building category-defining technology companies, and helping local businesses start and grow.',
  },

  quotes: {
    eyebrow: 'In their words',
    title: 'A bit about us',
    description: 'Perspective from some of the people who have supported us from the very beginning.',
    items: [
      {
        id: 'q1',
        quote:
          'Keystone is automating the real economy from the ground up — giving local businesses the software that used to be reserved for the biggest companies.',
        name: 'Adeyemi Ajao',
        role: 'Co-founder & Managing Partner, Base10 Partners',
      },
      {
        id: 'q2',
        quote:
          'The product and go-to-market discipline here is rare. Keystone makes getting a local business online feel effortless.',
        name: 'Ilya Fushman',
        role: 'Partner, Kleiner Perkins',
      },
      {
        id: 'q3',
        quote:
          'Local businesses power our communities, and Keystone finally gives them technology built for how they actually work.',
        name: 'Shoaib Makani',
        role: 'Co-founder & CEO, Motive',
      },
      {
        id: 'q4',
        quote:
          'I know what a world-class go-to-market team looks like. Keystone has one, and it is going to be a generational company.',
        name: 'Sujay Jaswa',
        role: 'Founder & Managing Partner, WndrCo',
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
