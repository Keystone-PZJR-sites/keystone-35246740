/** v2 sections — hero v2 (spec 018). Server component.
 *
 * The homepage v2 hero: the 006 shape — headline, knockout subhead
 * with colored chips, CTA pair, auto-advancing image carousel — with
 * new copy, a shorter carousel, new photography, and a new exposure
 * map. Three drawn anchors (384 · 768 · 1344, plan.md three-anchor
 * policy): the rs band derives from the 384 design and rd1 from the
 * 1344 design, so the rm/rs and rd1/rd2 band pairs share their maps.
 *
 * Homepage v1 is untouched: this section mounts only in the v2
 * composition (v2/home-next.tsx) and on /hero-next. The carousel
 * machine and the load orchestration are the built 006 islands reused
 * verbatim (HeroCarousel · HeroLoad — the 018 fork-vs-parameterize
 * call: fork the section, share the machine); the shared hx- grammar
 * (rises, knockout wordmark, track contract) carries from hero.css;
 * the subhead is this section's own hx2- construction — one inline
 * text run with painted pills (018 §9 R14) — and hero-v2.css restates
 * what this design changes.
 *
 * The strip is ambient imagery (018 §9 R6): aria-hidden, empty alts,
 * no controls — the v1 accessibility posture carries.
 */

import type { ReactNode } from "react";
import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { ButtonFill, ButtonGhost } from "../primitives/buttons";
import { InterpText } from "../primitives/text";
import { IconChat } from "../icons";
import {
  HERO_V2_CAROUSEL_FRAMES,
  HERO_V2_RT_GATE_MEDIA,
  HERO_V2_WIDE,
  HERO_V2_SQUARE,
  heroV2CarouselSrc,
} from "../media";
import { HeroCarousel } from "./hero-carousel";
import { HeroLoad } from "./hero-load";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* ---- exposure maps (§2 as amended 2026-09-08, §9 R16), section-local
   ticks — a descending east staircase with one ○ ornament per anchor
   into a full-lattice field. At 384 the staircase sits beside the CTA
   block, the field opens ON the carousel's first row and runs one row
   past it, and the hero carries no east rail (the system section's
   rail takes over). Read per-cell through the bridge 2026-09-08. The
   derived bands render their source anchor's map. ---- */

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}
interface Orn {
  gx: number;
  gy: number;
}
interface BandMap {
  regions: R[];
  ornaments: Orn[];
}

const MAP_384: BandMap = {
  regions: [
    { gx: 11, gy: 12 },
    { gx: 10, gy: 13, gw: 2 },
    { gx: 0, gy: 14, gw: 12, gh: 7 },
  ],
  ornaments: [{ gx: 11, gy: 13 }],
};

const MAP_768: BandMap = {
  regions: [
    { gx: 11, gy: 4 },
    { gx: 10, gy: 5, gw: 2 },
    { gx: 9, gy: 6, gw: 3 },
    { gx: 0, gy: 7, gw: 12, gh: 6 },
  ],
  ornaments: [
    { gx: 11, gy: 5 },
    { gx: 9, gy: 7 },
  ],
};

const MAP_1344: BandMap = {
  regions: [
    { gx: 11, gy: 2 },
    { gx: 10, gy: 3, gw: 2 },
    { gx: 9, gy: 4, gw: 3 },
    { gx: 8, gy: 5, gw: 4 },
    { gx: 0, gy: 6, gw: 12, gh: 6 },
  ],
  ornaments: [
    { gx: 11, gy: 3 },
    { gx: 9, gy: 5 },
  ],
};

const SECTION_MAP: Record<GridBand, BandMap> = {
  rm: MAP_384,
  rs: MAP_384, // derived from 384 (§1)
  rt: MAP_768,
  rd1: MAP_1344, // derived from 1344 (§1)
  rd2: MAP_1344,
};

/* ---- chips (§4 as amended 2026-09-08, §9 R14) — inline atoms in the
   subhead's text run. The chip inherits the paragraph's type (no own
   line-height); the pill is paint, not layout: ::before is the neutral
   bg/300 base, ::after the brand fill the load pass wipes in, both
   inset to the drawn pill box (lh − 2). The label paints above both.
   Bindings unchanged from v1. ---- */

function Chip({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span className="hx2-chip" data-chip={id}>
      <span className="hx2-chip-label">{children}</span>
    </span>
  );
}

/* ---- CTA row (§5 as amended 2026-09-05, §9 R8) — one row per band
   set (a: 384/rs · b: rt · c: rd1 · d: rd2), md · md · lg · xl; the
   band gating carries from hero.css unchanged. Targets carry from the
   built v1 hero: the fill links to /pricing, the ghost carries the
   inert open-chat hook. ---- */

function CtaRow({ variant, size }: { variant: "a" | "b" | "c" | "d"; size: "xl" | "lg" | "md" }) {
  return (
    <div className={`hx-cta hx-rise hx-cta-${variant}`}>
      <ButtonFill size={size} chrome="gray" shape="pill" href="/pricing">
        Get Started
      </ButtonFill>
      <ButtonGhost size={size} color="brown" icon={<IconChat />} action="open-chat">
        Talk to us
      </ButtonGhost>
    </div>
  );
}

/* ---- carousel frames (§6/§7) — odd rectangles, even circles, in
   export order. Odd slides carry the wide cut from the rt gate over
   the square fallback; even slides are square everywhere (their
   square file is the 1344 export — §9 R5). The tint is baked (§9 R2).
   The first three frames are priority-loaded (the §6 load beats need
   pixels — the third frame's leading edge is exposed at the right
   bleed in this section's sizes, 018 §9 R13); the island primes the
   rest a dwell ahead. ---- */

function Frame({ frame, clone = false }: { frame: number; clone?: boolean }) {
  const shape = frame % 2 === 1 ? "rect" : "circle";
  const priority = !clone && frame <= 3;
  const img = (
    <img
      src={heroV2CarouselSrc(frame, "square")}
      width={HERO_V2_SQUARE.width}
      height={HERO_V2_SQUARE.height}
      alt=""
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
  return (
    <li className="hx-frame" data-shape={shape} data-clone={clone || undefined}>
      {shape === "rect" ? (
        <picture>
          <source
            media={HERO_V2_RT_GATE_MEDIA}
            srcSet={heroV2CarouselSrc(frame, "wide")}
            width={HERO_V2_WIDE.width}
            height={HERO_V2_WIDE.height}
          />
          {img}
        </picture>
      ) : (
        img
      )}
    </li>
  );
}

const FRAMES = Array.from({ length: HERO_V2_CAROUSEL_FRAMES }, (_, i) => i + 1);

export function HeroV2Section() {
  return (
    <section className="sec v2-hero-next" aria-labelledby="hx2-heading" data-landmark="hero">
      <HeroLoad />

      {/* the exposure map (§2): staircase, ornament circles, field —
          per band; derived bands share maps */}
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => [
          ...SECTION_MAP[band].regions.map((r, i) => (
            <GridRegion key={`${band}-r${i}`} band={band} {...r} />
          )),
          ...SECTION_MAP[band].ornaments.map((o) => (
            <GridDecor key={`${band}-o${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell round" />
            </GridDecor>
          )),
        ])}
      </div>

      {/* header block, anchored at the H1 line (§1 as amended); no
          anchor carries an eyebrow wordmark (removed 2026-09-08, §9
          R16). The subhead and CTA are absolutely positioned at their
          drawn tops at every band. */}
      <div className="hx2-head">
        {/* one canon string, natural wrap in the per-band box (§3 as
            amended — no drawn break at any anchor) */}
        <InterpText as="h1" style="display-serif-sm-thin" className="hx2-h1">
          <span className="hx-rise" id="hx2-heading">
            Sales and marketing that runs itself.
          </span>
        </InterpText>

        <InterpText as="p" style="text-xl-light" className="hx2-sub">
          {/* the sentence pair for the accessibility tree, "keystone"
              included as text (§8); the visual flow is presentation */}
          <span className="hx-sr">
            keystone powers your website and everything that runs through
            it: ads social reviews content and follow-ups that convert.
          </span>
          {/* one inline text run (amended 2026-09-08, §9 R14 —
              supersedes R10's flex word-stream): words are real text
              with real spaces, chips ride inline, and the paragraph's
              line-height is the only vertical pitch. The text is
              explicit string expressions so no gap depends on JSX
              whitespace trimming. */}
          <span className="hx2-flow hx-rise" aria-hidden="true">
            <span className="hx-wm" />
            {" powers your "}
            <Chip id="website">website</Chip>
            {" and everything that runs through it: "}
            <Chip id="ads">ads</Chip>{" "}
            <Chip id="social">social</Chip>{" "}
            <Chip id="reviews">reviews</Chip>{" "}
            <Chip id="content">content</Chip>
            {" and "}
            <Chip id="follow-ups">follow-ups</Chip>
            {" that convert."}
          </span>
        </InterpText>

        {/* §5 sizes per band (as amended, §9 R8): md / md / lg / xl */}
        <CtaRow variant="a" size="md" />
        <CtaRow variant="b" size="md" />
        <CtaRow variant="c" size="lg" />
        <CtaRow variant="d" size="xl" />
      </div>

      {/* §6/§8: ambient imagery — hidden from the accessibility tree,
          no controls, never focusable (§9 R6). Three leading frames
          cloned at the tail for the seamless wrap. */}
      <div className="hx2-carousel" data-landmark="carousel" aria-hidden="true">
        <HeroCarousel>
          <ul className="hx-track">
            {FRAMES.map((f) => (
              <Frame key={f} frame={f} />
            ))}
            {[1, 2, 3].map((f) => (
              <Frame key={`clone-${f}`} frame={f} clone />
            ))}
          </ul>
        </HeroCarousel>
      </div>
    </section>
  );
}
