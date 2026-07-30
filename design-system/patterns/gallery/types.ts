// Gallery pattern — shared types (spec 054).
// Content is authored in `data/gallery-page.ts`; components render it.

/** One small labeled fact in an entry's fact row ("Founded — 2007"). */
export interface GalleryFact {
  label: string;
  value: string;
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
}
