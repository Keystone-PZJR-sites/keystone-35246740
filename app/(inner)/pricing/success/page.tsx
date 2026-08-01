// Checkout success — /pricing/success
// Stripe Payment Links redirect here after a completed subscription (spec 055).

import type { Metadata } from 'next';
import Link from 'next/link';
import { CenteredHero, CtaBand } from '@/design-system';
import { Button } from '@/design-system/primitives/Button';
import { PRICING_PAGE } from '@/data/pricing-page';

export const metadata: Metadata = {
  title: 'Welcome | Keystone',
  description: 'Thanks for subscribing to Keystone.',
  robots: { index: false, follow: false },
};

interface SuccessPageProps {
  searchParams: Promise<{ plan?: string }>;
}

export default async function PricingSuccessPage({ searchParams }: SuccessPageProps) {
  const { plan } = await searchParams;
  const copy = PRICING_PAGE.success;
  const title =
    plan === 'foundation' || plan === 'system'
      ? copy.titleByPlan[plan]
      : copy.titleByPlan.default;

  return (
    <div className="inner-page" data-theme="custom">
      <CenteredHero title={title} subtitle={copy.subtitle} />
      <main className="ks-checkout-return">
        <div className="ks-checkout-return__actions">
          <Button variant="primary" size="lg" href={copy.primaryHref} withArrow>
            {copy.primaryLabel}
          </Button>
          <Button variant="secondary" size="lg" href={copy.secondaryHref}>
            {copy.secondaryLabel}
          </Button>
        </div>
        <p className="ks-checkout-return__note">
          Questions?{' '}
          <Link href="/get-in-touch" className="ks-checkout-return__link">
            Get in touch
          </Link>
          .
        </p>
      </main>
      <CtaBand tone="accent" fullBleed title="See how local businesses grow with Keystone" />
    </div>
  );
}
