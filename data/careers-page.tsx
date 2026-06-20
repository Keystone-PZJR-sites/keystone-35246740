// Authored content for the redesigned /about/careers page (spec 041).
// The page file composes design-system sections and feeds them this data —
// nothing is hardcoded inside the components. Collage / value tiles carry small
// icon glyphs (data-as-content, the same .tsx pattern as the service / pricing /
// how-it-works pages).
//
// NOTE: `backers` are real investors (see data/investors.ts) and `stories`
// pair real teammates — names, roles, and portraits from the media registry —
// with representative SAMPLE quote copy, authored by explicit instruction until
// real testimonials exist. Swap the arrays for live data without touching a
// component.

import {
  Users01,
  TrendUp01,
  Star01,
  Globe01,
  Heart,
  Zap,
  Target04,
  RefreshCcw05,
} from '@untitledui/icons';
import type { FeatureItem, QuoteTile, Backer } from '@/design-system';
import type { CollageTile } from '@/design-system/patterns/careers';
import { MEDIA } from '@/data/media';
import { INVESTORS } from '@/data/investors';

export interface CareersAction {
  label: string;
  href: string;
}

export interface CareersPageContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: CareersAction;
    secondary: CareersAction;
  };
  collage: CollageTile[];
  team: { eyebrow: string; title: string; description: string };
  stories: { eyebrow: string; title: string; description: string; items: QuoteTile[] };
  values: { eyebrow: string; title: string; description: string; items: FeatureItem[] };
  valuesBand: {
    eyebrow: string;
    title: string;
    description: string;
    actionLabel: string;
    actionHref: string;
  };
  backers: { eyebrow: string; title: string; description: string; items: Backer[] };
  roles: { eyebrow: string; title: string; description: string };
  closing: { title: string; actionLabel: string; actionHref: string };
}

/** Where the hero's "View open roles" CTA jumps to. */
export const CAREERS_ROLES_ANCHOR = 'open-roles';

export const CAREERS_PAGE: CareersPageContent = {
  meta: {
    title: 'Careers | Keystone',
    description:
      'Join Keystone and help great local businesses succeed in a competitive world. We are building the growth engine independent operators never had.',
  },

  hero: {
    eyebrow: 'Careers',
    title: 'Help great local businesses succeed in a competitive world',
    subtitle:
      "We're building the automated sales and marketing team every independent business needs to succeed in the hypercompetitive local internet. Keystone does the work and owns the results, helping millions of entrepeneurs along the way. Come build it with us.",
    primary: { label: 'View open roles', href: `#${CAREERS_ROLES_ANCHOR}` },
    secondary: { label: 'Meet the team', href: '/about/team' },
  },

  collage: [
    {
      id: 'eng',
      label: 'Engineering',
      icon: <Zap aria-hidden="true" />,
      tone: 'brand',
      image: MEDIA.careers.engineering.src,
    },
    {
      id: 'sales',
      label: 'Sales',
      icon: <TrendUp01 aria-hidden="true" />,
      tone: 'ink',
      image: MEDIA.careers.sales.src,
    },
    {
      id: 'design',
      label: 'Design',
      icon: <Star01 aria-hidden="true" />,
      tone: 'mint',
      image: MEDIA.careers.design.src,
    },
    {
      id: 'fde',
      label: 'Forward Deployed Growth Engineers',
      icon: <Globe01 aria-hidden="true" />,
      tone: 'brand',
      image: MEDIA.careers.fde.src,
    },
  ],

  team: {
    eyebrow: 'Leadership',
    title: "Who you'll work with",
    description:
      'Operators, marketers, and engineers who have spent their careers building  multi-billion dollar, category-defining technology for local businesses.',
  },

  stories: {
    eyebrow: 'Life at Keystone',
    title: "We are passionate and committed to our mission of rebuilding the local economy.",
    description: 'We are building a lean, committed team that takes risks, has intense autonomy, and takes joy in their work.',
    items: [
      {
        id: 's1',
        quote:
          'I get to leverage cutting-edge AI models to ship work that helps one of the most challenged, and tech-averse populations. It is an incredible opportunity and challenge.',
        name: 'Sreenivasan AC',
        role: 'Founding Engineer',
        image: MEDIA.team.sreenivasanAc.src,
      },
      {
        id: 's2',
        quote: 'We take great care to ensure the actual outcomes for our customers are world-class. Bringing technology and human judgment together to deliver results we are proud of.',
        name: 'Aasawari Vaidya',
        role: 'Founding Forward Deployed Growth Engineer',
        image: MEDIA.team.aasawariVaidya.src,
      },
      {
        id: 's3',
        quote: 'I am learning so much, so fast. I am feeling deep intrinsic motivation.',
        name: 'Ishttartha Pujar',
        role: 'Founding Forward Deployed Growth Engineer',
        image: MEDIA.team.ishttarthaPujar.src,
      },
      {
        id: 's4',
        quote: 'We get to build a great team and a great product from the ground up, embracing technical expertise and experience alongside the novelty of AI.',
        name: 'Amanjot Singh',
        role: 'Founding Head of Engineering',
        image: MEDIA.team.amanjotSingh.src,
      },
      {
        id: 's5',
        quote:
          "The bar for success is high and I feel excited to fight to be above it every month. I've grown tremendously during my short time here.",
        name: 'Atley Kasky',
        role: 'Founding Head of Design & Brand',
        image: MEDIA.team.atleyKasky.src,
      },
    ],
  },

  values: {
    eyebrow: 'What we believe',
    title: 'What motivates us to build the best growth engine for local businesses',
    description:
      "These aren't posters on a wall. They decide who we bring on and how we work, together and with every client.",
    items: [
      {
        title: 'Built for the underdog',
        description:
          'Local operators deserve the same growth machinery the big chains take for granted. We make it accessible.',
        icon: <Heart aria-hidden="true" />,
      },
      {
        title: 'One accountable team',
        description:
          'No hand-offs or finger-pointing. Strategy, execution, and results all sit with the same people.',
        icon: <Users01 aria-hidden="true" />,
      },
      {
        title: 'Results over vanity',
        description:
          'We optimize for booked, paying customers — not impressions, likes, or dashboards nobody reads.',
        icon: <TrendUp01 aria-hidden="true" />,
      },
      {
        title: 'Move fast, with care',
        description:
          'Speed is our advantage, but we never ship at the expense of the businesses that trust us.',
        icon: <Zap aria-hidden="true" />,
      },
      {
        title: 'Own the outcome',
        description:
          'Everyone here acts like an owner. We chase the result, not the task, and we sign our name to the work.',
        icon: <Target04 aria-hidden="true" />,
      },
      {
        title: 'Always be learning',
        description:
          'The system gets better with every interaction, and so do we. Curiosity compounds.',
        icon: <RefreshCcw05 aria-hidden="true" />,
      },
    ],
  },

  valuesBand: {
    eyebrow: 'Sound like you?',
    title: 'See if our values resonate',
    description:
      'If this is the kind of team you want to do your best work with, we should talk.',
    actionLabel: 'View open roles',
    actionHref: `#${CAREERS_ROLES_ANCHOR}`,
  },

  backers: {
    eyebrow: 'In good company',
    title: "Backed by operators who've built it",
    description:
      'The founders, operators, and investors behind some of the most iconic companies, now investing in and advising Keystone.',
    items: INVESTORS,
  },

  roles: {
    eyebrow: 'Open roles',
    title: 'Find your next opportunity',
    description:
      "We hire for character and craft. If you don't see a perfect fit, introduce yourself anyway.",
  },

  closing: {
    title: 'Not sure where you fit?',
    actionLabel: 'Get in touch',
    actionHref: '/get-in-touch',
  },
};
