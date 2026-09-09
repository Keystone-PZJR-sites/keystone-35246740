/** Pricing personas, services, and keyword chips. CSS controls the
 * presentation order needed at each grid band. */

import type { PersonaContent } from "../primitives/persona-card";

export const PERSONAS: [PersonaContent, PersonaContent, PersonaContent] = [
  {
    id: "steady",
    hue: "pink",
    title: "A wedding planner averaging one event a month.",
    estimate: "$50 – $55",
    story:
      "A gallery site that shows her taste and her experience, always current. Photos from each event go up. The blog publishes for couples searching. Social stays active. Every inquiry gets attention until she needs to step in.",
    chips: ["Website", "Social", "Content", "Reviews & Listings", "Lead follow-up"],
    tagLabel: "Steady",
  },
  {
    id: "active",
    hue: "blue",
    title: "A plumbing company with four trucks.",
    estimate: "$250 – $450",
    story:
      "A conversion site with landing pages for every city, service, and question they get asked. Service areas and pricing stay current. Calls get answered so jobs get booked and ads run for the high-margin services. After every job, we ask for the review.",
    chips: ["Website", "Social", "Ads", "Content", "Reviews & Listings", "Lead follow-up", "Growth Partner"],
    tagLabel: "Active",
  },
  {
    id: "highgrowth",
    hue: "purple",
    title: "A medspa with three locations.",
    estimate: "$1,000 – $3,000",
    story:
      "One system across all three locations. A beautiful site with seamless booking integrations, dynamic pricing, and new photography every week. Spending $30,000 every month on highly optimized ads, pursuing thousands of leads seamlessly, with heavy seasonal swings.",
    chips: ["Website", "Social", "Ads", "Content", "Reviews & Listings", "Lead follow-up", "Growth Partner"],
    tagLabel: "High Growth",
  },
];

/** Explicit lines preserve the heading composition at every band. */
export const PRICE_SCALE_HEAD: [string, string] = ["Then it scales", "with you"];

export const PRICE_SCALE_SUBHEAD =
  "Everything runs on credits. Use Keystone for the work you want. Don’t pay for anything you don’t.";

export interface KeywordChip {
  /** The class suffix the section CSS keys the hue pair and the
   * per-band order on. */
  id: "ads" | "sales" | "social" | "phone" | "hvm" | "multi";
  label: string;
}

/** DOM order follows the wide layout; narrower bands restate it with CSS `order`. */
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
