// Palm Coast Zivel — Keystone health & wellness case study.
// All figures are real, pulled from the Keystone production CRM on 2026-06-28.
// Owner quotes are verbatim from Kelly Lang's text thread with the Keystone team.
// Source dossier: docs/case-studies/palm-coast-zivel.md. Photos are registered
// in data/media.ts under MEDIA.caseStudies.palmCoastZivel.

import type { CaseStudyContent } from '@/design-system/patterns/case-studies';
import { MEDIA } from '@/data/media';

const IMG = MEDIA.caseStudies.palmCoastZivel;

export const PALM_COAST_ZIVEL: CaseStudyContent = {
  slug: 'palm-coast-zivel',
  metaTitle: 'How Palm Coast Zivel turned 257 leads into a booked-out recovery studio | Keystone',
  metaDescription:
    'A Florida wellness & recovery studio plugged its ads, website, and front desk into Keystone — and turned 257 tracked leads into a steady stream of booked, paying members, with an AI front desk replying in under a minute.',

  card: {
    summary:
      '“Too many leads!!!” — Keystone’s ads, website, and AI front desk turned a Florida recovery studio into a booked-out calendar.',
    stats: [
      { value: '257', label: 'leads tracked' },
      { value: '22', label: 'consults booked' },
      { value: '5.0★', label: 'average rating' },
    ],
    person: 'Kelly Lang',
    business: 'Palm Coast Zivel',
    media: {
      image: IMG.studio1.src,
      alt: 'Inside the Palm Coast Zivel recovery studio',
    },
  },

  hero: {
    eyebrow: 'Case study · Health & wellness',
    title: 'How Palm Coast Zivel turned 257 leads into a booked-out recovery studio',
    subtitle:
      'Kelly Lang had a beautiful wellness studio and real demand — but follow-up was manual and leads slipped through the cracks. Keystone gave him one system to run the ads, the website, and an AI front desk that never sleeps.',
    meta: ['Palm Coast, FL', 'Wellness & recovery studio', 'On Keystone since 2026'],
    stats: [
      { value: '257', label: 'leads tracked' },
      { value: '12,515', label: 'AI follow-up texts' },
      { value: '$998', label: 'total ad spend' },
    ],
    media: {
      image: IMG.consult.src,
      alt: 'A consultation at Palm Coast Zivel',
    },
  },

  blocks: [
    {
      type: 'tldr',
      summary:
        'Palm Coast Zivel is a performance-and-recovery studio in Palm Coast, FL — sauna, cryotherapy, red-light, float, compression, and body contouring. Keystone replaced a patchwork of manual follow-up with one connected system: managed Meta ads, a conversion-focused website, and an AI front desk that texts every new lead back in under a minute.',
      takeaways: [
        '257 leads captured and tracked in the Keystone CRM since the front desk went live.',
        'An AI front desk sent 12,515 follow-up texts, reaching 243 distinct leads — with no extra hire.',
        '22 consults booked and 14 leads converted to paying members straight from the pipeline.',
        '$998 in Meta ad spend produced 71,420 impressions and 8,148 clicks — about 12¢ a click.',
        'A wall of 5.0★ reviews and 14 published blog posts, all run from one login.',
      ],
      stats: [
        { value: '47', label: 'hot leads flagged' },
        { value: '14', label: 'new members' },
        { value: '8,148', label: 'ad clicks' },
      ],
    },

    {
      type: 'prose',
      id: 'the-business',
      eyebrow: 'The business',
      title: 'A recovery studio built on great in-person experiences',
      body: [
        'Walk into Zivel in Palm Coast and you exhale. It’s a modern wellness and recovery studio — infrared sauna, cryotherapy, red-light therapy, float, compression, body contouring, and cryofacials — built around helping people heal faster, move better, and feel like themselves again. Regulars describe it as immaculate, zen, and beautifully curated.',
        'Owner Kelly Lang had the hard part nailed: a space and a team people rave about. What he didn’t have was a way to keep up with the interest it generated. Inquiries came in from Facebook, Instagram, and the website, but answering them was manual and slow — and the busier the studio got, the more leads went cold while Kelly was on the floor with clients.',
      ],
      media: {
        image: IMG.interior.src,
        alt: 'The calm, spa-like interior of Palm Coast Zivel',
      },
      mediaSide: 'end',
      callout: {
        variant: 'quote',
        text:
          'I can’t imagine what we would be like if we actually had a website, a brand presence, and AI-driven processes in place.',
        attribution: 'Kelly Lang — before going all-in with Keystone',
      },
    },

    {
      type: 'stat-band',
      eyebrow: 'By the numbers',
      title: 'What the first stretch on Keystone looked like',
      description: 'Real figures from the Keystone production CRM, pulled on June 28, 2026.',
      stats: [
        { value: '257', label: 'leads tracked' },
        { value: '12,515', label: 'AI follow-up texts' },
        { value: '22', label: 'consults booked' },
        { value: '14', label: 'new members' },
        { value: '5.0★', label: 'average rating' },
      ],
    },

    {
      type: 'comparison',
      eyebrow: 'The shift',
      title: 'How running the studio changed',
      before: {
        label: 'Before Keystone',
        stats: [
          { value: 'Manual', label: 'lead follow-up' },
          { value: 'Hours', label: 'before a reply' },
          { value: 'Several', label: 'disconnected tools' },
        ],
        points: [
          'Leads from ads and the site landed in different places',
          'Follow-up happened whenever Kelly got off the floor',
          'No single view of what was actually working',
        ],
      },
      after: {
        label: 'With Keystone',
        stats: [
          { value: '< 1 min', label: 'first reply' },
          { value: '257', label: 'leads tracked' },
          { value: '1', label: 'place to run it' },
        ],
        points: [
          'Every new lead gets an instant, on-brand text back',
          'The AI front desk nurtures cold leads automatically',
          'Ads, site, leads, and reviews live in one dashboard',
        ],
      },
    },

    {
      type: 'tools',
      eyebrow: 'The stack',
      title: 'Everything Keystone runs for Zivel',
      description: 'One subscription, one login — the full front office of the business.',
      items: [
        { name: 'Website', detail: 'A fast, conversion-focused site built to turn visitors into booked appointments.' },
        { name: 'Meta ads', detail: 'Facebook & Instagram campaigns, managed end to end and optimized for cost per lead.' },
        { name: 'AI front desk', detail: 'Instant text follow-up that answers questions, qualifies, and books — 24/7.' },
        { name: 'Content engine', detail: '14 published blog posts that build local search visibility over time.' },
        { name: 'Reviews', detail: 'Review capture that turned happy clients into a 5.0★ public reputation.' },
        { name: 'One dashboard', detail: 'Ads, leads, bookings, and reviews in a single place Kelly actually checks.' },
      ],
    },

    {
      type: 'chart',
      eyebrow: 'The funnel',
      title: 'From first click to paying member',
      caption:
        'How the 257 tracked leads moved through the pipeline once the AI front desk started replying instantly.',
      bars: [
        { label: 'Leads captured', value: 257, display: '257' },
        { label: 'Flagged hot by the AI', value: 47, display: '47' },
        { label: 'Consults booked', value: 22, display: '22' },
        { label: 'Converted to members', value: 14, display: '14', highlight: true },
      ],
      footnote:
        'Hot-lead count reflects leads the AI front desk flagged as high-intent. Members = leads marked purchased in the CRM.',
    },

    {
      type: 'prose',
      id: 'how-it-works',
      eyebrow: 'How it works',
      title: 'The studio that answers in under a minute',
      body: [
        'The change customers feel is speed. The moment someone clicks an ad or fills out the website form, Keystone’s AI front desk texts them back — in under a minute, in Zivel’s voice — answers their questions, and nudges them toward booking. Across the account it has sent 12,515 follow-up texts and reached 243 distinct leads, plus 259 instant replies to fresh ad leads.',
        'That’s work a front-desk hire would do, running around the clock without one. Kelly stays on the floor with clients while the system keeps every lead warm. When a lead is ready, it lands in his pipeline already qualified — which is exactly how a Facebook ad lead who’d “never followed through” ended up filling out the website form and booking a Day Pass after one call.',
      ],
      media: {
        image: IMG.studio2.src,
        alt: 'A treatment space inside Palm Coast Zivel',
      },
      mediaSide: 'start',
    },

    {
      type: 'callout',
      variant: 'metric',
      label: 'What $998 bought',
      text:
        'Roughly six weeks of managed Meta ads produced 71,420 impressions and 8,148 clicks for $998 in spend — about 12¢ per click into a funnel that answers instantly.',
    },

    {
      type: 'timeline',
      eyebrow: 'The rollout',
      title: 'How it came together',
      items: [
        {
          date: 'Early 2026',
          title: 'Onboarding & the new website',
          body: 'Keystone stood up a fast, on-brand website built around booking, and connected the studio’s social and reviews into one system. Kelly’s reaction to the site: “This is way better. Way better. Love it.”',
        },
        {
          date: 'Spring 2026',
          title: 'AI front desk goes live',
          body: 'Instant text follow-up switched on, and leads started flowing into the CRM. Within days Kelly was watching hot leads roll in automatically — “But it’s alive!”',
        },
        {
          date: 'May–Jun 2026',
          title: 'Ads scale up',
          body: 'Managed Meta campaigns scaled to 71,420 impressions and 8,148 clicks on just $998 — feeding a pipeline that now reads “Too many leads!!!”',
        },
        {
          date: 'Today',
          title: 'A booked-out, 5-star studio',
          body: '257 leads tracked, 22 consults booked, 14 new members, and a perfect 5.0★ review average — all run from one login.',
        },
      ],
    },

    {
      type: 'quote',
      quote:
        'Too many leads!!! Had a great conversation with a new lead that came in through the website — she’d seen the Facebook ad but never followed through, then filled out the form, and I booked her for a Day Pass today.',
      attribution: 'Kelly Lang, Owner — Palm Coast Zivel',
      results: [
        { value: '257', label: 'leads tracked' },
        { value: '22', label: 'consults booked' },
      ],
      media: {
        image: IMG.ownerKelly.src,
        alt: 'At Palm Coast Zivel',
      },
    },

    {
      type: 'gallery',
      eyebrow: 'Inside the studio',
      title: 'The experience behind the numbers',
      images: [
        { image: IMG.studio3.src, alt: 'A recovery suite at Palm Coast Zivel' },
        { image: IMG.studio4.src, alt: 'Equipment and treatment area at Palm Coast Zivel' },
        { image: IMG.storefront.src, alt: 'The Zivel Palm Coast storefront sign' },
      ],
      caption: 'Zivel’s in-person experience is the product — Keystone’s job is to fill the calendar with people who get to feel it.',
    },

    {
      type: 'prose',
      id: 'where-now',
      eyebrow: 'Where they are now',
      title: 'A front office that runs itself',
      body: [
        'Zivel is closing memberships at a pace Kelly describes as “a new member close per day,” and the lead engine has gone from a trickle he chased to a flow he has to keep up with. The reviews back it up: a perfect 5.0★ average across the studio’s public profile.',
        'The deeper win is leverage. The same small team now reaches hundreds of prospects, answers every one instantly, and never loses a lead to a slow reply — without anyone working nights to make it happen. That’s the difference between a great studio and a great studio that’s also a growing business.',
      ],
      callout: {
        variant: 'insight',
        label: 'The takeaway',
        text:
          'Demand was never the problem. The win was catching it — replying in under a minute, every time, so good leads turn into booked, paying members instead of missed messages.',
      },
    },
  ],

  closing: {
    title: 'The easiest way to grow your wellness business',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
