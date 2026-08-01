import { PlanCard } from './PlanCard';
import type { PricingPlan } from './types';

export interface PricingPlansProps {
  plans: PricingPlan[];
  /** Accessible name for the plans region. */
  ariaLabel?: string;
}

/**
 * Side-by-side purchasable plan cards for `/pricing` (spec 055).
 */
export function PricingPlans({ plans, ariaLabel = 'Subscription plans' }: PricingPlansProps) {
  return (
    <div className="ks-pricing-plans" aria-label={ariaLabel}>
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
