// Pricing plan types (spec 055). Content lives in `data/pricing-page.tsx`.

export type PricingPlanId = 'foundation' | 'system';

export interface PricingPlan {
  id: PricingPlanId;
  name: string;
  /** Short line under the name. */
  tagline: string;
  /** Display price, e.g. "$50". */
  priceAmount: string;
  /** Period label, e.g. "/mo". */
  pricePeriod: string;
  /** Optional badge above the name ("Most popular"). */
  badge?: string;
  /** Whether this card gets the stronger visual treatment. */
  highlighted?: boolean;
  features: string[];
  ctaLabel: string;
  /** Stripe Payment Link URL. */
  checkoutUrl: string;
}
