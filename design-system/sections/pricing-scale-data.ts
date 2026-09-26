/** Pricing personas and the price-scale copy (persona-slider,
 * 1150:25342). Personas run in slider order, least to most work. */

import type { PersonaContent } from "../primitives/persona-card";

export const PERSONAS: [PersonaContent, PersonaContent, PersonaContent, PersonaContent] = [
  {
    id: "steady",
    hue: "pink",
    title: "A wedding planner averaging one event a month.",
    plan: "On Starter",
    price: "$50/mo",
    story:
      "A gallery site that shows her taste and experience, always kept current. Photos from each event go up. The blog publishes for couples searching. Social stays active. Every inquiry gets attention until she needs to step in.",
    tagLabel: "Steady",
  },
  {
    id: "growth",
    hue: "teal",
    title: "Accounting firm with two CPAs.",
    plan: "On Growth",
    price: "$300/mo",
    story:
      "A site that lists their credentials and every service they handle. The blog publishes ahead of quarterly deadlines and tax-law changes. Reviews get asked for after every return filed. Calls and form fills get answered the same day.",
    tagLabel: "Active",
  },
  {
    id: "active",
    hue: "blue",
    title: "A plumbing company with four trucks.",
    plan: "On Scale",
    price: "$600/mo",
    story:
      "A conversion site with landing pages for every city, service, and question they get asked. Service areas and pricing stay current. Calls get answered so jobs get booked and ads run for the high-margin services. After every job, we ask for the review.",
    tagLabel: "High Growth",
  },
  {
    id: "highgrowth",
    hue: "purple",
    title: "A medspa with three locations.",
    plan: "Custom",
    price: "~$1,250/mo",
    story:
      "One system across all three locations. A beautiful site with seamless booking integrations and dynamic pricing. Spending $30,000 every month on highly optimized ads, pursuing thousands of leads seamlessly, with heavy seasonal swings.",
    tagLabel: "Scaling Fast",
  },
];

/** Explicit lines preserve the heading composition at every band. */
/* One line at 384 (1170:33672); the 768 and 1344 columns wrap it. */
export const PRICE_SCALE_HEAD = "Then it scales with you";

/* The design's text carries a doubled space before "add on"; a typo,
   transcribed with one. */
export const PRICE_SCALE_SUBHEAD =
  "Your subscription covers all the work in your plan and with extra usage, you can add on additional work at any time.";

export const PRICE_SCALE_CTA = "Start today";

export interface KeywordChip {
  /** The class suffix the section CSS keys the hue pair and the
   * per-band order on. */
  id: "ads" | "sales" | "social" | "phone" | "hvm" | "multi";
  label: string;
}

/** DOM order follows the wide layout; the 384 design restates it with CSS `order`. */
export const KEYWORD_CHIPS: KeywordChip[] = [
  { id: "ads", label: "Ads" },
  { id: "sales", label: "Sales calls" },
  { id: "social", label: "Social" },
  { id: "phone", label: "Phone answering" },
  { id: "hvm", label: "High-volume messaging" },
  { id: "multi", label: "Multi-location campaigns" },
];

/** The slider's accessible name. */
export const SLIDER_LABEL = "Price scale";
