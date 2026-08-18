// Gallery pattern — shared types (spec 054).
// Content is authored in `data/gallery-page.ts`; components render it.

/** One small labeled fact in an entry's fact row ("Founded — 2007"). */
export interface GalleryFact {
  label: string;
  value: string;
}

/**
 * Optional case-study callout on a gallery card: hero KPIs plus a link to
 * `/case-studies/[slug]` on keystone.app (opens in a new tab).
 */
export interface GalleryCaseStudy {
  /** Case-study route slug (may differ from the gallery entry slug). */
  slug: string;
  /** Hero baseball-card KPIs from the case study. */
  stats: GalleryFact[];
}

/** One showcased website: the story header plus the live embed target. */
export interface GalleryEntryContent {
  /** Stable key, also used as the entry's DOM id for deep links. */
  slug: string;
  /** Business name, rendered in the display face. */
  name: string;
  /** Small uppercase industry label above the name. */
  industry: string;
  /** The live production site the frame embeds. */
  url: string;
  /** Short narrative paragraph about the business. */
  story: string;
  /** Labeled facts (founded, founder, locations, …). Varies per business. */
  facts: GalleryFact[];
  /** Key website attributes rendered as pills. Varies per business. */
  attributes: string[];
  /** When present, renders KPI stats and a case-study CTA on the card. */
  caseStudy?: GalleryCaseStudy;
}
