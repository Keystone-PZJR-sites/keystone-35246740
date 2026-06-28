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
  TestimonialCard,
} from '@/design-system';
import { WORK_CARDS, WORK_HEADLINE_PARTS, WORK_INDUSTRIES } from './work-showcase';
import { MEDIA } from './media';

export const SHARED_WORK_SHOWCASE_HEADLINE_PARTS: HeadlinePart[] = WORK_HEADLINE_PARTS;
export const SHARED_WORK_SHOWCASE_INDUSTRIES: WorkIndustry[] = WORK_INDUSTRIES;
export const SHARED_WORK_SHOWCASE_CARDS: WorkCardData[] = WORK_CARDS;

export const SHARED_PRICING_TAGLINE = 'Always-on Sales & Marketing';
export const SHARED_PRICING_PRICE_AMOUNT = '$249 ';
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
export const SHARED_PRICING_ADDON_ICON_SRC = MEDIA.ui.pricingAddonIcon.src;

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

// The three real, in-depth customer case studies, summarized as proof cards
// that link to the full story. Authored from production data and owner quotes
// (see data/case-studies + docs/case-studies). Shared by the "Trusted by
// owners" rail and the health & wellness industry page so the proof everywhere
// points at real, verifiable results.
export const CASE_STUDY_TESTIMONIAL_CARDS: TestimonialCard[] = [
  {
    id: 'palm-coast-zivel',
    statement:
      'A Florida recovery studio turned 257 tracked leads into a booked-out calendar — with an AI front desk replying in under a minute.',
    image: MEDIA.caseStudies.palmCoastZivel.studio1.src,
    alt: 'Inside the Palm Coast Zivel recovery studio',
    results: [
      { value: '257', label: 'Leads tracked' },
      { value: '22', label: 'Consults booked' },
    ],
    action: { label: 'Read the story', href: '/case-studies/palm-coast-zivel' },
  },
  {
    id: 'your-health-solutions',
    statement:
      'A brand-new med spa opened on the full Keystone stack and booked 320 leads at about $3.50 each.',
    image: MEDIA.caseStudies.yourHealthSolutions.gbp1.src,
    alt: 'Inside the Your Health Solutions med spa',
    results: [
      { value: '320', label: 'Leads tracked' },
      { value: '$3.50', label: 'Per lead' },
    ],
    action: { label: 'Read the story', href: '/case-studies/your-health-solutions' },
  },
  {
    id: 'bare-lux-studio',
    statement:
      'A Central Jersey med spa earned 94,493 ad impressions on a lean budget while an AI front desk caught every lead.',
    image: MEDIA.caseStudies.bareLuxStudio.aesthetic2.src,
    alt: 'Aesthetic treatment at Bare Lúx Studio',
    results: [
      { value: '94,493', label: 'Ad impressions' },
      { value: '5.0★', label: 'Average rating' },
    ],
    action: { label: 'Read the story', href: '/case-studies/bare-lux-studio' },
  },
];

// One reusable proof rail shared across every service page, the pricing page,
// and the how-it-works page — now backed by the three real case studies, each
// linking to its full write-up. Edit here once.
export const SHARED_TESTIMONIAL_CARDS: TestimonialCard[] = CASE_STUDY_TESTIMONIAL_CARDS;

export const SHARED_TESTIMONIALS_SECTION: { title: string; cards: TestimonialCard[] } = {
  title: 'Trusted by owners',
  cards: SHARED_TESTIMONIAL_CARDS,
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
