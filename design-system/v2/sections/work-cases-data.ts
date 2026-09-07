/** v2 sections — the Our Work case-studies content (spec 014 §5).
 * Copy ships curly apostrophes and the ú in Bare Lúx (the 008 canon);
 * the canonical single-spaced strings — nothing builds from the file's
 * residual double spaces (§9 F3). The stars ride the Average-rating
 * stats, stepping with their size (014 §9 F5).
 *
 * THE STAT CANON IS CROSS-SURFACE (spec 022 §9 R3, owner ruling
 * 2026-09-06, superseding the 014 §5 values): the homepage case-study
 * carousel and these cards render the same per-study stats from this
 * one module, so a content pass updates both surfaces. The 022 drawn
 * stats replaced the 014 set: Zivel's `22 Consults booked` slot became
 * `1 New sales hire`, YHS's rating stat became `$25k Monthly revenue`
 * (label `Per lead` → `Cost per lead`), Bare Lúx's `109` became
 * `100+`. Stat ORDER is material — the carousel's md/xs cards render
 * the first two stats only (022 §4 as amended at the build fresh
 * read). */

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
