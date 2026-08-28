/** v2 sections — pricing-scale content (spec 012 §3/§5). The build's
 * copy set is canonical (§9 F3): curly apostrophes, spaced en dashes
 * in the estimates, titles and stories wrapping naturally in their
 * weight-riding boxes (the file's xl U+2028 copy-hack breaks are not
 * built).
 *
 * The service chips render one consolidated order across all three
 * personas (owner decision 2026-08-28, superseding the build's
 * read of the file's swapped active/highgrowth instances — §9):
 * Website · Social · (Ads) · Content · Reviews & Listings · Lead
 * follow-up · (Growth Partner).
 *
 * The keyword chips carry per-band ORDERS by design (§3 as amended
 * 2026-08-28, §9 F2 — hand-set to balance each band's rag): one copy
 * set here in the rt/rd2 order; the section CSS restates the flex
 * order per band. */

import type { PersonaContent } from "../primitives/persona-card";

export const PERSONAS: [PersonaContent, PersonaContent, PersonaContent] = [
  {
    id: "steady",
    hue: "pink",
    title: "A wedding planner averaging one event a month.",
    estimate: "$50 \u2013 $55",
    story:
      "A gallery site that shows her taste and her experience, always current. Photos from each event go up. The blog publishes for couples searching. Social stays active. Every inquiry gets attention until she needs to step in.",
    chips: ["Website", "Social", "Content", "Reviews & Listings", "Lead follow-up"],
    tagLabel: "Steady",
  },
  {
    id: "active",
    hue: "blue",
    title: "A plumbing company with four trucks.",
    estimate: "$250 \u2013 $450",
    story:
      "A conversion site with landing pages for every city, service, and question they get asked. Service areas and pricing stay current. Calls get answered so jobs get booked and ads run for the high-margin services. After every job, we ask for the review.",
    chips: ["Website", "Social", "Ads", "Content", "Reviews & Listings", "Lead follow-up", "Growth Partner"],
    tagLabel: "Active",
  },
  {
    id: "highgrowth",
    hue: "purple",
    title: "A medspa with three locations.",
    estimate: "$1,000 \u2013 $3,000",
    story:
      "One system across all three locations. A beautiful site with seamless booking integrations, dynamic pricing, and new photography every week. Spending $30,000 every month on highly optimized ads, pursuing thousands of leads seamlessly, with heavy seasonal swings.",
    chips: ["Website", "Social", "Ads", "Content", "Reviews & Listings", "Lead follow-up", "Growth Partner"],
    tagLabel: "High Growth",
  },
];

/** The head's two designed lines (§3 as amended 2026-08-28 at build):
 * the file carries a U+2028 break after "scales" at rm/rt/rd1/rd2 (rs
 * breaks there naturally in its 160 box) — a designed break, not a
 * copy hack: natural wrapping cannot reproduce it at rm (the string
 * fits the 288 box on one line). Built as an explicit break. */
export const PRICE_SCALE_HEAD: [string, string] = ["Then it scales", "with you"];

export const PRICE_SCALE_SUBHEAD =
  "Everything runs on credits. Use Keystone for the work you want. Don\u2019t pay for anything you don\u2019t.";

export interface KeywordChip {
  /** The class suffix the section CSS keys the hue pair and the
   * per-band order on. */
  id: "ads" | "sales" | "social" | "phone" | "hvm" | "multi";
  label: string;
}

/** DOM order = the rt/rd2 designed order; the rm and rs/rd1 orders are
 * CSS `order` restatements per band (§3). */
export const KEYWORD_CHIPS: KeywordChip[] = [
  { id: "ads", label: "Ads" },
  { id: "sales", label: "Sales calls" },
  { id: "social", label: "Social" },
  { id: "phone", label: "Phone answering" },
  { id: "hvm", label: "High-volume messaging" },
  { id: "multi", label: "Multi-location campaigns" },
];

/** The slider's accessible name (§8.7). */
export const SLIDER_LABEL = "Price scale";
