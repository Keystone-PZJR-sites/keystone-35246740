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
  ProductScreens,
  SocialProofSection,
  PricingSection,
  OversizedFooter,
  LeadCaptureProvider,
} from '@/components/sections';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { getCompanyInformation } from 'keystone-design-bootstrap/lib/server-api';
import type {
  WorkCardData,
  WorkIndustry,
  HeadlinePart,
  PillData,
  ProductScreensTool,
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
// Product Screens — per-tool data (all values from Figma node 1087:2360)
// ---------------------------------------------------------------------------

const PRODUCT_SCREENS_TOOLS: ProductScreensTool[] = [
  {
    id: 'web',
    label: 'Web',
    cardBg: '#042019',
    copyAccent: '#6ecc8b',
    pillFill: '#65cf78',
    inactiveBorder: '#0a4d3c',
    squareColor: '#65cf78',
    copyText:
      'A fast, conversion-optimized site built to your brand and kept current without you lifting a finger.',
      markColor: '#267D54',
    screenshotSrc: '/product-screens/screen-web.png',
  },
  {
    id: 'leads',
    label: 'Leads',
    cardBg: '#3a2a0e',
    copyAccent: '#f2ba46',
    pillFill: '#f1c131',
    inactiveBorder: '#594117',
    squareColor: '#f1c131',
    copyText:
      'Every inbound lead gets a reply in minutes — 24/7 — so warm interest never goes cold.',
      markColor: '#E0A733',
    screenshotSrc: '/product-screens/screen-leads.png',
  },
  {
    id: 'ads',
    label: 'Ads',
    cardBg: '#3c1618',
    copyAccent: '#f57e56',
    pillFill: '#f57e56',
    inactiveBorder: '#652528',
    squareColor: '#f57e56',
    copyText:
      'Meta campaigns that target the right customers, in your market, with the right offer at the right moment.',
      markColor: '#9F3722',
    screenshotSrc: '/product-screens/screen-ads.png',
  },
  {
    id: 'social',
    label: 'Social',
    cardBg: '#2f0d3f',
    copyAccent: '#9c65ee',
    pillFill: '#9c65ee',
    inactiveBorder: '#581876',
    squareColor: '#9c65ee',
    copyText:
      'On-brand, consistent posting across your channels — without you writing a single caption.',
      markColor: '#6E3CA7',
    screenshotSrc: '/product-screens/screen-social.png',
  },
  {
    id: 'sales',
    label: 'Sales',
    cardBg: '#0f223d',
    copyAccent: '#56a6ff',
    pillFill: '#56a6ff',
    inactiveBorder: '#1b3e6f',
    squareColor: '#56a6ff',
    copyText:
      'On-brand, consistent posting across your channels — without you writing a single caption.',
      markColor: '#397DFF',
    screenshotSrc: '/product-screens/screen-sales.png',
  },
  {
    id: 'reviews',
    label: 'Reviews',
    cardBg: '#0d2a28',
    copyAccent: '#5bc3b3',
    pillFill: '#5bc3b3',
    inactiveBorder: '#174a46',
    squareColor: '#5bc3b3',
    copyText:
      'On-brand, consistent posting across your channels — without you writing a single caption.',
      markColor: '#399587',
    screenshotSrc: '/product-screens/screen-reviews.png',
  },
  {
    id: 'content',
    label: 'Content',
    cardBg: '#3d1324',
    copyAccent: '#f38bb0',
    pillFill: '#f38bb0',
    inactiveBorder: '#611e39',
    squareColor: '#f38bb0',
    copyText: 'Continuous, search-optimized content that builds your visibility over time.',
      markColor: '#DD6F96',
    screenshotSrc: '/product-screens/screen-content.png',
  },
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
  const companyInfo = await getCompanyInformation();
  return (
    <LeadCaptureProvider
      wordmarkSrc="/images/keystone-wordmark.svg"
      markColor="#6ECC8B"
      ctaArrowSrc="/lead-capture/lead-capture-cta-arrow.svg"
      submitLabel="Learn More"
      subheadline="The modern sales and marketing team for local businesses. Reach out below to connect with our team."
      termsHref="/terms-of-service"
      privacyHref="/privacy-policy"
    >
    <SmoothScrollProvider
      fixedChildren={<HeroNav wordmarkSrc="/images/keystone-wordmark.svg" />}
    >
      {/*
       * Animated sections — one contained group driven by the scroll state machine.
       * Every section inside <main> is viewport-height and participates in the
       * pin + snap animator. The footer is intentionally a sibling, not a child.
       */}
      <main>
        <HeroAnimatic
          headlineLine1="Always ON "
          headlineLine2="SALES & MARKETING"
          subheadline="A team of experts running your marketing while you run your business."
          cta1Label="Learn more"
          cta2Label="Get started"
          videoSrc="/videos/home-hero-bg.mp4"
          markColor="#6ECC8B"
        />
        <WorkShowcase
          headlineParts={WORK_HEADLINE_PARTS}
          industries={WORK_INDUSTRIES}
          cards={WORK_CARDS}
        />
        <EveryChannel
          line1="Every CHANNEL."
          line2="Every INTERACTION."
          line3="done-for-you."
          videoSrc="/every-channel/every-channel-bg.mp4"
          pills={EVERY_CHANNEL_PILLS}
        />
        <ProductScreens
          tools={PRODUCT_SCREENS_TOOLS}
        />
        <SocialProofSection
          headlineLine1="Great BUSINESSES "
          headlineLine2="deserve to be found."
          thumbnails={SOCIAL_THUMBNAILS}
          slides={SOCIAL_SLIDES}
          closeButtonSrc="/social-proof/social-proof-modal-button.svg"
        />
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
      </main>

      {/*
       * Footer — outside the animated sections group.
       * Not viewport-height, not held by the animator, no states or transitions.
       * The visitor scrolls into it naturally after Pricing releases.
       */}
      <OversizedFooter
        line1="FOR BUSINESSES"
        line2="THAT ARE"
        line3=" DONE FIGURING"
        line4="IT OUT THEMSELVES"
        leftTagline="The modern growth team for local business."
        rightTagline="Stay informed about our latest features and product releases"
        cta1Label="The Blog"
        cta1Href="/blog"
        cta2Label="Get started"
        emailPlaceholder="Email Address"
        signUpLabel="Sign Up"
        podcastUrl="https://open.spotify.com/show/41MuXEI3TIvCAQW20Ko9cX?si=777efb21569d4d94"
        youtubeUrl={companyInfo?.youtube_url}
        instagramUrl={companyInfo?.instagram_url}
        facebookUrl={companyInfo?.facebook_url}
        linkedinUrl={companyInfo?.linkedin_url}
        keystoneMarkColor="#F57E56"
        ctaArrowSrc="/footer/footer-cta-arrow.svg"
        keystoneWordmarkSrc="/footer/footer-wordmark.svg"
        videoA="/footer/footer-video-businesswoman.mp4"
        videoB="/footer/footer-video-storefront.mp4"
        videoC="/footer/footer-video-barbershop.mp4"
        videoD="/footer/footer-video-phone-call.mp4"
        videoE="/footer/footer-video-ceramics.mp4"
      />
    </SmoothScrollProvider>
    </LeadCaptureProvider>
  );
}
