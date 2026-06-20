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

// One reusable proof rail shared across every service page, the pricing page,
// and the how-it-works page. The cards speak to Keystone's overall results
// (not a single service) so the same set fits anywhere. Edit here once.
export const SHARED_TESTIMONIAL_CARDS: TestimonialCard[] = [
  {
    id: 'all-in-one',
    statement: 'Everything an independent business needs to win online, in one place.',
    image: MEDIA.socialProof.thumbsDesktop.t02.src,
    alt: 'A business owner taking a call at her counter',
    results: [
      { value: '+54%', label: 'Sales growth' },
      { value: '11,000', label: 'App installs' },
    ],
  },
  {
    id: 'recommended',
    statement: 'A platform owners recommend — and the results back it up.',
    image: MEDIA.socialProof.thumbsDesktop.t04.src,
    alt: 'A chef working the oven at a local restaurant',
    results: [
      { value: '+$104,500', label: 'Online sales' },
      { value: '$31,000', label: 'Saved in fees' },
    ],
  },
  {
    id: 'new-customers',
    statement: 'New customers find you, choose you, and keep coming back.',
    image: MEDIA.socialProof.thumbsDesktop.t06.src,
    alt: 'A wellness studio session in progress',
    results: [
      { value: '+38%', label: 'New customers' },
      { value: '64%', label: 'Return rate' },
    ],
  },
  {
    id: 'fast-follow-up',
    statement: 'Every lead gets a fast reply, so fewer slip away.',
    image: MEDIA.socialProof.thumbsDesktop.t01.src,
    alt: 'A shop owner at work',
    results: [
      { value: '< 2 min', label: 'Avg. response' },
      { value: '+27%', label: 'Close rate' },
    ],
  },
  {
    id: 'one-platform',
    statement: 'One login runs your website, marketing, and front desk.',
    image: MEDIA.socialProof.thumbsDesktop.t03.src,
    alt: 'A studio owner at work',
    results: [
      { value: '4.9★', label: 'Average rating' },
      { value: '12 hrs', label: 'Saved / week' },
    ],
  },
  {
    id: 'fewer-tools',
    statement: 'Replace a stack of tools — and the bills that come with them.',
    image: MEDIA.socialProof.thumbsDesktop.t05.src,
    alt: 'A business owner focused on her work',
    results: [
      { value: '-42%', label: 'Software costs' },
      { value: '+180', label: 'New reviews' },
    ],
  },
];

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
