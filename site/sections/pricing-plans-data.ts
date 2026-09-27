/** The three plans (pricing-card-2 instances in Pricing v2 plans,
 * 1129:17117). The id keys the card's hue table in plan-card.css and
 * its motif cells. */

import type { Plan, PlanId } from "@keystone-sites/marketing-design-system/primitives/plan-card";

export type { Plan, PlanId };

/** Stripe payment links, one per plan. Defined here only. */
export const CHECKOUT_URLS: Record<PlanId, string> = {
  starter: "https://pay.keystone.app/b/fZucN6fhC7vhe6j5ux0VO02",
  growth: "https://pay.keystone.app/b/4gMaEY5H2g1N3rF1eh0VO01",
  scale: "https://pay.keystone.app/b/7sYbJ29Xi9Dp6DR5ux0VO05",
};

export { PER_MONTH } from "@keystone-sites/marketing-design-system/primitives/plan-card";

export const PLANS: [Plan, Plan, Plan] = [
  {
    id: "starter",
    name: "Starter",
    description: "Small businesses ready to step up their online web presence.",
    amount: "$50",
    cta: { label: "Start with Keystone", href: CHECKOUT_URLS.starter, external: true },
    items: [
      "Custom designed and built website with two rounds of revisions",
      "100/100 Google Lighthouse SEO Score",
      "Monthly website, SEO, and Google Maps audits and updates",
      "Easy chat-based website editor for changes, and access to our team for one round of custom changes each month",
      "24x7 virtual customer support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Businesses ready to dominate their online competition.",
    amount: "$300",
    cta: { label: "Grow with Keystone", href: CHECKOUT_URLS.growth, external: true },
    lead: "Everything in Starter, plus",
    items: [
      "Daily content updates and weekly audits",
      "Daily posting on Instagram & Facebook",
      "One daily optimized ad campaign on Facebook & Instagram or Google",
      "AI lead follow-up and conversion via iMessages/SMS",
      "Dedicated Growth Partner for campaign management, strategy, and custom website changes",
    ],
    tag: "Most popular.",
  },
  {
    id: "scale",
    name: "Scale",
    description: "Businesses ready to grow as quickly as possible.",
    amount: "$600",
    cta: { label: "Scale with Keystone", href: CHECKOUT_URLS.scale, external: true },
    lead: "Everything in Growth, plus",
    items: [
      "Complex websites with 50+ pages",
      "Custom integration with other CRMs, booking systems, and marketing tools",
      "Unlimited daily optimized ad campaigns on Facebook & Instagram or Google",
      "Customizable AI receptionist for primary or backup phone answering",
      "Weekly strategy meetings with dedicated Growth Partner",
    ],
  },
];

export const PLANS_NOTE = "No setup fee. No contract. Cancel anytime.";
