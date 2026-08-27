/** v2 sections — the engine accordion (spec 008). Server component.
 *
 * Anatomy (§1): header · engine row · button-bar. Structural switch at
 * the rt gate: at rt/rd1/rd2 the row is the accordion — one expanded
 * card (6t) and four collapsed pills (1t), butted, in a 10t row; below
 * it is the swipe carousel with a breadcrumb. One DOM, band-gated
 * order (v5 §7.5): the same five cards serve both presentations.
 *
 * The five engines render in canonical order (Visibility · Ads · Brand
 * · Reception · Engagement — the nav's canonical engine order, spec
 * 005 §5); Visibility is expanded at rest, so a no-JS render shows the
 * settled state (§7.5). The lattice is the right-side rail continuing
 * the portfolio's (§2 — per-cell stroke visibility read through the
 * console bridge; the filled circle at 11×0 is the round shade of the
 * f-cell ornament vocabulary).
 *
 * The only client code is the row island (engine-row.tsx): the spring,
 * the normalized shares, the carousel track, drag, and the decode
 * priming. Header and button-bar are server-rendered.
 */

import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { ButtonGhost } from "../primitives/buttons";
import { InterpText } from "../primitives/text";
import { IconApproach, IconCaseStudies, IconProjects } from "../icons";
import { ENGINE_IDS, ENGINE_TIERS, engineSrc, type EngineId } from "../media";
import { EngineRow } from "./engine-row";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* ---- copy (§4): one title + one body per engine, identical at every
   breakpoint variant. Apostrophes ship curly (content decision
   2026-08-26 — §9 F8; the spec's transcription is the normalized
   canon). ---- */

const ENGINES: { id: EngineId; name: string; body: string }[] = [
  {
    id: "visibility",
    name: "Visibility",
    body: "A profile that ranks in Maps and content that keeps coming. When someone nearby searches, on Google or with AI, you\u2019re the one they find.",
  },
  {
    id: "ads",
    name: "Ads",
    body: "Campaigns built from your own media, landing on a site built to convert. Every lead answered, every dollar tracked. Ads that pay for themselves.",
  },
  {
    id: "brand",
    name: "Brand",
    body: "One look and one voice, everywhere customers check. From your website to reviews and social; so when they\u2019re comparing, it\u2019s not close.",
  },
  {
    id: "reception",
    name: "Reception",
    body: "Webchat, texts, and calls answered at any hour. Every interaction tied to one contact, so the conversation always picks up wherever it left off.",
  },
  {
    id: "engagement",
    name: "Engagement",
    body: "Newsletters, offers, and nudges on a steady rhythm. Old leads worked and quiet customers brought back. Nobody on your list goes untouched.",
  },
];

/** Visibility is expanded at rest (§4 — every anchor frame instances
 * engine=visibility). */
const AT_REST: EngineId = "visibility";

/* ---- the rail (§2): plain-cell runs merged into regions, the filled
   circle at 11×0 on every band (the new round shade of the f-cell
   vocabulary), the outlined circles per band. The rm rail narrows to
   col 11 alone over the header rows; the rd1 strays are fixed in the
   file (§9 F7 — re-read clean). ---- */

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
      { gx: 11, gy: 0, gh: 4 },
      { gx: 9, gy: 4, gw: 3, gh: 17 },
    ],
    circles: [],
  },
  rs: {
    regions: [{ gx: 9, gy: 0, gw: 3, gh: 13 }],
    circles: [{ gx: 9, gy: 12 }],
  },
  rt: {
    regions: [{ gx: 8, gy: 0, gw: 4, gh: 9 }],
    circles: [{ gx: 9, gy: 8 }],
  },
  rd1: {
    regions: [{ gx: 8, gy: 0, gw: 4, gh: 9 }],
    circles: [{ gx: 8, gy: 8 }],
  },
  rd2: {
    regions: [{ gx: 8, gy: 0, gw: 4, gh: 8 }],
    circles: [{ gx: 9, gy: 6 }],
  },
};

/* ---- header copy (§3): band-differing by design (§9 F5) — the swap
   rides the rd1 gate in one DOM, like the hero's H1 swap. The rs/rt
   break after "your" is designed; rm wraps naturally. ---- */

const HEADLINE_LO = "Then every piece of your marketing comes together.";
const HEADLINE_HI = "Then your marketing starts working together.";

const FALLBACK = ENGINE_TIERS[ENGINE_TIERS.length - 1];

/* ---- the engine card (§4/§5): one DOM for both presentations. The
   card is a real button (§8.5) — the hit overlay carries the
   accessible name, aria-expanded, and the panel association; the pill
   layer (accordion chrome) and the lattice are aria-hidden. The
   expanded card's image loads eagerly; the rest lazy-load and are
   decode-primed at idle (§5). ---- */

function Card({ engine, index }: { engine: (typeof ENGINES)[number]; index: number }) {
  const active = engine.id === AT_REST;
  return (
    <li
      className="eng-card"
      data-engine={engine.id}
      data-active={active || undefined}
      style={{ "--eng-i": index } as React.CSSProperties}
    >
      <button
        type="button"
        className="eng-hit"
        aria-expanded={active}
        aria-controls={`eng-panel-${engine.id}`}
      >
        <span className="eng-sr">{engine.name}</span>
      </button>

      {/* the collapsed pill layer (accordion bands): rotated label
          anchored at the top padding edge, the dot bottom-center — a
          plain circle in the engine's /400, CSS with a token fill per
          the CSS-dot precedent (003 §6 / 004 §7) */}
      <div className="eng-pill" aria-hidden="true">
        <span className="eng-pill-label">
          <InterpText as="span" style="text-xl-light" className="eng-pl-lo">
            {engine.name}
          </InterpText>
          <InterpText as="span" style="display-sans-2xs-light" className="eng-pl-hi">
            {engine.name}
          </InterpText>
        </span>
        <i className="eng-dot" />
      </div>

      {/* the expanded interior — laid out once at the band's full
          expanded size and clipped by the card's edges (§7.1: content
          is revealed, not resized) */}
      <div
        className="eng-inner"
        id={`eng-panel-${engine.id}`}
        role="region"
        aria-labelledby={`eng-title-${engine.id}`}
        aria-hidden={active ? undefined : true}
      >
        <div className="eng-text">
          <p className="eng-title" id={`eng-title-${engine.id}`}>
            <InterpText as="span" style="text-2xl-light" className="eng-title-lo">
              {engine.name}
            </InterpText>
            <InterpText as="span" style="display-sans-xs-light" className="eng-title-hi">
              {engine.name}
            </InterpText>
          </p>
          <InterpText style="text-sm-light" className="eng-copy">
            {engine.body}
          </InterpText>
        </div>
        <div className="eng-img">
          <picture>
            {ENGINE_TIERS.filter((tier) => tier.media !== null).map((tier) => (
              <source
                key={tier.cut}
                media={tier.media ?? undefined}
                srcSet={engineSrc(engine.id, tier.cut)}
                width={tier.width}
                height={tier.height}
              />
            ))}
            <img
              src={engineSrc(engine.id, 384)}
              width={FALLBACK.width}
              height={FALLBACK.height}
              alt=""
              decoding="async"
              loading={active ? "eager" : "lazy"}
            />
          </picture>
        </div>
      </div>
    </li>
  );
}

/* ---- button-bar (§6): the same three actions as the portfolio's bar,
   in the same inks; at rm the bar carries the first two only. All
   three are real links to /our-work (007 §9 R7's destinations carried
   forward). ---- */

function BarRow({ size, variant }: { size: "sm" | "md" | "xl"; variant: string }) {
  return (
    <div className={`eng-bar-row eng-bar-${variant}`}>
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

export function EngineSection() {
  return (
    <section className="sec v2-engine" aria-labelledby="eng-heading">
      {/* the designed section-top rule (§2 amended 2026-08-26 — §9 F15):
          the anchor frames' top-only border/000 stroke, 11t + 1px; the
          rail's row-0 tops complete the visible line to the page edge */}
      <i className="eng-toprule" aria-hidden="true" />
      {/* the rail (§2) */}
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => [
          ...RAIL[band].regions.map((r, i) => (
            <GridRegion key={`${band}-r${i}`} band={band} {...r} />
          )),
          <GridDecor key={`${band}-fill`} band={band} gx={11} gy={0}>
            <span className="f-cell fill round" />
          </GridDecor>,
          ...RAIL[band].circles.map((o) => (
            <GridDecor key={`${band}-o${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell round" />
            </GridDecor>
          )),
        ])}
      </div>

      {/* header (§3): the designed copy swap rides the rd1 gate (§9
          F5); weight/tracking switch at the 1344 gate — four band-gated
          spans, one DOM (the hero/portfolio pattern) */}
      <div className="eng-header" data-landmark="head">
        <h2 className="eng-h2" id="eng-heading">
          <InterpText as="span" style="display-serif-xs-extralight" className="eng-h2-a">
            {HEADLINE_LO}
          </InterpText>
          <InterpText as="span" style="display-serif-xs-extralight" className="eng-h2-b">
            {"Then every piece of your"}
            <br aria-hidden />
            {"marketing comes together."}
          </InterpText>
          <InterpText as="span" style="display-serif-sm-extralight" className="eng-h2-c">
            {HEADLINE_HI}
          </InterpText>
          <InterpText as="span" style="display-serif-md-plus-thin" className="eng-h2-d">
            {HEADLINE_HI}
          </InterpText>
        </h2>
      </div>

      {/* the engine row (§4/§5/§7) — the one client island */}
      <EngineRow>
        <div className="eng-row" data-landmark="row">
          <ul className="eng-track">
            {ENGINES.map((engine, i) => (
              <Card key={engine.id} engine={engine} index={i} />
            ))}
          </ul>
          {/* the breadcrumb (§5, carousel bands): five labeled buttons
              under the active card; the active stop is a 24×6 pill in
              the active engine's /400 */}
          <div className="eng-crumbs">
            {ENGINES.map((engine) => (
              <button
                key={engine.id}
                type="button"
                className="eng-crumb"
                data-engine={engine.id}
                data-current={engine.id === AT_REST || undefined}
                aria-label={`Show ${engine.name}`}
              />
            ))}
          </div>
        </div>
      </EngineRow>

      {/* button-bar (§6) */}
      <div className="eng-bar" data-landmark="bar">
        <BarRow size="sm" variant="sm" />
        <BarRow size="md" variant="md" />
        <BarRow size="xl" variant="xl" />
      </div>
    </section>
  );
}
