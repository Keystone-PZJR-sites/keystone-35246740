// ============================================================
// Work Showcase — content data
// ============================================================
// Production cards are rasterized WebP pairs. The old live HTML-card content
// was intentionally removed so the page cannot reference deprecated assets.
// ============================================================

import type {
  WorkCardData,
  WorkIndustry,
  HeadlinePart,
} from '@/components/sections';

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

export const WORK_HEADLINE_PARTS: HeadlinePart[] = [
  { text: 'Marketing that ' },
  { text: 'works', oblique: true },
  { text: ' as ' },
  { text: 'hard', oblique: true },
  { text: ' as you do.' },
];

export const WORK_CARDS: WorkCardData[] = [
  // Health & Body — X2O Studio
  { type: 'sales', industryId: 'health', chipLabel: 'SALES', visual: { defaultSrc: '/work-showcase/cards/health-sales-card-default.webp', focusedSrc: '/work-showcase/cards/health-sales-card-focused.webp', width: 586, height: 1239 } },
  { type: 'web', industryId: 'health', chipLabel: 'WEB', visual: { defaultSrc: '/work-showcase/cards/health-web-card-default.webp', focusedSrc: '/work-showcase/cards/health-web-card-focused.webp', width: 1684, height: 1133 } },
  { type: 'ads', industryId: 'health', chipLabel: 'ADS', visual: { defaultSrc: '/work-showcase/cards/health-ads-card-default.webp', focusedSrc: '/work-showcase/cards/health-ads-card-focused.webp', width: 555, height: 1153 } },
  { type: 'social', industryId: 'health', chipLabel: 'SOCIAL', visual: { defaultSrc: '/work-showcase/cards/health-social-card-default.webp', focusedSrc: '/work-showcase/cards/health-social-card-focused.webp', width: 567, height: 823 } },
  { type: 'content', industryId: 'health', chipLabel: 'CONTENT', visual: { defaultSrc: '/work-showcase/cards/health-content-card-default.webp', focusedSrc: '/work-showcase/cards/health-content-card-focused.webp', width: 613, height: 1131 } },

  // Food & Drink — Alma Café
  { type: 'ads', industryId: 'food', chipLabel: 'ADS', visual: { defaultSrc: '/work-showcase/cards/food-ads-card-default.webp', focusedSrc: '/work-showcase/cards/food-ads-card-focused.webp', width: 555, height: 1153 } },
  { type: 'social', industryId: 'food', chipLabel: 'SOCIAL', visual: { defaultSrc: '/work-showcase/cards/food-social-card-default.webp', focusedSrc: '/work-showcase/cards/food-social-card-focused.webp', width: 567, height: 823 } },
  { type: 'web', industryId: 'food', chipLabel: 'WEB', visual: { defaultSrc: '/work-showcase/cards/food-web-card-default.webp', focusedSrc: '/work-showcase/cards/food-web-card-focused.webp', width: 1684, height: 1133 } },
  { type: 'listings', industryId: 'food', chipLabel: 'LISTINGS', visual: { defaultSrc: '/work-showcase/cards/food-listings-card-default.webp', focusedSrc: '/work-showcase/cards/food-listings-card-focused.webp', width: 567, height: 1054 } },
  { type: 'web', industryId: 'food', chipLabel: 'WEB', visual: { defaultSrc: '/work-showcase/cards/food-web-mobile-card-default.webp', focusedSrc: '/work-showcase/cards/food-web-mobile-card-focused.webp', width: 613, height: 1131 } },

  // Home & Property — CanopyWorks
  { type: 'web', industryId: 'home', chipLabel: 'WEB', visual: { defaultSrc: '/work-showcase/cards/home-web-card-default.webp', focusedSrc: '/work-showcase/cards/home-web-card-focused.webp', width: 1684, height: 1133 } },
  { type: 'listings', industryId: 'home', chipLabel: 'LISTINGS', visual: { defaultSrc: '/work-showcase/cards/home-listings-card-default.webp', focusedSrc: '/work-showcase/cards/home-listings-card-focused.webp', width: 567, height: 1054 } },
  { type: 'ads', industryId: 'home', chipLabel: 'ADS', visual: { defaultSrc: '/work-showcase/cards/home-ads-card-default.webp', focusedSrc: '/work-showcase/cards/home-ads-card-focused.webp', width: 555, height: 1153 } },
  { type: 'social', industryId: 'home', chipLabel: 'SOCIAL', visual: { defaultSrc: '/work-showcase/cards/home-social-card-default.webp', focusedSrc: '/work-showcase/cards/home-social-card-focused.webp', width: 567, height: 823 } },
  { type: 'sales', industryId: 'home', chipLabel: 'SALES', visual: { defaultSrc: '/work-showcase/cards/home-sales-card-default.webp', focusedSrc: '/work-showcase/cards/home-sales-card-focused.webp', width: 586, height: 1239 } },

  // Retail & Services — Meridian
  { type: 'web', industryId: 'retail', chipLabel: 'WEB', visual: { defaultSrc: '/work-showcase/cards/retail-web-card-default.webp', focusedSrc: '/work-showcase/cards/retail-web-card-focused.webp', width: 1684, height: 1133 } },
  { type: 'listings', industryId: 'retail', chipLabel: 'LISTINGS', visual: { defaultSrc: '/work-showcase/cards/retail-listings-card-default.webp', focusedSrc: '/work-showcase/cards/retail-listings-card-focused.webp', width: 567, height: 1054 } },
  { type: 'ads', industryId: 'retail', chipLabel: 'ADS', visual: { defaultSrc: '/work-showcase/cards/retail-ads-card-default.webp', focusedSrc: '/work-showcase/cards/retail-ads-card-focused.webp', width: 555, height: 1153 } },
  { type: 'social', industryId: 'retail', chipLabel: 'SOCIAL', visual: { defaultSrc: '/work-showcase/cards/retail-social-card-default.webp', focusedSrc: '/work-showcase/cards/retail-social-card-focused.webp', width: 567, height: 823 } },
  { type: 'content', industryId: 'retail', chipLabel: 'CONTENT', visual: { defaultSrc: '/work-showcase/cards/retail-content-card-default.webp', focusedSrc: '/work-showcase/cards/retail-content-card-focused.webp', width: 613, height: 1131 } },

  // Care & Maintenance — Good Dog Grooming
  { type: 'web', industryId: 'care', chipLabel: 'WEB', visual: { defaultSrc: '/work-showcase/cards/care-web-card-default.webp', focusedSrc: '/work-showcase/cards/care-web-card-focused.webp', width: 1684, height: 1133 } },
  { type: 'sales', industryId: 'care', chipLabel: 'SALES', visual: { defaultSrc: '/work-showcase/cards/care-sales-card-default.webp', focusedSrc: '/work-showcase/cards/care-sales-card-focused.webp', width: 586, height: 1239 } },
  { type: 'ads', industryId: 'care', chipLabel: 'ADS', visual: { defaultSrc: '/work-showcase/cards/care-ads-card-default.webp', focusedSrc: '/work-showcase/cards/care-ads-card-focused.webp', width: 555, height: 1153 } },
  { type: 'listings', industryId: 'care', chipLabel: 'LISTINGS', visual: { defaultSrc: '/work-showcase/cards/care-listings-card-default.webp', focusedSrc: '/work-showcase/cards/care-listings-card-focused.webp', width: 567, height: 1054 } },
  { type: 'social', industryId: 'care', chipLabel: 'SOCIAL', visual: { defaultSrc: '/work-showcase/cards/care-social-card-default.webp', focusedSrc: '/work-showcase/cards/care-social-card-focused.webp', width: 567, height: 823 } },
];
