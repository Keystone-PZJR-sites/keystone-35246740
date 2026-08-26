/** v2 sections — the portfolio gallery (spec 007). Server component.
 *
 * Anatomy (§1): header · gallery row · button-bar, the same three-block
 * stack at every band — band differences are values, not order. The
 * lattice is the right-side rail continuing the hero's (§2 as amended
 * 2026-08-26 — transcribed per-cell from the page Grid layers' stroke
 * visibility, rendered bounds through the console bridge; §9 R13). The
 * carousel control pair is the section's only special-cell presence:
 * real content-layer buttons at §2's cells, never lattice paint.
 *
 * The only client code is the gallery island (portfolio-gallery.tsx):
 * entrance, navigation, active slots, the §7.4 observer/events. Header
 * and button-bar are server-rendered. Cards are non-interactive (§9 R8);
 * a no-JS render shows the settled at-rest state.
 */

import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { ButtonGhost } from "../primitives/buttons";
import { GridButton } from "../primitives/grid-button";
import { InterpText } from "../primitives/text";
import { IconApproach, IconCaseStudies, IconProjects } from "../icons";
import { PORTFOLIO_SITES, PORTFOLIO_TIERS, portfolioSrc } from "../media";
import { PortfolioGallery } from "./portfolio-gallery";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* ---- the rail (§2, amended 2026-08-26): plain-cell runs merged into
   regions (adjacent regions share lines by v5 line-inclusive overlap),
   the bg/200-filled cell at 11×0 on every band, the outlined circles at
   rm/rs. The rt 9×7 and rs 11×1 gaps are deliberate (§9 R15). No cells
   render at the control positions — the grid-button ring is the cell
   chrome there. ---- */

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}
interface BandMap {
  regions: R[];
  circles: { gx: number; gy: number }[];
}

const RAIL: Record<GridBand, BandMap> = {
  rm: {
    regions: [
      { gx: 9, gy: 0, gw: 2 },
      { gx: 9, gy: 1, gw: 3, gh: 2 },
      { gx: 10, gy: 3, gw: 2 },
      { gx: 9, gy: 4, gw: 3, gh: 12 },
      { gx: 9, gy: 16, gh: 2 },
      { gx: 11, gy: 16, gh: 2 },
      { gx: 9, gy: 18, gw: 3 },
    ],
    circles: [{ gx: 9, gy: 3 }],
  },
  rs: {
    regions: [
      { gx: 9, gy: 0, gw: 2, gh: 2 },
      { gx: 10, gy: 2, gw: 2 },
      { gx: 9, gy: 3, gw: 3, gh: 4 },
      { gx: 9, gy: 7, gh: 2 },
      { gx: 11, gy: 7, gh: 2 },
      { gx: 9, gy: 9, gw: 3 },
      { gx: 10, gy: 10, gw: 2 },
    ],
    circles: [
      { gx: 9, gy: 2 },
      { gx: 9, gy: 10 },
    ],
  },
  rt: {
    regions: [
      { gx: 8, gy: 0, gw: 3 },
      { gx: 8, gy: 1, gw: 4, gh: 5 },
      { gx: 9, gy: 6, gw: 3 },
      { gx: 10, gy: 7, gw: 2 },
      { gx: 8, gy: 8, gw: 4 },
    ],
    circles: [],
  },
  rd1: {
    regions: [
      { gx: 8, gy: 0, gw: 3 },
      { gx: 8, gy: 1, gw: 4, gh: 5 },
      { gx: 9, gy: 6, gw: 3, gh: 2 },
      { gx: 8, gy: 8, gw: 4 },
    ],
    circles: [],
  },
  rd2: {
    regions: [
      { gx: 8, gy: 0, gw: 3 },
      { gx: 8, gy: 1, gw: 4, gh: 5 },
      { gx: 9, gy: 6, gw: 3, gh: 2 },
      { gx: 8, gy: 8, gw: 4 },
    ],
    circles: [],
  },
};

/* ---- cards (§4/§5): one per site, in export order. data-slot drives
   the active chrome per band through CSS (slot = index − offset; the
   island rewrites it on navigation). The first three are eager — the
   entrance needs their pixels (§5); the rest lazy-load and are primed
   on the first navigation press. ---- */

const HEADLINE = "It starts with a site that\u2019s worth the visit.";
const FALLBACK = PORTFOLIO_TIERS[PORTFOLIO_TIERS.length - 1];
const SITE_COUNT = PORTFOLIO_SITES.length;

/** Clones are the seamless-wrap tail (§7.3 as amended 2026-08-26 —
 * the loop decision): duplicates of the three leading cards, hidden
 * from the accessibility tree, never focusable, no curtains. Their
 * data-slot base rides past the real set so the island's slot
 * arithmetic covers them. */
function Card({ index, clone = false }: { index: number; clone?: boolean }) {
  const site = index + 1;
  const reveal = !clone && index < 3;
  return (
    <li
      className="pf-card"
      data-slot={clone ? SITE_COUNT + index : index}
      data-clone={clone || undefined}
      aria-hidden={clone || undefined}
      style={{ "--pf-i": index } as React.CSSProperties}
    >
      <div className="pf-shell">
        <div className="pf-thumb">
          <picture>
            {PORTFOLIO_TIERS.filter((tier) => tier.media !== null).map((tier) => (
              <source
                key={tier.cut}
                media={tier.media ?? undefined}
                srcSet={portfolioSrc(site, tier.cut)}
                width={tier.width}
                height={tier.height}
              />
            ))}
            <img
              src={portfolioSrc(site, 384)}
              width={FALLBACK.width}
              height={FALLBACK.height}
              alt={clone ? "" : PORTFOLIO_SITES[index]}
              decoding="async"
              loading={reveal ? "eager" : "lazy"}
            />
          </picture>
          {/* the pre-reveal curtain (§7.1) — the designed loading panel;
              only the at-rest visible cards ever show it */}
          {reveal && <div className="pf-curtain" aria-hidden="true" />}
        </div>
      </div>
    </li>
  );
}

/* ---- the carousel control pair (§2/§6): one pair per band at its
   rendered-truth cell, forward above back, sized to the band's cell.
   Navigation loops (§7.3 amended 2026-08-26, superseding R9's clamp)
   so neither button ever disables. ---- */

const CTRL_SIZES: Record<GridBand, "xs" | "sm" | "md" | "lg" | "xl"> = {
  rm: "xs",
  rs: "sm",
  rt: "md",
  rd1: "lg",
  rd2: "xl",
};

/* ---- button-bar (§6): spec 003 ghosts as real links, one row per
   designed size set, band-gated. At rm the sm row drops "Case studies"
   (§9 R10) — handled in CSS. All three point at /our-work (§9 R7). ---- */

function BarRow({ size, variant }: { size: "sm" | "md" | "xl"; variant: string }) {
  return (
    <div className={`pf-bar-row pf-bar-${variant}`}>
      <ButtonGhost size={size} color="brown" icon={<IconProjects />} href="/our-work">
        Our work
      </ButtonGhost>
      <ButtonGhost size={size} color="teal" icon={<IconApproach />} href="/our-work">
        Our approach
      </ButtonGhost>
      <ButtonGhost size={size} color="gray" icon={<IconCaseStudies />} href="/our-work">
        Case studies
      </ButtonGhost>
    </div>
  );
}

const SITES = Array.from({ length: PORTFOLIO_SITES.length }, (_, i) => i);

export function PortfolioSection() {
  return (
    <section className="sec v2-portfolio" aria-labelledby="pf-heading">
      {/* the rail (§2 amended) */}
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => [
          ...RAIL[band].regions.map((r, i) => (
            <GridRegion key={`${band}-r${i}`} band={band} {...r} />
          )),
          <GridDecor key={`${band}-fill`} band={band} gx={11} gy={0}>
            <span className="f-cell fill" />
          </GridDecor>,
          ...RAIL[band].circles.map((o) => (
            <GridDecor key={`${band}-o${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell round" />
            </GridDecor>
          )),
        ])}
      </div>

      {/* header (§3) — the page's first h2, centered in its block. The
          weight/tracking switch at the 1344 gate rides two band-gated
          spans (the hero copy-lo/hi pattern); size interpolates. */}
      <div className="pf-header">
        <h2 className="pf-h2" id="pf-heading">
          <InterpText as="span" style="display-serif-xs-extralight" className="pf-h2-lo">
            {HEADLINE}
          </InterpText>
          <InterpText as="span" style="display-serif-md-plus-thin" className="pf-h2-hi">
            {HEADLINE}
          </InterpText>
        </h2>
      </div>

      {/* gallery (§4/§5/§7) — the one client island. Three leading
          cards cloned at the tail for the seamless wrap (§7.3 amended
          2026-08-26); the control pair sits under the card layer, so
          sliding cards pass over it (§6 amended 2026-08-26). */}
      <PortfolioGallery>
        <div className="pf-window">
          <ul className="pf-track">
            {SITES.map((i) => (
              <Card key={i} index={i} />
            ))}
            {[0, 1, 2].map((k) => (
              <Card key={`clone-${k}`} index={k} clone />
            ))}
          </ul>
        </div>
        {BANDS.map((band) => (
          <div key={band} className={`pf-ctrl pf-ctrl-${band}`}>
            <GridButton direction="forward" size={CTRL_SIZES[band]} label="Next sites" />
            <GridButton direction="back" size={CTRL_SIZES[band]} label="Previous sites" />
          </div>
        ))}
      </PortfolioGallery>

      {/* button-bar (§6) — server-rendered links, centered in the bar
          block; sizes sm/sm/md/md/xl per band */}
      <div className="pf-bar">
        <BarRow size="sm" variant="sm" />
        <BarRow size="md" variant="md" />
        <BarRow size="xl" variant="xl" />
      </div>
    </section>
  );
}
