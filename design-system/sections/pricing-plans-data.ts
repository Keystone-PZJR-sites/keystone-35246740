/** The three plans (pricing-card-2 instances in Pricing v2 plans,
 * 1129:17117). The id keys the card's hue table in plan-card.css and
 * its motif cells. */

export type PlanId = "starter" | "growth" | "scale";

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  /** Monthly amount as designed, with the currency mark. */
  amount: string;
  cta: { label: string; href: string; external?: boolean };
  /** Shown above the list when the plan builds on another. */
  lead?: string;
  items: string[];
  /** Hanging tag under the card; only the popular plan has one. */
  tag?: string;
}

/** Stripe checkout for the Starter plan; the "Start today" CTA in the
 * scale section opens the same link. */
export const PRICING_CHECKOUT_URL = "https://pay.keystone.app/b/fZucN6fhC7vhe6j5ux0VO02";

/* Growth and Scale have no checkout links in the design yet; their
   CTAs are stubbed to "#" until the links exist. */
const PENDING_CHECKOUT_URL = "#";

export const PER_MONTH = "/month";

export const PLANS: [Plan, Plan, Plan] = [
  {
    id: "starter",
    name: "Starter",
    description: "Small businesses ready to step up their online web presence.",
    amount: "$50",
    cta: { label: "Start with Keystone", href: PRICING_CHECKOUT_URL, external: true },
    items: [
      "Custom designed and built website with two rounds of revisions",
      "100/100 Google Lighthouse SEO Score",
      "Monthly Website, SEO and Google Maps audits and updates",
      "Easy chat-based website editor for changes, and access to our team for one round of custom changes each month",
      "24x7 virtual customer support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Businesses ready to dominate their online competition.",
    amount: "$300",
    cta: { label: "Grow with Keystone", href: PENDING_CHECKOUT_URL },
    lead: "Everything in Starter, plus",
    items: [
      "Daily content updates and weekly audits",
      "Daily posting on Instagram & Facebook",
      "One daily optimized ad campaign on Facebook & Instagram or Google",
      "AI lead follow-up and conversion via iMessages/SMS",
      "Dedicated Growth Partner for campaign management, strategy, and custom Website changes",
    ],
    tag: "Most popular.",
  },
  {
    id: "scale",
    name: "Scale",
    /* The design repeats Starter's description here (1129:17842);
       flagged to design, transcribed as drawn. */
    description: "Small businesses ready to step up their online web presence.",
    amount: "$600",
    cta: { label: "Scale with Keystone", href: PENDING_CHECKOUT_URL },
    lead: "Everything in Growth, plus",
    items: [
      "Complex websites with 50+ pages",
      "Custom integration with other CRMs, booking systems and marketing tools",
      "Unlimited daily optimized ad campaigns on Facebook & Instagram or Google",
      "Customizable AI receptionist for primary or backup phone answering",
      "Weekly strategy meetings with dedicated Growth Partner",
    ],
  },
];

export const PLANS_NOTE = "No setup fee. No contract. Cancel anytime.";
