// Authored content for the /pricing checkout page (spec 055).
// Two subscription plans — Foundation ($50) and Sales & Marketing ($250) —
// each with a Stripe Payment Link. The page file composes design-system
// sections and feeds them this data.

import {
  Zap,
  CalendarCheck01,
  PhoneCall01,
} from '@untitledui/icons';
import type { FeatureItem, FaqItem } from '@/design-system';
import type { PricingPlan } from '@/design-system/patterns/pricing';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

/** Stripe Payment Links (custom domain pay.keystone.app). */
export const STRIPE_PAYMENT_LINKS = {
  foundation: 'https://pay.keystone.app/b/fZucN6fhC7vhe6j5ux0VO02',
  system: 'https://pay.keystone.app/b/4gMaEY5H2g1N3rF1eh0VO01',
} as const;

/**
 * Stripe Customer Portal login — subscribers manage payment method,
 * invoices, and cancellation here. Site path `/billing` redirects to this.
 */
export const STRIPE_BILLING_PORTAL_URL =
  'https://pay.keystone.app/p/login/fZucN67Pa3f14vJ5ux0VO00';

/**
 * Absolute return URLs to paste into each Stripe Payment Link
 * (After payment → Don't show confirmation page → Redirect to…).
 * Production host; local testing can use http://localhost:4013 instead.
 */
export const STRIPE_RETURN_URLS = {
  foundation: {
    success: 'https://keystone.app/pricing/success?plan=foundation',
    cancel: 'https://keystone.app/pricing/cancel?plan=foundation',
  },
  system: {
    success: 'https://keystone.app/pricing/success?plan=system',
    cancel: 'https://keystone.app/pricing/cancel?plan=system',
  },
} as const;

export interface PricingPageContent {
  meta: { title: string; description: string };
  header: { eyebrow: string; title: string; subtitle: string };
  plans: PricingPlan[];
  /** Link under the plan cards to the Stripe Customer Portal. */
  manageSubscription: { label: string; href: string; note: string };
  assurances: { eyebrow: string; title: string; items: FeatureItem[] };
  testimonials: { title: string; cards: typeof SHARED_TESTIMONIALS_SECTION.cards };
  faq: { eyebrow: string; title: string; items: FaqItem[] };
  closing: { title: string; actionLabel: string; actionHref: string };
  success: {
    titleByPlan: Record<'foundation' | 'system' | 'default', string>;
    subtitle: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    modal: {
      title: string;
      body: string;
      questionsLead: string;
      supportEmail: string;
      closeLabel: string;
    };
  };
  cancel: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
}

export const PRICING_PAGE: PricingPageContent = {
  meta: {
    title: 'Pricing | Keystone',
    description:
      'Sales and marketing for independent businesses. Start with Foundation at $50/month, or the full Sales & Marketing system at $250/month. Cancel anytime.',
  },

  header: {
    eyebrow: 'Pricing',
    title: 'Simple plans. Real results.',
    subtitle:
      'Start with a custom website and marketing engine, or go all-in on ads, social, and lead follow-up. Month-to-month — cancel anytime.',
  },

  plans: [
    {
      id: 'foundation',
      name: 'Foundation',
      tagline: 'Your website and marketing engine — the base every business needs.',
      priceAmount: '$50',
      pricePeriod: '/mo',
      badge: 'Most popular',
      highlighted: true,
      features: [
        'Custom website, built and managed for you',
        'Ongoing SEO content published to your site',
        'Google Maps / Business Profile optimization',
        'Embedded website sales chat',
        'Full marketing platform ready to expand',
      ],
      ctaLabel: 'Start Foundation',
      checkoutUrl: STRIPE_PAYMENT_LINKS.foundation,
    },
    {
      id: 'system',
      name: 'Sales & Marketing',
      tagline: 'The full always-on system — Foundation plus acquisition and follow-up.',
      priceAmount: '$250',
      pricePeriod: '/mo',
      features: [
        'Everything in Foundation',
        'Paid ads (Meta, with Google layered in)',
        'Social media content and posting',
        'Newsletters and SMS blasts',
        'CRM lead pursuit and management',
      ],
      ctaLabel: 'Start Sales & Marketing',
      checkoutUrl: STRIPE_PAYMENT_LINKS.system,
    },
  ],

  manageSubscription: {
    label: 'Manage your subscription',
    // Direct portal URL (new tab) — avoids host trailingSlash redirect issues.
    // Short path /billing also redirects here via app/billing/page.tsx.
    href: STRIPE_BILLING_PORTAL_URL,
    note: 'Already a customer? Update payment details, view invoices, or cancel anytime.',
  },

  assurances: {
    eyebrow: 'Why Keystone',
    title: 'Easy to start, easy to stay',
    items: [
      {
        icon: <Zap aria-hidden="true" />,
        title: 'Live in about a week',
        description:
          'We typically have your website live within a week — setup and migration handled for you.',
      },
      {
        icon: <CalendarCheck01 aria-hidden="true" />,
        title: 'No long-term contracts',
        description:
          'Month-to-month, always. You stay because it works — not because you are locked in.',
      },
      {
        icon: <PhoneCall01 aria-hidden="true" />,
        title: 'Dedicated account manager',
        description:
          'Every client gets a real human who knows digital marketing and is available when you need them.',
      },
    ],
  },

  testimonials: SHARED_TESTIMONIALS_SECTION,

  faq: {
    eyebrow: 'FAQ',
    title: 'Your top questions, answered',
    items: [
      {
        id: 'foundation-includes',
        question: 'What exactly is included in the $50 Foundation plan?',
        answer:
          'We build you a new website, manage it and make updates, and publish new content several times per month for SEO. We also optimize your Maps profile so you show up higher on local searches, and include a website sales chat. The full marketing platform is included so it is easy to add other services later.',
      },
      {
        id: 'system-includes',
        question: 'What is in the $250 Sales & Marketing plan?',
        answer:
          'Everything in Foundation, plus ads, social media, newsletters, SMS blasts, and CRM lead pursuit and management — the full always-on sales and marketing system most single-location businesses use.',
      },
      {
        id: 'one-or-other',
        question: 'Do I need to buy both plans?',
        answer:
          'No. Pick one. Foundation is the starting point; Sales & Marketing is the full stack. You do not buy them as a stack of two subscriptions.',
      },
      {
        id: 'contracts',
        question: 'Are there any contracts?',
        answer: 'No. Every plan is month-to-month, so you can change or cancel anytime.',
      },
      {
        id: 'cancel-website',
        question: 'If I cancel, will I keep my website?',
        answer:
          'We are happy to send you the code, but you will need another company to host and manage it — like building a house and then turning off the power and water.',
      },
      {
        id: 'timeline',
        question: 'How long until the website is ready / I see results?',
        answer:
          'We can typically have the website live in a week. Most customers see immediate conversion improvements from a professional site and sales chat. SEO and Maps visibility take a couple of months but start improving right away.',
      },
      {
        id: 'have-website',
        question: 'I already have a website. Why switch?',
        answer:
          'We rebuild everything you have into a modern marketing engine with more content, pages, and SEO configuration so you actually show up for the searches that matter — plus sales chat and the platform underneath.',
      },
    ],
  },

  closing: {
    title: 'Want a walkthrough before you buy?',
    actionLabel: 'Get a free demo',
    actionHref: '/get-in-touch',
  },

  success: {
    titleByPlan: {
      foundation: 'You are in — Foundation is starting',
      system: 'You are in — Sales & Marketing is starting',
      default: 'You are in — welcome to Keystone',
    },
    subtitle:
      'Thanks for subscribing. We will email you within 1 business day to activate your account and start onboarding.',
    primaryLabel: 'See example work',
    primaryHref: '/gallery',
    secondaryLabel: 'Read case studies',
    secondaryHref: '/case-studies',
    modal: {
      title: 'Welcome to Keystone',
      body:
        'Keystone will reach out to the email you used to sign up to activate your account and start onboarding within the next 1 business day.',
      questionsLead: 'Please reach out to',
      supportEmail: 'growthpartners@keystone.app',
      closeLabel: 'Close welcome message',
    },
  },

  cancel: {
    title: 'Checkout canceled',
    subtitle:
      'No charge was made. Pick a plan when you are ready, or book a quick demo if you want to talk it through first.',
    primaryLabel: 'Back to pricing',
    primaryHref: '/pricing',
    secondaryLabel: 'Get a free demo',
    secondaryHref: '/get-in-touch',
  },
};
