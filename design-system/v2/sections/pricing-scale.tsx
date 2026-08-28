/** v2 sections — pricing-scale (spec 012). Server component with one
 * client island (pricing-scale-island.tsx — the §6 machine). The
 * pricing page's second section — page rows from the 011 section end
 * to the FAQ top: the price-scale block (head, keyword chips, subhead,
 * slider, the rt/rd1/rd2 CTA) and the three-card persona carousel,
 * two views of one three-state machine.
 *
 * The section is born settled at k = 0 (§7): card 1 steady/active,
 * the slider at less, no load choreography, no timers, no arrow
 * controls — it never moves on its own. A no-JS render is the same
 * settled state with the range input disabled (§7.3).
 *
 * The slider and CTA mounts are band-gated instances (the 011
 * five-mount pattern): slider lg rm · sm rs · md rt · lg rd1/rd2
 * (rm/rs flush on the block's bottom row line, rt+ in flow); CTA
 * ButtonFill sm rt · md rd1 · lg rd2 — rm/rs carry no CTA (§3, the
 * card and list CTAs above serve those bands). The island wires every
 * mounted slider to the one state.
 *
 * The lattice over the section is §2's east staircase continuing from
 * 011's run, plus one ornament cell per band; the carousel cards paint
 * over the exposed cells as content — the inactive ghosts are
 * translucent by design so the staircase reads through them. */

import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { ButtonFill } from "../primitives/buttons";
import { PersonaCard } from "../primitives/persona-card";
import { Slider } from "../primitives/slider";
import { PricingScaleIsland } from "./pricing-scale-island";
import { PRICING_CHECKOUT_URL } from "./pricing-offer-data";
import {
  KEYWORD_CHIPS,
  PERSONAS,
  PRICE_SCALE_HEAD,
  PRICE_SCALE_SUBHEAD,
  SLIDER_LABEL,
} from "./pricing-scale-data";

/* ---- the exposure map (§2, section-local rows): the east staircase
   run over this section's rows (the rm run narrows from 011's 9–11 to
   10–11 at the section top) plus the ornament cells — verified
   cell-by-cell against rendered bounds 2026-08-28 at build. ---- */

interface Cell {
  gx: number;
  gy: number;
}
interface BandMap {
  region: { gx: number; gy: number; gw: number; gh: number };
  circles?: Cell[];
  fillCircles?: Cell[];
  squares?: Cell[];
}

const FIELD: Record<GridBand, BandMap> = {
  rm: {
    region: { gx: 10, gy: 0, gw: 2, gh: 29 },
    squares: [{ gx: 11, gy: 25 }],
  },
  rs: {
    region: { gx: 9, gy: 0, gw: 3, gh: 13 },
    circles: [{ gx: 9, gy: 6 }],
    fillCircles: [{ gx: 11, gy: 11 }],
  },
  rt: {
    region: { gx: 8, gy: 0, gw: 4, gh: 10 },
    fillCircles: [{ gx: 11, gy: 9 }],
  },
  rd1: {
    region: { gx: 8, gy: 0, gw: 4, gh: 9 },
    fillCircles: [{ gx: 11, gy: 8 }],
  },
  rd2: {
    region: { gx: 8, gy: 0, gw: 4, gh: 7 },
    squares: [{ gx: 11, gy: 6 }],
  },
};

const BANDS = Object.keys(FIELD) as GridBand[];

export function PricingScaleSection() {
  const rest = PERSONAS[0];
  return (
    <section className="sec v2-ps">
      {/* the staircase and ornament cells (§2) */}
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => [
          <GridRegion key={`${band}-r`} band={band} {...FIELD[band].region} />,
          ...(FIELD[band].circles ?? []).map((o) => (
            <GridDecor key={`${band}-o${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell round" />
            </GridDecor>
          )),
          ...(FIELD[band].fillCircles ?? []).map((o) => (
            <GridDecor key={`${band}-fo${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell fill round" />
            </GridDecor>
          )),
          ...(FIELD[band].squares ?? []).map((o) => (
            <GridDecor key={`${band}-f${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell fill" />
            </GridDecor>
          )),
        ])}
      </div>

      <PricingScaleIsland
        personas={PERSONAS.map(({ hue, tagLabel }) => ({ hue, tagLabel }))}
      >
        {/* the price-scale block (§3): transparent box, top hairline on
            the section's top row line, space-between column */}
        <div className="ps-block" data-landmark="price-scale">
          <div className="ps-content">
            {/* the designed two-line break (§3 amendment 2026-08-28) */}
            <h2 className="ps-head">
              {PRICE_SCALE_HEAD[0]}
              <br />
              {PRICE_SCALE_HEAD[1]}
            </h2>
            <ul className="ps-chips">
              {KEYWORD_CHIPS.map((chip) => (
                <li key={chip.id} className={`ps-chip ps-chip-${chip.id}`}>
                  {chip.label}
                </li>
              ))}
            </ul>
            <p className="ps-subhead">{PRICE_SCALE_SUBHEAD}</p>
            {/* in-flow slider mounts (rt · rd1/rd2) */}
            <div className="ps-sl ps-sl-rt">
              <Slider size="md" label={SLIDER_LABEL} valueText={rest.tagLabel} />
            </div>
            <div className="ps-sl ps-sl-rd">
              <Slider size="lg" label={SLIDER_LABEL} valueText={rest.tagLabel} />
            </div>
          </div>
          <div className="ps-bottom">
            {/* flush-bottom slider mounts (rm · rs — the slider's bottom
                edge sits on the block's bottom row line) */}
            <div className="ps-sl ps-sl-rm">
              <Slider size="lg" label={SLIDER_LABEL} valueText={rest.tagLabel} />
            </div>
            <div className="ps-sl ps-sl-rs">
              <Slider size="sm" label={SLIDER_LABEL} valueText={rest.tagLabel} />
            </div>
            {/* the CTA (§3): the 003 ButtonFill teal pill, checkout link,
                same tab */}
            <div className="ps-cta ps-cta-rt">
              <ButtonFill size="sm" chrome="teal" href={PRICING_CHECKOUT_URL}>
                Start today
              </ButtonFill>
            </div>
            <div className="ps-cta ps-cta-rd1">
              <ButtonFill size="md" chrome="teal" href={PRICING_CHECKOUT_URL}>
                Start today
              </ButtonFill>
            </div>
            <div className="ps-cta ps-cta-rd2">
              <ButtonFill size="lg" chrome="teal" href={PRICING_CHECKOUT_URL}>
                Start today
              </ButtonFill>
            </div>
          </div>
        </div>

        {/* the persona carousel (§1/§5/§6): the viewport clips at the
            strip origin on the left and the page edge on the right; the
            strip translates by whole card steps (geometry, never px) */}
        <div className="ps-carousel">
          <ul className="ps-strip" data-landmark="strip">
            {PERSONAS.map((persona, i) => (
              <li key={persona.id} className="ps-slot" data-landmark="card">
                <PersonaCard persona={persona} state={i === 0 ? "active" : "inactive"} />
              </li>
            ))}
          </ul>
        </div>
      </PricingScaleIsland>
    </section>
  );
}
