// Pricing — /pricing
// ==================
// Two-plan checkout page (spec 055). Visitors choose Foundation ($50) or
// Sales & Marketing ($250) and continue to Stripe Payment Links.

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CenteredHero,
  ContentSection,
  FeatureGrid,
  FaqAccordion,
  TestimonialCarousel,
  CtaBand,
} from '@/design-system';
import { Text } from '@/design-system/primitives/Text';
import { PricingPlans } from '@/design-system/patterns/pricing';
import { PRICING_PAGE } from '@/data/pricing-page';

export const metadata: Metadata = {
  title: PRICING_PAGE.meta.title,
  description: PRICING_PAGE.meta.description,
};

export default function PricingPage() {
  const content = PRICING_PAGE;

  return (
    <div className="inner-page" data-theme="custom">
      <CenteredHero
        eyebrow={content.header.eyebrow}
        title={content.header.title}
        subtitle={content.header.subtitle}
      />

      <main>
        <ContentSection ariaLabel="Choose a plan">
          <PricingPlans plans={content.plans} />
          <p className="ks-pricing-manage">
            <Text variant="small" tone="tertiary" as="span">
              {content.manageSubscription.note}{' '}
            </Text>
            <Link
              href={content.manageSubscription.href}
              className="ks-pricing-manage__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.manageSubscription.label}
            </Link>
          </p>
        </ContentSection>

        <ContentSection
          eyebrow={content.assurances.eyebrow}
          title={content.assurances.title}
          centered
        >
          <FeatureGrid items={content.assurances.items} />
        </ContentSection>

        <TestimonialCarousel
          title={content.testimonials.title}
          cards={content.testimonials.cards}
        />

        <ContentSection eyebrow={content.faq.eyebrow} title={content.faq.title} centered>
          <FaqAccordion items={content.faq.items} centered />
        </ContentSection>
      </main>

      <CtaBand
        tone="accent"
        fullBleed
        title={content.closing.title}
        primary={{ label: content.closing.actionLabel, href: content.closing.actionHref }}
      />
    </div>
  );
}
