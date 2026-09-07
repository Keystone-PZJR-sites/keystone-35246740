/** v2 media registry — the single source of truth for new-brand asset
 * paths. Code never hardcodes an asset path; it references an entry here.
 * Source files: brand-id 2.0 logo set (copied 2026-08-22; lockup and
 * logomark refreshed 2026-08-29 from brand-id `03-logos/touch`).
 * Verified as flattened multi-path exports. Intrinsic sizes come from
 * each SVG viewBox. */

export interface MediaAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/* ---- hero carousel (spec 006 §5) ----
 * 84 verbatim WebP exports (re-supplied 2026-08-25, post flag review):
 * fourteen frames — odd rectangle, even circle — in six width tiers,
 * each exactly 2× its cut width's rendered frame size. The tiers are
 * art direction (crops differ per band), so frames render as <picture>
 * with one media-gated <source> per tier and the 384 file as the <img>
 * fallback. Sources list largest-first (first match wins). */

export const HERO_CAROUSEL_FRAMES = 14;

export interface HeroCarouselTier {
  cut: 384 | 576 | 768 | 960 | 1152 | 1344;
  /** null on the 384 tier — it is the <img> fallback, not a <source>. */
  media: string | null;
  rect: { width: number; height: number };
  circle: { width: number; height: number };
}

/** Largest-first, ready for <source> order; the last entry is the
 * 384 fallback. The media cuts follow the nearest-anchor structural
 * gates (spec 002.r1 — amended 2026-08-26) so each band's crop shows
 * wherever its design renders; the 1152 mid-cut serves the compressed
 * rd2 slice. */
export const HERO_CAROUSEL_TIERS: HeroCarouselTier[] = [
  { cut: 1344, media: "(min-width: 1344px)", rect: { width: 1792, height: 1120 }, circle: { width: 1120, height: 1120 } },
  { cut: 1152, media: "(min-width: 1130px)", rect: { width: 1536, height: 960 }, circle: { width: 960, height: 960 } },
  { cut: 960, media: "(min-width: 860px)", rect: { width: 1280, height: 800 }, circle: { width: 800, height: 800 } },
  { cut: 768, media: "(min-width: 665px)", rect: { width: 1024, height: 640 }, circle: { width: 640, height: 640 } },
  { cut: 576, media: "(min-width: 470px)", rect: { width: 768, height: 576 }, circle: { width: 576, height: 576 } },
  { cut: 384, media: null, rect: { width: 512, height: 512 }, circle: { width: 512, height: 512 } },
];

/** hero-{01–14}-{tier}.webp under public/media/hero-carousel. */
export function heroCarouselSrc(frame: number, cut: HeroCarouselTier["cut"]): string {
  return `/media/hero-carousel/hero-${String(frame).padStart(2, "0")}-${cut}.webp`;
}

/* ---- hero carousel v2 (spec 018 §6/§7) ----
 * 12 verbatim WebP exports (supplied 2026-09-05): eight slides — odd
 * rectangle, even circle (radius-full clip) — in the two-cut tier set
 * (018 §9 R3): the wide cut (1344×896 = 2× the rd2 672×448 rectangle)
 * and the square cut (896×896 = 2× the 448 circle and the 384 square).
 * Odd slides render as <picture> with one wide <source> from the rt
 * gate (665) and the square file as the <img> fallback; even slides
 * mount the square cut everywhere — their square file IS the 1344
 * export, and the byte-identical 384 even exports are not committed
 * (018 §9 R5). The 10% multiply tint is baked into the exports (018
 * §9 R2) — no overlay layer. Ambient photography: the strip is
 * aria-hidden with empty alts (018 §9 R6); the photo inventory in
 * 018 §7 is documentation, not alt text. */

export const HERO_V2_CAROUSEL_FRAMES = 8;

/** The rt structural gate (spec 002.r1) — where odd slides swap the
 * square cut for the wide cut. */
export const HERO_V2_RT_GATE_MEDIA = "(min-width: 665px)";

export const HERO_V2_WIDE = { width: 1344, height: 896 };
export const HERO_V2_SQUARE = { width: 896, height: 896 };

/** hero-carousel-{1344|384}-{01–08}.webp under
 * public/media/hero-carousel-v2. Odd frames: `wide` is the 1344 file,
 * `square` the 384 file. Even frames are square-only — the 1344 file
 * is the square cut (018 §9 R5). */
export function heroV2CarouselSrc(frame: number, cut: "wide" | "square"): string {
  const n = String(frame).padStart(2, "0");
  if (cut === "wide" || frame % 2 === 0) {
    return `/media/hero-carousel-v2/hero-carousel-1344-${n}.webp`;
  }
  return `/media/hero-carousel-v2/hero-carousel-384-${n}.webp`;
}

/* ---- portfolio gallery (spec 007 §5) ----
 * 40 verbatim WebP exports (supplied 2026-08-26): eight sites in five
 * width tiers, each exactly 2× its anchor's thumbnail interior. Art
 * direction, not resolution steps (crops differ per band): cards render
 * as <picture> with one media-gated <source> per tier, largest-first,
 * the 384 file as the <img> fallback. The 1344 tier serves down to 1152
 * (decision 2026-08-26 — no mid-rd1 cut). */

/** Export order 01–08; index + 1 is the file number. The names ship as
 * the images' alt text (spec 007 §9 R12). */
export const PORTFOLIO_SITES = [
  "Palm Coast Zivel",
  "Lune Bodywork",
  "x2o Studio",
  "DreFadez",
  "Your Health Solutions",
  "Miriam Merin, LCSW",
  "House of Aesthetics",
  "X2Talent",
] as const;

export interface PortfolioTier {
  cut: 384 | 576 | 768 | 960 | 1344;
  /** null on the 384 tier — it is the <img> fallback, not a <source>. */
  media: string | null;
  width: number;
  height: number;
}

/** Largest-first, ready for <source> order; the last entry is the
 * 384 fallback. The media cuts follow the nearest-anchor structural
 * gates (spec 002.r1 — amended 2026-08-26): the 1344 tier now serves
 * from the 1130 gate, superseding the 1152 line (spec 007 §5 as
 * amended). */
export const PORTFOLIO_TIERS: PortfolioTier[] = [
  { cut: 1344, media: "(min-width: 1130px)", width: 640, height: 1088 },
  { cut: 960, media: "(min-width: 860px)", width: 448, height: 768 },
  { cut: 768, media: "(min-width: 665px)", width: 352, height: 608 },
  { cut: 576, media: "(min-width: 470px)", width: 352, height: 544 },
  { cut: 384, media: null, width: 576, height: 736 },
];

/** portfolio-{01–08}-{tier}.webp under public/media/portfolio. */
export function portfolioSrc(site: number, cut: PortfolioTier["cut"]): string {
  return `/media/portfolio/portfolio-${String(site).padStart(2, "0")}-${cut}.webp`;
}

/* ---- engine accordion (spec 008 §5) ----
 * 25 verbatim WebP exports (supplied 2026-08-26): five engines in five
 * width tiers, each exactly 2× its band's visible image slot; the
 * engine wash is baked into the exports (008 §9 F3 — the build adds no
 * wash layer). Art direction, not resolution steps (crops differ per
 * band): the card image renders as <picture> with one media-gated
 * <source> per tier, largest-first, the 384 file as the <img>
 * fallback. Empty alt — ambient photography; the engine name is the
 * card's own text. */

/** Canonical engine order (spec 005 §5 / 008 §4); index + 1 is the
 * file number. */
export const ENGINE_IDS = [
  "visibility",
  "ads",
  "brand",
  "reception",
  "engagement",
] as const;

export type EngineId = (typeof ENGINE_IDS)[number];

export interface EngineTier {
  cut: 384 | 576 | 768 | 960 | 1344;
  /** null on the 384 tier — it is the <img> fallback, not a <source>. */
  media: string | null;
  width: number;
  height: number;
}

/** Largest-first, ready for <source> order; the last entry is the
 * 384 fallback. The media cuts follow the nearest-anchor structural
 * gates (spec 002.r1; 008 §5 as amended 2026-08-26): the 1344 tier
 * serves from the 1130 gate. */
export const ENGINE_TIERS: EngineTier[] = [
  { cut: 1344, media: "(min-width: 1130px)", width: 672, height: 896 },
  { cut: 960, media: "(min-width: 860px)", width: 480, height: 800 },
  { cut: 768, media: "(min-width: 665px)", width: 384, height: 640 },
  { cut: 576, media: "(min-width: 470px)", width: 432, height: 672 },
  { cut: 384, media: null, width: 608, height: 512 },
];

/** {01–05}-{engine}-{tier}.webp under public/media/engines. */
export function engineSrc(engine: EngineId, cut: EngineTier["cut"]): string {
  const n = ENGINE_IDS.indexOf(engine) + 1;
  return `/media/engines/${String(n).padStart(2, "0")}-${engine}-${cut}.webp`;
}

/* ---- testimonials (spec 009 §5) ----
 * Three 672×672 WebP placeholder exports, cut by the build from the
 * file 2026-08-26 (the fill hashes and crops are identical at every
 * band — hash-verified through the console bridge; crops baked at
 * export; the circle is a CSS radius-full mask, per the CSS-dot
 * doctrine). Placeholders by design decision: one export serves every
 * band through the tier-set markup (one <picture>, no <source>), so
 * the real art-directed tier set drops in additively. Empty alts —
 * ambient photography; the subjects here are descriptors, not alt
 * text. */

export interface TestimonialImage {
  src: string;
  width: number;
  height: number;
  /** Subject descriptor — documentation only; the photos render with
   * empty alts (ambient). */
  subject: string;
}

/** Export order 01–03 = the strip's slide order (§4: green · brown ·
 * yellow). Cut at 672×672 — exactly 2× the largest slot (the rd2 336
 * circle). */
export const TESTIMONIAL_IMAGES: TestimonialImage[] = [
  {
    src: "/media/testimonials/testimonial-01-672.webp",
    width: 672,
    height: 672,
    subject: "pizzaiolo at a wood-fired oven",
  },
  {
    src: "/media/testimonials/testimonial-02-672.webp",
    width: 672,
    height: 672,
    subject: "owner taking a call at her laptop",
  },
  {
    src: "/media/testimonials/testimonial-03-672.webp",
    width: 672,
    height: 672,
    subject: "counter worker writing an order",
  },
];

/* ---- persona carousel (spec 012 §5.2) ----
 * 15 verbatim WebP exports (supplied 2026-08-27, renamed from the
 * numbered exports per the §5 persona mapping: 01 steady · 02 active ·
 * 03 highgrowth): three personas in five width tiers, each exactly 2×
 * its band's rendered image band; the persona multiply overlay is baked
 * into the exports (the build adds no overlay layer). Art direction,
 * not resolution steps (crops differ per band): the card image renders
 * as <picture> with one media-gated <source> per tier, largest-first,
 * the xs file as the <img> fallback. The media cuts follow the
 * nearest-anchor structural gates (spec 002.r1). Empty alt — the card
 * titles carry the meaning. */

export const PERSONA_IDS = ["steady", "active", "highgrowth"] as const;

export type PersonaId = (typeof PERSONA_IDS)[number];

export interface PersonaTier {
  cut: "xs" | "sm" | "md" | "lg" | "xl";
  /** null on the xs tier — it is the <img> fallback, not a <source>. */
  media: string | null;
  width: number;
  height: number;
}

/** Largest-first, ready for <source> order; the last entry is the
 * xs fallback. Tiers are named by the persona-card size they serve
 * (xs rm · sm rs · md rt · lg rd1 · xl rd2), matching the file names. */
export const PERSONA_TIERS: PersonaTier[] = [
  { cut: "xl", media: "(min-width: 1130px)", width: 1120, height: 448 },
  { cut: "lg", media: "(min-width: 860px)", width: 800, height: 480 },
  { cut: "md", media: "(min-width: 665px)", width: 640, height: 384 },
  { cut: "sm", media: "(min-width: 470px)", width: 576, height: 384 },
  { cut: "xs", media: null, width: 608, height: 384 },
];

/** persona-{steady|active|highgrowth}-{tier}.webp under
 * public/media/personas. */
export function personaSrc(persona: PersonaId, cut: PersonaTier["cut"]): string {
  return `/media/personas/persona-${persona}-${cut}.webp`;
}

/* ---- case studies (spec 014 §7.1) ----
 * 15 verbatim WebP exports (supplied 2026-08-28 in the Dropbox
 * ourwork/export folder): three case-study sites in five width tiers,
 * each exactly 2× its band's rendered image slot. Art direction, not
 * resolution steps (aspect changes per band): the card image renders
 * as <picture> with one media-gated <source> per tier, largest-first,
 * the 384 file as the <img> fallback. The media cuts follow the
 * nearest-anchor structural gates (spec 002.r1). Meaningful alt — the
 * images are the customers' sites, not ambient ("The {name} website",
 * threaded from the section's data module). */

export const CASE_STUDY_SITE_IDS = ["zivel", "yhs", "barelux"] as const;

export type CaseStudySiteId = (typeof CASE_STUDY_SITE_IDS)[number];

export interface CaseStudyTier {
  cut: 384 | 576 | 768 | 960 | 1344;
  /** null on the 384 tier — it is the <img> fallback, not a <source>. */
  media: string | null;
  width: number;
  height: number;
}

/** Largest-first, ready for <source> order; the last entry is the
 * 384 fallback. */
export const CASE_STUDY_TIERS: CaseStudyTier[] = [
  { cut: 1344, media: "(min-width: 1130px)", width: 1344, height: 896 },
  { cut: 960, media: "(min-width: 860px)", width: 800, height: 800 },
  { cut: 768, media: "(min-width: 665px)", width: 640, height: 768 },
  { cut: 576, media: "(min-width: 470px)", width: 960, height: 576 },
  { cut: 384, media: null, width: 672, height: 384 },
];

/** casestudy-{zivel|yhs|barelux}-{tier}.webp under
 * public/media/case-studies. */
export function caseStudySrc(site: CaseStudySiteId, cut: CaseStudyTier["cut"]): string {
  return `/media/case-studies/casestudy-${site}-${cut}.webp`;
}

/* ---- case-study pages (spec 017 §5.4) ----
 * Per-study photograph tiers (three images × five width tiers,
 * received 2026-08-31 for Zivel and renamed at intake from Figma's
 * dedup numbering). Art direction, not resolution steps (crops and
 * aspects differ per band): each image renders as <picture> with one
 * media-gated <source> per tier, largest-first, the 384 file as the
 * <img> fallback; the media cuts follow the nearest-anchor structural
 * gates (spec 002.r1). The header and studio (quote) exports are
 * composited — hard-shadow-square / hard-shadow-square-md plus the
 * header's 10% multiply tint baked at export (+4px / +3px canvas at
 * 1×) — so the <img> mounts at canvas size anchored to the drawn
 * box's top-left with no CSS shadow or blend (the §5.4 mount rule;
 * the 012 persona baked-wash precedent). The result tiers are exact
 * 2× with no dressing. Meaningful alt from the study's data module.
 * Intrinsic tier dimensions are per-study content and live in the
 * data module (sections/case-study-data.ts) beside the copy. */

export const CASE_STUDY_PAGE_IMAGES = ["header", "studio", "result"] as const;

export type CaseStudyPageImage = (typeof CASE_STUDY_PAGE_IMAGES)[number];

export interface CaseStudyPageTier {
  cut: 384 | 576 | 768 | 960 | 1344;
  /** null on the 384 tier — it is the <img> fallback, not a <source>. */
  media: string | null;
}

/** Largest-first, ready for <source> order; the last entry is the
 * 384 fallback. */
export const CASE_STUDY_PAGE_TIERS: CaseStudyPageTier[] = [
  { cut: 1344, media: "(min-width: 1130px)" },
  { cut: 960, media: "(min-width: 860px)" },
  { cut: 768, media: "(min-width: 665px)" },
  { cut: 576, media: "(min-width: 470px)" },
  { cut: 384, media: null },
];

/** casestudy-{slug-short}-{header|studio|result}-{tier}.webp under
 * public/media/case-studies (beside the 014 card tiers). `study` is
 * the study's short asset id (Zivel: "zivel"), not the route slug. */
export function caseStudyPageSrc(
  study: string,
  image: CaseStudyPageImage,
  cut: CaseStudyPageTier["cut"],
): string {
  return `/media/case-studies/casestudy-${study}-${image}-${cut}.webp`;
}

/* ---- Our Work gallery (spec 015 §7.1) ----
 * 27 verbatim WebP exports (supplied 2026-08-28 in the Dropbox
 * ourwork/export folder): nine gallery images in three width tiers,
 * each exactly 2× its band's rendered frame (sm the rm strip slide ·
 * md the rs slide · lg the rd2 mosaic feature). Design's tier
 * direction: sm serves the 384 band, md the 576 band, lg 768–1344 —
 * the lg tier serves every mosaic slot (the small tiles crop the 13:9
 * cut to 3:2 under cover, as the file's fills do; recorded as design's
 * direction, not a defect). Meaningful alt — the images are the
 * customers' sites ("The {name} website", threaded from the section's
 * data module). All below the fold: every image lazy. */

export const GALLERY_IMAGE_COUNT = 9;

export interface GalleryTier {
  cut: "sm" | "md" | "lg";
  /** null on the sm tier — it is the <img> fallback, not a <source>. */
  media: string | null;
  width: number;
  height: number;
}

/** Largest-first, ready for <source> order; the last entry is the
 * sm fallback. The media cuts follow the nearest-anchor structural
 * gates (spec 002.r1): lg from the rt gate, md from the rs gate. */
export const GALLERY_TIERS: GalleryTier[] = [
  { cut: "lg", media: "(min-width: 665px)", width: 1456, height: 1008 },
  { cut: "md", media: "(min-width: 470px)", width: 864, height: 576 },
  { cut: "sm", media: null, width: 608, height: 384 },
];

/** gallery-{sm|md|lg}-{01–09}.webp under public/media/gallery. */
export function gallerySrc(image: number, cut: GalleryTier["cut"]): string {
  return `/media/gallery/gallery-${cut}-${String(image).padStart(2, "0")}.webp`;
}

/* ---- engine section v2 (spec 020 §7) ----
 * 30 placeholder WebP exports, cut by the build from the engine-detail
 * component set (771:18256) through the bridge 2026-09-06 — a native/
 * production visual pass replaces them later (owner direction; the
 * launch checklist tracks it). Three cuts, each exactly 2× its drawn
 * mount, both states at every cut (the md/xs `-01` cuts joined
 * 2026-09-06 with the stack-carousel re-ruling, §9 R21 — the stacks
 * now mount both states): xl 1216 (the rd2 608 stage drawing) ·
 * md 1416 (the rt stack's 708) · xs 704 (the 384 stack's 352). The
 * drawn mount is 64 top/left pads, flush bottom-right (32 at xs; md
 * clips 4px — 020 §4/§7 as amended, §9 R12); the brand/engagement
 * `-02` xs variants' 6px width residual was clipped to the set's 352
 * canon at export (§9 R12); the `-01` exports' 1–2px raster bound
 * inflation was cropped to canon at conversion. The stage drawings
 * are decorative (aria-hidden, empty alt — the 018 R6 posture); the
 * stack visuals share it. */

export type EngineV2State = "01" | "02";
export type EngineV2Cut = "xl" | "md" | "xs";

export const ENGINE_V2_CUTS: Record<EngineV2Cut, { width: number; height: number }> = {
  xl: { width: 1216, height: 1216 },
  md: { width: 1416, height: 1416 },
  xs: { width: 704, height: 704 },
};

/** The rt structural gate (spec 002.r1) — where the static stack's
 * <picture> swaps the xs cut for the md cut. */
export const ENGINE_V2_MD_MEDIA = "(min-width: 665px)";

/** placeholder-{engine}-{01|02}[-{md|xs}].webp under
 * public/media/engines-v2 (the xl cut carries no suffix). Both states
 * ship all three cuts (the stack carousel mounts both — 020 §5 as
 * re-ruled, §9 R21). */
export function engineV2PlaceholderSrc(
  engine: string,
  state: EngineV2State,
  cut: EngineV2Cut = "xl",
): string {
  const suffix = cut === "xl" ? "" : `-${cut}`;
  return `/media/engines-v2/placeholder-${engine}-${state}${suffix}.webp`;
}

/* ---- work-cascade deck (spec 021 §7 as amended §9 R4) ----
 * 18 verbatim WebP exports (supplied 2026-09-06): one cut per site per
 * tier, each 2× its band's site-image box. The tiers are art direction
 * (the boxes' aspects differ per band: 548/336 · 640/400 · 320/192), so
 * cards render as <picture> with viewport-gated <source>s. The gates
 * (R4): the 1344 cut from the rd1 gate, the 768 cut from the rs gate
 * down to it (its ≈4% cover-crop inside the rs band is accepted), the
 * 384 cut below. The file numbering is reversed against the cascade
 * order (owner-recorded, §7) — work-deck-data.ts maps slug → file. */

export type WorkCascadeCut = 1344 | 768 | 384;

export const WORK_CASCADE_RD1_GATE_MEDIA = "(min-width: 860px)";
export const WORK_CASCADE_RS_GATE_MEDIA = "(min-width: 470px)";

/** The 384 fallback cut's intrinsic size (the <img> width/height). */
export const WORK_CASCADE_FALLBACK = { width: 640, height: 384 };

/** work-cascade-{tier}-{01..06}.webp under public/media/work-cascade. */
export function workCascadeSrc(file: number, cut: WorkCascadeCut): string {
  return `/media/work-cascade/work-cascade-${cut}-${String(file).padStart(2, "0")}.webp`;
}

/* ---- case-study carousel (spec 022 §7) ----
 * 6 verbatim WebP exports (supplied 2026-09-05; committed 2026-09-06):
 * two cuts per study at exactly 2× their drawn mounts — the portrait
 * cut (672×896 = 2× the rd2 336×448 image box) serving from the rt
 * gate, the landscape cut (576×448 = 2× the 384 288×224 box) below it.
 * The supplied 768 tier is byte-duplicate of the 1344 tier (022 §9 R2;
 * the 018 R5 dedup — not committed; the registry maps both bands to
 * the portrait cut). The rt anchor's 2:3 image box cover-trims ≈11%
 * of the portrait cut's width — accepted (022 §9 R5, the 021 R4
 * precedent). The drawn image filters are baked into the exports (022
 * §9 F6) — the files mount plain, no CSS filter or blend layer.
 * The file numbering is REVERSED against the strip order (01 Bare Lúx
 * · 02 YHS · 03 Zivel — found at the build's mount QA, the 021 §7
 * export class; 022 §9 B) — case-carousel-data.ts maps strip index →
 * file. Meaningful alt — the images are the customers' sites ("The
 * {name} website", threaded from the shared data module). */

/** The rt structural gate (spec 002.r1) — where the card image swaps
 * the landscape cut for the portrait cut. */
export const CASE_CAROUSEL_RT_GATE_MEDIA = "(min-width: 665px)";

export const CASE_CAROUSEL_PORTRAIT = { width: 672, height: 896 };
export const CASE_CAROUSEL_LANDSCAPE = { width: 576, height: 448 };

/** case-study-{1344|384}-{01..03}.webp under public/media/case-carousel
 * (the received names; the directory keeps the family clear of the
 * case-studies folders). `file` is the strip position, 1-based. */
export function caseCarouselSrc(file: number, cut: "portrait" | "landscape"): string {
  const tier = cut === "portrait" ? 1344 : 384;
  return `/media/case-carousel/case-study-${tier}-${String(file).padStart(2, "0")}.webp`;
}

export const MEDIA_V2 = {
  brand: {
    /** Logomark + wordmark side by side. */
    lockup: {
      src: "/media/brand/ks-lockup.svg",
      width: 380,
      height: 61,
      alt: "Keystone",
    },
    /** The mark alone. */
    logomark: {
      src: "/media/brand/ks-logomark.svg",
      width: 66,
      height: 66,
      alt: "Keystone",
    },
    /** The wordmark alone. */
    wordmark: {
      src: "/media/brand/ks-wordmark.svg",
      width: 316,
      height: 72,
      alt: "Keystone",
    },
    /** The inline-prose wordmark cut (hero subhead, spec 006 §3) —
     * exported verbatim from node 506:4400, 2026-08-25. Distinct
     * proportions from the brand wordmark (aspect 4.93 vs 4.39); its
     * flat letter bottoms sit at y 13.003 of 16.0625 — the baseline
     * fact behind the component token --hx-wm-drop. */
    wordmarkInline: {
      src: "/media/brand/ks-wordmark-inline.svg",
      width: 79.1255,
      height: 16.0625,
      alt: "Keystone",
    },
    /** The small header wordmark cut (hero rm/rs, spec 006 §1) —
     * exported verbatim from node 230:13315, 2026-08-25. Its own cut;
     * ink fills the 72×15 frame. */
    wordmarkSm: {
      src: "/media/brand/ks-wordmark-sm.svg",
      width: 72,
      height: 15,
      alt: "Keystone",
    },
  },
} as const satisfies Record<string, Record<string, MediaAsset>>;
