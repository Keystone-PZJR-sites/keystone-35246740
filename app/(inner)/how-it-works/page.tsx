import type { Metadata } from 'next';
import {
  CenteredHero,
  ContentSection,
  ProcessSteps,
  FeatureGrid,
  TestimonialCarousel,
  FaqAccordion,
  CtaBand,
} from '@/design-system';
import { ProcessMock } from '@/design-system/patterns/how-it-works';
import { HOW_IT_WORKS_PAGE } from '@/data';

export const metadata: Metadata = {
  title: HOW_IT_WORKS_PAGE.meta.title,
  description: HOW_IT_WORKS_PAGE.meta.description,
};

export default function HowItWorksPage() {
  const content = HOW_IT_WORKS_PAGE;

  const steps = content.steps.items.map((step) => ({
    id: step.id,
    number: step.number,
    eyebrow: step.eyebrow,
    title: step.title,
    description: step.description,
    services: step.services,
    media: <ProcessMock kind={step.mock} />,
  }));

  return (
    <div className="inner-page" data-theme="custom">
      <CenteredHero
        eyebrow={content.header.eyebrow}
        title={content.header.title}
        subtitle={content.header.subtitle}
      />

      <main>
        {/* The numbered six-step narrative — the heart of the page. */}
        <ContentSection
          eyebrow={content.steps.eyebrow}
          title={content.steps.title}
          description={content.steps.description}
          centered
          ariaLabel="How Keystone grows your business"
        >
          <ProcessSteps steps={steps} ariaLabel="The Keystone growth journey" />
        </ContentSection>

        {/* Why the system works as a whole. */}
        <ContentSection
          eyebrow={content.recap.eyebrow}
          title={content.recap.title}
          centered
          ariaLabel="Why it works"
        >
          <FeatureGrid items={content.recap.items} />
        </ContentSection>

        {/* Social proof. */}
        <TestimonialCarousel
          title={content.testimonials.title}
          cards={content.testimonials.cards}
          ariaLabel="What our clients say"
        />

        {/* Process FAQ. */}
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
