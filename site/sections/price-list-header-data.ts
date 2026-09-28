/** Price list header copy (header 1213:54246). */

export const PRICE_LIST_HEADER = {
  crumbParent: "Pricing",
  crumb: "Price List",
  headline: "What each job costs.",
  intro:
    "Below, twenty-three common jobs and what they typically cost. Examples of the work, not all of it. Work credits can be purchased on-demand or with optional autofill.",
} as const;

/** The chips seat Listings & Reviews before Ads, unlike the table, so
 * the 384 rows balance into two (1213:54244). */
export const PRICE_LIST_CHIP_ORDER = [
  "website",
  "content",
  "social",
  "listings",
  "ads",
  "contacts",
  "growth-partner",
] as const;
