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

/* Company page media: portraits restored from the v1 archive (b0e6af3)
 * and converted to WebP. Team keys are kebab-cased member names so the
 * live getTeamMembers() result can resolve its static portrait. */

export const TEAM_PORTRAIT_SIZE = { width: 800, height: 800 };

/** Static team portraits under public/media/team, keyed by name slug. */
export const TEAM_PORTRAITS: Record<string, MediaAsset> = {
  "rahul-jaswa": {
    src: "/media/team/rahul-jaswa.webp",
    ...TEAM_PORTRAIT_SIZE,
    alt: "Rahul Jaswa, Founder & CEO",
  },
  "amanjot-singh": {
    src: "/media/team/amanjot-singh.webp",
    ...TEAM_PORTRAIT_SIZE,
    alt: "Amanjot Singh, Head of Engineering",
  },
  "sreenivasan-ac": {
    src: "/media/team/sreenivasan-ac.webp",
    ...TEAM_PORTRAIT_SIZE,
    alt: "Sreenivasan AC, Founding AI Engineer",
  },
  "pawan-kumar": {
    src: "/media/team/pawan-kumar.webp",
    ...TEAM_PORTRAIT_SIZE,
    alt: "Pawan Kumar, Backend Engineer",
  },
  "gaurav-labhane": {
    src: "/media/team/gaurav-labhane.webp",
    ...TEAM_PORTRAIT_SIZE,
    alt: "Gaurav Labhane, Senior Software Development Engineer",
  },
  "gaurav-grover": {
    src: "/media/team/gaurav-grover.webp",
    ...TEAM_PORTRAIT_SIZE,
    alt: "Gaurav Grover, Lead Software Engineer",
  },
  "manikya-singh": {
    src: "/media/team/manikya-singh.webp",
    ...TEAM_PORTRAIT_SIZE,
    alt: "Manikya Singh, Founding Engineer",
  },
  "aasawari-vaidya": {
    src: "/media/team/aasawari-vaidya.webp",
    ...TEAM_PORTRAIT_SIZE,
    alt: "Aasawari Vaidya, Strategy & Operations Lead",
  },
  "ishttartha-pujar": {
    src: "/media/team/ishttartha-pujar.webp",
    ...TEAM_PORTRAIT_SIZE,
    alt: "Ishttartha Pujar, Growth Partner",
  },
  "atley-kasky": {
    src: "/media/team/atley-kasky.webp",
    ...TEAM_PORTRAIT_SIZE,
    alt: "Atley Kasky, Brand & Design Lead",
  },
};

/** Resolves a live team member's static portrait by kebab-casing the
 * API name ("Sreenivasan AC" → "sreenivasan-ac"). Null when the member
 * has no portrait in the registry. */
export function teamPortrait(name: string): MediaAsset | null {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return TEAM_PORTRAITS[slug] ?? null;
}

export const INVESTOR_PORTRAIT_SIZE = { width: 400, height: 400 };

/** Investor portraits under public/media/investors; name-only alt —
 * the roster omits firms by design. */
export const INVESTOR_PORTRAITS: Record<string, MediaAsset> = {
  "adeyemi-ajao": {
    src: "/media/investors/adeyemi-ajao.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Adeyemi Ajao",
  },
  "anthony-saleh": {
    src: "/media/investors/anthony-saleh.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Anthony Saleh",
  },
  "caroline-broder": {
    src: "/media/investors/caroline-broder.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Caroline Broder",
  },
  "chenli-wang": {
    src: "/media/investors/chenli-wang.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Chenli Wang",
  },
  "colin-evans": {
    src: "/media/investors/colin-evans.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Colin Evans",
  },
  "dan-gill": {
    src: "/media/investors/dan-gill.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Dan Gill",
  },
  "ilya-fushman": {
    src: "/media/investors/ilya-fushman.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Ilya Fushman",
  },
  "jai-ranganathan": {
    src: "/media/investors/jai-ranganathan.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Jai Ranganathan",
  },
  "john-gleeson": {
    src: "/media/investors/john-gleeson.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "John Gleeson",
  },
  "nick-tippman": {
    src: "/media/investors/nick-tippman.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Nick Tippman",
  },
  "obaid-khan": {
    src: "/media/investors/obaid-khan.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Obaid Khan",
  },
  "olivia-benjamin": {
    src: "/media/investors/olivia-benjamin.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Olivia Benjamin",
  },
  "praveen-ramineni": {
    src: "/media/investors/praveen-ramineni.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Praveen Ramineni",
  },
  "rexhi-dollaku": {
    src: "/media/investors/rexhi-dollaku.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Rexhi Dollaku",
  },
  "shoaib-makani": {
    src: "/media/investors/shoaib-makani.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Shoaib Makani",
  },
  "siva-gurumurthy": {
    src: "/media/investors/siva-gurumurthy.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Siva Gurumurthy",
  },
  "somesh-dash": {
    src: "/media/investors/somesh-dash.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Somesh Dash",
  },
  "sujay-jaswa": {
    src: "/media/investors/sujay-jaswa.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Sujay Jaswa",
  },
  "tanuj-thapliyal": {
    src: "/media/investors/tanuj-thapliyal.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Tanuj Thapliyal",
  },
  "ted-gill": {
    src: "/media/investors/ted-gill.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Ted Gill",
  },
  "thomas-buley": {
    src: "/media/investors/thomas-buley.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Thomas Buley",
  },
  "zach-goldstein": {
    src: "/media/investors/zach-goldstein.webp",
    ...INVESTOR_PORTRAIT_SIZE,
    alt: "Zach Goldstein",
  },
};

/** Company hero still. Ambient photography, so the alt stays empty. */
export const SOCIAL_PROOF_STILL: MediaAsset = {
  src: "/media/social-proof/stills/socialproof-01.webp",
  width: 1600,
  height: 900,
  alt: "",
};

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
