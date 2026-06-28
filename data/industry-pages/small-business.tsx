// Small Business business-type landing page (spec 050 + 053).

import {
  Star01,
  Globe01,
  RefreshCcw05,
  Target04,
  BarChartSquare02,
  MessageChatCircle,
  MessageSmileCircle,
} from '@untitledui/icons';
import type { IndustryPageContent } from '@/design-system/patterns/industries';
import { MEDIA } from '@/data/media';
import { SHARED_RESOURCES, PRICING_FAQ_ANSWER } from './shared';

export const SMALL_BUSINESS: IndustryPageContent = {
  slug: 'small-business',
  navLabel: 'Small Business',
  metaTitle: 'Sales & Marketing Software for Small Businesses | Keystone',
  metaDescription:
    'Keystone runs your website, marketing, sales follow-up, and reviews from one place — the always-on growth team for your small business.',

  hero: {
    eyebrow: 'Small Business',
    title: 'The all-in-one growth system for your small business.',
    subtitle:
      'Keystone runs your website, marketing, sales follow-up, and reviews from one place — the always-on team that grows your business without the agencies or the app pile.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.shopOwner.src,
      alt: 'A shop owner managing her business on a laptop',
      statement: 'Your website, marketing, and front desk — handled, in one place.',
      tagline: 'Small Business, Optimized.',
    },
  },

  audience: {
    eyebrow: 'Who it’s for',
    title: 'Built for local, independent businesses',
    description: 'If you serve customers in your area, Keystone fits how you sell and serve.',
    items: [
      'Retail & boutiques',
      'Restaurants & cafés',
      'Auto & repair shops',
      'Pet care & grooming',
      'Professional services',
      'Salons & barbershops',
      'Fitness & studios',
      'Home & lifestyle',
      'Specialty & makers',
    ],
  },

  benefits: {
    eyebrow: 'Why Keystone',
    title: 'One team for everything that grows you',
    items: [
      {
        icon: <Globe01 />,
        title: 'Look bigger than you are',
        description:
          'A beautiful website, active social, and polished profiles make every first impression count.',
      },
      {
        icon: <Target04 />,
        title: 'Bring in new customers',
        description: 'Local ads and search put your business in front of the right people nearby.',
      },
      {
        icon: <MessageChatCircle />,
        title: 'Turn interest into sales',
        description:
          'Every lead gets a fast reply and a nudge to buy or book — by text, call, and email.',
      },
      {
        icon: <RefreshCcw05 />,
        title: 'Keep them coming back',
        description:
          'Reviews, reminders, and re-engagement turn first-time customers into regulars.',
      },
    ],
  },

  comparison: {
    eyebrow: 'Before & after',
    title: 'Replace the app pile with one team',
    description:
      'Most owners are paying for — and managing — a website builder, a social tool, an ads account, an inbox, and a review app that don’t talk to each other.',
    before: {
      label: 'The old way',
      points: [
        'A stack of tools and logins that never quite work together.',
        'Marketing that happens whenever there’s a spare hour — so, rarely.',
        'Leads slip away because no one replied fast enough.',
        'Separate bills for every app, and an agency retainer on top.',
        'No single view of what’s actually growing the business.',
      ],
    },
    after: {
      label: 'With Keystone',
      points: [
        'One system for your website, marketing, sales, and reviews.',
        'A team that runs your marketing every week, not when you find time.',
        'Every lead gets a fast, automatic reply and a nudge to buy or book.',
        'One simple plan instead of a dozen subscriptions and a retainer.',
        'One dashboard showing exactly what’s driving growth this month.',
      ],
    },
  },

  capabilities: {
    eyebrow: 'The system',
    title: 'Replace the app pile with one simple system',
    media: { image: MEDIA.productScreens.web.src, alt: 'The Keystone all-in-one dashboard' },
    mediaSide: 'start',
    features: [
      {
        id: 'presence',
        icon: <Globe01 />,
        title: 'Your website & online presence',
        description:
          'A fast site, social, maps, and listings that stay sharp and on-brand everywhere.',
      },
      {
        id: 'marketing',
        icon: <Target04 />,
        title: 'Marketing that runs itself',
        description: 'Ads and content built, launched, and optimized for you every month.',
      },
      {
        id: 'frontdesk',
        icon: <MessageChatCircle />,
        title: 'A front desk that never sleeps',
        description: 'Calls, texts, and messages answered and converted around the clock.',
      },
      {
        id: 'insight',
        icon: <BarChartSquare02 />,
        title: 'One clear view of growth',
        description: 'See what’s working and what each channel is worth, in one dashboard.',
      },
    ],
  },

  journey: {
    eyebrow: 'How it works',
    title: 'From found to loyal',
    description: 'One team handles it all — here’s how Keystone grows your business.',
    steps: [
      {
        id: 'found',
        eyebrow: 'Step 1',
        title: 'Customers discover you',
        description:
          'A polished website, active social, and local ads make you easy to find and easy to choose over the business down the street.',
        image: MEDIA.productScreens.social.src,
        alt: 'A small business’s website and social presence',
      },
      {
        id: 'convert',
        eyebrow: 'Step 2',
        title: 'Interest turns into sales',
        description:
          'Every call, message, and form gets a fast reply and a clear nudge to buy or book — so interest doesn’t leak away.',
        image: MEDIA.productScreens.leads.src,
        alt: 'The Keystone inbox converting a new lead',
      },
      {
        id: 'loyal',
        eyebrow: 'Step 3',
        title: 'One-time buyers become regulars',
        description:
          'Reviews, reminders, and re-engagement keep you top of mind and bring customers back again and again.',
        image: MEDIA.productScreens.reviews.src,
        alt: 'Re-engagement and review requests bringing customers back',
      },
    ],
  },

  stats: {
    eyebrow: 'Results',
    title: 'Owners grow faster on Keystone',
    stats: [
      { value: '+54%', label: 'Sales growth', description: 'Average lift after launch' },
      { value: '-42%', label: 'Software costs', description: 'Versus a stack of tools' },
      { value: '4.9★', label: 'Average rating', description: 'Across managed profiles' },
    ],
  },

  testimonials: {
    title: 'Why owners choose Keystone',
    cards: [
      {
        id: 'all-in-one',
        statement: 'Everything an independent business needs to win online, in one place.',
        image: MEDIA.socialProof.thumbsDesktop.t02.src,
        alt: 'A business owner taking a call at her counter',
        results: [
          { value: '+54%', label: 'Sales growth' },
          { value: '11,000', label: 'App installs' },
        ],
      },
      {
        id: 'new-customers',
        statement: 'New customers find us, choose us, and keep coming back.',
        image: MEDIA.socialProof.thumbsDesktop.t06.src,
        alt: 'A wellness studio session in progress',
        results: [
          { value: '+38%', label: 'New customers' },
          { value: '64%', label: 'Return rate' },
        ],
      },
      {
        id: 'fewer-tools',
        statement: 'We replaced a stack of tools — and the bills that came with them.',
        image: MEDIA.socialProof.thumbsDesktop.t05.src,
        alt: 'A business owner focused on her work',
        results: [
          { value: '-42%', label: 'Software costs' },
          { value: '+180', label: 'New reviews' },
        ],
      },
    ],
  },

  included: {
    eyebrow: 'What’s included',
    title: 'Everything in one plan',
    description: 'Every tool a growing business needs — no add-ons, no agency retainer.',
    items: [
      {
        icon: <Globe01 />,
        title: 'Website & online presence',
        description: 'A fast site plus social, maps, and listings, all on-brand and in sync.',
      },
      {
        icon: <Target04 />,
        title: 'Ads & content marketing',
        description: 'Campaigns and posts built, launched, and optimized for you each month.',
      },
      {
        icon: <MessageChatCircle />,
        title: 'Sales follow-up',
        description: 'Fast replies and persistent nudges by text, call, and email that close sales.',
      },
      {
        icon: <RefreshCcw05 />,
        title: 'Retention & rebooking',
        description: 'Reminders and re-engagement that turn one-time buyers into regulars.',
      },
      {
        icon: <Star01 />,
        title: 'Reviews & reputation',
        description: 'More 5-star reviews and managed profiles across the web.',
      },
      {
        icon: <BarChartSquare02 />,
        title: 'Reporting & insights',
        description: 'One dashboard showing what’s working and what each channel is worth.',
      },
    ],
  },

  resources: {
    eyebrow: 'Resources',
    title: 'Guides for growing your business',
    description: 'Playbooks from the Keystone team on getting found, chosen, and rebooked.',
    items: SHARED_RESOURCES,
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'types',
        question: 'What kinds of businesses use Keystone?',
        answer:
          'Local, service, and retail businesses of all kinds. If you serve customers in your area, Keystone fits.',
      },
      {
        id: 'technical',
        question: 'Do I need to be technical?',
        answer:
          'No. Your Keystone team sets everything up and runs it for you — you approve the work and watch it grow.',
      },
      {
        id: 'included',
        question: 'What’s included?',
        answer:
          'Your website, social, ads, sales follow-up, reviews, and reporting — every tool, one plan.',
      },
      {
        id: 'switch',
        question: 'Can you replace the tools I already pay for?',
        answer:
          'Yes. Most owners consolidate a stack of subscriptions (and often an agency retainer) into one Keystone plan during onboarding.',
      },
      {
        id: 'time',
        question: 'How much of my time does it take?',
        answer:
          'Very little. Keystone runs the work and brings you the results to approve, so you stay focused on running your business.',
      },
      {
        id: 'cost',
        question: 'How much does it cost?',
        answer: PRICING_FAQ_ANSWER,
      },
    ],
  },

  closing: {
    eyebrow: 'Software that grows at your pace',
    title: 'See what Keystone can do for your business.',
    description: 'Book a free, no-obligation demo and we’ll show you exactly how it works.',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
