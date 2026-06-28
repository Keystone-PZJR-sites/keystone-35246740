// Content model for the case-studies pattern (spec 051, extended). One authored
// `CaseStudyContent` object per customer story drives both the gallery card and
// the full detail page. JSX is never stored here — titles are plain strings so
// the data can live in `.ts` files; the components render them through
// design-system primitives.
//
// The detail page is a long-form, block-driven layout: a `blocks` array of
// typed content sections (TL;DR, prose, charts, callouts, stat bands, before /
// after, pull quotes, photo galleries, timelines, tool rundowns) rendered in
// order beneath the hero. The legacy single-shot `comparison` / `narrative` /
// `quote` fields remain optional for backwards compatibility.

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
  /** Optional small caption shown beneath the image (galleries, prose media). */
  caption?: string;
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
  /** Small meta chips under the headline (location, category, "live since…"). */
  meta?: string[];
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

// ── Long-form blocks ──────────────────────────────────────────────────────────

/** A scannable summary that opens the story: a lede plus bulleted takeaways. */
export interface CaseStudyTldrBlock {
  type: 'tldr';
  /** Defaults to "TL;DR". */
  title?: string;
  /** One- or two-sentence lede. */
  summary?: string;
  /** The headline takeaways, as bullet points. */
  takeaways: string[];
  /** Optional KPI row beneath the takeaways. */
  stats?: CaseStudyStat[];
}

export type CaseStudyCalloutVariant = 'insight' | 'tip' | 'quote' | 'metric';

/** A highlighted aside; usable standalone or nested inside a prose block. */
export interface CaseStudyInlineCallout {
  variant?: CaseStudyCalloutVariant;
  /** Small label above the text, e.g. "What changed". */
  label?: string;
  text: string;
  /** Attribution line for `quote` callouts. */
  attribution?: string;
}

export interface CaseStudyCalloutBlock extends CaseStudyInlineCallout {
  type: 'callout';
}

/** A readable prose section: heading + paragraphs, optional side photo + callout. */
export interface CaseStudyProseBlock {
  type: 'prose';
  id: string;
  eyebrow?: string;
  title?: string;
  /** Body paragraphs. */
  body: string[];
  /** Optional supporting photo that holds its side as the prose scrolls (desktop). */
  media?: CaseStudyMedia;
  mediaSide?: 'start' | 'end';
  /** Optional highlighted aside rendered within the prose column. */
  callout?: CaseStudyInlineCallout;
}

export interface CaseStudyChartBar {
  label: string;
  /** Numeric magnitude that sets the bar width relative to the block's largest bar. */
  value: number;
  /** Human-readable value shown beside the bar, e.g. "257". */
  display: string;
  /** Paint this bar in the brand accent (the "hero" datapoint). */
  highlight?: boolean;
}

/** A simple, dependency-free horizontal bar chart. */
export interface CaseStudyChartBlock {
  type: 'chart';
  eyebrow?: string;
  title?: string;
  caption?: string;
  bars: CaseStudyChartBar[];
  footnote?: string;
}

/** A dark full-width band of oversized KPIs. */
export interface CaseStudyStatBandBlock {
  type: 'stat-band';
  eyebrow?: string;
  title?: string;
  description?: string;
  stats: CaseStudyStat[];
}

export interface CaseStudyComparisonBlock extends CaseStudyComparisonContent {
  type: 'comparison';
}

export interface CaseStudyQuoteBlock extends CaseStudyQuoteContent {
  type: 'quote';
}

/** A responsive grid of supporting photos. */
export interface CaseStudyGalleryBlock {
  type: 'gallery';
  eyebrow?: string;
  title?: string;
  caption?: string;
  images: CaseStudyMedia[];
}

export interface CaseStudyTimelineItem {
  /** Short marker, e.g. "Week 1" or "Mar 2026". */
  date: string;
  title: string;
  body: string;
}

/** A vertical, dated rollout / results timeline. */
export interface CaseStudyTimelineBlock {
  type: 'timeline';
  eyebrow?: string;
  title?: string;
  items: CaseStudyTimelineItem[];
}

export interface CaseStudyToolItem {
  name: string;
  detail: string;
}

/** A grid summarizing the Keystone tools running for this customer. */
export interface CaseStudyToolsBlock {
  type: 'tools';
  eyebrow?: string;
  title?: string;
  description?: string;
  items: CaseStudyToolItem[];
}

export type CaseStudyBlock =
  | CaseStudyTldrBlock
  | CaseStudyProseBlock
  | CaseStudyCalloutBlock
  | CaseStudyChartBlock
  | CaseStudyStatBandBlock
  | CaseStudyComparisonBlock
  | CaseStudyQuoteBlock
  | CaseStudyGalleryBlock
  | CaseStudyTimelineBlock
  | CaseStudyToolsBlock;

export interface CaseStudyContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  card: CaseStudyCardContent;
  hero: CaseStudyHeroContent;
  /**
   * The long-form body, rendered in order beneath the hero. When present, this
   * drives the detail page. Authored stories should use this.
   */
  blocks?: CaseStudyBlock[];
  /** Legacy single-shot sections (spec 051 original). Optional. */
  comparison?: CaseStudyComparisonContent;
  narrative?: CaseStudyNarrativeContent;
  quote?: CaseStudyQuoteContent;
  closing: CaseStudyClosing;
}
