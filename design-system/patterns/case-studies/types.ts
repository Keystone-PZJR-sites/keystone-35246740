// Content model for the case-studies pattern (spec 051). One authored
// `CaseStudyContent` object per customer story drives both the gallery card and
// the full detail page. JSX is never stored here — titles are plain strings so
// the data can live in `.ts` files; the components render them through
// design-system primitives.

export interface CaseStudyLink {
  label: string;
  href: string;
  external?: boolean;
}

/** An oversized headline value over a short label, e.g. "+58%" / "online orders". */
export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudyMedia {
  image: string;
  alt: string;
}

/** The summary shown on a story card in the gallery and the other-stories row. */
export interface CaseStudyCardContent {
  /** Short quote-style summary of the result. */
  summary: string;
  /** Up to three headline statistics. */
  stats: CaseStudyStat[];
  /** Owner / spokesperson name. */
  person: string;
  /** Business name. */
  business: string;
  media: CaseStudyMedia;
}

export interface CaseStudyHeroContent {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  stats: CaseStudyStat[];
  media: CaseStudyMedia;
}

/** One side of the before / after contrast. */
export interface CaseStudyComparisonColumn {
  label: string;
  stats: CaseStudyStat[];
  points: string[];
}

export interface CaseStudyComparisonContent {
  eyebrow?: string;
  title: string;
  before: CaseStudyComparisonColumn;
  after: CaseStudyComparisonColumn;
}

export interface CaseStudyNarrativeBlock {
  id: string;
  heading: string;
  body: string;
}

export interface CaseStudyNarrativeContent {
  blocks: CaseStudyNarrativeBlock[];
  media: CaseStudyMedia;
  /** Which side the photo sits on at desktop. Defaults to end (right). */
  mediaSide?: 'start' | 'end';
}

export interface CaseStudyQuoteContent {
  quote: string;
  attribution: string;
  results: CaseStudyStat[];
  media: CaseStudyMedia;
}

export interface CaseStudyClosing {
  title: string;
  action: CaseStudyLink;
}

export interface CaseStudyContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  card: CaseStudyCardContent;
  hero: CaseStudyHeroContent;
  comparison: CaseStudyComparisonContent;
  narrative: CaseStudyNarrativeContent;
  quote: CaseStudyQuoteContent;
  closing: CaseStudyClosing;
}
