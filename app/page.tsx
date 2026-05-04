// ============================================================
// HOME PAGE — Custom Corporate Site
// ============================================================
// Server Component. Fetches data and passes it down to client
// leaf components. No 'use client' here.
// ============================================================

import {
  HeroAnimatic,
  HeroNav,
  WorkShowcase,
  EveryChannel,
  SocialProofSection,
  PricingSection,
  OversizedFooter,
} from '@/components/sections';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import type {
  WorkCardData,
  WorkIndustry,
  HeadlinePart,
  PillData,
  SocialProofSlide,
  SocialProofThumbnail,
} from '@/components/sections';

// ---------------------------------------------------------------------------
// Work Showcase — industry data
// ---------------------------------------------------------------------------

const WORK_INDUSTRIES: WorkIndustry[] = [
  {
    id: 'health',
    label: 'HEALTH & BODY',
    activeColor: '#f57e56',
    subLabels: ['Fitness', 'Wellness', 'Beauty', 'Grooming', 'Medical', 'Dental'],
    subLabelsColor: '#d75b42',
    chipBg: '#ffbb8a',
    chipText: '#9f3722',
  },
  {
    id: 'food',
    label: 'FOOD & DRINK',
    activeColor: '#895eba',
    subLabels: ['Restaurants', 'Cafés', 'Bars', 'Food Trucks', 'Bakeries', 'Catering'],
    subLabelsColor: '#705095',
    chipBg: '#D8C2FF',
    chipText: '#6E3CA7',
  },
  {
    id: 'home',
    label: 'HOME & PROPERTY',
    activeColor: '#e0a733',
    subLabels: ['Contractors', 'Trades', 'Landscaping', 'Cleaning'],
    subLabelsColor: '#A17212',
    chipBg: '#F2D474',
    chipText: '#835F20',
  },
  {
    id: 'money',
    label: 'MONEY & BUSINESS',
    activeColor: '#399587',
    subLabels: ['Retail', 'Legal', 'Accounting', 'Tax', 'Real Estate', 'Insurance'],
    subLabelsColor: '#2a6f64',
    chipBg: '#AAE0D2',
    chipText: '#318175',
  },
  {
    id: 'care',
    label: 'CARE & MAINTENANCE',
    activeColor: '#519aec',
    subLabels: ['Pet Services', 'Auto', 'Repair', 'Restoration'],
    subLabelsColor: '#1770d3',
    chipBg: '#9DCBFF',
    chipText: '#4772c2',
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
// Every Channel — pill data
// ---------------------------------------------------------------------------

const EVERY_CHANNEL_PILLS: PillData[] = [
  { label: 'Ads',      color: '#ff7c1f', left: '32.2%', top: '14.0%', beatIndex: 0 },
  { label: 'Sales',    color: '#56a6ff', left: '61.5%', top: '38.0%', beatIndex: 1 },
  { label: 'Web',      color: '#5bc3b3', left: '5.4%',  top: '48.7%', beatIndex: 2 },
  { label: 'Leads',    color: '#f2ba46', left: '19.7%', top: '79.2%', beatIndex: 3 },
  { label: 'Reviews',  color: '#f6523c', left: '76.8%', top: '70.5%', beatIndex: 4 },
  { label: 'Content',  color: '#f38bb0', left: '86.6%', top: '27.7%', beatIndex: 5 },
  { label: 'Social',   color: '#9c65ee', left: '39.8%', top: '55.3%', beatIndex: 6 },
];

// ---------------------------------------------------------------------------
// Social Proof — thumbnails (positions are px values at the 1440px Figma canvas)
// ---------------------------------------------------------------------------

// Positions are px values at the 1440×1024 Figma canvas.
// Each thumbnail owns its marker badge — center sits on the top-right corner.
const SOCIAL_THUMBNAILS: SocialProofThumbnail[] = [
  {
    videoSrc: '/social-proof/social-proof-video-1.mp4',
    width: 382, height: 215, initialLeft: 226, initialTop: 61,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    videoSrc: '/social-proof/social-proof-video-2.mp4',
    width: 278, height: 156, initialLeft: 833, initialTop: 88,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    videoSrc: '/social-proof/social-proof-video-3.mp4',
    width: 178, height: 100, initialLeft: 1238, initialTop: 287,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    videoSrc: '/social-proof/social-proof-video-4.mp4',
    width: 275, height: 214, initialLeft: 0, initialTop: 503.5,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    videoSrc: '/social-proof/social-proof-video-5.mp4',
    width: 381, height: 268, initialLeft: 934, initialTop: 684.69,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    videoSrc: '/social-proof/social-proof-video-6.mp4',
    width: 178, height: 100, initialLeft: 328, initialTop: 768,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
];

// Quote shared by slides 1, 2, 4, 6
const QUOTE_CANVA: SocialProofSlide['quoteSegments'] = [
  { text: "I used to spend Sunday nights writing social captions. I haven\u2019t opened Canva in " },
  { text: 'four months', oblique: true },
  { text: '.' },
];

// Quote shared by slides 3, 5
const QUOTE_MARKETING: SocialProofSlide['quoteSegments'] = [
  { text: 'The weird part', oblique: true },
  { text: ' is I think about marketing less than I did before I had a marketing team.' },
];

const SOCIAL_SLIDES: SocialProofSlide[] = [
  {
    videoSrc:       '/social-proof/social-proof-video-1.mp4',
    cardBgColor:    '#d8c2ff',
    textColor:      '#2f0d3f',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    businessName:   'Lean \u0026 Lovely Medspa',
    location:       'Boulder, CO',
    namePillBg:     '#f0e8ff', namePillText:     '#2f0d3f',
    businessPillBg: '#2f0d3f', businessPillText: '#f0eee6',
    locationPillBg: '#9c65ee', locationPillText: '#d8c2ff',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-2.mp4',
    cardBgColor:    '#f57e56',
    textColor:      '#3e181a',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    businessName:   'Lean \u0026 Lovely Medspa',
    location:       'Boulder, CO',
    namePillBg:     '#ffebd9', namePillText:     '#3c1618',
    businessPillBg: '#3c1618', businessPillText: '#f0eee6',
    locationPillBg: '#9f3722', locationPillText: '#ffbb8a',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-3.mp4',
    cardBgColor:    '#6ecc8b',
    textColor:      '#063126',
    quoteSegments:  QUOTE_MARKETING,
    personName:     'Kristen Lovely',
    businessName:   'Lean \u0026 Lovely Medspa',
    location:       'Boulder, CO',
    namePillBg:     '#063126', namePillText:     '#dcfbd9',
    businessPillBg: '#56b373', businessPillText: '#063126',
    locationPillBg: '#dcfbd9', locationPillText: '#063126',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-4.mp4',
    cardBgColor:    '#F2D474',
    textColor:      '#835F20',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    businessName:   'Lean \u0026 Lovely Medspa',
    location:       'Boulder, CO',
    namePillBg:     '#F2BA46', namePillText:     '#835F20',
    businessPillBg: '#835F20', businessPillText: '#F2D474',
    locationPillBg: '#F2BA46', locationPillText: '#835F20',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-5.mp4',
    cardBgColor:    '#AAE0D2',
    textColor:      '#318175',
    quoteSegments:  QUOTE_MARKETING,
    personName:     'Kristen Lovely',
    businessName:   'Lean \u0026 Lovely Medspa',
    location:       'Boulder, CO',
    namePillBg:     '#399587', namePillText:     '#AAE0D2',
    businessPillBg: '#318175', businessPillText: '#AAE0D2',
    locationPillBg: '#AAE0D2', locationPillText: '#318175',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-6.mp4',
    cardBgColor:    '#9DCBFF',
    textColor:      '#055CFF',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    businessName:   'Lean \u0026 Lovely Medspa',
    location:       'Boulder, CO',
    namePillBg:     '#56a6ff', namePillText:     '#f0eee6',
    businessPillBg: '#055CFF', businessPillText: '#9DCBFF',
    locationPillBg: '#9DCBFF', locationPillText: '#055CFF',
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function HomePage() {
  return (
    <SmoothScrollProvider
      fixedChildren={<HeroNav wordmarkSrc="/images/keystone-wordmark.svg" />}
    >
    <main>
      <HeroAnimatic
        headlineLine1="Always ON "
        headlineLine2="SALES & MARKETING"
        subheadline="A team of experts running your marketing while you run your business."
        cta1Label="Learn more"
        cta1Href="#"
        cta2Label="Get started"
        cta2Href="#"
        videoSrc="/videos/home-hero-bg.mp4"
        wordmarkSrc="/images/keystone-wordmark.svg"
        markSrc="/images/keystone-mark.svg"
        renderNav={false}
      />
      <div className="snap-start relative z-10">
        <WorkShowcase
          headlineParts={WORK_HEADLINE_PARTS}
          industries={WORK_INDUSTRIES}
          cards={WORK_CARDS}
        />
      </div>
      <div className="snap-start relative z-20">
        <EveryChannel
          line1="Every CHANNEL."
          line2="Every INTERACTION."
          line3="done-for-you."
          videoSrc="/every-channel/every-channel-bg.mp4"
          pills={EVERY_CHANNEL_PILLS}
        />
      </div>
      <div className="snap-start">
        <SocialProofSection
          headlineLine1="Great BUSINESSES "
          headlineLine2="deserve to be found."
          thumbnails={SOCIAL_THUMBNAILS}
          slides={SOCIAL_SLIDES}
          closeButtonSrc="/social-proof/social-proof-modal-button.svg"
        />
      </div>
      <div className="snap-start">
        <PricingSection
          tagline="Always-on Sales & Marketing"
          priceAmount="$49 "
          pricePeriod="/ MONTH"
          subCopyLine1="Per location. Every tool included."
          subCopyLine2="No contracts. No negotiation. Simple to scale."
          featureChips={[
            { label: 'Your Website', iconColor: '#FF6F5C' },
            { label: 'Your CRM', iconColor: '#F297B7' },
            { label: 'Your Ads', iconColor: '#F38BB0' },
            { label: 'Your Sales', iconColor: '#9C65EE' },
            { label: 'Your Front Desk', iconColor: '#5BC3B3' },
            { label: 'Your Social', iconColor: '#65CF78' },
            { label: 'Your Reviews', iconColor: '#56A6FF' },
            { label: 'Your Content', iconColor: '#F1C131' },
            { label: 'Your Listings', iconColor: '#F57E56' },
          ]}
          creditsText="Keystone work runs on credits. Credits are usage-based and cover anything Keystone does for you. Posts written. Leads replied to. Campaigns launched. Reviews responded to."
          addOnsHeading="ADD ONS"
          marketplace={{
            label: 'Marketplace',
            description: "Checkout, memberships, and bookings from Keystone's consumer platform.",
          }}
          payments={{
            label: 'Payments',
            description: 'Standard payment processing on transactions.',
          }}
          comingSoonLabel="Coming soon."
          addonIconSrc="/pricing/pricing-addon-icon.svg"
        />
      </div>
      <div className="snap-start">
        <OversizedFooter
          line1="FOR BUSINESSES"
          line2="THAT ARE"
          line3=" DONE FIGURING"
          line4="IT OUT THEMSELVES"
          leftTagline="The modern growth team for local business."
          rightTagline="Stay informed about our latest features and product releases"
          cta1Label="Learn more"
          cta1Href="#"
          cta2Label="Get started"
          cta2Href="#"
          emailPlaceholder="Email Address"
          signUpLabel="Sign Up"
          keystoneMarkSrc="/footer/footer-keystone-mark.svg"
          ctaArrowSrc="/footer/footer-cta-arrow.svg"
          keystoneWordmarkSrc="/footer/footer-wordmark.svg"
          videoA="/footer/footer-video-businesswoman.mp4"
          videoB="/footer/footer-video-storefront.mp4"
          videoC="/footer/footer-video-barbershop.mp4"
          videoD="/footer/footer-video-phone-call.mp4"
          videoE="/footer/footer-video-ceramics.mp4"
        />
      </div>
    </main>
    </SmoothScrollProvider>
  );
}
