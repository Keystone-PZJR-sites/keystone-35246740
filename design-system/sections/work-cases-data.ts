/** Shared case-study summaries for the Our Work cards and homepage
 * carousel. Stat order is significant because compact cards show only
 * the first two entries. */

import type { CaseStudySiteId } from "../media";

interface CaseStudyStat {
  value: string;
  label: string;
  /** Adds the star glyph after a rating. */
  star?: boolean;
}

export interface CaseStudySummary {
  /** Media-registry key. */
  site: CaseStudySiteId;
  /** Route slug for the case-study page. */
  slug: string;
  /** The customer name — each card's <h2>. */
  name: string;
  category: string;
  description: string;
  statSlug: string;
  stats: [CaseStudyStat, CaseStudyStat, CaseStudyStat];
  /** Meaningful alt text for the customer website image. */
  alt: string;
}

/** Cards in display order. */
export const CASE_STUDIES: CaseStudySummary[] = [
  {
    site: "zivel",
    slug: "palm-coast-zivel",
    name: "Palm Coast Zivel",
    category: "Recovery & Wellness",
    description:
      "Kelly Lang had a beautiful wellness studio and real demand but follow-up was manual and leads were slipping through the cracks until Keystone gave him one system to manage it all.",
    statSlug: "In the first four months:",
    stats: [
      { value: "257", label: "Leads tracked" },
      { value: "14", label: "New members" },
      { value: "1", label: "New sales hire" },
    ],
    alt: "The Palm Coast Zivel website",
  },
  {
    site: "yhs",
    slug: "your-health-solutions",
    name: "Your Health Solutions",
    category: "Medical Spa",
    description:
      "Jessica Roche opened Your Health Solutions and flipped on every Keystone tool at once. Within just a few months, the calendar was filling on a $10-a-day ad budget.",
    statSlug: "In the first five months:",
    stats: [
      { value: "$25k", label: "Monthly revenue" },
      { value: "320", label: "Leads tracked" },
      { value: "$3.50", label: "Cost per lead" },
    ],
    alt: "The Your Health Solutions website",
  },
  {
    site: "barelux",
    slug: "bare-lux-studio",
    name: "Bare Lúx Studio",
    category: "Medical Spa",
    description:
      "Estefany Crook wanted reach and a way to capture demand. Keystone delivered both on a lean budget, including a front desk agent that answers every lead, even in Spanish.",
    statSlug: "In the first five months:",
    stats: [
      { value: "100k+", label: "Ad impressions" },
      { value: "100+", label: "Leads tracked" },
      { value: "5", label: "Average rating", star: true },
    ],
    alt: "The Bare Lúx Studio website",
  },
];
