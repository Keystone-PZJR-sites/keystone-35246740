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

/** Per-band whole-tick growth on a template frame (the clearance law
 * — rules.md "Content clears the lattice", owner ruling 2026-09-04).
 * Omitted bands render the drawn (Zivel) heights. */
export type ExtraTicks = Partial<Record<Band, number>>;

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
  /** The clearance law (rules.md "Content clears the lattice"): where
   * a study's copy runs longer than the drawn Zivel interior, the
   * frame grows by whole ticks so bottom-anchored blocks and the next
   * section slide down to the next tick with ≥ half-tick clearance.
   * `overview` grows the section + frame (the stat row rides the
   * frame bottom); `shift` grows the section + the after card (the
   * checklist card — the variable-length interior); `result` grows
   * the section (flow interior; the CTA regains its end clearance).
   * Values from the 2026-09-04 clearance audit at the ten sweep
   * widths. The painted lattice rides the growth: the leading east
   * rail extends, and the widenings drawn beside the stat rows (and
   * their ornaments) shift down with the frame bottom (the
   * `grownBand` model in case-study-lattice.tsx). */
  extraTicks?: {
    overview?: ExtraTicks;
    shift?: ExtraTicks;
    result?: ExtraTicks;
  };
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

/** Phase B content pass — DRAFT copy, 2026-09-04 (not yet owner-
 * approved). Re-flowed from the v1 case studies on `main`
 * (data/case-studies/your-health-solutions.ts + the source dossier
 * docs/case-studies/your-health-solutions.md — CRM figures pulled
 * 2026-06-28, owner quotes verbatim from Jessica Blancato Roche's
 * text thread). The narrative arc parallels Zivel's transformation
 * (demand gen → a new hire): a brand-new business that opened at
 * full speed and reached $25k in monthly revenue in seven months.
 * The $25k MRR figure is owner-supplied (2026-09-04) and is not in
 * the June dossier — verify against prod before this ships. Images
 * landed 2026-09-04: the delivery was three single masters (largest-
 * cut content, no baked dressing), so the fifteen tiers in
 * public/media/case-studies were generated build-side — center-crop
 * + resize to each drawn box at 2×, the §3.1 tint and the §5.4
 * shadows baked on the canvas pads (dims verified against the tier
 * table below). Interim assets: they swap byte-only if design
 * supplies verbatim per-band exports. The 576 studio tier upscales
 * the 896px master ~7%. Funnel bar widths are draft values for
 * design. */
export const YOUR_HEALTH_SOLUTIONS: CaseStudy = {
  slug: "your-health-solutions",
  assetId: "yhs",
  name: "Your Health Solutions",
  /* no drawn breaks (owner direction 2026-09-04) — the whole string
     rides seg1 and wraps naturally in each band's H1 box; the header
     renders a break only before a non-empty segment */
  h1: {
    seg1: "How Keystone helped Your Health Solutions reach $25k a month.",
    seg2: "",
    seg3: "",
  },
  metadata: {
    category: "Wellness, Aesthetics",
    location: "Portland, CT",
    founders: "Jessica Blancato Roche",
    since: "January 2026",
  },
  tags: [
    { label: "Ads", color: "pink" },
    { label: "Website", color: "orange" },
    { label: "Social", color: "yellow" },
    { label: "AI front desk", color: "teal" },
    { label: "Spanish-language follow-up", color: "blue" },
    { label: "Content engine", color: "purple" },
  ],
  tagsRt: [
    { label: "Ads", color: "pink" },
    { label: "Website", color: "orange" },
    { label: "Social", color: "yellow" },
    { label: "AI front desk", color: "teal" },
    { label: "Spanish-language follow-up", color: "blue" },
    { label: "Content engine", color: "purple" },
  ],
  intro: {
    head: "In the first seven months:",
    stats: [
      { value: "$25k", label: "Monthly revenue" },
      { value: "320", label: "Leads tracked" },
      { value: "$3.50", label: "Cost per lead" },
      { value: "5", star: true, label: "Average rating" },
    ],
    disclaimer:
      "Real figures pulled from Keystone as of June 2026; monthly revenue as of August 2026.",
  },
  overview: {
    head: "The Overview",
    body:
      "Your Health Solutions is a wellness-and-aesthetics med spa in Portland, CT — injectables, body contouring, facials, and IV therapy. It opened in January 2026 and went live on the full Keystone stack the same week: managed Meta ads, a conversion-focused website, social, content, reviews, and an AI front desk that texts every new lead back in under a minute.",
    checklist: [
      "320 leads captured and tracked in the Keystone CRM since opening week.",
      "Meta ads tuned to about $3.50 per lead on a $10-a-day budget.",
      "An AI front desk sent 34,356 follow-up texts, reaching 301 distinct leads.",
      "389 social posts and 53 blog posts published from one platform.",
      "25 Google reviews at a perfect 5-star average.",
    ],
    stats: [
      { value: "6,588", label: "Ad clicks" },
      { value: "301", label: "Leads reached" },
      { value: "$1,814", label: "Total ad spend" },
    ],
  },
  business: {
    head: "A brand-new med spa with an empty calendar to fill",
    body: [
      "Your Health Solutions opened in Portland, CT with a clear promise: \u201cWellness & Aesthetics for Everyone.\u201d Injectables, body contouring, facials, IV therapy — a clean, welcoming space early clients describe as calming and professional, with staff who explain every step.",
      "But a brand-new med spa has no calendar to coast on. Jessica Blancato Roche needed bookings from the moment the doors opened — and faster than a small team could chase by hand. So instead of bolting on one tool at a time, she flipped on the entire Keystone stack at once and let the system run the front office from day one.",
    ],
    quote:
      "\u201cGood morning — we had our grand opening yesterday. I\u2019d like to run the deals today so people can start booking.\u201d",
    attribution: "\u2014Jessica Blancato Roche the day after opening",
  },
  shift: {
    beforeLabel: "Opening without Keystone",
    afterLabel: "Opening on Keystone",
    beforeStats: [
      { value: "$0", label: "Monthly revenue" },
      { value: "By hand", label: "Lead follow-up" },
    ],
    afterStats: [
      { value: "$25k", label: "Monthly revenue" },
      { value: "Automatic", label: "Lead follow-up" },
    ],
    beforeLines: [
      "An empty calendar and no local name to lean on",
      "Ad leads arriving faster than a small team can answer",
      "No social or blog rhythm building local trust",
      "Every slow reply a booking lost on day one",
    ],
    afterChecklist: [
      "Every Keystone tool live from opening week",
      "Ads feed a CRM that texts every lead back instantly",
      "A steady drumbeat of social and blog content",
      "A growing wall of 5-star Google reviews",
    ],
    tag: "$25k!",
  },
  funnel: {
    head: "From every channel into one pipeline",
    subhead:
      "Where the 320 tracked leads came from once ads, the website, and social were all live.",
    rows: [
      { label: "Leads captured", value: "320", bar: "fill" },
      { label: "From Meta ads", value: "147", bar: 138 },
      { label: "From other sources", value: "96", bar: 90 },
      { label: "From website forms", value: "77", bar: 72 },
    ],
    disclaimer:
      "Source attribution as recorded in the Keystone CRM. Other sources include social, referral, and direct inquiries.",
  },
  stack: {
    head: "Everything Keystone runs for Your Health Solutions",
    subhead:
      "How the spa looks, who answers, and what people are saying about it all handled from one platform.",
    cells: [
      {
        icon: "website",
        title: "Website",
        desc: "A conversion-focused site whose forms fed 77 of the tracked leads.",
      },
      {
        icon: "ads",
        title: "Meta Ads",
        desc: "Campaigns tuned to about $3.50 per lead on a $10-a-day budget.",
      },
      {
        icon: "front-desk",
        title: "AI Front Desk",
        desc: "Instant text follow-up that answers, qualifies, and books 24/7 — even in Spanish.",
        descShort: "Instant text follow-up that answers and books 24/7 — even in Spanish.",
      },
      {
        icon: "content",
        title: "Content Engine",
        desc: "53 published blog posts building search authority for a brand-new domain.",
      },
      {
        icon: "reviews",
        title: "Reviews",
        desc: "Review capture that built a 5-star public reputation, 25 reviews strong.",
        descShort: "Review capture that built a 5-star reputation, 25 reviews strong.",
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
      "\u201cI saw the ads are running, they look great, thank you! Wow, that\u2019s so awesome — and we\u2019re only spending $10 a day right now. You\u2019re the best, honestly!\u201d",
    attribution: "\u2014Jessica Blancato Roche, Owner of Your Health Solutions",
    head: "From opening day to $25k a month",
    body: [
      "Most new med spas spend their first year fighting for visibility. Your Health Solutions skipped that phase. Seven months after opening, the spa reached $25,000 in monthly revenue — built on 320 tracked leads at about $3.50 each, a content engine running at hundreds of posts, and a 5-star reputation across 25 Google reviews.",
      "The deeper win is what it didn\u2019t cost. The ads, the replies — including the Spanish-language consults the AI books end to end — the content, and the reviews all run from one login on about $10 a day in ad spend. No marketing department, no second front desk: just a new business that opened at full speed and kept it.",
    ],
    buttonLabel: "View the Your Health Solutions website",
  },
  liveUrl: "https://your-health-solutions-66700434.rahul-0b6.workers.dev/",
  extraTicks: {
    overview: { rm: 1, rd2: 1 },
    shift: { rm: 1 },
    result: { rm: 2, rd1: 1 },
  },
  alts: {
    header: "Owner Jessica Blancato Roche and a team member inside Your Health Solutions",
    studio: "The Your Health Solutions reception desk",
    result: "The Your Health Solutions team in the Portland, CT spa",
  },
  imageTiers: {
    header: {
      384: { w: 680, h: 520 },
      576: { w: 968, h: 584 },
      768: { w: 648, h: 648 },
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
      384: { w: 672, h: 448 },
      576: { w: 960, h: 576 },
      768: { w: 1280, h: 768 },
      960: { w: 1600, h: 960 },
      1344: { w: 1792, h: 1120 },
    },
  },
};

/** Phase B content pass — DRAFT copy, 2026-09-04 (not yet owner-
 * approved). Re-flowed from the v1 case study on `main`
 * (data/case-studies/bare-lux-studio.ts + the source dossier
 * docs/case-studies/bare-lux-studio.md — CRM figures pulled
 * 2026-06-28, owner quotes verbatim from Estefany Crook's text
 * thread). The transformation arc inverts Zivel's (whose lead gen
 * created a new hire): Bare Lúx grew to back-to-back-patient
 * capacity without ever making the front-desk or marketing hire —
 * Keystone plays both roles. The intro's "100k+" impressions
 * follows the built 014 card canon; the funnel carries the exact
 * June figure (94,493) under its own disclaimer. Images landed
 * 2026-09-04 (the YHS intake shape): three single masters, the
 * fifteen tiers generated build-side — center-crop + resize to each
 * drawn box at 2×, the §3.1 tint and §5.4 shadows baked on the
 * canvas pads (dims verified against the tier table below). Interim
 * assets: they swap byte-only if design supplies verbatim per-band
 * exports; the 576 studio tier upscales the 896px master ~7%.
 * Funnel bar widths are draft values for design. */
export const BARE_LUX_STUDIO: CaseStudy = {
  slug: "bare-lux-studio",
  assetId: "barelux",
  name: "Bare Lúx Studio",
  h1: {
    seg1: "How Keystone became",
    seg2: " the front desk Bare Lúx",
    seg3: " couldn\u2019t afford to hire.",
  },
  metadata: {
    category: "Med Spa, Aesthetics",
    location: "Bordentown, NJ",
    founders: "Estefany Crook",
    since: "February 2026",
  },
  tags: [
    { label: "Ads", color: "pink" },
    { label: "Website", color: "orange" },
    { label: "Social", color: "yellow" },
    { label: "AI front desk", color: "teal" },
    { label: "Spanish-language follow-up", color: "blue" },
    { label: "Review capture", color: "purple" },
  ],
  tagsRt: [
    { label: "Ads", color: "pink" },
    { label: "Website", color: "orange" },
    { label: "Social", color: "yellow" },
    { label: "AI front desk", color: "teal" },
    { label: "Spanish-language follow-up", color: "blue" },
    { label: "Review capture", color: "purple" },
  ],
  intro: {
    head: "In the first five months:",
    stats: [
      { value: "100k+", label: "Ad impressions" },
      { value: "109", label: "Leads tracked" },
      { value: "17", label: "Hot leads flagged" },
      { value: "5", star: true, label: "Average rating" },
    ],
    disclaimer: "Real figures pulled from Keystone as of June 2026.",
  },
  overview: {
    head: "The Overview",
    body:
      "Bare Lúx Studio is a medical spa in Bordentown, NJ, serving all of Central Jersey — laser treatments, skin care, and injectables. Keystone gives a newer studio the reach of a much larger one: high-reach managed Meta ads, an on-brand website, and an AI front desk that texts every new lead back in under a minute — even in Spanish.",
    checklist: [
      "94,493 ad impressions — the most reach of any studio we run — on about $1,785 in spend.",
      "109 leads captured and tracked in the Keystone CRM, 17 flagged hot by the AI.",
      "An AI front desk sent 9,383 follow-up texts, reaching 100 distinct leads.",
      "400 social posts and 52 blog posts kept the studio visible across Central Jersey.",
      "A perfect 5-star average across the studio\u2019s public reviews.",
    ],
    stats: [
      { value: "4,736", label: "Ad clicks" },
      { value: "17", label: "Hot leads flagged" },
      { value: "452", label: "Content pieces" },
    ],
  },
  business: {
    head: "Great treatments that not enough people were seeing",
    body: [
      "Bare Lúx Studio serves Central Jersey out of Bordentown, NJ — laser treatments, skin care, and injectables, delivered in a space clients come back to for years and rave about. The treatments and the results were never the question.",
      "The question was reach: getting in front of enough of the right people, then catching that demand before it cooled. Estefany Crook didn\u2019t have a full-time front desk or a marketing team — and hiring both is exactly the overhead a newer studio can\u2019t carry. She needed the reach of a bigger operation without the payroll that usually comes with it.",
    ],
    quote: "\u201cIt looks good!! You\u2019re the best — thank you.\u201d",
    attribution: "\u2014Estefany Crook on seeing her new Keystone website",
  },
  shift: {
    beforeLabel: "Before Keystone",
    afterLabel: "After Keystone",
    beforeStats: [
      { value: "Limited", label: "Local reach" },
      { value: "Manual", label: "Lead capture" },
    ],
    afterStats: [
      { value: "94k+", label: "Ad impressions" },
      { value: "< 1 min", label: "First reply" },
    ],
    beforeLines: [
      "Great treatments that too few people were seeing",
      "No full-time front desk to catch every inquiry",
      "No steady social or blog presence building trust",
      "Growth seemed to mean payroll the studio wasn\u2019t ready for",
    ],
    afterChecklist: [
      "The most ad reach of any studio Keystone runs",
      "Every lead texted back instantly — even in Spanish",
      "An always-on engine of 400 social posts and 52 blogs",
      "Back-to-back patients without a new hire",
    ],
    tag: "Busy!",
  },
  funnel: {
    head: "From impressions to hot leads",
    subhead:
      "How the most ad reach of any studio we run turned into a qualified pipeline.",
    rows: [
      { label: "Ad impressions", value: "94,493", bar: "fill" },
      { label: "Ad clicks", value: "4,736", bar: 150 },
      { label: "Leads captured", value: "109", bar: 76 },
      { label: "Flagged as hot by the AI", value: "17", bar: 44 },
    ],
    disclaimer:
      "Impressions and clicks from the ad platform over the active campaign window. Hot-lead count reflects leads the AI front desk flagged as high-intent.",
  },
  stack: {
    head: "Everything Keystone runs for Bare Lúx",
    subhead:
      "How Bare Lúx looks, who answers, and what people are saying about it all handled from one platform.",
    cells: [
      {
        icon: "website",
        title: "Website",
        desc: "A clean, on-brand site clients land on from ads and search.",
      },
      {
        icon: "ads",
        title: "Meta Ads",
        desc: "High-reach campaigns — 94,493 impressions on a lean budget.",
      },
      {
        icon: "front-desk",
        title: "AI Front Desk",
        desc: "Instant text follow-up that qualifies and books leads — even in Spanish.",
        descShort: "Instant text follow-up that qualifies and books — even in Spanish.",
      },
      {
        icon: "content",
        title: "Content Engine",
        desc: "52 published blog posts building organic search visibility over time.",
      },
      {
        icon: "reviews",
        title: "Reviews",
        desc: "Review capture backing the studio with a public 5-star rating.",
        descShort: "Review capture backing the studio with a 5-star rating.",
      },
      {
        icon: "reporting",
        title: "Reporting",
        desc: "Ads, leads, bookings, and reviews tracked in a single place.",
      },
    ],
  },
  result: {
    quote: "\u201cSorry, busy afternoon with back-to-back patients.\u201d",
    attribution: "\u2014Estefany Crook, Owner of Bare Lúx Studio",
    head: "At capacity, without the payroll",
    body: [
      "Bare Lúx now competes for attention like a much larger business: the most ad impressions of any studio we run, a constant content presence, and an AI front desk that catches every lead — even across languages. Estefany\u2019s afternoons fill back-to-back, and when the Keystone team told her \u201ctoo busy with patients is the best problem,\u201d she loved it.",
      "The deeper win is what the studio never had to build. Reaching this many people usually means a marketing hire; catching every inquiry usually means a front desk. Keystone plays both roles from one subscription, so the head count stayed the same while the calendar filled — and Estefany\u2019s focus stays on the patients walking through the door.",
    ],
    buttonLabel: "View the Bare Lúx Studio website",
  },
  liveUrl: "https://bare-lux-studio-93591379.rahul-0b6.workers.dev/",
  extraTicks: {
    overview: { rm: 2, rt: 1, rd1: 1, rd2: 1 },
    shift: { rm: 1 },
    result: { rm: 3, rd1: 1, rd2: 1 },
  },
  alts: {
    header: "Owner Estefany Crook at a desk inside Bare Lúx Studio",
    studio: "The Bare Lúx Studio team in their scrubs",
    result: "The Bare Lúx Studio team at the reception desk under the studio\u2019s logo",
  },
  imageTiers: {
    header: {
      384: { w: 680, h: 520 },
      576: { w: 968, h: 584 },
      768: { w: 648, h: 648 },
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
      384: { w: 672, h: 448 },
      576: { w: 960, h: 576 },
      768: { w: 1280, h: 768 },
      960: { w: 1600, h: 960 },
      1344: { w: 1792, h: 1120 },
    },
  },
};

/** The populated studies, in delivery order. Route params build from
 * this list; everything else 404s (§9 F9). The Phase B records are
 * DRAFT content passes (2026-09-04) — copy re-flowed from the v1
 * case studies, image exports not yet delivered. */
export const CASE_STUDIES: CaseStudy[] = [ZIVEL, YOUR_HEALTH_SOLUTIONS, BARE_LUX_STUDIO];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((s) => s.slug === slug);
}
