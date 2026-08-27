/** v2 sections — the hero (spec 006). Server component.
 *
 * Anatomy (§1): the first homepage section; the text blocks and the
 * carousel float on the content layer over a selectively exposed
 * lattice. One DOM, band-gated order: below 768 the carousel sits
 * between the H1 and the subhead; at 768+ all text stacks in one
 * header block above it.
 *
 * §2 erratum, recorded 2026-08-25: §2 reads the Figma Grid layers as
 * "complete fields in the hero rows" and specs one full-exposure
 * region per band. The layers do hold a cell at every position, but
 * only some cells carry the 1px border/000 stroke — presence is not
 * paint (the plan's "special cells" note: metadata cannot see what a
 * cell is). Re-read per-cell 2026-08-25 from stroke visibility on the
 * five Grid layers (509:5403 · 505:15527 · 505:13888 · 505:12908 ·
 * 505:10884, REST rendered bounds): the painted lattice is a stepped
 * rail descending from the top-right, widest around the carousel rows,
 * narrowing as it hands off to the portfolio rows — with outlined
 * circles at the bends (border/000, radius-full) and, at rm, one
 * filled circle (bg/200) on the right rail. SECTION_MAP below is that
 * transcription; built from the nodes, not §2.
 *
 * The only client code is the two islands (§7.2): the carousel track
 * (hero-carousel.tsx) and the load orchestrator (hero-load.tsx). Chips,
 * subhead, H1, and CTA are server-rendered; the settled state is the
 * branded state, so a no-JS render is complete.
 */

import type { ReactNode } from "react";
import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { ButtonFill, ButtonGhost } from "../primitives/buttons";
import { InterpText } from "../primitives/text";
import { IconChat } from "../icons";
import {
  HERO_CAROUSEL_FRAMES,
  HERO_CAROUSEL_TIERS,
  heroCarouselSrc,
} from "../media";
import { HeroCarousel } from "./hero-carousel";
import { HeroLoad } from "./hero-load";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* ---- exposure maps, section-local ticks (§2 erratum — transcribed
   from per-cell stroke visibility on the Grid layers, 2026-08-25).
   Adjacent regions share lattice lines by v5 line-inclusive overlap;
   circles occupy unpainted cells and take their edges from stroked
   neighbors, exactly as the file draws them. ---- */

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}
interface Orn {
  gx: number;
  gy: number;
  shape: "circle" | "circle-fill";
}
interface BandMap {
  regions: R[];
  ornaments: Orn[];
}

const SECTION_MAP: Record<GridBand, BandMap> = {
  rm: {
    regions: [
      { gx: 11, gy: 4 },
      { gx: 10, gy: 5 },
      { gx: 9, gy: 6, gw: 3 },
      { gx: 8, gy: 7 },
      { gx: 10, gy: 7, gw: 2 },
      { gx: 8, gy: 8, gw: 4, gh: 6 },
      { gx: 8, gy: 14, gw: 2 },
      { gx: 11, gy: 14 },
      { gx: 8, gy: 15, gw: 4 },
      { gx: 9, gy: 16, gw: 3 },
      { gx: 11, gy: 17 },
      { gx: 11, gy: 19, gh: 6 },
      { gx: 10, gy: 25, gw: 2 },
    ],
    ornaments: [
      { gx: 11, gy: 5, shape: "circle" },
      { gx: 9, gy: 7, shape: "circle" },
      { gx: 10, gy: 14, shape: "circle" },
      { gx: 11, gy: 18, shape: "circle-fill" },
    ],
  },
  rs: {
    regions: [
      { gx: 11, gy: 4 },
      { gx: 10, gy: 5 },
      { gx: 9, gy: 6, gw: 3 },
      { gx: 8, gy: 7 },
      { gx: 10, gy: 7, gw: 2 },
      { gx: 8, gy: 8, gw: 4, gh: 5 },
      { gx: 9, gy: 13, gw: 3 },
      { gx: 9, gy: 14 },
      { gx: 11, gy: 14 },
      { gx: 9, gy: 15, gw: 3, gh: 4 },
      { gx: 10, gy: 19, gw: 2 },
    ],
    ornaments: [
      { gx: 11, gy: 5, shape: "circle" },
      { gx: 9, gy: 7, shape: "circle" },
      { gx: 10, gy: 14, shape: "circle" },
      { gx: 9, gy: 19, shape: "circle" },
    ],
  },
  rt: {
    regions: [
      { gx: 11, gy: 3 },
      { gx: 10, gy: 4 },
      { gx: 9, gy: 5, gw: 3 },
      { gx: 8, gy: 6 },
      { gx: 10, gy: 6, gw: 2 },
      { gx: 8, gy: 7, gw: 4, gh: 5 },
      { gx: 9, gy: 12, gw: 3 },
    ],
    ornaments: [
      { gx: 11, gy: 4, shape: "circle" },
      { gx: 9, gy: 6, shape: "circle" },
      { gx: 8, gy: 12, shape: "circle" },
    ],
  },
  rd1: {
    regions: [
      { gx: 11, gy: 3 },
      { gx: 10, gy: 4 },
      { gx: 9, gy: 5, gw: 3 },
      { gx: 8, gy: 6 },
      { gx: 10, gy: 6, gw: 2 },
      { gx: 7, gy: 7, gw: 5, gh: 5 },
      { gx: 9, gy: 12, gw: 3 },
    ],
    ornaments: [
      { gx: 11, gy: 4, shape: "circle" },
      { gx: 9, gy: 6, shape: "circle" },
      { gx: 8, gy: 12, shape: "circle" },
    ],
  },
  rd2: {
    regions: [
      { gx: 11, gy: 2 },
      { gx: 10, gy: 3 },
      { gx: 9, gy: 4, gw: 3 },
      { gx: 8, gy: 5 },
      { gx: 10, gy: 5, gw: 2 },
      { gx: 7, gy: 6, gw: 5, gh: 4 },
      { gx: 8, gy: 10, gw: 4 },
      { gx: 9, gy: 11, gw: 3 },
    ],
    ornaments: [
      { gx: 11, gy: 3, shape: "circle" },
      { gx: 9, gy: 5, shape: "circle" },
      { gx: 8, gy: 11, shape: "circle" },
    ],
  },
};

/* ---- chips (§3) — spans inside the aria-hidden visual layer; the
   label span paints above the ::before brand-fill layer ---- */

function Chip({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span className="hx-chip" data-chip={id}>
      <span className="hx-chip-label">{children}</span>
    </span>
  );
}

/* Row words are flex items so the designed inline gap (§3) applies
   uniformly between words and chips; the row layer is aria-hidden and
   the full sentence pair reads from the visually-hidden text (§8). */
function words(text: string) {
  return text.split(" ").map((w, i) => <span key={`${w}${i}`}>{w}</span>);
}

/* ---- CTA row (§4) — one row per designed size set, band-gated.
   "Get Started" is a real link to /pricing; "Talk to us" is a real
   button carrying the inert open-chat hook (§9 decisions). ---- */

function CtaRow({
  variant,
  size,
}: {
  variant: "a" | "b" | "c" | "d";
  size: "xl" | "lg" | "md";
}) {
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

/* ---- carousel frames (§5) — <picture> with one media-gated <source>
   per tier (art direction: crops differ per band) and the 384 file as
   the <img> fallback. The first rectangle and first circle are
   priority-loaded (§6 needs pixels at +620/+760ms). ---- */

function Frame({ frame, clone = false }: { frame: number; clone?: boolean }) {
  const shape = frame % 2 === 1 ? "rect" : "circle";
  const priority = !clone && frame <= 2;
  const fallback = HERO_CAROUSEL_TIERS[HERO_CAROUSEL_TIERS.length - 1];
  return (
    <li className="hx-frame" data-shape={shape} data-clone={clone || undefined}>
      <picture>
        {HERO_CAROUSEL_TIERS.filter((tier) => tier.media !== null).map((tier) => (
          <source
            key={tier.cut}
            media={tier.media ?? undefined}
            srcSet={heroCarouselSrc(frame, tier.cut)}
            width={tier[shape === "rect" ? "rect" : "circle"].width}
            height={tier[shape === "rect" ? "rect" : "circle"].height}
          />
        ))}
        <img
          src={heroCarouselSrc(frame, 384)}
          width={fallback[shape === "rect" ? "rect" : "circle"].width}
          height={fallback[shape === "rect" ? "rect" : "circle"].height}
          alt=""
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
      </picture>
    </li>
  );
}

const FRAMES = Array.from({ length: HERO_CAROUSEL_FRAMES }, (_, i) => i + 1);

export function HeroSection() {
  return (
    <section className="sec v2-hero">
      <HeroLoad />

      {/* the selectively exposed lattice (§2 erratum): the stepped
          right-side rail and its circles, per band */}
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => [
          ...SECTION_MAP[band].regions.map((r, i) => (
            <GridRegion key={`${band}-r${i}`} band={band} {...r} />
          )),
          ...SECTION_MAP[band].ornaments.map((o) => (
            <GridDecor key={`${band}-o${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className={o.shape === "circle-fill" ? "f-cell fill round" : "f-cell round"} />
            </GridDecor>
          )),
        ])}
      </div>

      {/* header block: wordmark (rm/rs) + H1 + subhead + CTA. At rm/rs
          the subhead and CTA are absolutely repositioned below the
          carousel (§1 band-structural switch — one DOM, visual order
          switches with the band; a11y order is constant). */}
      <div className="hx-head">
        {/* rm/rs only: the nav at those bands does not carry the mark (§1) */}
        <span className="hx-wm-head hx-rise" aria-hidden="true" />

        <InterpText as="h1" style="display-serif-3xl-thin" className="hx-h1">
          {/* copy switch rides the 768 band gate (§3, §9 F8) */}
          <span className="hx-rise hx-copy-lo">
            You built a great business. Let&rsquo;s make it grow like one.
          </span>
          <span className="hx-rise hx-copy-hi hx-line1">
            You built a great business,
          </span>
          <span className="hx-rise hx-copy-hi hx-line2">
            now let&rsquo;s make it grow like one.
          </span>
        </InterpText>

        <InterpText as="p" style="text-xl-light" className="hx-sub">
          {/* the sentence pair for the accessibility tree, "keystone"
              included as text (§8); the visual rows are presentation */}
          <span className="hx-sr">
            keystone powers your website and everything that runs through
            it: ads social reviews content and follow-ups that convert.
          </span>
          <span className="hx-vis" aria-hidden="true">
            <span className="hx-row hx-row1 hx-rise">
              <span className="hx-wm" />
              {words("powers your")}
              <Chip id="website">website</Chip>
              {words("and everything that runs through it:")}
            </span>
            <span className="hx-row hx-row2 hx-rise">
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

        {/* §4 sizes per band: lg / lg / md / lg / xl */}
        <CtaRow variant="a" size="lg" />
        <CtaRow variant="b" size="md" />
        <CtaRow variant="c" size="lg" />
        <CtaRow variant="d" size="xl" />
      </div>

      {/* §5/§8: ambient imagery — hidden from the accessibility tree,
          no controls, never focusable. Three leading frames cloned at
          the tail for the seamless wrap (§6). */}
      <div className="hx-carousel" data-landmark="carousel" aria-hidden="true">
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
