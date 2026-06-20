// Authored content for the /pricing page (spec 039).
// The page file composes design-system sections and feeds them this data —
// nothing is hardcoded inside the components. The price summary itself is fed
// from the shared homepage pricing content (SHARED_PRICING_* in
// ./shared-sections) so the price and included list live in one place.
//
// This module is .tsx because the "what's included" / "why Keystone" cards
// carry icon glyphs (data-as-content, same pattern as the service pages).

import {
  Globe01,
  MessageSmileCircle,
  SearchLg,
  MessageChatCircle,
  Target04,
  Star01,
  BarChartSquare02,
  RefreshCcw05,
  Zap,
  CalendarCheck01,
  PhoneCall01,
} from '@untitledui/icons';
import type {
  FeatureItem,
  FaqItem,
  TestimonialCard,
  PricingCalcItem,
} from '@/design-system';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export interface PricingPageContent {
  meta: { title: string; description: string };
  header: { eyebrow: string; title: string; subtitle: string };
  /** Label for the action beneath the price summary. */
  summaryActionLabel: string;
  calculator: {
    eyebrow: string;
    title: string;
    description: string;
    planName: string;
    planNote: string;
    basePrice: number;
    period: string;
    note: string;
    actionLabel: string;
    items: PricingCalcItem[];
  };
  included: { eyebrow: string; title: string; items: FeatureItem[] };
  assurances: { eyebrow: string; title: string; items: FeatureItem[] };
  testimonials: { title: string; cards: TestimonialCard[] };
  faq: { eyebrow: string; title: string; items: FaqItem[] };
  closing: { title: string; actionLabel: string; actionHref: string };
}

// The extra-work catalog. Each row mirrors an included allowance below, so the
// calculator reads as "you get N included — add more here." Prices for social
// posts, blog posts, ads, email/text, and website updates reflect the latest
// pricing; messages, review responses, and reports use ⚠️ PLACEHOLDER per-unit
// prices pending real numbers. All values live here so they are easy to edit.
const EXTRA_WORK_ITEMS: PricingCalcItem[] = [
  {
    id: 'social-posts',
    label: 'Social posts',
    description: 'Designed, captioned, and scheduled across your channels.',
    unit: 'post',
    unitPrice: 5,
  },
  {
    id: 'blog-posts',
    label: 'Blog posts',
    description: 'Long-form, SEO-optimized articles written and published for you.',
    unit: 'post',
    unitPrice: 10,
  },
  {
    id: 'messages',
    label: 'Messages',
    description: 'Customer messages answered for you across your channels.',
    unit: 'message',
    unitPrice: 1,
  },
  {
    id: 'ad-campaigns',
    label: 'Ad campaigns',
    description: 'A new paid campaign built, launched, and optimized.',
    unit: 'campaign',
    unitPrice: 100,
  },
  {
    id: 'email-sms',
    label: 'Email & text campaigns',
    description: 'A broadcast written and sent to your customer list.',
    unit: 'campaign',
    unitPrice: 25,
  },
  {
    id: 'review-responses',
    label: 'Review responses',
    description: 'On-brand replies written for your customer reviews.',
    unit: 'response',
    unitPrice: 5,
  },
  {
    id: 'reports',
    label: 'Reports',
    description: 'A clear performance report on what is working.',
    unit: 'report',
    unitPrice: 25,
  },
  {
    id: 'website-updates',
    label: 'Website updates',
    description: 'A standard new page or a round of straightforward site changes, designed and shipped.',
    unit: 'update',
    unitPrice: 100,
  },
];

export const PRICING_PAGE: PricingPageContent = {
  meta: {
    title: 'Pricing | Keystone',
    description:
      'One simple price covers every Keystone tool. Want more work done? Only pay for what you use — no contracts. Estimate your monthly total.',
  },

  header: {
    eyebrow: 'Pricing',
    title: 'Simple pricing that grows with you',
    subtitle:
      'One price covers everything you need to run. Want more done? Only pay for the work you use — no contracts, no surprises.',
  },

  summaryActionLabel: 'Get a demo',

  calculator: {
    eyebrow: 'Only pay for what you use',
    title: 'Need more work done?',
    description:
      'Your plan covers everything you need. When you want extra work in a given month, add it here and only pay for what you use.',
    planName: 'Everything plan',
    planNote: 'Every Keystone tool, included.',
    basePrice: 249,
    period: '/mo',
    note: 'Every plan is month-to-month — no contracts, cancel anytime.',
    actionLabel: 'Get a demo',
    items: EXTRA_WORK_ITEMS,
  },

  included: {
    eyebrow: "What's included",
    title: 'Everything you need, every month',
    items: [
      {
        icon: <Globe01 aria-hidden="true" />,
        title: 'Your website',
        description: 'A fast, SEO-optimized site, built and maintained for you.',
        href: '/services/websites',
      },
      {
        icon: <MessageSmileCircle aria-hidden="true" />,
        title: '2 social posts',
        description: 'Designed, captioned, and scheduled across your channels each month.',
        href: '/services/social-media',
      },
      {
        icon: <SearchLg aria-hidden="true" />,
        title: '2 blog posts',
        description: 'Long-form, SEO-optimized articles written and published each month.',
        href: '/services/content-marketing',
      },
      {
        icon: <MessageChatCircle aria-hidden="true" />,
        title: '30 messages',
        description: 'Customer messages answered across your channels each month.',
        href: '/services/text-sales',
      },
      {
        icon: <Target04 aria-hidden="true" />,
        title: '1 ad campaign',
        description: 'A paid campaign built, launched, and optimized each month.',
        href: '/services/google-ads',
      },
      {
        icon: <Star01 aria-hidden="true" />,
        title: '2 review responses',
        description: 'On-brand replies to your customer reviews each month.',
        href: '/services/reviews',
      },
      {
        icon: <BarChartSquare02 aria-hidden="true" />,
        title: '2 reports',
        description: "Clear performance reports so you always know what's working.",
      },
      {
        icon: <RefreshCcw05 aria-hidden="true" />,
        title: '1 website update',
        description: 'A new page or a round of site changes each month.',
        href: '/services/websites',
      },
    ],
  },

  assurances: {
    eyebrow: 'Why Keystone',
    title: 'Easy to start, easy to stay',
    items: [
      {
        icon: <Zap aria-hidden="true" />,
        title: 'Setup & migration',
        description:
          'We move everything over for you with a dedicated specialist, so you go live fast.',
      },
      {
        icon: <CalendarCheck01 aria-hidden="true" />,
        title: 'No long-term contracts',
        description:
          "Month-to-month, always. You stay because it works — not because you're locked in.",
      },
      {
        icon: <PhoneCall01 aria-hidden="true" />,
        title: 'Real human support',
        description:
          'A team that actually picks up, consistently rated best-in-class by the businesses we serve.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  faq: {
    eyebrow: 'FAQ',
    title: 'Your top questions, answered',
    items: [
      {
        id: 'included',
        question: 'What is included for $249/month?',
        answer:
          'Every Keystone tool: your website, CRM, ads, social, reviews, content, listings, and sales follow-up — for one price per location.',
      },
      {
        id: 'extra-work',
        question: 'What do I pay for extra work?',
        answer:
          'The base plan covers everything you need to run. If you want more done in a given month — extra campaigns, more content, new pages — you only pay the per-item price for what you use.',
      },
      {
        id: 'contracts',
        question: 'Are there any contracts?',
        answer:
          'No. Every plan is month-to-month, so you can change or cancel anytime.',
      },
      {
        id: 'flat-price',
        question: 'Is it really one flat price?',
        answer:
          'Yes. $249/month per location covers the full platform. Optional extra work is the only thing that adds to it, and only when you ask for it.',
      },
      {
        id: 'get-started',
        question: 'How fast can I get started?',
        answer:
          'Most businesses are live within a couple of weeks. We handle setup and migration for you.',
      },
      {
        id: 'multi-location',
        question: 'Do you offer multi-location pricing?',
        answer:
          "Yes — reach out and we'll put together pricing for multiple locations.",
      },
    ],
  },

  closing: {
    title: 'The easiest way to grow your business',
    actionLabel: 'Get a demo',
    actionHref: '/get-in-touch',
  },
};
