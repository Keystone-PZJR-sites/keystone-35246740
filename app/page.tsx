// ============================================================
// HOME PAGE — Custom Corporate Site
// ============================================================
// Server Component. Fetches data and passes it down to client
// leaf components. No 'use client' here.
// ============================================================

import {
  HeroAnimatic,
  MobileHero,
  HeroNav,
  WorkShowcase,
  EveryChannel,
  MobileEveryChannel,
  ProductScreens,
  MobileProductScreens,
  SocialProofSection,
  PricingSection,
  OversizedFooter,
  LeadCaptureProvider,
} from '@/components/sections';
import { MeridianAvatar } from '@/components/sections/WorkShowcase';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { getCompanyInformation } from 'keystone-design-bootstrap/lib/server-api';
import type {
  WorkCardData,
  WorkIndustry,
  HeadlinePart,
  PillData,
  MobileEveryChannelPillData,
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
    id: 'retail',
    label: 'RETAIL & SERVICES',
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
  avatarDefaultSrc: '/work-showcase/health-avatar-default.svg',
  avatarFocusedSrc: '/work-showcase/health-avatar-focused.svg',
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
  avatarDefaultSrc: '/work-showcase/health-avatar-default.svg',
  avatarFocusedSrc: '/work-showcase/health-avatar-focused.svg',
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
// Work Showcase — Food & Drink card contents (Alma Café)
// ---------------------------------------------------------------------------

const foodListingsContent = {
  businessName: 'Alma Café',
  isOpen: true,
  rating: 4.7,
  reviewCount: 59,
  category: 'Coffee Shop',
  descriptionText: "People highlight the warm, welcoming, and vibrant atmosphere, with ample indoor and outdoor seating. They also say this coffee shop offers delicious coffee, including popular lattes and cold brews, along with a variety of fresh pastries and tasty food.",
  totalReviewsPill: '59 total reviews',
  replyRatePill: '100% reply rate',
  photoLayout: 'tall-left' as const,
  photoSrcs: [
    '/work-showcase/food-listings-photo-1.png',
    '/work-showcase/food-listings-photo-top-right.png',
    '/work-showcase/food-listings-photo-bottom-right.png',
    '/work-showcase/food-listings-photo-bottom-right.png',
  ] as [string, string, string, string],
  mapOffset: { left: -120.18, top: -69.38 },
};

const foodAdsContent = {
  variant: 'food' as const,
  heroSrc: '/work-showcase/food-ads-photo.png',
  caption: 'Baked in-house and brewed to order at alma.',
  ctaLabel: 'Learn More',
  avatarSrc: '/work-showcase/food-web-logo-mark.svg',
  threeDotsIconSrc: '/work-showcase/ads-icon-three-dots.svg',
  linkIconSrc: '/work-showcase/ads-icon-link-dark.svg',
};

const foodSocialContent = {
  profileName: 'Alma Café',
  photoSrc: '/work-showcase/food-social-photo.png',
  photoOverlaySrc: '/work-showcase/food-social-photo.png',
  caption: 'Starting the day strong with @MovaPilates! Join us for a class! #pilates #fitness #healthylifestyle',
  avatarDefaultSrc: '/work-showcase/food-web-logo-mark.svg',
  avatarFocusedSrc: '/work-showcase/food-web-logo-mark.svg',
  heartIconSrc: '/work-showcase/social-icon-heart.svg',
  heartIconFocusedSrc: '/work-showcase/social-icon-heart-focused.svg',
  commentIconSrc: '/work-showcase/social-icon-comment.svg',
  shareIconSrc: '/work-showcase/social-icon-share.svg',
  saveIconSrc: '/work-showcase/social-icon-save.svg',
};

const foodWebContent = {
  variant: 'food' as const,
  wordmarkText: 'alma café',
  logoMarkSrc: '/work-showcase/food-web-logo-mark.svg',
  instagramIconSrc: '/work-showcase/food-web-icon-instagram.svg',
  facebookIconSrc: '/work-showcase/food-web-icon-facebook.svg',
  navLinks: ['menu', 'about', 'shop', 'order online'] as [string, string, string, string],
  heroSrc: '/work-showcase/food-web-hero.png',
};

const foodMenuWebContent = {
  variant: 'food-menu' as const,
  logoMarkSrc: '/work-showcase/food-web-logo-mark.svg',
  heroSrc: '/work-showcase/food-listings-photo-bottom-right.png',
  sectionHeading: 'coffee & espresso',
  menuItems: [
    {
      name: 'espresso',
      price: '$4.50',
      description: 'a clean, brown-sugar shot pulled to 36g. always served with a small glass of seltzer.',
    },
    {
      name: 'cortado',
      price: '$5.50',
      description: 'two ounces espresso, two ounces silk-steamed whole milk. the quiet one.',
    },
  ] as [
    { name: string; price: string; description: string },
    { name: string; price: string; description: string },
  ],
};

// ---------------------------------------------------------------------------
// Work Showcase — Home & Property card contents (CanopyWorks)
// ---------------------------------------------------------------------------

const homeListingsContent = {
  businessName: 'CanopyWorks',
  isOpen: true,
  rating: 4.6,
  reviewCount: 35,
  category: 'Tree Service',
  descriptionText: "Services: Cabling & bracing, Tree planting, Tree removal, Tree stump removal, Tree trimming & pruning, Aerial Inspections, Arborist Advice, Arborist Climbers, Arborist Consultations.",
  totalReviewsPill: '35 total reviews',
  replyRatePill: '95% reply rate',
  photoSrcs: [
    '/work-showcase/home-listings-photo-1.png',
    '/work-showcase/home-listings-photo-2.png',
    '/work-showcase/home-listings-photo-top-right.png',
    '/work-showcase/home-web-hero.png',
  ] as [string, string, string, string],
  mapOffset: { left: -51, top: -258 },
};

const homeAdsContent = {
  variant: 'home' as const,
  profileLabel: 'CanopyWorks / Sponsored',
  heroSrc: '/work-showcase/home-ads-photo.png',
  caption:
    "From safe removals to careful pruning, our certified arborists keep your trees healthy, your yard beautiful, and your home protected.\n\nBook a free tree inspection today and give your trees the expert care they deserve.",
  ctaLabel: 'Book Now',
  avatarDefaultSrc: '/work-showcase/home-avatar-default.svg',
  avatarFocusedSrc: '/work-showcase/home-avatar-focused.svg',
  threeDotsIconSrc: '/work-showcase/ads-icon-three-dots.svg',
  linkArrowDefaultSrc: '/work-showcase/ads-icon-link-arrow.svg',
  linkArrowFocusedSrc: '/work-showcase/ads-icon-link-dark.svg',
};

const homeSocialContent = {
  profileName: 'CanopyWorks',
  photoSrc: '/work-showcase/home-social-photo.png',
  photoOverlaySrc: '/work-showcase/home-social-photo.png',
  caption: "Office with a view. No complaints. 🌲\n#CanopyWorks #CertifiedArborist #TreeCare #Pasadena #OfficeLife",
  avatarDefaultSrc: '/work-showcase/home-avatar-default.svg',
  avatarFocusedSrc: '/work-showcase/home-avatar-focused.svg',
  heartIconSrc: '/work-showcase/social-icon-heart.svg',
  heartIconFocusedSrc: '/work-showcase/social-icon-heart-focused.svg',
  commentIconSrc: '/work-showcase/social-icon-comment.svg',
  shareIconSrc: '/work-showcase/social-icon-share.svg',
  saveIconSrc: '/work-showcase/social-icon-save.svg',
};

const homeWebContent = {
  variant: 'home' as const,
  heroSrc: '/work-showcase/home-web-hero.png',
};

const homeSalesContent = {
  messages: [
    {
      side: 'studio' as const,
      text: "Hi Alex! Thanks for reaching out to CanopyWorks. We'd love to get eyes on your trees — do you have time for a free on-site consultation this Wednesday at 9am or Friday at 2pm?",
    },
    {
      side: 'customer' as const,
      text: "Friday works. It's about a big oak in the backyard — not sure if it's dead or just stressed.",
    },
    {
      side: 'studio' as const,
      text: "Friday at 2pm it is. That's a really common question and we'll be able to give you a clear read once they're on-site. The consult includes a full visual assessment and a walkthrough of what they're seeing.",
    },
    {
      side: 'customer' as const,
      text: "Great. How long does it usually take?",
      timestamp: "Read: 12:48 PM",
    },
    {
      side: 'studio' as const,
      text: "Usually 30–45 minutes depending on the tree and how many questions you have — and there are always questions. You're confirmed for Friday at 2pm. \n\nSee you then, Alex!",
    },
  ],
};

// ---------------------------------------------------------------------------
// Work Showcase — Retail & Services card contents (Meridian — clothing boutique)
// ---------------------------------------------------------------------------

const retailListingsContent = {
  businessName: 'Meridian',
  isOpen: true,
  rating: 4.9,
  reviewCount: 61,
  category: 'Clothing Store',
  descriptionText: "San Francisco boutique offers a curated selection of clothing from independent labels and international designers.",
  totalReviewsPill: '61 total reviews',
  replyRatePill: '92% reply rate',
  photoLayout: 'tall-left' as const,
  photoSrcs: [
    '/work-showcase/retail-listings-photo-1.png',
    '/work-showcase/retail-listings-photo-top-right.png',
    '/work-showcase/retail-listings-photo-top-right.png',
    '/work-showcase/retail-listings-photo-bottom-right.png',
  ] as [string, string, string, string],
  mapOffset: { left: -166, top: -3 },
  mapFlipped: true,
};

const retailAdsContent = {
  variant: 'retail' as const,
  photo1Src: '/work-showcase/retail-ads-photo-1.png',
  photo2Src: '/work-showcase/retail-ads-photo-2.png',
  ctaLabel: 'Shop Now',
  threeDotsIconSrc: '/work-showcase/ads-icon-more-white.svg',
  linkIconSrc: '/work-showcase/ads-icon-link-arrow.svg',
};

const retailSocialContent = {
  profileName: 'Meridian',
  photoSrc: '/work-showcase/retail-social-photo.png',
  photoOverlaySrc: '/work-showcase/retail-social-photo.png',
  caption: "Something good found its way here. Come see before it finds its way somewhere else.",
  avatarEl: <MeridianAvatar />,
  heartIconSrc: '/work-showcase/social-icon-heart.svg',
  heartIconFocusedSrc: '/work-showcase/social-icon-heart-focused.svg',
  commentIconSrc: '/work-showcase/social-icon-comment.svg',
  shareIconSrc: '/work-showcase/social-icon-share.svg',
  saveIconSrc: '/work-showcase/social-icon-save.svg',
};

const retailWebContent = {
  variant: 'retail' as const,
  heroSrc: '/work-showcase/retail-web-hero.png',
};

const retailContentCardContent = {
  variant: 'retail' as const,
  photo1Src: '/work-showcase/retail-content-photo-1.png',
  photo2Src: '/work-showcase/retail-content-photo-2.png',
  listIconSrc: '/work-showcase/retail-content-icon-list.svg',
  articleTitle: 'The Jewelry Table',
  articleBody: "We celebrate the artistry of adornment. Each piece tells a story, reflecting the unique spirit of its creator. Discover handcrafted treasures that resonate with your soul and elevate your style.",
};

// ---------------------------------------------------------------------------
// Work Showcase — Care & Maintenance card contents (Good Dog Grooming)
// ---------------------------------------------------------------------------

const careListingsContent = {
  businessName: 'Good Dog Grooming',
  isOpen: true,
  rating: 4.8,
  reviewCount: 88,
  category: 'Pet Care',
  descriptionText: "Pet groomer offering baths, haircuts, and nail trims, plus day-care services.",
  totalReviewsPill: '88 total reviews',
  replyRatePill: '90% reply rate',
  photoLayout: 'tall-left' as const,
  photoSrcs: [
    '/work-showcase/care-listings-photo-1.png',
    '/work-showcase/care-service-bath.png',
    '/work-showcase/care-service-bath.png',
    '/work-showcase/care-service-haircut.png',
  ] as [string, string, string, string],
  mapOffset: { left: -258, top: -191 },
  mapFlipped: true,
};

const careAdsContent = {
  variant: 'care' as const,
  profileName: 'Good Dog Grooming',
  photo1Src: '/work-showcase/care-listings-photo-1.png',
  photo2Src: '/work-showcase/care-service-haircut.png',
  photo3Src: '/work-showcase/care-ads-photo-3.png',
  caption: "Wash, Cut, Trim.",
  ctaLabel: 'Book Now',
  avatarSrc: '/work-showcase/care-avatar.svg',
  threeDotsIconSrc: '/work-showcase/ads-icon-more-white.svg',
  linkIconSrc: '/work-showcase/care-ads-icon-link.svg',
};

const careSocialContent = {
  profileName: 'Good Dog Grooming',
  photoSrc: '/work-showcase/care-service-bath.png',
  photoOverlaySrc: '/work-showcase/care-service-bath.png',
  caption: "Towel mode: activated. 🐾\n#GoodDogGrooming #CleanDog #ShibaInu",
  avatarDefaultSrc: '/work-showcase/care-avatar.svg',
  avatarFocusedSrc: '/work-showcase/care-avatar.svg',
  heartIconSrc: '/work-showcase/social-icon-heart.svg',
  heartIconFocusedSrc: '/work-showcase/social-icon-heart-focused.svg',
  commentIconSrc: '/work-showcase/social-icon-comment.svg',
  shareIconSrc: '/work-showcase/social-icon-share.svg',
  saveIconSrc: '/work-showcase/social-icon-save.svg',
};

const careWebContent = {
  variant: 'care' as const,
  logoSrc: '/work-showcase/care-web-logo.svg',
  brandName: 'GOOD DOG groominG',
  navLinks: ['Services', 'About', 'Contact Us'],
  bookButtonLabel: 'Book Now',
  heroSrc: '/work-showcase/care-web-hero.png',
  services: [
    { title: 'Bath & Brush', imageSrc: '/work-showcase/care-service-bath.png' },
    { title: 'Hair Cuts', imageSrc: '/work-showcase/care-service-haircut.png' },
    { title: 'Teeth & Nails', imageSrc: '/work-showcase/care-service-nails.png' },
  ] as [
    { title: string; imageSrc: string },
    { title: string; imageSrc: string },
    { title: string; imageSrc: string },
  ],
};

const careSalesContent = {
  messages: [
    {
      side: 'studio' as const,
      text: "Hi John! This is Good Dog Grooming — thanks for reaching out. What can we help you with? \uD83D\uDC3E",
    },
    {
      side: 'customer' as const,
      text: "I need to get my dog groomed. He's a golden, kind of anxious.",
    },
    {
      side: 'studio' as const,
      text: "Totally got you. We do really well with anxious dogs — one at a time, no crating, usually in and out in 90 minutes. We have Saturday at 9am or Thursday at 11am. \n\nDo either of those work for you?",
    },
    {
      side: 'customer' as const,
      text: "Saturday at 9 is good.",
    },
    {
      side: 'studio' as const,
      text: "Perfect. What\u2019s your pups name? And full groom or just a bath and brush?",
    },
    {
      side: 'customer' as const,
      text: "Rufus. \n\nWhat\u2019s the difference in price?",
      timestamp: "Read: 12:48 PM",
    },
    {
      side: 'studio' as const,
      text: "Bath and brush is $45, full groom with haircut is $65. For a first visit, a lot of anxious dogs do better starting with the bath — easier intro.",
    },
    {
      side: 'customer' as const,
      text: "Let\u2019s do the bath and brush, then.",
    },
    {
      side: 'studio' as const,
      text: "Saturday at 9am, bath and brush for Rufus. We\u2019ll text you when he\u2019s 20 minutes from done. See you then! \uD83D\uDC3E",
    },
  ],
};

// ---------------------------------------------------------------------------
// Work Showcase — mixed-oblique headline (matches Figma)
// ---------------------------------------------------------------------------

// Mixed-oblique headline parts — matches Figma exactly
const WORK_HEADLINE_PARTS: HeadlinePart[] = [
  { text: 'Marketing that ' },
  { text: 'works', oblique: true },
  { text: ' as ' },
  { text: 'hard', oblique: true },
  { text: ' as you do.' },
];

// ---------------------------------------------------------------------------
// Work Showcase — flat card array (25 total, 5 per industry)
// ---------------------------------------------------------------------------

const WORK_CARDS: WorkCardData[] = [
  // Health & Body — X2O Studio
  { type: 'sales',   industryId: 'health', chipLabel: 'SALES',   content: healthSalesContent },
  { type: 'ads',     industryId: 'health', chipLabel: 'ADS',     content: healthAdsContent },
  { type: 'social',  industryId: 'health', chipLabel: 'SOCIAL',  content: healthSocialContent },
  { type: 'web',     industryId: 'health', chipLabel: 'WEB',     content: healthWebContent },
  { type: 'content', industryId: 'health', chipLabel: 'CONTENT', content: healthContentCardContent },
  // Food & Drink — Alma Café
  { type: 'ads',      industryId: 'food', chipLabel: 'ADS',      content: foodAdsContent },
  { type: 'social',   industryId: 'food', chipLabel: 'SOCIAL',   content: foodSocialContent },
  { type: 'web',      industryId: 'food', chipLabel: 'WEB',      content: foodWebContent },
  { type: 'listings', industryId: 'food', chipLabel: 'LISTINGS', content: foodListingsContent },
  { type: 'web',      industryId: 'food', chipLabel: 'WEB',      content: foodMenuWebContent },
  // Home & Property — CanopyWorks
  { type: 'web',      industryId: 'home', chipLabel: 'WEB',      content: homeWebContent },
  { type: 'listings', industryId: 'home', chipLabel: 'LISTINGS', content: homeListingsContent },
  { type: 'ads',      industryId: 'home', chipLabel: 'ADS',      content: homeAdsContent },
  { type: 'social',   industryId: 'home', chipLabel: 'SOCIAL',   content: homeSocialContent },
  { type: 'sales',    industryId: 'home', chipLabel: 'SALES',    content: homeSalesContent },
  // Retail & Services — Meridian (Figma order: WEB, LISTINGS, ADS, SOCIAL, CONTENT)
  { type: 'web',      industryId: 'retail', chipLabel: 'WEB',      content: retailWebContent },
  { type: 'listings', industryId: 'retail', chipLabel: 'LISTINGS', content: retailListingsContent },
  { type: 'ads',      industryId: 'retail', chipLabel: 'ADS',      content: retailAdsContent },
  { type: 'social',   industryId: 'retail', chipLabel: 'SOCIAL',   content: retailSocialContent },
  { type: 'content',  industryId: 'retail', chipLabel: 'CONTENT',  content: retailContentCardContent },
  // Care & Maintenance — Good Dog Grooming (Figma order: WEB, LISTINGS, SOCIAL, ADS, SALES)
  { type: 'web',      industryId: 'care', chipLabel: 'WEB',      content: careWebContent },
  { type: 'listings', industryId: 'care', chipLabel: 'LISTINGS', content: careListingsContent },
  { type: 'social',   industryId: 'care', chipLabel: 'SOCIAL',   content: careSocialContent },
  { type: 'ads',      industryId: 'care', chipLabel: 'ADS',      content: careAdsContent },
  { type: 'sales',    industryId: 'care', chipLabel: 'SALES',    content: careSalesContent },
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
// Mobile Every Channel — pill positions (mobile-specific scatter layout)
// Positions are percentage of section width × section height (100vh).
// Source: Figma node 1277:460 (393×853 canvas).
// ---------------------------------------------------------------------------

const MOBILE_EVERY_CHANNEL_PILLS: MobileEveryChannelPillData[] = [
  { label: 'Sales',   color: '#56a6ff', left: '78.4%', top: '5.4%',  beatIndex: 0 },
  { label: 'Leads',   color: '#f2ba46', left: '5.6%',  top: '13.0%', beatIndex: 1, dotColor: 'rgba(58,42,14,0.8)' },
  { label: 'Reviews', color: '#f6523c', left: '62.1%', top: '23.0%', beatIndex: 2 },
  { label: 'Ads',     color: '#ff7c1f', left: '77.9%', top: '35.9%', beatIndex: 3 },
  { label: 'Social',  color: '#9c65ee', left: '31.8%', top: '67.3%', beatIndex: 4 },
  { label: 'Web',     color: '#5bc3b3', left: '4.1%',  top: '85.8%', beatIndex: 5 },
  { label: 'Content', color: '#f38bb0', left: '75.8%', top: '93.0%', beatIndex: 6 },
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
        {/* Mobile hero — visible below 768 px, hidden at md+ (MobileHero is md:hidden) */}
        <MobileHero
          headlineLine1="Always ON "
          headlineLine2="SALES & MARKETING"
          subheadline="A team of experts running your marketing while you run your business."
          cta1Label="Learn more"
          cta2Label="Get started"
          videoSrcs={[
            '/videos/hero-autoloop-clips/herovideo-01.mp4',
            '/videos/hero-autoloop-clips/herovideo-02.mp4',
            '/videos/hero-autoloop-clips/herovideo-03.mp4',
            '/videos/hero-autoloop-clips/herovideo-04.mp4',
            '/videos/hero-autoloop-clips/herovideo-05.mp4',
            '/videos/hero-autoloop-clips/herovideo-06.mp4',
          ]}
          markColor="#6ECC8B"
        />
        {/* Desktop/tablet hero — hidden below 768 px (HeroAnimatic is hidden md:block) */}
        <HeroAnimatic
          headlineLine1="Always ON "
          headlineLine2="SALES & MARKETING"
          subheadline="A team of experts running your marketing while you run your business."
          cta1Label="Learn more"
          cta2Label="Get started"
          videoSrcs={[
            '/videos/hero-autoloop-clips/herovideo-01.mp4',
            '/videos/hero-autoloop-clips/herovideo-02.mp4',
            '/videos/hero-autoloop-clips/herovideo-03.mp4',
            '/videos/hero-autoloop-clips/herovideo-04.mp4',
            '/videos/hero-autoloop-clips/herovideo-05.mp4',
            '/videos/hero-autoloop-clips/herovideo-06.mp4',
          ]}
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
        <MobileEveryChannel
          line1="Every CHANNEL."
          line2="Every INTERACTION."
          line3="done-for-you."
          videoSrc="/every-channel/every-channel-bg.mp4"
          pills={MOBILE_EVERY_CHANNEL_PILLS}
        />
        <ProductScreens
          tools={PRODUCT_SCREENS_TOOLS}
        />
        <MobileProductScreens
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
