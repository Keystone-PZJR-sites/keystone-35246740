import type { ReactNode } from "react";
import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { ButtonFill, ButtonGhost } from "../primitives/buttons";
import { InterpText } from "../primitives/text";
import { IconChat } from "../icons";
import {
  HERO_CAROUSEL_FRAMES,
  HERO_RT_GATE_MEDIA,
  HERO_WIDE,
  HERO_SQUARE,
  heroCarouselSrc,
} from "../media";
import { HeroCarousel } from "./hero-carousel";
import { HeroLoad } from "./hero-load";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

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
  rs: MAP_384,
  rt: MAP_768,
  rd1: MAP_1344,
  rd2: MAP_1344,
};

function Chip({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span className="hero-chip" data-chip={id}>
      <span className="hero-chip-label">{children}</span>
    </span>
  );
}

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

function Frame({ frame, clone = false }: { frame: number; clone?: boolean }) {
  const shape = frame % 2 === 1 ? "rect" : "circle";
  const priority = !clone && frame <= 3;
  const img = (
    <img
      src={heroCarouselSrc(frame, "square")}
      width={HERO_SQUARE.width}
      height={HERO_SQUARE.height}
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
            media={HERO_RT_GATE_MEDIA}
            srcSet={heroCarouselSrc(frame, "wide")}
            width={HERO_WIDE.width}
            height={HERO_WIDE.height}
          />
          {img}
        </picture>
      ) : (
        img
      )}
    </li>
  );
}

const FRAMES = Array.from({ length: HERO_CAROUSEL_FRAMES }, (_, i) => i + 1);

export function HeroSection() {
  return (
    <section className="sec hero-section" aria-labelledby="hero-heading" data-landmark="hero">
      <HeroLoad />

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

      <div className="hero-head flow-budget">
        <InterpText as="h1" style="display-serif-sm-thin" className="hero-h1">
          <span className="hx-rise" id="hero-heading">
            Sales and marketing that runs itself.
          </span>
        </InterpText>

        <InterpText as="p" style="text-xl-light" className="hero-sub">
          {/* The accessible sentence includes text represented visually by the wordmark. */}
          <span className="hx-sr">
            keystone powers your website and everything that runs through
            it: ads social reviews content and follow-ups that convert.
          </span>
          <span className="hero-flow hx-rise" aria-hidden="true">
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

        <CtaRow variant="a" size="md" />
        <CtaRow variant="b" size="md" />
        <CtaRow variant="c" size="lg" />
        <CtaRow variant="d" size="xl" />
      </div>

      {/* Tail clones make the ambient carousel loop seamlessly. */}
      <div className="hero-carousel" data-landmark="carousel" aria-hidden="true">
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
