/** v2 sections — the case-study data module (spec 017 §5.1). The page
 * is a template: every section renders from one typed per-study record
 * (the prop-driven law) and the route builds only the studies present
 * here — unpopulated slugs 404 (§9 F9; no placeholder pages ship).
 * Phase B studies (Your Health Solutions · Bare Lúx Studio) land as
 * content-only passes: a record in this module plus their image tiers
 * in the media registry, nothing else.
 *
 * The Zivel copy below is the §3 canon, verified against the file's
 * rendered nodes at build (2026-08-31): single-spaced, curly
 * apostrophes; the drawn per-band variants (the H1 breaks, the rt tag
 * order, the rm/rs Reviews shortening) are designed intent and carry
 * their own fields. The live URLs are the owner's 2026-08-29 delivery
 * (017 §5.2). Image tier dimensions are the delivered canvases at 2×
 * (§5.4 — header/studio composited with the baked shadow and tint;
 * result exact); the rt header and rm result tiers await byte-only
 * re-cuts after the closing-pass resizes (656→648 · 680→672) and the
 * dimensions below track the delivered files until they land. */

import type { CaseStudyPageImage } from "../media";

export type Band = "rm" | "rs" | "rt" | "rd1" | "rd2";

/** The homepage chip vocabulary's color roles (spec 006 §3). */
export type ChipColor = "pink" | "orange" | "yellow" | "teal" | "blue" | "purple";

export interface CaseStudyTag {
  label: string;
  color: ChipColor;
}

export interface CaseStudyStat {
  value: string;
  /** The 5★ intro stat renders the star glyph after the numeral. */
  star?: boolean;
  label: string;
}

export interface FunnelRow {
  label: string;
  value: string;
  /** Bar width: "fill" rides the row (bar 1); numbers are material px
   * (§3.6 — 130/60/40). The last row draws the teal end bar. */
  bar: "fill" | number;
}

export interface StackCell {
  icon: "website" | "ads" | "front-desk" | "content" | "reviews" | "reporting";
  title: string;
  desc: string;
  /** Designed per-band shortening (the Reviews cell, §9 F4f). */
  descShort?: string;
}

export interface ImageTierSize {
  w: number;
  h: number;
}

export interface CaseStudy {
  /** Route slug (the 014 canon, verified against main). */
  slug: string;
  /** Asset id in the media registry file names. */
  assetId: string;
  name: string;
  /** The H1 canon — one accessible string; the drawn per-band breaks
   * render as band-gated <br>s (§3.1, the 012 built-explicit
   * precedent). Three segments: the rt break lands after seg1, the
   * rs/rd2 break after seg2; rm/rd1 wrap naturally in their boxes. */
  h1: { seg1: string; seg2: string; seg3: string };
  metadata: { category: string; location: string; founders: string; since: string };
  /** Canonical tag order; the rt band draws its own (§3.1 as built —
   * Phone answering joins row 1 before Social at rt only). */
  tags: CaseStudyTag[];
  tagsRt: CaseStudyTag[];
  intro: { head: string; stats: CaseStudyStat[]; disclaimer: string };
  overview: { head: string; body: string; checklist: string[]; stats: CaseStudyStat[] };
  /** The body is two drawn paragraphs (the break after "beautifully
   * curated." at every band — re-read 2026-08-31; the type style's
   * paragraph spacing carries the gap). */
  business: { head: string; body: string[]; quote: string; attribution: string };
  shift: {
    beforeLabel: string;
    afterLabel: string;
    beforeStats: CaseStudyStat[];
    afterStats: CaseStudyStat[];
    /** One text node, four lines (§3.5). */
    beforeLines: string[];
    afterChecklist: string[];
    tag: string;
  };
  funnel: { head: string; subhead: string; rows: FunnelRow[]; disclaimer: string };
  stack: { head: string; subhead: string; cells: StackCell[] };
  /** Two drawn paragraphs (the break before "The deeper win" — the
   * business-body class, re-read 2026-08-31). */
  result: { quote: string; attribution: string; head: string; body: string[]; buttonLabel: string };
  liveUrl: string;
  /** Meaningful alt per photograph (§8.7). */
  alts: Record<CaseStudyPageImage, string>;
  /** Delivered tier canvases at 2× per image and cut (§5.4). */
  imageTiers: Record<CaseStudyPageImage, Record<384 | 576 | 768 | 960 | 1344, ImageTierSize>>;
}

export const ZIVEL: CaseStudy = {
  slug: "palm-coast-zivel",
  assetId: "zivel",
  name: "Palm Coast Zivel",
  h1: {
    seg1: "How Keystone helped",
    seg2: " Palm Coast Zivel turn lead",
    seg3: " gen into a new hire.",
  },
  metadata: {
    category: "Wellness, Recovery",
    location: "Palm Coast, FL",
    founders: "Nikki Lang & Kelly Lang",
    since: "February 2026",
  },
  tags: [
    { label: "Ads", color: "pink" },
    { label: "Sales calls", color: "orange" },
    { label: "Social", color: "yellow" },
    { label: "Phone answering", color: "teal" },
    { label: "High-volume messaging", color: "blue" },
    { label: "Multi-location campaigns", color: "purple" },
  ],
  tagsRt: [
    { label: "Ads", color: "pink" },
    { label: "Sales calls", color: "orange" },
    { label: "Phone answering", color: "teal" },
    { label: "Social", color: "yellow" },
    { label: "High-volume messaging", color: "blue" },
    { label: "Multi-location campaigns", color: "purple" },
  ],
  intro: {
    head: "In the first four months:",
    stats: [
      { value: "257", label: "Leads tracked" },
      { value: "22", label: "Consults booked" },
      { value: "14", label: "New members" },
      { value: "5", star: true, label: "Average rating" },
    ],
    disclaimer: "Real figures pulled from Keystone as of June 2026.",
  },
  overview: {
    head: "The Overview",
    body:
      "Palm Coast Zivel is a performance-and-recovery studio in Palm Coast, FL — sauna, cryotherapy, red-light, float, compression, and body contouring. Keystone replaced a patchwork of manual follow-up with one connected system: managed Meta ads, a conversion-focused website, and an AI front desk that texts every new lead back in under a minute.",
    checklist: [
      "257 leads captured and tracked in the Keystone CRM since going live.",
      "22 consults booked and 14 leads converted to paying members.",
      "A wall of 5-star reviews and weekly blog posts, all run from one platform.",
      "An AI front desk sent 12,515 follow-up texts, reaching 243 distinct leads.",
      "Produced over 71k impressions and 8k clicks at about 12¢ a click.",
    ],
    stats: [
      { value: "8,000", label: "Ad clicks" },
      { value: "47", label: "Hot leads flagged" },
      { value: "14", label: "New members" },
    ],
  },
  business: {
    head: "A recovery studio built on great in-person experiences",
    body: [
      "Walk into Zivel in Palm Coast and you exhale. It\u2019s a modern wellness and recovery studio — infrared sauna, cryotherapy, red-light therapy, float, compression, body contouring, and cryofacials — built around helping people heal faster, move better, and feel like themselves again. Regulars describe it as immaculate, zen, and beautifully curated.",
      "Owner Kelly Lang had the hard part nailed: a space and a team people rave about. What he didn\u2019t have was a way to keep up with the interest it generated. Inquiries came in from Facebook, Instagram, and the website, but answering them was manual and slow — and the busier the studio got, the more leads went cold while Kelly was on the floor with clients.",
    ],
    quote:
      "\u201cI can\u2019t imagine what we would be like if we actually had a website, a brand presence, and AI-driven processes in place.\u201d",
    attribution: "\u2014Kelly Lang before going all-in with Keystone",
  },
  shift: {
    beforeLabel: "Before Keystone",
    afterLabel: "After Keystone",
    beforeStats: [
      { value: "Manual", label: "Lead follow-up" },
      { value: "1\u20132 hrs", label: "Response time" },
    ],
    afterStats: [
      { value: "Automatic", label: "Lead follow-up" },
      { value: "< 1 min", label: "Response time" },
    ],
    beforeLines: [
      "Several disconnected tools to juggle",
      "Leads from ads and the site landed in different places",
      "Follow-up waited until someone got off the floor",
      "No single view of what was actually working",
    ],
    afterChecklist: [
      "One platform to run everything",
      "Ads, site, leads, and reviews live in one dashboard",
      "Every lead gets an instant, on-brand text back",
      "The dashboard shows what\u2019s working",
    ],
    tag: "Wow!",
  },
  funnel: {
    head: "From first click to paying member",
    subhead:
      "How tracked leads moved through the pipeline once the AI front desk started replying instantly.",
    rows: [
      { label: "Leads captured", value: "257", bar: "fill" },
      { label: "Flagged as hot by the AI", value: "47", bar: 130 },
      { label: "Consults booked", value: "22", bar: 60 },
      { label: "Converted to members", value: "14", bar: 40 },
    ],
    disclaimer:
      "Hot-lead count reflects leads the AI front desk flagged as high-intent. Members = leads marked purchased in the CRM.",
  },
  stack: {
    head: "Everything Keystone runs for Zivel",
    subhead:
      "How Zivel looks, who answers, and what people are saying about it all handled from one platform.",
    cells: [
      {
        icon: "website",
        title: "Website",
        desc: "A custom website, built for your business, hosted with no traffic limits.",
      },
      {
        icon: "ads",
        title: "Meta Ads",
        desc: "Campaigns managed end-to-end and optimized for spend.",
      },
      {
        icon: "front-desk",
        title: "AI Front Desk",
        desc: "Instant text follow-up that answers questions, qualifies, and books 24/7.",
      },
      {
        icon: "content",
        title: "Content Engine",
        desc: "14 published blog posts that build local search visibility over time.",
      },
      {
        icon: "reviews",
        title: "Reviews",
        desc: "Review capture that turned happy clients into a 5-star public reputation.",
        descShort: "Review capture that turned happy clients into a 5-star reputation.",
      },
      {
        icon: "reporting",
        title: "Reporting",
        desc: "Ads, leads, bookings, and reviews tracked in a single place.",
      },
    ],
  },
  result: {
    quote:
      "\u201cToo many leads! Had a great conversation with a new lead that came in through the website. She\u2019d seen the Facebook ad... filled out the form, and I booked her for a Day Pass today.\u201d",
    attribution: "\u2014Kelly Lang, Owner of Palm Coast Zivel",
    head: "A front office that runs itself",
    body: [
      "Zivel is closing memberships at a pace Kelly describes as \u201ca new member close per day,\u201d and the lead engine has gone from a trickle he chased to a flow he has to keep up with. The reviews back it up: a perfect 5-star average across the studio\u2019s public profile.",
      "The deeper win is leverage. The same small team now reaches hundreds of prospects, answers every one instantly, and never loses a lead to a slow reply — without anyone working nights to make it happen. That\u2019s the difference between a great studio and a great studio that\u2019s also a growing business.",
    ],
    buttonLabel: "View the Palm Coast Zivel website",
  },
  liveUrl: "https://palm-coast-zivel-35621640.rahul-0b6.workers.dev/",
  alts: {
    header: "Owners Nikki and Kelly Lang outside the Palm Coast Zivel storefront",
    studio: "The infrared sauna inside the Zivel studio",
    result: "The Zivel reception desk",
  },
  imageTiers: {
    header: {
      384: { w: 680, h: 520 },
      576: { w: 968, h: 584 },
      /* stale delivered cut — re-cuts to 648×648 with the trued 5t box
         (017 §5.4); byte-only swap, dimensions update then */
      768: { w: 656, h: 656 },
      960: { w: 808, h: 808 },
      1344: { w: 1128, h: 1128 },
    },
    studio: {
      384: { w: 678, h: 646 },
      576: { w: 966, h: 966 },
      768: { w: 768, h: 774 },
      960: { w: 800, h: 806 },
      1344: { w: 896, h: 902 },
    },
    result: {
      /* stale delivered cut — re-cuts to 672×448 with the 336 box
         (017 §9 F2); byte-only swap, dimensions update then */
      384: { w: 680, h: 448 },
      576: { w: 960, h: 576 },
      768: { w: 1280, h: 768 },
      960: { w: 1600, h: 960 },
      1344: { w: 1792, h: 1120 },
    },
  },
};

/** The populated studies, in delivery order. Route params build from
 * this list; everything else 404s (§9 F9). */
export const CASE_STUDIES: CaseStudy[] = [ZIVEL];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((s) => s.slug === slug);
}
