// Home Services business-type landing page (spec 050 + 053).

import {
  Star01,
  MarkerPin01,
  MessageChatCircle,
  MessageSmileCircle,
} from '@untitledui/icons';
import type { IndustryPageContent } from '@/design-system/patterns/industries';
import { MEDIA } from '@/data/media';
import { CONCEPT } from '@/data/card-concepts';
import { SHARED_RESOURCES, PRICING_FAQ_ANSWER } from './shared';

export const HOME_SERVICES: IndustryPageContent = {
  slug: 'home-services',
  navLabel: 'Home Services',
  metaTitle: 'Sales & Marketing for Home Services Businesses | Keystone',
  metaDescription:
    'Keystone runs the marketing, website, and follow-up that keep home-services and trades businesses booked — HVAC, plumbing, cleaning, landscaping, and more.',

  hero: {
    eyebrow: 'Home Services',
    title: 'Win more jobs for your home services business.',
    subtitle:
      'HVAC, plumbing, cleaning, landscaping, and the trades — Keystone runs the marketing, website, and follow-up that keep your schedule booked and your trucks moving.',
    primary: { label: 'Get a free demo', href: '/get-in-touch' },
    secondary: { label: 'See how it works', href: '/how-it-works' },
    media: {
      image: MEDIA.scenes.deliveryVan.src,
      alt: 'A driver making a service call',
      statement: 'A full schedule, faster quotes, and jobs that don’t slip through the cracks.',
      tagline: 'Home Services, Optimized.',
    },
  },

  audience: {
    eyebrow: 'Who it’s for',
    title: 'Built for every trade',
    description: 'If you quote jobs and roll trucks, Keystone fits how you sell and schedule.',
    items: [
      'HVAC & refrigeration',
      'Plumbing',
      'Electrical',
      'Cleaning & janitorial',
      'Landscaping & lawn care',
      'Roofing & exteriors',
      'Pest control',
      'Garage, doors & windows',
      'Painting & remodeling',
      'Pool & spa service',
    ],
  },

  benefits: {
    eyebrow: 'Why Keystone',
    title: 'Built to keep your schedule full',
    items: [
      {
        image: CONCEPT.frontDesk,
        title: 'Book more jobs',
        description:
          'Every call, text, and form gets answered and scheduled fast, so you win the jobs your competitors miss.',
      },
      {
        image: CONCEPT.ads,
        title: 'Keep the phone ringing',
        description:
          'Local ads and search put you in front of nearby homeowners exactly when they need you.',
      },
      {
        image: CONCEPT.retention,
        title: 'Earn repeat & referral work',
        description:
          'Automated follow-up, maintenance reminders, and review requests turn one job into the next.',
      },
      {
        image: CONCEPT.reporting,
        title: 'Know your numbers',
        description:
          'Track where jobs come from and what each channel is worth, all in one place.',
      },
    ],
  },

  comparison: {
    eyebrow: 'Before & after',
    title: 'Stop losing jobs to the faster bid',
    description:
      'In the trades, the business that answers first usually wins the job. Most owners are too busy on-site to be that business.',
    before: {
      label: 'The old way',
      points: [
        'Calls go to voicemail mid-job, and the homeowner dials the next number.',
        'Quotes take days to send, and the lead goes cold.',
        'Ads run with no idea which ones actually book work.',
        'Past customers forget you exist until something breaks again.',
        'Reviews trickle in, so you lose bids to higher-rated competitors.',
      ],
    },
    after: {
      label: 'With Keystone',
      points: [
        'Every call, text, and form is answered in minutes and put on the schedule.',
        'Fast, professional quotes go out while the homeowner is still deciding.',
        'Every dollar of ad spend is tied back to booked, paid jobs.',
        'Maintenance reminders and check-ins bring repeat and referral work.',
        'A steady stream of 5-star reviews makes you the obvious choice.',
      ],
    },
  },

  capabilities: {
    eyebrow: 'The system',
    title: 'One system from lead to paid',
    media: { image: MEDIA.productScreens.leads.src, alt: 'The Keystone lead and job pipeline' },
    mediaSide: 'start',
    features: [
      {
        id: 'area',
        icon: <MarkerPin01 />,
        title: 'Get found in your service area',
        description: 'Rank in local search and maps so homeowners nearby call you first.',
      },
      {
        id: 'site',
        icon: <MessageSmileCircle />,
        title: 'A site built to convert',
        description:
          'A fast, trustworthy website with quotes and booking that turn clicks into scheduled jobs.',
      },
      {
        id: 'speed',
        icon: <MessageChatCircle />,
        title: 'Never miss a lead',
        description:
          'Speed-to-lead replies by text and call capture every opportunity, even after hours.',
      },
      {
        id: 'reputation',
        icon: <Star01 />,
        title: 'A reputation that wins bids',
        description: 'More 5-star reviews and polished profiles make you the obvious choice.',
      },
    ],
  },

  journey: {
    eyebrow: 'How it works',
    title: 'From first call to repeat customer',
    description: 'Your Keystone team runs the whole pipeline — here’s how a job comes together.',
    steps: [
      {
        id: 'reach',
        eyebrow: 'Step 1',
        title: 'Homeowners find you first',
        description:
          'Local search, maps, and targeted ads put you in front of nearby homeowners the moment they need the work done.',
        image: MEDIA.productScreens.ads.src,
        alt: 'Local ads reaching homeowners in a service area',
      },
      {
        id: 'respond',
        eyebrow: 'Step 2',
        title: 'You answer first and quote fast',
        description:
          'Every call, text, and form gets an instant response and a fast quote — so you book the job before the next contractor calls back.',
        image: MEDIA.productScreens.sales.src,
        alt: 'The Keystone pipeline responding to and quoting a new lead',
      },
      {
        id: 'rebook',
        eyebrow: 'Step 3',
        title: 'They call you again — and refer you',
        description:
          'Review requests build your reputation while maintenance reminders and check-ins turn one job into a customer for years.',
        image: MEDIA.productScreens.reviews.src,
        alt: 'Maintenance reminders and review requests for past customers',
      },
    ],
  },

  stats: {
    eyebrow: 'Results',
    title: 'Built for results in the trades',
    stats: [
      { value: '+31%', label: 'More booked jobs', description: 'Average lift after launch' },
      { value: '< 2 min', label: 'Response time', description: 'Average reply to a new lead' },
      { value: '4.8★', label: 'Average rating', description: 'Across managed profiles' },
    ],
  },

  testimonials: {
    title: 'Why contractors choose Keystone',
    cards: [
      {
        id: 'callback',
        statement: 'Leads get a call back in minutes, so we book the job before the next guy.',
        image: MEDIA.socialProof.thumbsDesktop.t01.src,
        alt: 'A mechanic working under a car on a lift',
        results: [
          { value: '+34%', label: 'Booked jobs' },
          { value: '< 2 min', label: 'Response' },
        ],
      },
      {
        id: 'ads-roi',
        statement: 'Our ads finally pay for themselves — the phone rings with the right jobs.',
        image: MEDIA.socialProof.thumbsDesktop.t05.src,
        alt: 'A focused business owner at work',
        results: [
          { value: '+2.4x', label: 'Ad ROI' },
          { value: '+27%', label: 'Close rate' },
        ],
      },
      {
        id: 'repeat',
        statement: 'Maintenance reminders and reviews keep customers — and referrals — coming.',
        image: MEDIA.socialProof.thumbsDesktop.t02.src,
        alt: 'A business owner on the phone at her laptop',
        results: [
          { value: '+38%', label: 'Repeat work' },
          { value: '+180', label: 'New reviews' },
        ],
      },
    ],
  },

  included: {
    eyebrow: 'What’s included',
    title: 'Everything in one plan',
    description: 'No à la carte pricing. Every trades business gets the whole system.',
    items: [
      {
        image: CONCEPT.website,
        title: 'Website & online presence',
        description: 'A fast, trust-building site plus maps and listings that win the click.',
      },
      {
        image: CONCEPT.ads,
        title: 'Local ads & search',
        description: 'Campaigns that put you in front of homeowners ready to book.',
      },
      {
        image: CONCEPT.frontDesk,
        title: '24/7 lead response',
        description: 'Calls, texts, and forms answered and scheduled around the clock.',
      },
      {
        image: CONCEPT.sales,
        title: 'Quotes & follow-up',
        description: 'Fast, professional quotes and persistent follow-up that close the job.',
      },
      {
        image: CONCEPT.reviews,
        title: 'Reviews & reputation',
        description: 'A steady stream of 5-star reviews and managed profiles.',
      },
      {
        image: CONCEPT.reporting,
        title: 'Reporting that’s clear',
        description: 'See exactly where jobs come from and what each channel is worth.',
      },
    ],
  },

  resources: {
    eyebrow: 'Resources',
    title: 'Guides for booking more jobs',
    description: 'Playbooks from the Keystone team on winning and keeping home-services work.',
    items: SHARED_RESOURCES,
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        id: 'trades',
        question: 'Which trades does Keystone support?',
        answer:
          'HVAC, plumbing, electrical, cleaning, landscaping, roofing, pest control, and most home-services trades. The system fits how you quote, schedule, and invoice.',
      },
      {
        id: 'afterhours',
        question: 'Can it handle after-hours leads?',
        answer:
          'Yes. Keystone answers calls, texts, and forms around the clock and books jobs so nothing slips through.',
      },
      {
        id: 'quotes',
        question: 'Can it send quotes and estimates?',
        answer:
          'Yes. Keystone helps you get fast, professional quotes out while the homeowner is still deciding, then follows up automatically until the job is booked.',
      },
      {
        id: 'website',
        question: 'Do you replace my current website?',
        answer:
          'We build and run a fast, conversion-ready site — or improve what you have — as part of your plan.',
      },
      {
        id: 'multi',
        question: 'I run multiple crews and service areas — does that work?',
        answer:
          'Yes. Keystone scales across crews, locations, and service areas, with reporting that rolls up so you can see the whole operation.',
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
    title: 'See what Keystone can do for your home services business.',
    description: 'Book a free, no-obligation demo and we’ll show you exactly how it works.',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
