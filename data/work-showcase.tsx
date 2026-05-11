// ============================================================
// Work Showcase — content data
// ============================================================
// All copy, asset paths, and color tokens for the homepage Work Showcase
// section. The page composes this data; the section component renders it.
// Page files compose, data files hold data — see `docs/rules/rules.md`.
// ============================================================

import type {
  WorkCardData,
  WorkIndustry,
  HeadlinePart,
} from '@/components/sections';
import { MeridianAvatar } from '@/components/sections/WorkShowcase';

// ---------------------------------------------------------------------------
// Industries — drive the chip rail at the top of the section.
// ---------------------------------------------------------------------------

export const WORK_INDUSTRIES: WorkIndustry[] = [
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
// Health & Body — X2O Studio
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
    '/work-showcase/health-ads-photo-1.jpg',
    '/work-showcase/health-ads-photo-2.jpg',
    '/work-showcase/health-ads-photo-3.jpg',
    '/work-showcase/health-ads-photo-4.jpg',
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
  photoSrc: '/work-showcase/health-social-photo.jpg',
  photoOverlaySrc: '/work-showcase/health-social-photo-2.jpg',
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
  heroSrc: '/work-showcase/health-web-hero.jpg',
  heroHeadlineLines: ['High Intensity. Low Impact.', 'Real Results.'],
  bookCtaLabel: 'Book Your Class',
  belowFoldHeading: 'Train Your Way at X2O Studio',
  galleryImageSrcs: [
    '/work-showcase/health-web-gallery-1.jpg',
    '/work-showcase/health-web-gallery-2.jpg',
    '/work-showcase/health-web-gallery-3.jpg',
  ] as [string, string, string],
};

const healthContentCardContent = {
  wordmarkSrc: '/work-showcase/health-content-wordmark.svg',
  tagLabel: 'BLOG',
  headline: "A Personal Journey \nto Strength and Flexibility",
  byline: 'Ellen Piccolotti',
  photoSrc: '/work-showcase/health-content-photo.jpg',
  bodyParagraphs: [
    "Throughout the years, I've explored various fitness regimes. I've always been intrigued by the differences and benefits of Pilates vs weight training. Both have unique advantages and understanding them can help you make an informed decision about your fitness journey.",
    "With a plethora of information out there, it's important to rely on authentic experiences and well-researched facts. This article aims to do just that—drawing from my experiences and the latest research in the fitness industry.",
  ] as [string, string],
};

// ---------------------------------------------------------------------------
// Food & Drink — Alma Café
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
    '/work-showcase/food-listings-photo-1.jpg',
    '/work-showcase/food-listings-photo-top-right.jpg',
    '/work-showcase/food-listings-photo-bottom-right.jpg',
    '/work-showcase/food-listings-photo-bottom-right.jpg',
  ] as [string, string, string, string],
  mapOffset: { left: -120.18, top: -69.38 },
};

const foodAdsContent = {
  variant: 'food' as const,
  heroSrc: '/work-showcase/food-ads-photo.jpg',
  caption: 'Baked in-house and brewed to order at alma.',
  ctaLabel: 'Learn More',
  avatarSrc: '/work-showcase/food-web-logo-mark.svg',
  threeDotsIconSrc: '/work-showcase/ads-icon-three-dots.svg',
  linkIconSrc: '/work-showcase/ads-icon-link-dark.svg',
};

const foodSocialContent = {
  profileName: 'Alma Café',
  photoSrc: '/work-showcase/food-social-photo.jpg',
  photoOverlaySrc: '/work-showcase/food-social-photo.jpg',
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
  heroSrc: '/work-showcase/food-web-hero.jpg',
};

const foodMenuWebContent = {
  variant: 'food-menu' as const,
  logoMarkSrc: '/work-showcase/food-web-logo-mark.svg',
  heroSrc: '/work-showcase/food-listings-photo-bottom-right.jpg',
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
// Home & Property — CanopyWorks
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
    '/work-showcase/home-listings-photo-1.jpg',
    '/work-showcase/home-listings-photo-2.jpg',
    '/work-showcase/home-listings-photo-top-right.jpg',
    '/work-showcase/home-web-hero.jpg',
  ] as [string, string, string, string],
  mapOffset: { left: -51, top: -258 },
};

const homeAdsContent = {
  variant: 'home' as const,
  profileLabel: 'CanopyWorks / Sponsored',
  heroSrc: '/work-showcase/home-ads-photo.jpg',
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
  photoSrc: '/work-showcase/home-social-photo.jpg',
  photoOverlaySrc: '/work-showcase/home-social-photo.jpg',
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
  heroSrc: '/work-showcase/home-web-hero.jpg',
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
// Retail & Services — Meridian (clothing boutique)
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
    '/work-showcase/retail-listings-photo-1.jpg',
    '/work-showcase/retail-listings-photo-top-right.jpg',
    '/work-showcase/retail-listings-photo-top-right.jpg',
    '/work-showcase/retail-listings-photo-bottom-right.jpg',
  ] as [string, string, string, string],
  mapOffset: { left: -166, top: -3 },
  mapFlipped: true,
};

const retailAdsContent = {
  variant: 'retail' as const,
  photo1Src: '/work-showcase/retail-ads-photo-1.jpg',
  photo2Src: '/work-showcase/retail-ads-photo-2.jpg',
  ctaLabel: 'Shop Now',
  threeDotsIconSrc: '/work-showcase/ads-icon-more-white.svg',
  linkIconSrc: '/work-showcase/ads-icon-link-arrow.svg',
};

const retailSocialContent = {
  profileName: 'Meridian',
  photoSrc: '/work-showcase/retail-social-photo.jpg',
  photoOverlaySrc: '/work-showcase/retail-social-photo.jpg',
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
  heroSrc: '/work-showcase/retail-web-hero.jpg',
};

const retailContentCardContent = {
  variant: 'retail' as const,
  photo1Src: '/work-showcase/retail-content-photo-1.jpg',
  photo2Src: '/work-showcase/retail-content-photo-2.jpg',
  listIconSrc: '/work-showcase/retail-content-icon-list.svg',
  articleTitle: 'The Jewelry Table',
  articleBody: "We celebrate the artistry of adornment. Each piece tells a story, reflecting the unique spirit of its creator. Discover handcrafted treasures that resonate with your soul and elevate your style.",
};

// ---------------------------------------------------------------------------
// Care & Maintenance — Good Dog Grooming
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
    '/work-showcase/care-listings-photo-1.jpg',
    '/work-showcase/care-service-bath.jpg',
    '/work-showcase/care-service-bath.jpg',
    '/work-showcase/care-service-haircut.jpg',
  ] as [string, string, string, string],
  mapOffset: { left: -258, top: -191 },
  mapFlipped: true,
};

const careAdsContent = {
  variant: 'care' as const,
  profileName: 'Good Dog Grooming',
  photo1Src: '/work-showcase/care-listings-photo-1.jpg',
  photo2Src: '/work-showcase/care-service-haircut.jpg',
  photo3Src: '/work-showcase/care-ads-photo-3.jpg',
  caption: "Wash, Cut, Trim.",
  ctaLabel: 'Book Now',
  avatarSrc: '/work-showcase/care-avatar.svg',
  threeDotsIconSrc: '/work-showcase/ads-icon-more-white.svg',
  linkIconSrc: '/work-showcase/care-ads-icon-link.svg',
};

const careSocialContent = {
  profileName: 'Good Dog Grooming',
  photoSrc: '/work-showcase/care-service-bath.jpg',
  photoOverlaySrc: '/work-showcase/care-service-bath.jpg',
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
  heroSrc: '/work-showcase/care-web-hero.jpg',
  services: [
    { title: 'Bath & Brush', imageSrc: '/work-showcase/care-service-bath.jpg' },
    { title: 'Hair Cuts', imageSrc: '/work-showcase/care-service-haircut.jpg' },
    { title: 'Teeth & Nails', imageSrc: '/work-showcase/care-service-nails.jpg' },
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
      text: "Hi John! This is Good Dog Grooming — thanks for reaching out. What can we help you with? 🐾",
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
      text: "Perfect. What’s your pups name? And full groom or just a bath and brush?",
    },
    {
      side: 'customer' as const,
      text: "Rufus. \n\nWhat’s the difference in price?",
      timestamp: "Read: 12:48 PM",
    },
    {
      side: 'studio' as const,
      text: "Bath and brush is $45, full groom with haircut is $65. For a first visit, a lot of anxious dogs do better starting with the bath — easier intro.",
    },
    {
      side: 'customer' as const,
      text: "Let’s do the bath and brush, then.",
    },
    {
      side: 'studio' as const,
      text: "Saturday at 9am, bath and brush for Rufus. We’ll text you when he’s 20 minutes from done. See you then! 🐾",
    },
  ],
};

// ---------------------------------------------------------------------------
// Headline + flat card list
// ---------------------------------------------------------------------------

export const WORK_HEADLINE_PARTS: HeadlinePart[] = [
  { text: 'Marketing that ' },
  { text: 'works', oblique: true },
  { text: ' as ' },
  { text: 'hard', oblique: true },
  { text: ' as you do.' },
];

export const WORK_CARDS: WorkCardData[] = [
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
