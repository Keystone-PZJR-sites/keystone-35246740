// New Businesses business-type landing page (spec 053). For owners opening soon
// or recently launched: look established from day one and land the first wave of
// customers — without an agency or a pile of tools.

import {
  Star01,
  Globe01,
  RefreshCcw05,
  MarkerPin01,
  Target04,
  BarChartSquare02,
  MessageChatCircle,
  MessageSmileCircle,
} from '@untitledui/icons';
import type { IndustryPageContent } from '@/design-system/patterns/industries';
import { MEDIA } from '@/data/media';
import { SHARED_RESOURCES, PRICING_FAQ_ANSWER } from './shared';

export const NEW_BUSINESSES: IndustryPageContent = {
  slug: 'new-businesses',
  navLabel: 'New Businesses',
  metaTitle: 'Marketing & Software for New Businesses | Keystone',
  metaDescription:
    'Just opening or recently launched? Keystone gives your new business a polished website, marketing, and a 24/7 front desk from day one — so you look established and land your first customers fast.',

  hero: {
    eyebrow: 'New Businesses',
    title: 'Launch like you’ve been here for years.',
    subtitle:
      'Opening soon or just getting started? Keystone gives your new business a beautiful website, real marketing, and a 24/7 front desk from day one — so you look established and win your first customers fast.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.scenes.shopfrontDoor.src,
      alt: 'A new shopfront entrance framed by plants',
      statement: 'A polished presence, your first reviews, and customers walking in — from week one.',
      tagline: 'New Business, Optimized.',
    },
  },

  audience: {
    eyebrow: 'Who it’s for',
    title: 'Built for the first chapter',
    description: 'Wherever you are on the road to opening, Keystone meets you there.',
    items: [
      'Opening soon',
      'First location',
      'First few months',
      'Solo founders',
      'Side hustle going full-time',
      'Franchise launches',
      'New location of a growing brand',
      'Rebrands & relaunches',
    ],
  },

  benefits: {
    eyebrow: 'Why Keystone',
    title: 'Everything a new business needs to open strong',
    items: [
      {
        icon: <Globe01 />,
        title: 'Look established on day one',
        description:
          'A professional website, social, and Google profile that make a brand-new business look like a trusted local name.',
      },
      {
        icon: <MarkerPin01 />,
        title: 'Get found from the start',
        description:
          'Show up in local search and maps and run your first ads, so people nearby know you’re open.',
      },
      {
        icon: <MessageChatCircle />,
        title: 'Never miss your first leads',
        description:
          'A 24/7 front desk answers every call, text, and DM and books it — even before you’ve hired a soul.',
      },
      {
        icon: <Star01 />,
        title: 'Earn your first reviews fast',
        description:
          'Turn early happy customers into the 5-star reviews that make the next ones trust you.',
      },
    ],
  },

  comparison: {
    eyebrow: 'Before & after',
    title: 'Skip the rocky launch',
    description:
      'New owners usually piece a launch together from a website builder, a few apps, and late nights — and still feel invisible for months.',
    before: {
      label: 'Launching alone',
      points: [
        'Weeks lost wrestling a DIY website builder instead of running the business.',
        'A thin online presence that makes a new business look risky to try.',
        'No reviews yet, so first customers hesitate.',
        'Ads feel like a gamble you can’t afford to get wrong.',
        'Early inquiries slip away while you’re busy setting up.',
      ],
    },
    after: {
      label: 'Launching with Keystone',
      points: [
        'A polished website, social, and listings live before you open the doors.',
        'A presence that looks established and trustworthy from day one.',
        'A built-in plan to collect your first reviews quickly.',
        'Your first ads built and managed by a team that does this all day.',
        'Every early lead answered and booked, 24/7, from the start.',
      ],
    },
  },

  capabilities: {
    eyebrow: 'The system',
    title: 'Your whole launch, handled by one team',
    media: { image: MEDIA.productScreens.web.src, alt: 'The Keystone dashboard set up for a new business' },
    mediaSide: 'start',
    features: [
      {
        id: 'launch',
        icon: <Globe01 />,
        title: 'A launch-ready website & brand',
        description:
          'A fast, beautiful site, on-brand social, and a complete Google profile — set up for you, not by you.',
      },
      {
        id: 'found',
        icon: <Target04 />,
        title: 'Your first customers, found',
        description:
          'Local search, maps, and starter ad campaigns that put your new business in front of people nearby.',
      },
      {
        id: 'frontdesk',
        icon: <MessageChatCircle />,
        title: 'A front desk before you can afford one',
        description:
          'Calls, texts, and DMs answered and booked around the clock, so no early opportunity is missed.',
      },
      {
        id: 'reputation',
        icon: <Star01 />,
        title: 'A reputation, from zero',
        description:
          'A simple system to collect your first reviews and keep your profiles polished everywhere.',
      },
    ],
  },

  journey: {
    eyebrow: 'How it works',
    title: 'From “opening soon” to fully booked',
    description: 'Tell us about your business — your Keystone team handles the launch from there.',
    steps: [
      {
        id: 'setup',
        eyebrow: 'Step 1',
        title: 'We build your presence',
        description:
          'Your Keystone team creates your website, sets up social and your Google profile, and gets everything on-brand — usually within days.',
        image: MEDIA.productScreens.web.src,
        alt: 'A new business website and profiles being set up in Keystone',
      },
      {
        id: 'launch',
        eyebrow: 'Step 2',
        title: 'We help you open loud',
        description:
          'Starter ads and local search put you on the map, while a 24/7 front desk catches and books every early inquiry.',
        image: MEDIA.productScreens.ads.src,
        alt: 'Launch ads and local search for a new business',
      },
      {
        id: 'grow',
        eyebrow: 'Step 3',
        title: 'We turn first visits into regulars',
        description:
          'Your first reviews start rolling in, follow-up brings customers back, and one dashboard shows what’s working as you grow.',
        image: MEDIA.productScreens.reviews.src,
        alt: 'First reviews and repeat-customer follow-up for a new business',
      },
    ],
  },

  stats: {
    eyebrow: 'Results',
    title: 'A stronger start, by the numbers',
    stats: [
      { value: 'Days', label: 'To launch', description: 'From kickoff to live, not months' },
      { value: '24/7', label: 'Front desk', description: 'Every early lead answered' },
      { value: '1 plan', label: 'No app pile', description: 'Everything included from day one' },
    ],
  },

  testimonials: {
    title: 'New owners who started strong',
    cards: [
      {
        id: 'launch-fast',
        statement: 'We were fully online and taking bookings before we even opened the doors.',
        image: MEDIA.socialProof.thumbsDesktop.t06.src,
        alt: 'A new business owner preparing to open',
        results: [
          { value: 'Days', label: 'To launch' },
          { value: '24/7', label: 'Front desk' },
        ],
      },
      {
        id: 'first-reviews',
        statement: 'Our first month brought in reviews that made new customers trust us instantly.',
        image: MEDIA.socialProof.thumbsDesktop.t01.src,
        alt: 'A new owner working at the counter',
        results: [
          { value: '+40', label: 'First reviews' },
          { value: '4.9★', label: 'Rating' },
        ],
      },
      {
        id: 'one-team',
        statement: 'One team handled the website, the ads, and the front desk — so I could open.',
        image: MEDIA.socialProof.thumbsDesktop.t05.src,
        alt: 'A founder focused on launching the business',
        results: [
          { value: '1 plan', label: 'Everything' },
          { value: '0', label: 'Agencies hired' },
        ],
      },
    ],
  },

  included: {
    eyebrow: 'What’s included',
    title: 'Your whole launch kit, in one plan',
    description: 'Everything a new business needs to open strong — no add-ons, no agency.',
    items: [
      {
        icon: <Globe01 />,
        title: 'Website & brand setup',
        description: 'A fast, professional site and on-brand social, built and launched for you.',
      },
      {
        icon: <MarkerPin01 />,
        title: 'Google profile & listings',
        description: 'A complete, accurate presence on maps and across the web from day one.',
      },
      {
        icon: <Target04 />,
        title: 'Starter ads & local search',
        description: 'Your first campaigns built and managed to bring in early customers.',
      },
      {
        icon: <MessageChatCircle />,
        title: '24/7 front desk',
        description: 'Calls, texts, and DMs answered and booked around the clock.',
      },
      {
        icon: <Star01 />,
        title: 'First-reviews system',
        description: 'A simple way to turn early happy customers into 5-star reviews.',
      },
      {
        icon: <BarChartSquare02 />,
        title: 'Simple reporting',
        description: 'One clear dashboard so you can see what’s working as you grow.',
      },
    ],
  },

  resources: {
    eyebrow: 'Resources',
    title: 'Guides for a strong launch',
    description: 'Playbooks from the Keystone team on opening, getting found, and landing your first customers.',
    items: SHARED_RESOURCES,
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'not-open',
        question: 'I haven’t opened yet — is it too early for Keystone?',
        answer:
          'No — that’s the ideal time. We get your website, profiles, and first campaigns ready so you launch with a polished presence instead of scrambling after opening.',
      },
      {
        id: 'speed',
        question: 'How fast can I be live?',
        answer:
          'Most new businesses are live within days. Your Keystone team builds the site, sets up your profiles, and turns on follow-up so you don’t have to.',
      },
      {
        id: 'noreviews',
        question: 'I have no reviews or customers yet. Can Keystone still help?',
        answer:
          'Yes. We set up a simple system to collect your first reviews quickly and put your new business in front of nearby customers from the start.',
      },
      {
        id: 'diy',
        question: 'Why not just use a website builder and a few apps?',
        answer:
          'You can — but it’s weeks of setup, a thinner presence, and tools that don’t talk to each other. Keystone gives you a launch-ready system and a team that runs it, so you can focus on opening.',
      },
      {
        id: 'grow',
        question: 'Will it still fit once I’m established?',
        answer:
          'Yes. The same system that launches you keeps growing you — adding locations, marketing, and reporting as your business scales.',
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
    title: 'Give your new business a head start.',
    description: 'Book a free, no-obligation demo and we’ll show you exactly how to launch with Keystone.',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
