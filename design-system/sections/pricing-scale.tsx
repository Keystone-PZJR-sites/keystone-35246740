/** Price controls and persona cards driven by one shared state. */

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

/* Lattice coordinates are section-local. */

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
    <section className="sec pricing-scale-section">
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
        <div className="ps-block" data-landmark="price-scale">
          <div className="ps-content">
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
            <div className="ps-sl ps-sl-rt">
              <Slider size="md" label={SLIDER_LABEL} valueText={rest.tagLabel} />
            </div>
            <div className="ps-sl ps-sl-rd">
              <Slider size="lg" label={SLIDER_LABEL} valueText={rest.tagLabel} />
            </div>
          </div>
          <div className="ps-bottom">
            {/* Narrow-band sliders align with the block's bottom edge. */}
            <div className="ps-sl ps-sl-rm">
              <Slider size="lg" label={SLIDER_LABEL} valueText={rest.tagLabel} />
            </div>
            <div className="ps-sl ps-sl-rs">
              <Slider size="sm" label={SLIDER_LABEL} valueText={rest.tagLabel} />
            </div>
            <div className="ps-cta ps-cta-rt">
              <ButtonFill size="sm" chrome="teal" href={PRICING_CHECKOUT_URL} external>
                Start today
              </ButtonFill>
            </div>
            <div className="ps-cta ps-cta-rd1">
              <ButtonFill size="md" chrome="teal" href={PRICING_CHECKOUT_URL} external>
                Start today
              </ButtonFill>
            </div>
            <div className="ps-cta ps-cta-rd2">
              <ButtonFill size="lg" chrome="teal" href={PRICING_CHECKOUT_URL} external>
                Start today
              </ButtonFill>
            </div>
          </div>
        </div>

        {/* The strip translates by whole card steps inside a clipped viewport. */}
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
