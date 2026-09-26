/** "Then it scales with you" (persona-slider: 1150:25342 · 1170:32765 ·
 * 1170:33669): price controls and four persona cards driven by one
 * shared state. Unpainted. */

import { ButtonFill } from "../primitives/buttons";
import { PersonaCard } from "../primitives/persona-card";
import { Slider } from "../primitives/slider";
import { CHECKOUT_URLS } from "./pricing-plans-data";
import { PricingScaleIsland } from "./pricing-scale-island";
import {
  KEYWORD_CHIPS,
  PERSONAS,
  PRICE_SCALE_CTA,
  PRICE_SCALE_HEAD,
  PRICE_SCALE_SUBHEAD,
  SLIDER_LABEL,
} from "./pricing-scale-data";

export function PricingScaleSection() {
  const rest = PERSONAS[0];
  return (
    <section className="sec pscale" data-landmark="scale">
      <PricingScaleIsland personas={PERSONAS.map(({ hue, tagLabel }) => ({ hue, tagLabel }))}>
        <div className="ps-block" data-landmark="price-scale">
          <h2 className="type ts-display-serif-xs-extralight ps-head">{PRICE_SCALE_HEAD}</h2>
          <ul className="ps-chips">
            {KEYWORD_CHIPS.map((chip) => (
              <li key={chip.id} className={`type ps-chip ps-chip-${chip.id}`}>
                {chip.label}
              </li>
            ))}
          </ul>
          <p className="type ts-text-md-light ps-subhead">{PRICE_SCALE_SUBHEAD}</p>
          <div className="ps-sl">
            <Slider
              size="inherit"
              label={SLIDER_LABEL}
              valueText={rest.tagLabel}
              forceHue={rest.hue}
            />
          </div>
          {/* The 1344 frame alone carries a CTA under the slider. */}
          <div className="ps-cta">
            <ButtonFill size="inherit" chrome="teal" href={CHECKOUT_URLS.starter} external>
              {PRICE_SCALE_CTA}
            </ButtonFill>
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
