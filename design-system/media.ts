/** Asset paths and intrinsic dimensions. Consumers reference this registry
 * instead of hardcoding paths. */

export interface MediaAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/* Hero carousel: odd slides switch from square to wide at the rt gate;
 * even slides use their square cut everywhere. Tint is baked in and the
 * ambient strip stays aria-hidden with empty alts. */

export const HERO_CAROUSEL_FRAMES = 8;

/** Odd slides swap from square to wide at the rt structural gate. */
export const HERO_RT_GATE_MEDIA = "(min-width: 665px)";

export const HERO_WIDE = { width: 1344, height: 896 };
export const HERO_SQUARE = { width: 896, height: 896 };

/** Odd frames use both tiers; even frames use the 1344 square file. */
export function heroCarouselSrc(frame: number, cut: "wide" | "square"): string {
  const n = String(frame).padStart(2, "0");
  if (cut === "wide" || frame % 2 === 0) {
    return `/media/hero-carousel/hero-carousel-1344-${n}.webp`;
  }
  return `/media/hero-carousel/hero-carousel-384-${n}.webp`;
}

/* Persona cuts are art-directed per band and ordered largest-first, with
 * xs as fallback. Multiply treatment is baked in; card titles carry meaning. */

export type PersonaId = "steady" | "active" | "highgrowth";

export interface PersonaTier {
  cut: "xs" | "sm" | "md" | "lg" | "xl";
  /** null on the xs tier — it is the <img> fallback, not a <source>. */
  media: string | null;
  width: number;
  height: number;
}

/** Largest-first source order; xs is the fallback. */
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

/* Case-study card cuts are art-directed per band and ordered largest-first,
 * with 384 as fallback. Customer-site images require meaningful alt text. */

export type CaseStudySiteId = "zivel" | "yhs" | "barelux";

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

/* Case-study page cuts are art-directed per band. Header and studio files
 * include their shadows and tint, so mounts add no CSS shadow or blend.
 * Per-study dimensions and meaningful alt text live with section data. */

export type CaseStudyPageImage = "header" | "studio" | "result";

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

/** casestudy-{asset-id}-{header|studio|result}-{tier}.webp under
 * public/media/case-studies. */
export function caseStudyPageSrc(
  study: string,
  image: CaseStudyPageImage,
  cut: CaseStudyPageTier["cut"],
): string {
  return `/media/case-studies/casestudy-${study}-${image}-${cut}.webp`;
}

/* Gallery cuts are art-directed at sm, md, and lg. The lg cut serves all
 * mosaic slots under cover. Customer-site images use meaningful alt text
 * and lazy loading because the gallery is below the fold. */


export interface GalleryTier {
  cut: "sm" | "md" | "lg";
  /** null on the sm tier — it is the <img> fallback, not a <source>. */
  media: string | null;
  width: number;
  height: number;
}

/** Largest-first source order; sm is the fallback. */
export const GALLERY_TIERS: GalleryTier[] = [
  { cut: "lg", media: "(min-width: 665px)", width: 1456, height: 1008 },
  { cut: "md", media: "(min-width: 470px)", width: 864, height: 576 },
  { cut: "sm", media: null, width: 608, height: 384 },
];

/** gallery-{sm|md|lg}-{01–09}.webp under public/media/gallery. */
export function gallerySrc(image: number, cut: GalleryTier["cut"]): string {
  return `/media/gallery/gallery-${cut}-${String(image).padStart(2, "0")}.webp`;
}

/* Engine visuals from Figma node 771:18256 ship in xl, md, and xs cuts
 * for both states. They are decorative and use empty alt text. */

export type EngineState = "01" | "02";
export type EngineCut = "xl" | "md" | "xs";

export const ENGINE_CUTS: Record<EngineCut, { width: number; height: number }> = {
  xl: { width: 1216, height: 1216 },
  md: { width: 1416, height: 1416 },
  xs: { width: 704, height: 704 },
};

/** The static stack swaps from xs to md at the rt gate. */
export const ENGINE_MD_MEDIA = "(min-width: 665px)";

/** xl files have no suffix; md and xs include their cut suffix. */
export function engineImageSrc(
  engine: string,
  state: EngineState,
  cut: EngineCut = "xl",
): string {
  const suffix = cut === "xl" ? "" : `-${cut}`;
  return `/media/engines/engine-${engine}-${state}${suffix}.webp`;
}

/* Work-cascade tiers are art-directed and viewport-gated. File numbering
 * runs opposite the cascade order, so work-deck-data.ts owns the mapping. */

export type WorkCascadeCut = 1344 | 768 | 384;

export const WORK_CASCADE_RD1_GATE_MEDIA = "(min-width: 860px)";
export const WORK_CASCADE_RS_GATE_MEDIA = "(min-width: 470px)";

/** The 384 fallback cut's intrinsic size (the <img> width/height). */
export const WORK_CASCADE_FALLBACK = { width: 640, height: 384 };

/** work-cascade-{tier}-{01..06}.webp under public/media/work-cascade. */
export function workCascadeSrc(file: number, cut: WorkCascadeCut): string {
  return `/media/work-cascade/work-cascade-${cut}-${String(file).padStart(2, "0")}.webp`;
}

/* Case-carousel cards use landscape below rt and portrait from rt upward.
 * Filters are baked in. File numbering runs opposite strip order, so
 * case-carousel-data.ts owns the mapping. Images require meaningful alt. */

/** Cards swap from landscape to portrait at the rt gate. */
export const CASE_CAROUSEL_RT_GATE_MEDIA = "(min-width: 665px)";

export const CASE_CAROUSEL_LANDSCAPE = { width: 576, height: 448 };

/** case-study-{1344|384}-{01..03}.webp under public/media/case-carousel. */
export function caseCarouselSrc(file: number, cut: "portrait" | "landscape"): string {
  const tier = cut === "portrait" ? 1344 : 384;
  return `/media/case-carousel/case-study-${tier}-${String(file).padStart(2, "0")}.webp`;
}

export const MEDIA = {
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
    /** Inline-prose wordmark from Figma node 506:4400. Its distinct
     * baseline geometry is encoded by --hx-wm-drop. */
    wordmarkInline: {
      src: "/media/brand/ks-wordmark-inline.svg",
      width: 79.1255,
      height: 16.0625,
      alt: "Keystone",
    },
  },
} as const satisfies Record<string, Record<string, MediaAsset>>;
