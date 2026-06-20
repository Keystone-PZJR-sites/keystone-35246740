import type { Metadata } from 'next';
import {
  CenteredHero,
  ContentSection,
  PriceSummary,
  PricingCalculator,
  FeatureGrid,
  FaqAccordion,
  TestimonialCarousel,
  CtaBand,
  CtaModalButton,
} from '@/design-system';
import {
  PRICING_PAGE,
  SHARED_PRICING_TAGLINE,
  SHARED_PRICING_PRICE_AMOUNT,
  SHARED_PRICING_PRICE_PERIOD,
  SHARED_PRICING_SUBCOPY_LINE_1,
  SHARED_PRICING_SUBCOPY_LINE_2,
  SHARED_PRICING_FEATURE_CHIPS,
} from '@/data';

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
        {/* The plan + price, in the light card variant, with its action. The
            price content is the shared homepage pricing content so the number
            and the included list live in one place. */}
        <ContentSection ariaLabel="Plan and price">
          <div className="pricing-page-summary">
            <PriceSummary
              tone="light"
              tagline={SHARED_PRICING_TAGLINE}
              priceAmount={SHARED_PRICING_PRICE_AMOUNT}
              pricePeriod={SHARED_PRICING_PRICE_PERIOD}
              subCopyLine1={SHARED_PRICING_SUBCOPY_LINE_1}
              subCopyLine2={SHARED_PRICING_SUBCOPY_LINE_2}
              featureChips={SHARED_PRICING_FEATURE_CHIPS}
            />
            <CtaModalButton variant="primary" size="lg" withArrow>
              {content.summaryActionLabel}
            </CtaModalButton>
          </div>
        </ContentSection>

        {/* Everything included, expanded. */}
        <ContentSection eyebrow={content.included.eyebrow} title={content.included.title} centered>
          <FeatureGrid items={content.included.items} />
        </ContentSection>

        {/* "Only pay for what you use" estimator. */}
        <ContentSection
          ariaLabel="Estimate your monthly total"
          eyebrow={content.calculator.eyebrow}
          title={content.calculator.title}
          description={content.calculator.description}
          centered
        >
          <PricingCalculator
            planName={content.calculator.planName}
            planNote={content.calculator.planNote}
            basePrice={content.calculator.basePrice}
            period={content.calculator.period}
            items={content.calculator.items}
            note={content.calculator.note}
            actionLabel={content.calculator.actionLabel}
          />
        </ContentSection>

        {/* Reassurances. */}
        <ContentSection
          eyebrow={content.assurances.eyebrow}
          title={content.assurances.title}
          centered
        >
          <FeatureGrid items={content.assurances.items} />
        </ContentSection>

        {/* Social proof. */}
        <TestimonialCarousel title={content.testimonials.title} cards={content.testimonials.cards} />

        {/* Pricing FAQ. */}
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
