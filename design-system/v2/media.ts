/** v2 media registry — the single source of truth for new-brand asset
 * paths. Code never hardcodes an asset path; it references an entry here.
 * Source files: brand-id 2.0 logo set (copied 2026-08-22; lockup and
 * logomark refreshed 2026-08-24). Verified as flattened multi-path
 * exports. Intrinsic sizes come from each SVG viewBox. */

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
