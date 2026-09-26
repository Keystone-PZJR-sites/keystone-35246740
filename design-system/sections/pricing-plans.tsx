/** The three plan cards and the no-terms note (plans: 1129:17117 ·
 * 1170:32308 · 1170:33214). Lattice paint is seated at rd2 only: the
 * 1344 frame exposes rows 1–3 across all twelve columns behind the
 * cards (1161:26499); the narrower frames sit in unpainted air. */

import { GridRegion } from "../grid/region";
import { PlanCard } from "../primitives/plan-card";
import { PLANS, PLANS_NOTE } from "./pricing-plans-data";

export function PricingPlansSection() {
  return (
    <section className="sec pplans" data-landmark="plans">
      <div className="gx" aria-hidden="true">
        <GridRegion band="rd2" gx={0} gy={1} gw={12} gh={3} />
      </div>
      <div className="pplans-row">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      <p className="type ts-display-serif-2xs-light pplans-note">{PLANS_NOTE}</p>
    </section>
  );
}
