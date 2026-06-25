// Registry of industry landing pages (spec 050), keyed by slug. These are the
// industry-specific positioning pages used primarily as paid-ad landing targets
// (and for organic discovery via the Solutions nav). The `/industries/[slug]`
// route renders each entry through the IndustryPageTemplate. Add an industry by
// authoring its content object and listing it in ALL below.

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
import type { IndustryPageContent, IndustryResource } from '@/design-system/patterns/industries';
import { MEDIA } from '@/data/media';

// Placeholder resources: a few live blog posts that apply across every industry.
// Swap these for industry-specific articles / case studies once authored.
const SHARED_RESOURCES: IndustryResource[] = [
  {
    title: 'The 3-day conversion window: turn new leads into booked appointments',
    href: '/blog/the-3-day-conversion-window-a-tactical-sequencing-playbook-to-turn-new-leads-into-paid-appointments',
    image: MEDIA.scenes.ownerCall.src,
    alt: 'A business owner taking a call by the window',
  },
  {
    title: 'The local ads waste audit: 8 checks to cut waste and double ROI',
    href: '/blog/the-local-ads-waste-audit-8-exact-checks-to-cut-waste-and-double-booking-roi',
    image: MEDIA.scenes.storefrontStreet.src,
    alt: 'A storefront on a city street',
  },
  {
    title: 'Smart availability: fill your calendar without discounting',
    href: '/blog/smart-availability-how-to-structure-schedules-slots-and-pricing-to-fill-your-calendar-without-discounting',
    image: MEDIA.scenes.counterConsult.src,
    alt: 'Owners reviewing work at a shop counter',
  },
];

const HEALTH_WELLNESS: IndustryPageContent = {
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
    title: 'Why wellness owners choose Keystone',
    cards: [
      {
        id: 'rebook',
        statement: 'New clients find the studio, book online, and rebook before they leave.',
        image: MEDIA.socialProof.thumbsDesktop.t06.src,
        alt: 'A wellness studio session in progress',
        results: [
          { value: '+42%', label: 'New bookings' },
          { value: '64%', label: 'Return rate' },
        ],
      },
      {
        id: 'fast-reply',
        statement: 'Every inquiry gets a fast reply, so fewer prospects slip away.',
        image: MEDIA.socialProof.thumbsDesktop.t02.src,
        alt: 'A business owner on the phone at her laptop',
        results: [
          { value: '< 2 min', label: 'Avg. response' },
          { value: '+27%', label: 'Close rate' },
        ],
      },
      {
        id: 'one-login',
        statement: 'One login runs the site, reminders, and reviews — hours back every week.',
        image: MEDIA.socialProof.thumbsDesktop.t05.src,
        alt: 'A focused business owner at work',
        results: [
          { value: '4.9★', label: 'Average rating' },
          { value: '12 hrs', label: 'Saved / week' },
        ],
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
          'Yes. Studios, gyms, spas, salons, clinics, and solo practitioners all run on Keystone. The system adapts to how you book and serve clients.',
      },
      {
        id: 'booking',
        question: 'Will it work with my booking or scheduling tool?',
        answer:
          'Keystone runs your front desk end to end, and our team helps you connect or replace the tools you use today during onboarding.',
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
        answer:
          'One simple plan at $249/month per location with every tool included — no contracts and no negotiation.',
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

const HOME_SERVICES: IndustryPageContent = {
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

  benefits: {
    eyebrow: 'Why Keystone',
    title: 'Built to keep your schedule full',
    items: [
      {
        icon: <MessageChatCircle />,
        title: 'Book more jobs',
        description:
          'Every call, text, and form gets answered and scheduled fast, so you win the jobs your competitors miss.',
      },
      {
        icon: <Target04 />,
        title: 'Keep the phone ringing',
        description:
          'Local ads and search put you in front of nearby homeowners exactly when they need you.',
      },
      {
        icon: <RefreshCcw05 />,
        title: 'Earn repeat & referral work',
        description:
          'Automated follow-up, maintenance reminders, and review requests turn one job into the next.',
      },
      {
        icon: <BarChartSquare02 />,
        title: 'Know your numbers',
        description:
          'Track where jobs come from and what each channel is worth, all in one place.',
      },
    ],
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
          'HVAC, plumbing, electrical, cleaning, landscaping, and most home-services trades. The system fits how you quote, schedule, and invoice.',
      },
      {
        id: 'afterhours',
        question: 'Can it handle after-hours leads?',
        answer:
          'Yes. Keystone answers calls, texts, and forms around the clock and books jobs so nothing slips through.',
      },
      {
        id: 'website',
        question: 'Do you replace my current website?',
        answer:
          'We build and run a fast, conversion-ready site — or improve what you have — as part of your plan.',
      },
      {
        id: 'cost',
        question: 'How much does it cost?',
        answer:
          'One plan at $249/month per location with everything included. No contracts, no negotiation.',
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

const SMALL_BUSINESS: IndustryPageContent = {
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
        id: 'cost',
        question: 'How much does it cost?',
        answer:
          'One simple plan at $249/month per location. No contracts, no negotiation, simple to scale.',
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

const ALL: IndustryPageContent[] = [HEALTH_WELLNESS, HOME_SERVICES, SMALL_BUSINESS];

/** All authored industry pages, keyed by slug. */
export const INDUSTRY_PAGES: Record<string, IndustryPageContent> = Object.fromEntries(
  ALL.map((page) => [page.slug, page]),
);

export function getIndustryPage(slug: string): IndustryPageContent | undefined {
  return INDUSTRY_PAGES[slug];
}
