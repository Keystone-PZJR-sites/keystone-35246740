/** The three plans (pricing-card-2 instances in Pricing v2 plans,
 * 1129:17117). The id keys the card's hue table in plan-card.css and
 * its motif cells. */

import type { Plan, PlanId } from "@keystone-sites/marketing-design-system/primitives/plan-card";

export type { Plan, PlanId };

/** Where every plan's button goes: the console's signup. The plan is chosen there, from the
 * business's own catalogue, once the account exists — so nothing about the plan rides in the
 * URL and this site never speaks to Stripe. Defined here only. */
export const SIGNUP_URL = "https://go.keystone.app/create-account";

export { PER_MONTH } from "@keystone-sites/marketing-design-system/primitives/plan-card";

export const PLANS: [Plan, Plan, Plan] = [
  {
    id: "starter",
    name: "Starter",
    description: "Small businesses ready to step up their online web presence.",
    amount: "$50",
    cta: { label: "Start with Keystone", href: SIGNUP_URL, external: true },
    items: [
      "Beautiful, SEO-optimized website with up to 5 custom pages",
      "Access to Keystone CRM and business platform",
      "Easy chat-based AI website editor for ongoing changes",
      "100/100 Google Lighthouse SEO Score",
      "Monthly website, SEO, and Google Maps audits and updates",
      "24x7 virtual customer support and assistance",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Businesses ready to dominate their online competition.",
    amount: "$300",
    cta: { label: "Grow with Keystone", href: SIGNUP_URL, external: true },
    lead: "Everything in Starter, plus",
    items: [
      "Complex websites with up to 30 custom pages",
      "Search SEO with an extensive website structure and dedicated landing pages",
      "AI SEO so answer engines like ChatGPT and Google AI recommend your business",
      "Local SEO across your Google Business Profile, Google Maps, and reviews",
      "Content SEO with regular articles and blog posts",
      "Daily audits and optimizations",
      "AI lead follow-up and conversion via webchat and text message",
      "Dedicated Growth Partner with weekly analysis, strategy, and updates over email",
    ],
    tag: "Most popular.",
  },
  {
    id: "scale",
    name: "Scale",
    description: "Businesses ready to grow as quickly as possible.",
    amount: "$600",
    cta: { label: "Scale with Keystone", href: SIGNUP_URL, external: true },
    lead: "Everything in Growth, plus",
    items: [
      "AI voice assistant for primary or backup phone answering",
      "Optimized ad campaigns on Facebook & Instagram or Google",
      "Daily posting on Instagram & Facebook",
      "Custom integration with other CRMs, booking systems, and marketing tools",
      "Monthly strategy meetings with dedicated Growth Partner",
    ],
  },
];

export const PLANS_NOTE = "No setup fee. No contract. Cancel anytime.";
