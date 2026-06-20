// Authored content for the redesigned /about "Our story" page (spec 043).
// The page file composes design-system sections and feeds them this data —
// nothing is hardcoded inside the components.
//
// NOTE: copy here is authored in Keystone's voice and aligned to the company
// narrative (agentic sales & marketing for local/service businesses). Photo /
// film slots reference real team imagery from the media registry. The `stats`
// figures are rounded, representative numbers drawn from the founding team's
// prior track record and target market size (not audited Keystone metrics) —
// confirm exact figures with the team before treating them as hard claims.

import type { Stat, TimelineMilestone } from '@/design-system';
import { MEDIA } from '@/data/media';

export type StoryTileTone = 'brand' | 'mint' | 'ink';

export interface StoryPhotoTile {
  id: string;
  image: string;
}

export interface StoryAction {
  label: string;
  href: string;
}

export interface OurStoryPageContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lede: string; mediaCaption: string; mediaImage: string };
  mission: { heading: string; paragraphs: string[]; photos: StoryPhotoTile[] };
  stats: { eyebrow: string; title: string; items: Stat[] };
  origin: { eyebrow: string; title: string; paragraphs: string[]; photos: StoryPhotoTile[] };
  vision: { eyebrow: string; title: string; description: string; milestones: TimelineMilestone[] };
  careers: {
    eyebrow: string;
    title: string;
    description: string;
    primary: StoryAction;
    secondary: StoryAction;
    photos: StoryPhotoTile[];
  };
  closing: { title: string; actionLabel: string; actionHref: string };
}

export const OUR_STORY_PAGE: OurStoryPageContent = {
  meta: {
    title: 'Our story | Keystone',
    description:
      'How Keystone started, what drives us, and where we are headed — the growth team built to help local businesses win.',
  },

  hero: {
    eyebrow: 'Our story',
    title: 'Helping local businesses grow and win',
    lede: 'Learn how Keystone started, what keeps us going, and why local operators trust us with their growth.',
    mediaCaption: 'Keystone in action',
    mediaImage: MEDIA.socialProof.stills.s01.src,
  },

  mission: {
    heading: 'Inspired by the grit, determination, and talent of local business owners.',
    paragraphs: [
      'They risk everything — years of their lives, their savings, their families — to build something of their own. They are the heart of every neighborhood and the source of most new jobs.',
      'But the deck is stacked against them. The big chains have whole teams for marketing, sales, and technology. Independent operators get agencies that overpromise, DIY tools they never have time to learn, and generic software that leaves money on the table and leads unanswered.',
      'Keystone exists to change that: an AI-native sales and marketing team that builds the brand, drives the traffic, works every lead, and keeps customers coming back — all on autopilot, for a fraction of what it used to cost.',
    ],
    photos: [
      { id: 'm1', image: MEDIA.team.rahulJaswa.src },
      { id: 'm2', image: MEDIA.team.amanjotSingh.src },
      { id: 'm3', image: MEDIA.team.sreenivasanAc.src },
      { id: 'm4', image: MEDIA.team.pawanKumar.src },
      { id: 'm5', image: MEDIA.team.gauravLabhane.src },
      { id: 'm6', image: MEDIA.team.gauravGrover.src },
      { id: 'm7', image: MEDIA.team.manikyaSingh.src },
      { id: 'm8', image: MEDIA.team.aasawariVaidya.src },
    ],
  },

  stats: {
    eyebrow: 'By the numbers',
    title: 'Local businesses need tech that helps them, not hurts them — and we have the track record to prove it.',
    items: [
      {
        value: '$550B',
        label: 'market we serve',
        description: 'annual spend across the self-care and service economy',
      },
      {
        value: '1,000+',
        label: 'businesses served',
        description: 'local operators the founding team has worked with firsthand',
      },
      {
        value: '~80%',
        label: 'lower acquisition cost',
        description: 'CAC reductions delivered with a better funnel and relentless follow-up',
      },
      {
        value: '2–3x',
        label: 'more leads converted',
        description: 'agentic follow-up versus a typical local funnel',
      },
    ],
  },

  origin: {
    eyebrow: 'How it started',
    title: 'Keystone began on the front lines of local business.',
    paragraphs: [
      'Our founders spent years doing this work by hand — building the websites, running the ads, chasing the leads, and winning back customers for hundreds of local operators, one funnel at a time.',
      'It worked: a better digital front door and relentless follow-up brought in customers at a fraction of the usual cost. But doing it manually was expensive and fragile — the moment attention slipped, funnels broke and leads went cold.',
      'So we built Keystone to own that work end to end with AI agents, giving every operator the same growth team without the cost or the upkeep. We have been building for operators like them ever since.',
    ],
    photos: [
      { id: 'o1', image: MEDIA.team.atleyKasky.src },
      { id: 'o2', image: MEDIA.team.amanjotSingh.src },
      { id: 'o3', image: MEDIA.team.rahulJaswa.src },
    ],
  },

  vision: {
    eyebrow: "Where we're going",
    title: 'Our long-term vision goes beyond today.',
    description: 'We are building toward a future where every local business can grow like the biggest companies in the world.',
    milestones: [
      {
        id: 'v1',
        phase: 'Today',
        title: 'We run sales and marketing for service businesses.',
        description:
          'Operators use Keystone as their always-on team — brand and website, social and content, ads, and lead follow-up, all in one place.',
        footnote: 'Starting with the service businesses we know best.',
      },
      {
        id: 'v2',
        phase: 'In 3 years',
        title: 'We automate more of what slows operators down.',
        description:
          'Keystone expands across the service economy and reaches beyond marketing into more of the daily work of running a business.',
        footnote: 'A multi-billion-dollar opportunity as we scale.',
      },
      {
        id: 'v3',
        phase: 'In 10 years',
        title: 'We power every winning local business.',
        description:
          'Keystone becomes the agentic workforce and system of record behind independent operators of every kind, worldwide.',
        footnote: 'The platform local businesses everywhere rely on.',
      },
    ],
  },

  careers: {
    eyebrow: 'Join us',
    title: 'Help local businesses win in the AI era.',
    description:
      'Keystone is for mission-driven, craft-obsessed people who care about local operators and want to put AI to work for them. Come build with us.',
    primary: { label: 'Careers', href: '/about/careers' },
    secondary: { label: 'View open roles', href: '/about/careers' },
    photos: [
      { id: 'c1', image: MEDIA.team.amanjotSingh.src },
      { id: 'c2', image: MEDIA.team.sreenivasanAc.src },
      { id: 'c3', image: MEDIA.team.pawanKumar.src },
      { id: 'c4', image: MEDIA.team.gauravLabhane.src },
      { id: 'c5', image: MEDIA.team.gauravGrover.src },
      { id: 'c6', image: MEDIA.team.manikyaSingh.src },
    ],
  },

  closing: {
    title: 'Want Keystone in your corner?',
    actionLabel: 'Get in touch',
    actionHref: '/get-in-touch',
  },
};
