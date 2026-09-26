/** pricing-card-2 (1127:14286 set): band with name and motif, offer
 * with description, price and CTA, then the included list. The mount
 * sets `--plan-size` (sm · md · lg) and `--plan-u` per band; `size`
 * pins one design for the catalog. */

import { IconCheck } from "../icons";
import { PER_MONTH, type Plan } from "../sections/pricing-plans-data";
import { ButtonFill } from "./buttons";

type PlanCardSize = "sm" | "md" | "lg";

interface PlanCardProps {
  plan: Plan;
  /** Optional fixed design size; section mounts leave this unset. */
  size?: PlanCardSize;
}

/** 3 × 3 cells (pricing-card-motif-2, 1127:15960); the plan's CSS
 * table names which cells fill. Cells 4 and 8 are circles in every plan. */
const MOTIF_CELLS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const CHROME: Record<Plan["id"], "gray" | "teal" | "blue"> = {
  starter: "gray",
  growth: "teal",
  scale: "blue",
};

export function PlanCard({ plan, size }: PlanCardProps) {
  return (
    <article className="plan" data-plan={plan.id} data-size={size}>
      <div className="plan-box">
        <header className="plan-band">
          <h3 className="type plan-name">{plan.name}</h3>
          <span className="plan-motif" aria-hidden="true">
            {MOTIF_CELLS.map((n) => (
              <i key={n} />
            ))}
          </span>
        </header>
        <div className="plan-body">
          <div className="plan-offer">
            <p className="type plan-desc">{plan.description}</p>
            <p className="plan-price">
              <span className="type plan-amount">{plan.amount}</span>
              <span className="type plan-per">{PER_MONTH}</span>
            </p>
            <div className="plan-cta">
              <ButtonFill
                size="inherit"
                chrome={CHROME[plan.id]}
                href={plan.cta.href}
                external={plan.cta.external}
              >
                {plan.cta.label}
              </ButtonFill>
            </div>
          </div>
          <div className="plan-list">
            {plan.lead && <p className="type plan-lead">{plan.lead}</p>}
            <ul className="plan-items">
              {plan.items.map((item) => (
                <li key={item} className="plan-item">
                  <IconCheck className="plan-check" />
                  <span className="type plan-item-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {plan.tag && <span className="type plan-tag">{plan.tag}</span>}
      </div>
    </article>
  );
}
