import type {
  AddOnData,
  FeatureChip,
  HeadlinePart,
  MobilePricingSectionProps,
  PricingSectionProps,
  MobileWorkShowcaseProps,
  WorkShowcaseProps,
  WorkCardData,
  WorkIndustry,
} from '@/components/sections';
import { WORK_CARDS, WORK_HEADLINE_PARTS, WORK_INDUSTRIES } from './work-showcase';

export const SHARED_WORK_SHOWCASE_HEADLINE_PARTS: HeadlinePart[] = WORK_HEADLINE_PARTS;
export const SHARED_WORK_SHOWCASE_INDUSTRIES: WorkIndustry[] = WORK_INDUSTRIES;
export const SHARED_WORK_SHOWCASE_CARDS: WorkCardData[] = WORK_CARDS;

export const SHARED_PRICING_TAGLINE = 'Always-on Sales & Marketing';
export const SHARED_PRICING_PRICE_AMOUNT = '$49 ';
export const SHARED_PRICING_PRICE_PERIOD = '/ MONTH';
export const SHARED_PRICING_SUBCOPY_LINE_1 = 'Per location. Every tool included.';
export const SHARED_PRICING_SUBCOPY_LINE_2 = 'No contracts. No negotiation. Simple to scale.';
export const SHARED_PRICING_FEATURE_CHIPS: FeatureChip[] = [
  { label: 'Your Website', iconColor: '#FF6F5C' },
  { label: 'Your CRM', iconColor: '#F297B7' },
  { label: 'Your Ads', iconColor: '#F38BB0' },
  { label: 'Your Sales', iconColor: '#9C65EE' },
  { label: 'Your Front Desk', iconColor: '#5BC3B3' },
  { label: 'Your Social', iconColor: '#65CF78' },
  { label: 'Your Reviews', iconColor: '#56A6FF' },
  { label: 'Your Content', iconColor: '#F1C131' },
  { label: 'Your Listings', iconColor: '#F57E56' },
];
export const SHARED_PRICING_CREDITS_TEXT =
  'Keystone work runs on credits. Credits are usage-based and cover anything Keystone does for you. Posts written. Leads replied to. Campaigns launched. Reviews responded to.';
export const SHARED_PRICING_ADDONS_HEADING = 'ADD ONS';
export const SHARED_PRICING_MARKETPLACE_ADDON: AddOnData = {
  label: 'Marketplace',
  description: "Checkout, memberships, and bookings from Keystone's consumer platform.",
};
export const SHARED_PRICING_PAYMENTS_ADDON: AddOnData = {
  label: 'Payments',
  description: 'Standard payment processing on transactions.',
};
export const SHARED_PRICING_COMING_SOON_LABEL = 'Coming soon.';
export const SHARED_PRICING_ADDON_ICON_SRC = '/pricing/pricing-addon-icon.svg';

export const SHARED_WORK_SHOWCASE_PROPS: WorkShowcaseProps = {
  headlineParts: SHARED_WORK_SHOWCASE_HEADLINE_PARTS,
  industries: SHARED_WORK_SHOWCASE_INDUSTRIES,
  cards: SHARED_WORK_SHOWCASE_CARDS,
};

export const SHARED_MOBILE_WORK_SHOWCASE_PROPS: MobileWorkShowcaseProps = {
  headlineParts: SHARED_WORK_SHOWCASE_HEADLINE_PARTS,
  industries: SHARED_WORK_SHOWCASE_INDUSTRIES,
  cards: SHARED_WORK_SHOWCASE_CARDS,
};

export const SHARED_PRICING_SECTION_PROPS: PricingSectionProps = {
  tagline: SHARED_PRICING_TAGLINE,
  priceAmount: SHARED_PRICING_PRICE_AMOUNT,
  pricePeriod: SHARED_PRICING_PRICE_PERIOD,
  subCopyLine1: SHARED_PRICING_SUBCOPY_LINE_1,
  subCopyLine2: SHARED_PRICING_SUBCOPY_LINE_2,
  featureChips: SHARED_PRICING_FEATURE_CHIPS,
  creditsText: SHARED_PRICING_CREDITS_TEXT,
  addOnsHeading: SHARED_PRICING_ADDONS_HEADING,
  marketplace: SHARED_PRICING_MARKETPLACE_ADDON,
  payments: SHARED_PRICING_PAYMENTS_ADDON,
  comingSoonLabel: SHARED_PRICING_COMING_SOON_LABEL,
  addonIconSrc: SHARED_PRICING_ADDON_ICON_SRC,
};

export const SHARED_MOBILE_PRICING_SECTION_PROPS: MobilePricingSectionProps = {
  tagline: SHARED_PRICING_TAGLINE,
  priceAmount: SHARED_PRICING_PRICE_AMOUNT,
  pricePeriod: SHARED_PRICING_PRICE_PERIOD,
  subCopyLine1: SHARED_PRICING_SUBCOPY_LINE_1,
  subCopyLine2: SHARED_PRICING_SUBCOPY_LINE_2,
  creditsText: SHARED_PRICING_CREDITS_TEXT,
  addOnsHeading: SHARED_PRICING_ADDONS_HEADING,
  marketplace: SHARED_PRICING_MARKETPLACE_ADDON,
  payments: SHARED_PRICING_PAYMENTS_ADDON,
  comingSoonLabel: SHARED_PRICING_COMING_SOON_LABEL,
  addonIconSrc: SHARED_PRICING_ADDON_ICON_SRC,
};
