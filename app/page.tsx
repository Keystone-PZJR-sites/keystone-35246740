// ============================================================
// HOME PAGE — Custom Corporate Site
// ============================================================
// Server Component. Fetches data and passes it down to client
// leaf components. No 'use client' here.
// ============================================================

import { HeroAnimatic, WorkShowcase } from '@/components/sections';
import type { WorkCardData, WorkIndustry, HeadlinePart } from '@/components/sections';

// ---------------------------------------------------------------------------
// Work Showcase — industry data
// ---------------------------------------------------------------------------

const WORK_INDUSTRIES: WorkIndustry[] = [
  {
    id: 'health',
    label: 'HEALTH & BODY',
    activeColor: '#f57e56',
    subLabels: ['Fitness', 'Wellness', 'Beauty', 'Grooming', 'Medical', 'Dental'],
    subLabelsColor: '#f57e56',
    chipBg: '#ffbb8a',
    chipText: '#9f3722',
  },
  {
    id: 'food',
    label: 'FOOD & DRINK',
    activeColor: '#9c65ee',
    subLabels: ['Restaurants', 'Cafés', 'Bars', 'Food Trucks', 'Bakeries', 'Catering'],
    subLabelsColor: '#56a6ff',
    chipBg: '#D8C2FF',
    chipText: '#6E3CA7',
  },
  {
    id: 'home',
    label: 'HOME & PROPERTY',
    activeColor: '#F2BA46',
    subLabels: ['Contractors', 'Trades', 'Landscaping', 'Cleaning'],
    subLabelsColor: '#F2BA46',
    chipBg: '#F2D474',
    chipText: '#835F20',
  },
  {
    id: 'money',
    label: 'MONEY & BUSINESS',
    activeColor: '#399587',
    subLabels: ['Retail', 'Legal', 'Accounting', 'Tax', 'Real Estate', 'Insurance'],
    subLabelsColor: '#399587',
    chipBg: '#AAE0D2',
    chipText: '#318175',
  },
  {
    id: 'care',
    label: 'CARE & MAINTENANCE',
    activeColor: '#56a6ff',
    subLabels: ['Pet Services', 'Auto', 'Repair', 'Restoration'],
    subLabelsColor: '#9c65ee',
    chipBg: '#9DCBFF',
    chipText: '#055CFF',
  },
];

// ---------------------------------------------------------------------------
// Work Showcase — Health & Body card contents
// ---------------------------------------------------------------------------

const healthSalesContent = {
  messages: [
    {
      side: 'studio' as const,
      text: "Hi Jamie! Sam from X2O Studio here, so glad you reached out! Want to book a free 1:1 intro consultation? 30 minutes with one of our instructors, no class pressure. I have openings tomorrow at 10am or Thursday at 5:30pm.",
    },
    {
      side: 'customer' as const,
      text: "Thursday works better. Is it on the reformer or just a tour?",
    },
    {
      side: 'studio' as const,
      text: "Thursday 5:30 it is! The session is part studio tour, part reformer workout and your instructor will run you through the basics so they can recommend the right starting point for you.",
    },
    {
      side: 'customer' as const,
      text: "Sounds good. Anything I should send over beforehand?",
      timestamp: "Read: Yesterday, 10:48 AM",
    },
    {
      side: 'studio' as const,
      text: "Nothing required, just wear something fitted. We'll have grip socks available if you need them.\n\nYou're booked for Thursday 5:30pm with Maya, we'll send a reminder the day before. Excited to see you at X2O, Jamie!",
    },
  ],
};

const healthAdsContent = {
  profileLabel: 'x2o Studio / Sponsored',
  photoSrcs: [
    '/work-showcase/health-ads-photo-1.png',
    '/work-showcase/health-ads-photo-2.png',
    '/work-showcase/health-ads-photo-3.png',
    '/work-showcase/health-ads-photo-4.png',
  ] as [string, string, string, string],
  caption:
    "The workout that actually sticks.\nLow-impact, full-body, never the same class twice. Come try us, the first class is on us!",
  ctaLabel: 'Learn More',
  avatarDefaultSrc: '/work-showcase/avatar-x20-default.svg',
  avatarFocusedSrc: '/work-showcase/avatar-x20-focused.svg',
  threeDotsIconSrc: '/work-showcase/ads-icon-three-dots.svg',
  linkArrowDefaultSrc: '/work-showcase/ads-icon-link-arrow.svg',
  linkArrowFocusedSrc: '/work-showcase/ads-icon-link-dark.svg',
};

const healthSocialContent = {
  profileName: 'x2o Studio',
  photoSrc: '/work-showcase/health-social-photo.png',
  photoOverlaySrc: '/work-showcase/health-social-photo-2.png',
  caption:
    'Starting the day strong with @MovaPilates! Join us for a class! #pilates #fitness #healthylifestyle',
  avatarDefaultSrc: '/work-showcase/avatar-x20-default.svg',
  avatarFocusedSrc: '/work-showcase/avatar-x20-focused.svg',
  heartIconSrc: '/work-showcase/social-icon-heart.svg',
  heartIconFocusedSrc: '/work-showcase/social-icon-heart-focused.svg',
  commentIconSrc: '/work-showcase/social-icon-comment.svg',
  shareIconSrc: '/work-showcase/social-icon-share.svg',
  saveIconSrc: '/work-showcase/social-icon-save.svg',
};

const healthWebContent = {
  logoSrc: '/work-showcase/health-web-logo.svg',
  navLinks: ['Locations', 'Blog', 'About Us', 'FAQ'],
  buyButtonLabel: 'Buy Classes',
  bookButtonLabel: 'Book Now',
  heroSrc: '/work-showcase/health-web-hero.png',
  heroOverlaySrc: '/work-showcase/health-web-hero-2.png',
  heroHeadlineLines: ['High Intensity. Low Impact.', 'Real Results.'],
  bookCtaLabel: 'Book Your Class',
  belowFoldHeading: 'Train Your Way at X2O Studio',
  galleryImageSrcs: [
    '/work-showcase/health-web-gallery-1.png',
    '/work-showcase/health-web-gallery-2.png',
    '/work-showcase/health-web-gallery-3.png',
  ] as [string, string, string],
};

// Mixed-oblique headline parts — matches Figma exactly
const WORK_HEADLINE_PARTS: HeadlinePart[] = [
  { text: 'Marketing that ' },
  { text: 'works', oblique: true },
  { text: ' as ' },
  { text: 'hard', oblique: true },
  { text: ' as you do.' },
];

const healthContentCardContent = {
  wordmarkSrc: '/work-showcase/health-content-wordmark.svg',
  tagLabel: 'BLOG',
  headline: "A Personal Journey \nto Strength and Flexibility",
  byline: 'Ellen Piccolotti',
  photoSrc: '/work-showcase/health-content-photo.png',
  bodyParagraphs: [
    "Throughout the years, I've explored various fitness regimes. I've always been intrigued by the differences and benefits of Pilates vs weight training. Both have unique advantages and understanding them can help you make an informed decision about your fitness journey.",
    "With a plethora of information out there, it's important to rely on authentic experiences and well-researched facts. This article aims to do just that—drawing from my experiences and the latest research in the fitness industry.",
  ] as [string, string],
};

// ---------------------------------------------------------------------------
// Work Showcase — flat card array (25 total, non-Health industries
// use Health & Body assets as placeholders per spec)
// ---------------------------------------------------------------------------

function makeCards(industryId: string): WorkCardData[] {
  return [
    { type: 'sales', industryId, chipLabel: 'SALES', content: healthSalesContent },
    { type: 'ads', industryId, chipLabel: 'ADS', content: healthAdsContent },
    { type: 'social', industryId, chipLabel: 'SOCIAL', content: healthSocialContent },
    { type: 'web', industryId, chipLabel: 'WEB', content: healthWebContent },
    { type: 'content', industryId, chipLabel: 'CONTENT', content: healthContentCardContent },
  ];
}

const WORK_CARDS: WorkCardData[] = [
  ...makeCards('health'),
  ...makeCards('food'),
  ...makeCards('home'),
  ...makeCards('money'),
  ...makeCards('care'),
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function HomePage() {
  return (
    <main>
      <HeroAnimatic
        headlineLine1="Always ON "
        headlineLine2="SALES & MARKETING"
        subheadline="A team of experts running your marketing while you run your business."
        cta1Label="Learn more"
        cta1Href="#"
        cta2Label="Get started"
        cta2Href="#"
        // Video file per spec default: public/videos/hero-animatic.mp4
        // Using existing file until the production asset is added.
        videoSrc="/videos/home-hero-bg.mp4"
        wordmarkSrc="/images/keystone-wordmark.svg"
        markSrc="/images/keystone-mark.svg"
      />
      <WorkShowcase
        headlineParts={WORK_HEADLINE_PARTS}
        industries={WORK_INDUSTRIES}
        cards={WORK_CARDS}
      />
    </main>
  );
}
