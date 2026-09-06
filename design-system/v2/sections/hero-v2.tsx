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
 * (rises, chips, knockout, track contract) carries from hero.css, and
 * hero-v2.css restates only what this design changes.
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

/* ---- exposure maps (§2), section-local ticks — a descending east
   staircase with one ○ ornament per anchor into a full-lattice field
   opening one row above the carousel; at 384 an east rail runs from
   the field to the system section. Read per-cell through the bridge
   2026-09-05. The derived bands render their source anchor's map. ---- */

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
    { gx: 11, gy: 5 },
    { gx: 10, gy: 6, gw: 2 },
    { gx: 0, gy: 7, gw: 12, gh: 7 },
    { gx: 11, gy: 14, gh: 10 },
  ],
  ornaments: [{ gx: 11, gy: 6 }],
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

/* ---- chips (§4) — the 006 construction: the label span paints above
   the ::before brand-fill layer; bindings unchanged from v1 ---- */

function Chip({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span className="hx-chip" data-chip={id}>
      <span className="hx-chip-label">{children}</span>
    </span>
  );
}

/* Row words are flex items so the designed inline gap (§4) applies
   uniformly between words and chips; the rows are aria-hidden and the
   sentence reads from the visually-hidden text (§8). */
function words(text: string) {
  return text.split(" ").map((w, i) => <span key={`${w}${i}`}>{w}</span>);
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
   The first rectangle and circle are priority-loaded (the §6 load
   beats need pixels); the island primes the rest a dwell ahead. ---- */

function Frame({ frame, clone = false }: { frame: number; clone?: boolean }) {
  const shape = frame % 2 === 1 ? "rect" : "circle";
  const priority = !clone && frame <= 2;
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

      {/* the exposure map (§2): staircase, ornament circles, field,
          the 384 east rail — per band; derived bands share maps */}
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

      {/* header block, anchored at the H1 line (§1 as amended); the
          384-only wordmark hangs above it. The subhead and CTA are
          absolutely positioned at their drawn tops at every band. */}
      <div className="hx2-head">
        <span className="hx-wm-head hx-rise" aria-hidden="true" />

        {/* one canon string, natural wrap in the per-band box (§3 as
            amended — no drawn break at any anchor) */}
        <InterpText as="h1" style="display-serif-sm-thin" className="hx2-h1">
          <span className="hx-rise" id="hx2-heading">
            Sales and marketing that runs itself.
          </span>
        </InterpText>

        <InterpText as="p" style="text-xl-light" className="hx2-sub">
          {/* the sentence pair for the accessibility tree, "keystone"
              included as text (§8); the visual rows are presentation */}
          <span className="hx-sr">
            keystone powers your website and everything that runs through
            it: ads social reviews content and follow-ups that convert.
          </span>
          {/* one continuous flow (amended 2026-09-05, §9 R10) — the
              drawn line-groups are superseded: words and chips wrap
              as a single stream, so no line is forced to end at the
              colon and the chips fill lines naturally at every width */}
          <span className="hx-vis" aria-hidden="true">
            <span className="hx-row hx-rise">
              <span className="hx-wm" />
              {words("powers your")}
              <Chip id="website">website</Chip>
              {words("and everything that runs through it:")}
              <Chip id="ads">ads</Chip>
              <Chip id="social">social</Chip>
              <Chip id="reviews">reviews</Chip>
              <Chip id="content">content</Chip>
              <span>and</span>
              <Chip id="follow-ups">follow-ups</Chip>
              {words("that convert.")}
            </span>
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
