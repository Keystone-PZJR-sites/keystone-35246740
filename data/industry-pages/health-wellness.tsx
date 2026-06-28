// Health & Wellness business-type landing page (spec 050 + 053).

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
import { CASE_STUDY_TESTIMONIAL_CARDS } from '@/data/shared-sections';
import { SHARED_RESOURCES, PRICING_FAQ_ANSWER } from './shared';

export const HEALTH_WELLNESS: IndustryPageContent = {
  slug: 'health-wellness',
  navLabel: 'Health & Wellness',
  metaTitle: 'Sales & Marketing for Health & Wellness Businesses | Keystone',
  metaDescription:
    'Keystone runs the website, marketing, and front desk that keep studios, spas, clinics, and trainers booked — so you can focus on your clients.',

  hero: {
    eyebrow: 'Health & Wellness',
    title: 'Grow your health & wellness business on autopilot.',
    subtitle:
      'From studios and spas to clinics and trainers, Keystone runs the website, marketing, and front desk that keep your calendar full — so you can focus on your clients, not your software.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.businesses.pilatesStudio.src,
      alt: 'An instructor leading a pilates class',
      statement: 'A booked-out calendar, more 5-star reviews, and clients who keep coming back.',
      tagline: 'Wellness, Optimized.',
    },
  },

  audience: {
    eyebrow: 'Who it’s for',
    title: 'Built for every kind of wellness business',
    description:
      'However clients find you and book you, Keystone adapts to how you run — solo or multi-location.',
    items: [
      'Pilates & yoga studios',
      'Med spas & day spas',
      'Massage & bodywork',
      'Chiropractic & physical therapy',
      'Personal trainers & gyms',
      'IV & recovery studios',
      'Aesthetics & skincare',
      'Salons & lash bars',
      'Wellness & functional clinics',
    ],
  },

  benefits: {
    eyebrow: 'Why Keystone',
    title: 'Everything your practice needs to grow',
    items: [
      {
        icon: <MessageChatCircle />,
        title: 'Fill your calendar',
        description:
          'New clients find you, book in a few taps, and get a fast reply to every inquiry — day or night.',
      },
      {
        icon: <RefreshCcw05 />,
        title: 'Keep clients coming back',
        description:
          'Automated reminders, rebookings, and re-engagement turn first visits into memberships and regulars.',
      },
      {
        icon: <Star01 />,
        title: 'Build a five-star reputation',
        description:
          'Every happy client is asked for a review at the right moment, and your profiles stay polished everywhere.',
      },
      {
        icon: <BarChartSquare02 />,
        title: 'See what’s working',
        description:
          'One clear dashboard shows where clients come from and what’s driving revenue this month.',
      },
    ],
  },

  comparison: {
    eyebrow: 'Before & after',
    title: 'From scattered tools to one calm system',
    description:
      'Most wellness owners are stitching together a booking app, a website, an inbox, and a review tool — and chasing every lead by hand.',
    before: {
      label: 'The old way',
      points: [
        'Inquiries sit unanswered after hours, and the lead books somewhere else.',
        'Front desk juggles DMs, texts, and voicemails across five different apps.',
        'Reviews only get asked for when someone remembers.',
        'No one really knows which ads or posts actually drove bookings.',
        'Marketing, website, and follow-up each cost a separate subscription.',
      ],
    },
    after: {
      label: 'With Keystone',
      points: [
        'Every inquiry gets an instant, on-brand reply and a booking link, 24/7.',
        'Calls, texts, and DMs land in one place and turn into booked appointments.',
        'Happy clients are asked for a review at exactly the right moment.',
        'One dashboard ties every booking back to the ad, post, or search that drove it.',
        'Website, marketing, front desk, and reviews — one plan, one team.',
      ],
    },
  },

  capabilities: {
    eyebrow: 'The system',
    title: 'One place to run your whole front office',
    media: { image: MEDIA.productScreens.web.src, alt: 'The Keystone dashboard for a wellness business' },
    mediaSide: 'start',
    features: [
      {
        id: 'found',
        icon: <MarkerPin01 />,
        title: 'Get found by nearby clients',
        description: 'Show up first in local search and maps when people look for your services.',
      },
      {
        id: 'site',
        icon: <MessageSmileCircle />,
        title: 'A booking-ready website & social',
        description:
          'A fast, beautiful site and on-brand social posts that turn visitors into booked appointments.',
      },
      {
        id: 'frontdesk',
        icon: <MessageChatCircle />,
        title: 'A front desk that never sleeps',
        description:
          'Calls, texts, and DMs answered and booked around the clock, so no client slips away.',
      },
      {
        id: 'ads',
        icon: <Target04 />,
        title: 'Ads that pay for themselves',
        description: 'Targeted local campaigns built, launched, and optimized to keep new clients coming.',
      },
    ],
  },

  journey: {
    eyebrow: 'How it works',
    title: 'From first inquiry to lifelong client',
    description: 'Your Keystone team sets it all up and runs it — here’s the path a new client takes.',
    steps: [
      {
        id: 'found',
        eyebrow: 'Step 1',
        title: 'They find you first',
        description:
          'Your site, maps, and local ads put you in front of people searching for your services nearby — and make a great first impression.',
        image: MEDIA.productScreens.ads.src,
        alt: 'Local ads and search placements for a wellness business',
      },
      {
        id: 'book',
        eyebrow: 'Step 2',
        title: 'They book in seconds',
        description:
          'Every call, text, and DM gets an instant reply and a booking link — even at 11pm — so the appointment is locked in before they cool off.',
        image: MEDIA.productScreens.leads.src,
        alt: 'The Keystone inbox replying to and booking a new lead',
      },
      {
        id: 'return',
        eyebrow: 'Step 3',
        title: 'They come back — and bring friends',
        description:
          'Reminders cut no-shows, rebookings keep the calendar full, and a perfectly-timed review request turns happy clients into your best marketing.',
        image: MEDIA.productScreens.reviews.src,
        alt: 'Automated rebooking reminders and review requests',
      },
    ],
  },

  stats: {
    eyebrow: 'Results',
    title: 'Real results for wellness businesses',
    stats: [
      { value: '+38%', label: 'New clients', description: 'Average lift in new bookings' },
      { value: '< 2 min', label: 'Response time', description: 'Average reply to a new inquiry' },
      { value: '4.9★', label: 'Average rating', description: 'Across managed profiles' },
    ],
  },

  testimonials: {
    title: 'Real wellness businesses, real results',
    cards: CASE_STUDY_TESTIMONIAL_CARDS,
  },

  included: {
    eyebrow: 'What’s included',
    title: 'Everything in one plan',
    description: 'No add-ons to price out. Every wellness business gets the whole system.',
    items: [
      {
        icon: <Globe01 />,
        title: 'Website & online presence',
        description: 'A fast, booking-ready site plus maps and listings that stay polished everywhere.',
      },
      {
        icon: <MessageSmileCircle />,
        title: 'Social media, done for you',
        description: 'On-brand posts that keep your studio top of mind and bring new clients in.',
      },
      {
        icon: <Target04 />,
        title: 'Local ads & search',
        description: 'Campaigns built, launched, and optimized to fill your calendar profitably.',
      },
      {
        icon: <MessageChatCircle />,
        title: '24/7 front desk',
        description: 'Calls, texts, and DMs answered and booked around the clock.',
      },
      {
        icon: <Star01 />,
        title: 'Reviews & reputation',
        description: 'Five-star reviews requested at the right moment and managed for you.',
      },
      {
        icon: <BarChartSquare02 />,
        title: 'Reporting that’s clear',
        description: 'One dashboard showing where clients come from and what’s driving revenue.',
      },
    ],
  },

  resources: {
    eyebrow: 'Resources',
    title: 'Guides for growing your practice',
    description: 'Playbooks from the Keystone team on booking more clients and keeping them.',
    items: SHARED_RESOURCES,
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'types',
        question: 'Does Keystone work for my type of wellness business?',
        answer:
          'Yes. Studios, gyms, spas, med spas, salons, clinics, and solo practitioners all run on Keystone. The system adapts to how you book and serve clients.',
      },
      {
        id: 'booking',
        question: 'Will it work with my booking or scheduling tool?',
        answer:
          'Keystone runs your front desk end to end, and our team helps you connect or replace the tools you use today during onboarding.',
      },
      {
        id: 'afterhours',
        question: 'What happens to inquiries that come in after hours?',
        answer:
          'They get an instant, on-brand reply and a booking link any time of day — so the appointment is captured before the client looks elsewhere.',
      },
      {
        id: 'reviews',
        question: 'How does Keystone get me more reviews?',
        answer:
          'After a visit, the right happy clients are automatically asked for a review at the moment they’re most likely to leave one, and your profiles are managed across the web.',
      },
      {
        id: 'start',
        question: 'How fast can I get started?',
        answer:
          'Most businesses are live within days. Your Keystone team sets up your site, profiles, and follow-up so you don’t have to.',
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
    title: 'See what Keystone can do for your wellness business.',
    description: 'Book a free, no-obligation demo and we’ll show you exactly how it works.',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
