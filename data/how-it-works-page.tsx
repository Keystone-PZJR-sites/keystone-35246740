// Authored content for the redesigned /how-it-works page (spec 040).
// The page file composes design-system sections and feeds them this data —
// nothing is hardcoded inside the components. Each step names a tokenized
// `mock` (the page builds the matching <ProcessMock>) and an optional set of
// service-page links; the recap tiles carry small icon glyphs (data-as-content,
// the same pattern as the service / pricing pages, hence .tsx).

import { Users01, RefreshCcw05, CalendarCheck01 } from '@untitledui/icons';
import type {
  FeatureItem,
  FaqItem,
  TestimonialCard,
  ProcessStepService,
} from '@/design-system';
import type { ProcessMockKind } from '@/design-system/patterns/how-it-works';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export interface HowItWorksStep {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Which tokenized step visual the page frames. */
  mock: ProcessMockKind;
  /** Links to the relevant /services pages for this step. */
  services?: ProcessStepService[];
}

export interface HowItWorksPageContent {
  meta: { title: string; description: string };
  header: { eyebrow: string; title: string; subtitle: string };
  steps: { eyebrow: string; title: string; description: string; items: HowItWorksStep[] };
  recap: { eyebrow: string; title: string; items: FeatureItem[] };
  testimonials: { title: string; cards: TestimonialCard[] };
  faq: { eyebrow: string; title: string; items: FaqItem[] };
  closing: { title: string; actionLabel: string; actionHref: string };
}

export const HOW_IT_WORKS_PAGE: HowItWorksPageContent = {
  meta: {
    title: 'How It Works | Keystone',
    description:
      "Keystone is a world-class sales and marketing team that handles the entire growth process for your business. We learn your business, build your online presence, bring in new leads, convert them into customers, and keep them coming back, optimizing the whole system continuously.",
  },

  header: {
    eyebrow: 'How it works',
    title: 'Your always-on growth team, working as one',
    subtitle:
      "Keystone runs the entire system that grows a local business — from a customer's first impression on your website or social, to ongoing communication with your biggest supporters and evangelists.",
  },

  steps: {
    eyebrow: 'The journey',
    title: 'From first hello to lifelong regular',
    description:
      'Six steps, one team. Each one feeds the next, so every dollar of attention turns into booked, paying, repeat customers.',
    items: [
      {
        id: 'discover',
        number: '01',
        eyebrow: 'Discover',
        title: 'We get to know your business',
        description:
          "Your dedicated Keystone growth team starts by learning your business inside out — your goals, what you're running today, and the customers you want more of. No generic playbook; a plan built around you.",
        mock: 'discover',
      },
      {
        id: 'presence',
        number: '02',
        eyebrow: 'Build',
        title: 'A presence that actually looks alive',
        description:
          'We build and run a fast, beautiful website and keep every place customers find you — search, social, maps, and reviews — looking sharp, current, and unmistakably you.',
        mock: 'presence',
        services: [
          { label: 'Website', href: '/services/websites' },
          { label: 'Social media', href: '/services/social-media' },
          { label: 'Maps & reviews', href: '/services/reviews' },
        ],
      },
      {
        id: 'leads',
        number: '03',
        eyebrow: 'Attract',
        title: 'We bring new customers to your door',
        description:
          'Targeted ads and steady, search-friendly content put your business in front of the right people nearby — turning attention into a real, growing pipeline of new leads.',
        mock: 'leads',
        services: [
          { label: 'Google Ads', href: '/services/google-ads' },
          { label: 'Meta Ads', href: '/services/meta-ads' },
          { label: 'Content marketing', href: '/services/content-marketing' },
        ],
      },
      {
        id: 'convert',
        number: '04',
        eyebrow: 'Convert',
        title: 'We turn interest into booked, paying customers',
        description:
          'Every lead gets followed up fast — by text, by call, and by a real sales team — so the people you attract actually become customers instead of missed messages.',
        mock: 'convert',
        services: [
          { label: 'Sales & lead follow-up', href: '/services/sales-team' },
        ],
      },
      {
        id: 'loyalty',
        number: '05',
        eyebrow: 'Retain',
        title: 'We keep them coming back — and talking',
        description:
          'Smart email and re-engagement, easy rebookings, reviews, and rewards keep your customers happy and turn your best ones into the word-of-mouth that grows everything else.',
        mock: 'loyalty',
        services: [
          { label: 'Email campaigns', href: '/services/email-campaigns' },
          { label: 'Rebookings', href: '/services/rebookings' },
          { label: 'Loyalty & rewards', href: '/services/loyalty-rewards' },
        ],
      },
      {
        id: 'engine',
        number: '06',
        eyebrow: 'Always on',
        title: 'And it all gets better, automatically',
        description:
          'Keystone manages and optimizes the whole system — website to social to ads to sales — learning from every interaction so your results compound month after month. You run your business; we run the growth.',
        mock: 'engine',
      },
    ],
  },

  recap: {
    eyebrow: 'Why it works',
    title: 'One team, one system, one price',
    items: [
      {
        icon: <Users01 aria-hidden="true" />,
        title: 'One team, not five vendors',
        description:
          'Strategy, website, ads, content, and sales all live under one roof — so nothing falls through the cracks between agencies.',
      },
      {
        icon: <RefreshCcw05 aria-hidden="true" />,
        title: 'Always-on, not set-and-forget',
        description:
          'Your growth system is actively managed and optimized every week, getting sharper with every interaction.',
      },
      {
        icon: <CalendarCheck01 aria-hidden="true" />,
        title: 'Simple month-to-month pricing',
        description:
          'One flat price covers everything you need, with no contracts. Want more work in a month? Only pay for what you use.',
        href: '/pricing',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions owners ask us',
    items: [
      {
        id: 'live',
        question: "How long until I'm live?",
        answer:
          "Most businesses are up and running within a couple of weeks. Your team handles setup and migration for you, so there's very little on your plate.",
      },
      {
        id: 'manage',
        question: 'Do I have to manage any of this myself?',
        answer:
          'No. Keystone runs the whole system for you — website, social, ads, content, and sales follow-up. You stay in the loop and approve the big stuff; we do the work.',
      },
      {
        id: 'existing',
        question: 'What if I already have a website or some tools?',
        answer:
          "We'll review what you have, keep what's working, and migrate the rest. The goal is one connected system, not another tool bolted on the side.",
      },
      {
        id: 'pick',
        question: 'Can I start with just part of it?',
        answer:
          "Yes. The whole system works best together, but we'll meet you where you are and expand as you see results.",
      },
      {
        id: 'agency',
        question: 'How is this different from hiring an agency?',
        answer:
          "You get one accountable team for everything, on a simple month-to-month price — not a stack of separate agencies, retainers, and contracts that don't talk to each other.",
      },
    ],
  },

  closing: {
    title: 'Ready to put your growth on autopilot?',
    actionLabel: 'Get a free demo',
    actionHref: '/get-in-touch',
  },
};
