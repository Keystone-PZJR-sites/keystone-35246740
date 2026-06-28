// Your Health Solutions — Keystone health & wellness case study.
// All figures are real, pulled from the Keystone production CRM on 2026-06-28.
// Owner quotes are verbatim from Jessica Blancato Roche's text thread with the
// Keystone team. Source dossier: docs/case-studies/your-health-solutions.md.
// Photos are registered in data/media.ts under
// MEDIA.caseStudies.yourHealthSolutions.

import type { CaseStudyContent } from '@/design-system/patterns/case-studies';
import { MEDIA } from '@/data/media';

const IMG = MEDIA.caseStudies.yourHealthSolutions;

export const YOUR_HEALTH_SOLUTIONS: CaseStudyContent = {
  slug: 'your-health-solutions',
  metaTitle: 'How a brand-new med spa booked 320 leads at $3.50 each | Keystone',
  metaDescription:
    'Your Health Solutions opened its doors and turned on all seven Keystone tools at once. The result: 320 tracked leads at about $3.50 each, 34,356 AI follow-up texts, and a wall of 5-star reviews — from day one.',

  card: {
    summary:
      '“We’re only spending $10 a day” — a brand-new med spa filled its calendar with 320 leads at about $3.50 each.',
    stats: [
      { value: '320', label: 'leads tracked' },
      { value: '$3.50', label: 'per lead' },
      { value: '5.0★', label: '25 Google reviews' },
    ],
    person: 'Jessica Blancato Roche',
    business: 'Your Health Solutions',
    media: {
      image: IMG.gbp1.src,
      alt: 'Inside the Your Health Solutions med spa',
    },
  },

  hero: {
    eyebrow: 'Case study · Health & wellness',
    title: 'How a brand-new med spa booked 320 leads at $3.50 each',
    subtitle:
      'Jessica Blancato Roche opened Your Health Solutions and flipped on every Keystone tool at once — website, ads, social, Google, content, reviews, and an AI front desk. Within months the calendar was filling on a $10-a-day ad budget.',
    meta: ['Portland, CT', 'Med spa · wellness & aesthetics', 'Live from grand opening'],
    stats: [
      { value: '320', label: 'leads tracked' },
      { value: '34,356', label: 'AI follow-up texts' },
      { value: '$3.50', label: 'cost per lead' },
    ],
    media: {
      image: IMG.gbp5.src,
      alt: 'A treatment room at Your Health Solutions',
    },
  },

  blocks: [
    {
      type: 'tldr',
      summary:
        'Your Health Solutions is a wellness-and-aesthetics med spa in Portland, CT — injectables, body contouring, facials, and IV therapy. As a brand-new business it needed to fill its calendar fast, so it launched on the full Keystone stack at once. Ads drove cheap, high-intent leads; an AI front desk answered every one instantly; and a steady content cadence built local authority from week one.',
      takeaways: [
        '320 leads tracked — 147 from Meta ads and 77 from website forms — at about $3.50 per lead.',
        'An AI front desk sent 34,356 follow-up texts, reaching 301 distinct leads — the highest engagement volume of any studio we’ve run.',
        'On roughly $10/day in ad spend: 79,658 impressions and 6,588 clicks for $1,814 total.',
        'A real content engine: 389 social posts and 53 blog posts published.',
        '25 Google reviews at a 5.0★ average — 24 of them five-star.',
      ],
      stats: [
        { value: '147', label: 'leads from Meta ads' },
        { value: '301', label: 'distinct leads reached' },
        { value: '7', label: 'tools, one login' },
      ],
    },

    {
      type: 'prose',
      id: 'the-business',
      eyebrow: 'The business',
      title: 'A new med spa that needed a calendar — fast',
      body: [
        'Your Health Solutions opened in Portland, CT with a clear promise: “Wellness & Aesthetics for Everyone.” Injectables, body contouring, facials, IV therapy — a clean, welcoming space that early clients describe as calming and professional, with staff who explain every step.',
        'But a brand-new med spa has no calendar to coast on. Jessica needed bookings from the moment the doors opened, and she needed them faster than a small team could realistically chase by hand. Rather than bolt on one tool at a time, she launched on the entire Keystone stack at once — and let the system do the front-office work from day one.',
      ],
      media: {
        image: IMG.gbp1.src,
        alt: 'The clean, modern interior of Your Health Solutions',
      },
      mediaSide: 'end',
      callout: {
        variant: 'quote',
        text: 'Good morning — we had our grand opening yesterday. I’d like to run the deals today so people can start booking.',
        attribution: 'Jessica Blancato Roche, on day one',
      },
    },

    {
      type: 'stat-band',
      eyebrow: 'By the numbers',
      title: 'The first months on Keystone',
      description: 'Real figures from the Keystone production CRM, pulled on June 28, 2026.',
      stats: [
        { value: '320', label: 'leads tracked' },
        { value: '34,356', label: 'AI follow-up texts' },
        { value: '389', label: 'social posts' },
        { value: '53', label: 'blog posts' },
        { value: '5.0★', label: '25 reviews' },
      ],
    },

    {
      type: 'comparison',
      eyebrow: 'The shift',
      title: 'Opening day, two ways',
      before: {
        label: 'Opening without a system',
        stats: [
          { value: 'Empty', label: 'calendar to fill' },
          { value: 'By hand', label: 'lead follow-up' },
          { value: '0', label: 'content cadence' },
        ],
        points: [
          'Ad leads arrive faster than a small team can answer',
          'No social or blog rhythm building local trust',
          'Every missed reply is a booking lost on day one',
        ],
      },
      after: {
        label: 'Opening on Keystone',
        stats: [
          { value: '$3.50', label: 'per lead' },
          { value: '< 1 min', label: 'first reply' },
          { value: '7', label: 'tools, one login' },
        ],
        points: [
          'Meta ads feed a CRM that texts every lead back instantly',
          'A steady drumbeat of social + blog content from week one',
          'A growing wall of 5-star Google reviews',
        ],
      },
    },

    {
      type: 'tools',
      eyebrow: 'The stack',
      title: 'All seven tools, live from day one',
      description: 'Your Health Solutions runs the complete Keystone front office — every core tool turned on at launch.',
      items: [
        { name: 'Website', detail: 'A conversion-focused site with forms that fed 77 of the tracked leads.' },
        { name: 'Meta ads', detail: 'Facebook & Instagram campaigns tuned to about $3.50 per lead on ~$10/day.' },
        { name: 'Social manager', detail: '389 Instagram + Facebook posts keeping the new spa visible and active.' },
        { name: 'Google Business Profile', detail: 'A managed profile that anchors local search and houses the reviews.' },
        { name: 'AI front desk', detail: 'Instant text follow-up — even end-to-end in Spanish — answering and booking 24/7.' },
        { name: 'Content engine', detail: '53 blog posts building search authority for a brand-new domain.' },
      ],
    },

    {
      type: 'chart',
      eyebrow: 'Where the leads came from',
      title: '320 tracked leads, by source',
      caption: 'Paid social did the heavy lifting, with the website and other channels filling in the rest.',
      bars: [
        { label: 'Meta ads', value: 147, display: '147', highlight: true },
        { label: 'Other sources', value: 96, display: '96' },
        { label: 'Website forms', value: 77, display: '77' },
      ],
      footnote: 'Source attribution as recorded in the Keystone CRM. “Other” includes social, referral, and direct inquiries.',
    },

    {
      type: 'callout',
      variant: 'metric',
      label: 'The economics',
      text:
        'On roughly $10 a day, Meta ads produced 79,658 impressions and 6,588 clicks for $1,814 total — and a cost per lead around $3.50. For a med spa, that’s a remarkable cost to put a real prospect in front of the front desk.',
    },

    {
      type: 'prose',
      id: 'how-it-works',
      eyebrow: 'How it works',
      title: 'An AI front desk that even closes in Spanish',
      body: [
        'The engine behind the numbers is speed and consistency. Every ad lead and form submission gets an instant text back — 228 instant ad-lead replies and 68 form-submission replies on top of 34,356 nurturing follow-ups, reaching 301 distinct leads in total. That’s the workload of a full-time front desk, running every hour of every day.',
        'It’s not just volume, it’s capability. In one real conversation the AI front desk handled a Spanish-speaking lead entirely in Spanish — quoting pricing, sending the maps and booking links, working through objections, and booking a nasolabial-fold and double-chin consult end to end. No human had to step in until the client walked through the door.',
      ],
      media: {
        image: IMG.gbp4.src,
        alt: 'A treatment area at Your Health Solutions',
      },
      mediaSide: 'start',
      callout: {
        variant: 'insight',
        label: 'Why it matters',
        text: 'A bilingual front desk that never sleeps means no high-intent lead waits — or gets lost in translation — before someone’s ready to book.',
      },
    },

    {
      type: 'timeline',
      eyebrow: 'The rollout',
      title: 'From grand opening to booked out',
      items: [
        {
          date: 'Jan 2026',
          title: 'Grand opening & full launch',
          body: 'The spa opened and went live on the entire Keystone stack the same week — website, social, Google, content, and the AI front desk all at once.',
        },
        {
          date: 'Feb 2026',
          title: 'Ads switch on',
          body: 'Meta campaigns went live. Jessica’s reaction: “I saw the ads are running, they look great, thank you!” — and the leads started flowing.',
        },
        {
          date: 'Spring 2026',
          title: 'Content & reviews compound',
          body: '389 social posts and 53 blog posts later, the new brand was everywhere locally — and the Google reviews climbed to a 5.0★ average.',
        },
        {
          date: 'Today',
          title: '320 leads and counting',
          body: '320 tracked leads at ~$3.50 each, consults booked straight from the pipeline, and a front office that runs itself.',
        },
      ],
    },

    {
      type: 'quote',
      quote:
        'I saw the ads are running, they look great, thank you! Wow, that’s so awesome — and we’re only spending $10 a day right now. You’re the best, honestly!',
      attribution: 'Jessica Blancato Roche, Owner — Your Health Solutions',
      results: [
        { value: '320', label: 'leads tracked' },
        { value: '$3.50', label: 'per lead' },
      ],
      media: {
        image: IMG.gbp1.src,
        alt: 'Jessica Blancato Roche’s med spa, Your Health Solutions',
      },
    },

    {
      type: 'gallery',
      eyebrow: 'Inside the spa',
      title: 'A space worth booking',
      images: [
        { image: IMG.gbp5.src, alt: 'A treatment room at Your Health Solutions' },
        { image: IMG.gbp4.src, alt: 'The interior of Your Health Solutions' },
        { image: IMG.gbp1.src, alt: 'The welcoming space at Your Health Solutions' },
      ],
      caption: 'Clean, calming, and professional — the experience clients describe in their 5-star reviews.',
    },

    {
      type: 'prose',
      id: 'where-now',
      eyebrow: 'Where they are now',
      title: 'A new business that launched at full speed',
      body: [
        'Most new med spas spend their first year fighting for visibility. Your Health Solutions skipped that phase. With 320 tracked leads, a content engine running at hundreds of posts, and a 5.0★ reputation across 25 Google reviews, it opened looking like an established practice — because the marketing infrastructure was there on day one.',
        'For Jessica, the value isn’t any single tool. It’s that the whole front office — ads, replies, content, reviews, booking — runs from one login, at a cost she can see and control, so she can focus on patients instead of software.',
      ],
      callout: {
        variant: 'insight',
        label: 'The takeaway',
        text: 'Turning on everything at once let a brand-new med spa open at full speed — cheap leads, instant replies, and a real reputation, all from the first week.',
      },
    },
  ],

  closing: {
    title: 'Open — or grow — your med spa on Keystone',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
