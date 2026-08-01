// Checkout cancel — /pricing/cancel
// Stripe Payment Links redirect here if the buyer backs out (spec 055).

import type { Metadata } from 'next';
import { CenteredHero, CtaBand } from '@/design-system';
import { Button } from '@/design-system/primitives/Button';
import { PRICING_PAGE } from '@/data/pricing-page';

export const metadata: Metadata = {
  title: 'Checkout canceled | Keystone',
  description: 'Your Keystone checkout was canceled — no charge was made.',
  robots: { index: false, follow: false },
};

export default function PricingCancelPage() {
  const copy = PRICING_PAGE.cancel;

  return (
    <div className="inner-page" data-theme="custom">
      <CenteredHero title={copy.title} subtitle={copy.subtitle} />
      <main className="ks-checkout-return">
        <div className="ks-checkout-return__actions">
          <Button variant="primary" size="lg" href={copy.primaryHref} withArrow>
            {copy.primaryLabel}
          </Button>
          <Button variant="secondary" size="lg" href={copy.secondaryHref}>
            {copy.secondaryLabel}
          </Button>
        </div>
      </main>
      <CtaBand
        tone="accent"
        fullBleed
        title="Still deciding?"
        primary={{ label: copy.secondaryLabel, href: copy.secondaryHref }}
      />
    </div>
  );
}
