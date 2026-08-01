import { Card } from '@/design-system/primitives/Card';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { Button } from '@/design-system/primitives/Button';
import type { PricingPlan } from './types';

export interface PlanCardProps {
  plan: PricingPlan;
}

/**
 * One purchasable subscription plan: name, price, feature list, and a CTA
 * that opens the Stripe Payment Link. See spec 055.
 */
export function PlanCard({ plan }: PlanCardProps) {
  return (
    <article
      className={
        plan.highlighted
          ? 'ks-plan-card ks-plan-card--highlighted'
          : 'ks-plan-card'
      }
    >
      <Card tone="cream" radius="panel" padded className="ks-plan-card__surface">
        {plan.badge ? (
          <Eyebrow tone="brand" className="ks-plan-card__badge">
            {plan.badge}
          </Eyebrow>
        ) : null}
        <Heading level={2} size="md" className="ks-plan-card__name">
          {plan.name}
        </Heading>
        <Text variant="body" tone="secondary" className="ks-plan-card__tagline">
          {plan.tagline}
        </Text>
        <p className="ks-plan-card__price">
          <span className="ks-plan-card__amount">{plan.priceAmount}</span>
          <span className="ks-plan-card__period">{plan.pricePeriod}</span>
        </p>
        <ul className="ks-plan-card__features">
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <Button
          variant="primary"
          size="lg"
          href={plan.checkoutUrl}
          external
          withArrow
          fullWidth
          className="ks-plan-card__cta"
        >
          {plan.ctaLabel}
        </Button>
      </Card>
    </article>
  );
}
