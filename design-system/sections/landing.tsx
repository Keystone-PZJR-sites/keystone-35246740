/** The landing kit: four sections a marketing page composes from a data
 * module. Each is the site's vocabulary already assembled — lattice paint,
 * the standard type ramps, one CTA row that sizes per band, an entrance —
 * so a page built from them is crafted by default. See pages/landing.tsx
 * for the composition and pages/for-dentists-data.ts for a data module. */

import type { ReactNode } from "react";
import { GridRegion, type GridBand } from "../grid/region";
import {
  IconAiChat,
  IconChat,
  IconMaps,
  IconReception,
  IconReviews,
  IconSearch,
  IconSparkle,
  IconWebsite,
} from "../icons";
import type { PictureSet } from "../media";
import { ButtonFill, ButtonGhost } from "../primitives/buttons";
import { Picture } from "../primitives/picture";
import { Slug } from "../primitives/slug";

export interface LandingCta {
  label: string;
  href: string;
}

export interface LandingHeroData {
  eyebrow: string;
  title: string;
  subhead: string;
  cta: LandingCta;
  /** Ambient photography for the seated media frame under the copy. */
  picture: PictureSet;
}

/** Icons a benefit card may lead with; the map keeps ReactNodes out of data. */
export type LandingIcon =
  "website" | "search" | "maps" | "reviews" | "reception" | "aiChat" | "sparkle";

export interface LandingBenefit {
  id: string;
  icon?: LandingIcon;
  title: string;
  copy: string;
}

export interface LandingBenefitsData {
  eyebrow: string;
  title: string;
  /** Three reads best; the cells seat on the lattice at any count. */
  items: readonly LandingBenefit[];
}

export interface LandingQuoteData {
  eyebrow: string;
  /** Written with its own curly quotes; the first hangs into the margin. */
  quote: string;
  attribution: string;
}

export interface LandingCloserData {
  eyebrow: string;
  title: string;
  copy: string;
  cta: LandingCta;
}

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

const ICONS: Record<LandingIcon, () => ReactNode> = {
  website: () => <IconWebsite />,
  search: () => <IconSearch />,
  maps: () => <IconMaps />,
  reviews: () => <IconReviews />,
  reception: () => <IconReception />,
  aiChat: () => <IconAiChat />,
  sparkle: () => <IconSparkle />,
};

/* Lattice: the copy sits in unpainted air; the media frame is seated
 * (the company-hero idiom) — a 12-column field one tick under the
 * slab's top edge, 6 rows through rt and 5 from rd, with a 10-column
 * row on the slab's edge from rt. The frame's exposed bottom row is the
 * section's painted closer. */
const HERO_MEDIA_FRAME: Record<GridBand, { gx: number; gy: number; gw: number; gh?: number }[]> = {
  rm: [{ gx: 0, gy: 1, gw: 12, gh: 6 }],
  rs: [{ gx: 0, gy: 1, gw: 12, gh: 6 }],
  rt: [
    { gx: 1, gy: 0, gw: 10 },
    { gx: 0, gy: 1, gw: 12, gh: 6 },
  ],
  rd1: [
    { gx: 1, gy: 0, gw: 10 },
    { gx: 0, gy: 1, gw: 12, gh: 5 },
  ],
  rd2: [
    { gx: 1, gy: 0, gw: 10 },
    { gx: 0, gy: 1, gw: 12, gh: 5 },
  ],
};

/* Flow closer (the company idiom): one painted row of 12 cells, one
 * tick below the last content, so the page rhythm reads
 * [content] → 1t → [row] → 1t → [content]. */
function Closer() {
  return (
    <div className="ld-closer" aria-hidden="true">
      <div className="gx ld-bleed">
        {BANDS.map((band) => (
          <GridRegion key={band} band={band} gx={0} gy={0} gw={12} />
        ))}
      </div>
    </div>
  );
}

/* One CTA row: the fill button, then the chat prompt from rs. The row
 * sets the button size per band (md · lg from rt · xl from rd2). */
function CtaRow({ cta, className }: { cta: LandingCta; className?: string }) {
  return (
    <div className={className ? `ld-ctas ${className}` : "ld-ctas"} data-landmark="cta">
      <ButtonFill size="inherit" href={cta.href}>
        {cta.label}
      </ButtonFill>
      <span className="type type-fixed ts-text-md-light ld-ctas-q">Got a question?</span>
      <ButtonGhost size="inherit" color="brown" icon={<IconChat />} action="open-chat">
        Talk to us
      </ButtonGhost>
    </div>
  );
}

export function LandingHeroSection({ data }: { data: LandingHeroData }) {
  return (
    <section className="sec ld-sec ld-hero" aria-label={data.eyebrow} data-landmark="ld-hero">
      <header className="ld-hero-head" data-landmark="head">
        <Slug className="hx-rise">{data.eyebrow}</Slug>
        <h1 className="type ts-display-serif-sm-plus-thin ld-h1 hx-rise">{data.title}</h1>
        <p className="type ts-text-md-light ld-body ld-hero-sub hx-rise">{data.subhead}</p>
        <CtaRow cta={data.cta} className="ld-hero-cta hx-rise" />
      </header>

      <figure className="ld-hero-media hx-rise" data-landmark="media">
        <div className="gx ld-bleed" aria-hidden="true">
          {BANDS.map((band) =>
            HERO_MEDIA_FRAME[band].map((r, i) => (
              <GridRegion key={`${band}-m${i}`} band={band} {...r} />
            )),
          )}
        </div>
        <div className="ld-hero-frame">
          <Picture set={data.picture} priority />
        </div>
      </figure>
    </section>
  );
}

/* Lattice: seated — the cards are the grid. Stacked 12-wide cells
 * below rt; three 4-column cells from rt. Borders overlap by the
 * line-inclusive pixel so neighbours share one hairline. */
export function LandingBenefitsSection({ data }: { data: LandingBenefitsData }) {
  return (
    <section
      className="sec ld-sec ld-benefits"
      aria-label={data.eyebrow}
      data-landmark="ld-benefits"
    >
      <header className="ld-head" data-landmark="head">
        <Slug>{data.eyebrow}</Slug>
        <h2 className="type ts-display-serif-xs-extralight ld-h2">{data.title}</h2>
      </header>
      <ul className="ld-cards" data-landmark="cards">
        {data.items.map((item) => (
          <li key={item.id} className="ld-card">
            {item.icon && (
              <span className="ld-card-icon" aria-hidden="true">
                {ICONS[item.icon]()}
              </span>
            )}
            <h3 className="type ts-text-lg-medium ld-card-title">{item.title}</h3>
            <p className="type ts-text-md-light ld-card-copy">{item.copy}</p>
          </li>
        ))}
      </ul>
      <Closer />
    </section>
  );
}

/* Lattice: unpainted air, then the flow closer. */
export function LandingQuoteSection({ data }: { data: LandingQuoteData }) {
  return (
    <section className="sec ld-sec ld-quote" aria-label={data.eyebrow} data-landmark="ld-quote">
      <Slug>{data.eyebrow}</Slug>
      <figure className="ld-quote-fig">
        <blockquote className="type ts-display-serif-2xs-plus-extralight ld-quote-body">
          {data.quote}
        </blockquote>
        <figcaption className="type ts-text-md-light ld-quote-attrib">
          {data.attribution}
        </figcaption>
      </figure>
      <Closer />
    </section>
  );
}

/* Lattice: unpainted air; the footer's own lattice follows. */
export function LandingCloserSection({ data }: { data: LandingCloserData }) {
  return (
    <section className="sec ld-sec ld-close" aria-label={data.eyebrow} data-landmark="ld-close">
      <header className="ld-head" data-landmark="head">
        <Slug>{data.eyebrow}</Slug>
        <h2 className="type ts-display-serif-xs-extralight ld-h2">{data.title}</h2>
      </header>
      <p className="type ts-text-md-light ld-body ld-close-copy">{data.copy}</p>
      <CtaRow cta={data.cta} className="ld-close-cta" />
    </section>
  );
}
