/** v2 sections — the Our Work case-studies content (spec 014 §5).
 * Copy ships curly apostrophes and the ú in Bare Lúx (the 008 canon);
 * the canonical single-spaced strings — nothing builds from the file's
 * residual double spaces (§9 F3). The stat canon carries the resolved
 * flags: "100k+" (§9 F4); the stars ride the two Average-rating stats
 * only, stepping with their size (§9 F5). */

import type { CaseStudySiteId } from "../media";

export interface CaseStudyStat {
  value: string;
  label: string;
  /** The 15×14 star (spec 014 §7.2) on a 4 gap after the numeral —
   * the two Average-rating stats only. */
  star?: boolean;
}

export interface CaseStudy {
  /** Image-export id (§7.1) and the media-registry key. */
  site: CaseStudySiteId;
  /** The case-study page slug — the View Case Study CTA resolves to
   * `/case-studies/{slug}` (§9 F9, owner decision 2026-08-28; slugs
   * verified against main's data modules). The routes 404 on this
   * branch until the rebuilt case-studies surface lands (the 010 F1
   * precedent). */
  slug: string;
  /** The customer name — each card's <h2>. */
  name: string;
  category: string;
  description: string;
  statSlug: string;
  stats: [CaseStudyStat, CaseStudyStat, CaseStudyStat];
  /** Meaningful alt — the images are the customers' sites (§7.1). */
  alt: string;
}

/** The three cards, top-down (§5). Arrangement at md/lg/xl alternates
 * left · right · left (card 2 flips); sm/xs render all three
 * centered. */
export const CASE_STUDIES: CaseStudy[] = [
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
      { value: "22", label: "Consults booked" },
      { value: "14", label: "New members" },
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
      { value: "320", label: "Leads tracked" },
      { value: "$3.50", label: "Per lead" },
      { value: "5", label: "Average rating", star: true },
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
      { value: "109", label: "Leads tracked" },
      { value: "5", label: "Average rating", star: true },
    ],
    alt: "The Bare Lúx Studio website",
  },
];
