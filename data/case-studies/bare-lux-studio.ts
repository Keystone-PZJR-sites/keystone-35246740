// Bare Lúx Studio — Keystone health & wellness case study.
// All figures are real, pulled from the Keystone production CRM on 2026-06-28.
// Owner quotes are verbatim from Estefany Crook's text thread with the Keystone
// team. Source dossier: docs/case-studies/bare-lux-studio.md. Photos are
// registered in data/media.ts under MEDIA.caseStudies.bareLuxStudio.

import type { CaseStudyContent } from '@/design-system/patterns/case-studies';
import { MEDIA } from '@/data/media';

const IMG = MEDIA.caseStudies.bareLuxStudio;

export const BARE_LUX_STUDIO: CaseStudyContent = {
  slug: 'bare-lux-studio',
  metaTitle: 'How Bare Lúx Studio earned 94,000+ ad impressions on a lean budget | Keystone',
  metaDescription:
    'A Central Jersey med spa used Keystone to win the most ad reach of any studio we run — 94,493 impressions on ~$1,785 — while an AI front desk replied to every lead, even in Spanish, and a 400-post content engine kept it visible.',

  card: {
    summary:
      '“Too busy with patients” — high-reach ads and an AI front desk kept a Central Jersey med spa at capacity.',
    stats: [
      { value: '94,493', label: 'ad impressions' },
      { value: '109', label: 'leads tracked' },
      { value: '5.0★', label: 'average rating' },
    ],
    person: 'Estefany Crook',
    business: 'Bare Lúx Studio',
    media: {
      image: IMG.aesthetic2.src,
      alt: 'Aesthetic treatment at Bare Lúx Studio',
    },
  },

  hero: {
    eyebrow: 'Case study · Health & wellness',
    title: 'How Bare Lúx Studio earned the most reach of any studio we run',
    subtitle:
      'Estefany Crook wanted reach and a way to capture demand without hiring a full-time front desk. Keystone delivered both — 94,493 ad impressions on a lean budget, funneled into an AI front desk that answers every lead, even in Spanish.',
    meta: ['Bordentown, NJ · Central Jersey', 'Medical spa · aesthetics', 'On Keystone since 2026'],
    stats: [
      { value: '94,493', label: 'ad impressions' },
      { value: '9,383', label: 'AI follow-up texts' },
      { value: '$1,785', label: 'total ad spend' },
    ],
    media: {
      image: IMG.aesthetic1.src,
      alt: 'A calm aesthetic treatment setting at Bare Lúx Studio',
    },
  },

  blocks: [
    {
      type: 'tldr',
      summary:
        'Bare Lúx Studio is a medical spa serving Central Jersey — laser treatments, skin, and injectables. A newer studio without a full-time marketing hire, it used Keystone to buy reach efficiently, capture the demand automatically, and stay visible with a constant content cadence. The result was the highest ad reach of the three health & wellness studios we run.',
      takeaways: [
        '94,493 ad impressions — the most reach of any studio we run — on roughly $1,785 in spend.',
        '109 leads tracked, with an AI front desk sending 9,383 follow-up texts to 100 distinct leads.',
        'The AI even handles Spanish-speaking leads end to end, booking consults autonomously.',
        'A 400-post social engine plus 52 blog posts kept the studio visible across Central Jersey.',
        'A perfect 5.0★ rating — and an owner whose biggest problem became being “too busy with patients.”',
      ],
      stats: [
        { value: '4,736', label: 'ad clicks' },
        { value: '17', label: 'hot leads flagged' },
        { value: '452', label: 'content pieces published' },
      ],
    },

    {
      type: 'prose',
      id: 'the-business',
      eyebrow: 'The business',
      title: 'A growing med spa that needed reach',
      body: [
        'Bare Lúx Studio is a medical spa serving Central Jersey out of Bordentown, NJ — laser treatments, skin care, and injectables, delivered in a space clients return to for over a year and rave about. The treatments and the results were never the question.',
        'The challenge was getting in front of enough of the right people, and then catching that demand, without standing up a full-time marketing department or front desk. As a newer studio, Bare Lúx needed reach it could afford and a system that turned that reach into booked appointments automatically.',
      ],
      media: {
        image: IMG.photo2.src,
        alt: 'Inside Bare Lúx Studio',
      },
      mediaSide: 'end',
      callout: {
        variant: 'quote',
        text: 'It looks good!! You’re the best — thank you.',
        attribution: 'Estefany Crook, on the new Keystone website',
      },
    },

    {
      type: 'stat-band',
      eyebrow: 'By the numbers',
      title: 'What Keystone built for Bare Lúx',
      description: 'Real figures from the Keystone production CRM, pulled on June 28, 2026.',
      stats: [
        { value: '94,493', label: 'ad impressions' },
        { value: '109', label: 'leads tracked' },
        { value: '9,383', label: 'AI follow-up texts' },
        { value: '400', label: 'social posts' },
        { value: '5.0★', label: 'average rating' },
      ],
    },

    {
      type: 'chart',
      eyebrow: 'Reach, compared',
      title: 'The most ad reach of any studio we run',
      caption:
        'Across the three health & wellness studios in this collection, Bare Lúx earned the most impressions — on a comparable, lean budget.',
      bars: [
        { label: 'Bare Lúx Studio', value: 94493, display: '94,493', highlight: true },
        { label: 'Your Health Solutions', value: 79658, display: '79,658' },
        { label: 'Palm Coast Zivel', value: 71420, display: '71,420' },
      ],
      footnote: 'Meta ad impressions over each studio’s active campaign window, as recorded in the ad platform.',
    },

    {
      type: 'comparison',
      eyebrow: 'The shift',
      title: 'Growing without a marketing hire',
      before: {
        label: 'Before Keystone',
        stats: [
          { value: 'Limited', label: 'local reach' },
          { value: 'Manual', label: 'lead capture' },
          { value: '0', label: 'content cadence' },
        ],
        points: [
          'Great treatments, but not enough people seeing them',
          'No full-time front desk to answer every inquiry',
          'No steady social or blog presence to build trust',
        ],
      },
      after: {
        label: 'With Keystone',
        stats: [
          { value: '94,493', label: 'impressions' },
          { value: '< 1 min', label: 'first reply' },
          { value: '1', label: 'place to run it' },
        ],
        points: [
          'High-reach Meta ads at an efficient cost',
          'An AI front desk that texts every lead back instantly',
          'A 400-post social + 52-post blog engine, always on',
        ],
      },
    },

    {
      type: 'tools',
      eyebrow: 'The stack',
      title: 'Everything Keystone runs for Bare Lúx',
      description: 'One subscription covers the studio’s entire front office.',
      items: [
        { name: 'Website', detail: 'A clean, on-brand site clients land on from ads and search.' },
        { name: 'Meta ads', detail: 'High-reach Facebook & Instagram campaigns — 94,493 impressions on a lean budget.' },
        { name: 'Social manager', detail: '400 Instagram + Facebook posts keeping the studio visible across Central Jersey.' },
        { name: 'AI front desk', detail: 'Instant text follow-up that qualifies and books leads — including in Spanish.' },
        { name: 'Content engine', detail: '52 blog posts building organic search visibility over time.' },
        { name: 'Reviews', detail: 'Review capture backing the studio with a public 5.0★ rating.' },
      ],
    },

    {
      type: 'prose',
      id: 'how-it-works',
      eyebrow: 'How it works',
      title: 'Reach is only half the job — the AI does the rest',
      body: [
        'Buying 94,493 impressions is only valuable if someone answers when those impressions turn into messages. That’s the AI front desk’s job. It sent 9,383 follow-up texts and 89 instant ad-lead replies, reaching 100 distinct leads — qualifying and nurturing every one so the studio never lost a prospect to a slow response.',
        'It also speaks the studio’s clientele’s languages. Shown a real transcript of the AI booking a consult end to end in Spanish, Estefany’s take was simple: “Oh, this is pretty good. Yeah, this will be good for us.” The reach fills the top of the funnel; the AI makes sure it converts.',
      ],
      media: {
        image: IMG.photo3.src,
        alt: 'A treatment space at Bare Lúx Studio',
      },
      mediaSide: 'start',
      callout: {
        variant: 'insight',
        label: 'On lead cost',
        text: 'With reach this efficient, leads came in “insanely cheap” — and the AI filters and qualifies them automatically, so the team only spends time on the ones ready to book.',
      },
    },

    {
      type: 'callout',
      variant: 'metric',
      label: 'The best kind of problem',
      text:
        'As the pipeline filled, Estefany’s afternoons booked up back to back. When the Keystone team noted that “too busy with patients is the best problem,” she loved it — because it’s exactly the problem a growing studio wants.',
    },

    {
      type: 'timeline',
      eyebrow: 'The rollout',
      title: 'How it came together',
      items: [
        {
          date: 'Feb 2026',
          title: 'Onboarding & website live',
          body: 'Keystone built the studio’s site and connected social, content, and the AI front desk. Estefany’s verdict on the site: “It looks good!!”',
        },
        {
          date: 'Mar 2026',
          title: 'Ads go live',
          body: 'Meta campaigns launched and quickly scaled into the highest reach of any studio we run — 94,493 impressions and 4,736 clicks.',
        },
        {
          date: 'Spring 2026',
          title: 'Content keeps it visible',
          body: '400 social posts and 52 blog posts kept Bare Lúx in front of Central Jersey while the AI front desk worked every inbound lead.',
        },
        {
          date: 'Today',
          title: 'At capacity',
          body: '109 leads tracked, a 5.0★ rating, and a calendar full enough that “back-to-back patients” is the norm.',
        },
      ],
    },

    {
      type: 'quote',
      quote:
        'It looks good!! You’re the best — thank you. Oh, this [AI] is pretty good. Yeah, this will be good for us.',
      attribution: 'Estefany Crook, Owner — Bare Lúx Studio',
      results: [
        { value: '94,493', label: 'ad impressions' },
        { value: '109', label: 'leads tracked' },
      ],
      media: {
        image: IMG.photo2.src,
        alt: 'Bare Lúx Studio, a Central Jersey medical spa',
      },
    },

    {
      type: 'gallery',
      eyebrow: 'Inside the studio',
      title: 'The work behind the reach',
      images: [
        { image: IMG.aesthetic2.src, alt: 'An aesthetic treatment at Bare Lúx Studio' },
        { image: IMG.microneedling.src, alt: 'A microneedling treatment offered at Bare Lúx Studio' },
        { image: IMG.photo3.src, alt: 'A treatment room at Bare Lúx Studio' },
      ],
      caption: 'Laser, skin, and injectable treatments — the services those 94,493 impressions are selling.',
    },

    {
      type: 'prose',
      id: 'where-now',
      eyebrow: 'Where they are now',
      title: 'A studio that punches above its budget',
      body: [
        'Bare Lúx proves a small studio can win the reach game. With the most ad impressions of any studio in this collection, a constant content presence, and an AI front desk catching every lead — even across languages — it competes for attention like a much larger business, on a budget a newer studio can sustain.',
        'And it does it without a marketing team. The ads, the social, the content, the replies, and the reviews all run from one Keystone subscription, so Estefany can keep her focus where it belongs: on the back-to-back patients walking through the door.',
      ],
      callout: {
        variant: 'insight',
        label: 'The takeaway',
        text: 'Efficient reach plus an always-on AI front desk let a newer studio compete for attention — and convert it — without hiring a marketing department.',
      },
    },
  ],

  closing: {
    title: 'Get this kind of reach for your studio',
    action: { label: 'Get a free demo', href: '/get-in-touch' },
  },
};
