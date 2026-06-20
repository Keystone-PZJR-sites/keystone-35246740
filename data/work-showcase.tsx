// ============================================================
// Work Showcase — content data
// ============================================================
// Production cards are rasterized WebP pairs sourced from the central media
// registry (data/media.ts). The old live HTML-card content was intentionally
// removed so the page cannot reference deprecated assets.
// ============================================================

import type {
  WorkCardData,
  WorkIndustry,
  HeadlinePart,
} from '@/design-system';
import { MEDIA } from './media';

const C = MEDIA.showcaseCards;

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
  { text: 'We build an ' },
  { text: 'elevated', oblique: true },
  { text: ' presence that inspires ' },
  { text: 'trust', oblique: true },
  { text: ' and converts ' },
  { text: 'customers.', oblique: true },
];

export const WORK_CARDS: WorkCardData[] = [
  // Health & Body — X2O Studio
  { type: 'web', industryId: 'health', chipLabel: 'WEB', visual: C['health-web'] },
  { type: 'sales', industryId: 'health', chipLabel: 'SALES', visual: C['health-sales'] },
  { type: 'ads', industryId: 'health', chipLabel: 'ADS', visual: C['health-ads'] },
  { type: 'social', industryId: 'health', chipLabel: 'SOCIAL', visual: C['health-social'] },
  { type: 'content', industryId: 'health', chipLabel: 'CONTENT', visual: C['health-content'] },

  // Food & Drink — Alma Café
  { type: 'ads', industryId: 'food', chipLabel: 'ADS', visual: C['food-ads'] },
  { type: 'social', industryId: 'food', chipLabel: 'SOCIAL', visual: C['food-social'] },
  { type: 'web', industryId: 'food', chipLabel: 'WEB', visual: C['food-web'] },
  { type: 'listings', industryId: 'food', chipLabel: 'LISTINGS', visual: C['food-listings'] },
  { type: 'web', industryId: 'food', chipLabel: 'WEB', visual: C['food-web-mobile'] },

  // Home & Property — CanopyWorks
  { type: 'listings', industryId: 'home', chipLabel: 'LISTINGS', visual: C['home-listings'] },
  { type: 'web', industryId: 'home', chipLabel: 'WEB', visual: C['home-web'] },
  { type: 'ads', industryId: 'home', chipLabel: 'ADS', visual: C['home-ads'] },
  { type: 'social', industryId: 'home', chipLabel: 'SOCIAL', visual: C['home-social'] },
  { type: 'sales', industryId: 'home', chipLabel: 'SALES', visual: C['home-sales'] },

  // Retail & Services — Meridian
  { type: 'content', industryId: 'retail', chipLabel: 'CONTENT', visual: C['retail-content'] },
  { type: 'web', industryId: 'retail', chipLabel: 'WEB', visual: C['retail-web'] },
  { type: 'listings', industryId: 'retail', chipLabel: 'LISTINGS', visual: C['retail-listings'] },
  { type: 'ads', industryId: 'retail', chipLabel: 'ADS', visual: C['retail-ads'] },
  { type: 'social', industryId: 'retail', chipLabel: 'SOCIAL', visual: C['retail-social'] },

  // Care & Maintenance — Good Dog Grooming
  { type: 'social', industryId: 'care', chipLabel: 'SOCIAL', visual: C['care-social'] },
  { type: 'sales', industryId: 'care', chipLabel: 'SALES', visual: C['care-sales'] },
  { type: 'web', industryId: 'care', chipLabel: 'WEB', visual: C['care-web'] },
  { type: 'ads', industryId: 'care', chipLabel: 'ADS', visual: C['care-ads'] },
  { type: 'listings', industryId: 'care', chipLabel: 'LISTINGS', visual: C['care-listings'] },
];
