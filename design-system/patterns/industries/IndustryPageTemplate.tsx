import type { ReactNode } from 'react';
import {
  SplitHero,
  ContentSection,
  MediaFeatureList,
  type MediaFeatureItem,
  FeatureGrid,
  type FeatureItem,
  StatStrip,
  type Stat,
  ProcessSteps,
  TestimonialCarousel,
  type TestimonialCard,
  FaqAccordion,
  type FaqItem,
  CtaBand,
} from '@/design-system/sections';
import {
  SpotlightCard,
  CardGrid,
} from '@/design-system/components';
import { ServiceMedia } from '@/design-system/patterns/services';
import { IndustryAudiences } from './IndustryAudiences';
import { IndustryComparison } from './IndustryComparison';

// ── Content model ─────────────────────────────────────────────────────────────
// One industry landing page = one IndustryPageContent object. The template below
// composes design-system sections from it, so every industry page is structurally
// identical and fully tokenized. Mirrors the service-page pattern (spec 037).

export interface IndustryLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface IndustryHeroContent {
  /** Uppercase industry label above the headline. */
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  primary?: IndustryLink;
  secondary?: IndustryLink;
  /** The media card beside the copy. */
  media: {
    image: string;
    alt: string;
    /** Deliverables line overlaid on the card. */
    statement: string;
    /** Brand tagline punch, e.g. "Wellness, Optimized." */
    tagline: string;
  };
}

export interface IndustryBenefitsSection {
  eyebrow?: string;
  title: ReactNode;
  /** Benefit cards (icon + title + copy). */
  items: FeatureItem[];
}

/** "Who it's for" — the specific business types inside this category, as tags. */
export interface IndustryAudienceSection {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  /** Sub-vertical labels rendered as a wrapped row of rounded tags. */
  items: string[];
}

/** One side of the "old way vs. Keystone" contrast. */
export interface IndustryComparisonColumn {
  label: string;
  points: string[];
}

export interface IndustryComparisonSection {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  /** The status-quo card (quiet surface, plain points). */
  before: IndustryComparisonColumn;
  /** The Keystone card (brand green, checked points). */
  after: IndustryComparisonColumn;
}

/** One step in the "how it works" numbered narrative. */
export interface IndustryJourneyStep {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface IndustryJourneySection {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  steps: IndustryJourneyStep[];
}

/** "What's included" — a grid of capability cards covered by the one plan. */
export interface IndustryIncludedSection {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  items: FeatureItem[];
}

export interface IndustryCapabilitiesSection {
  eyebrow?: string;
  title: ReactNode;
  media: { image: string; alt: string };
  mediaSide?: 'start' | 'end';
  panel?: 'cream' | 'cream-strong' | 'none';
  features: MediaFeatureItem[];
}

export interface IndustryStatsSection {
  eyebrow?: string;
  title: ReactNode;
  stats: Stat[];
}

export interface IndustryTestimonialsSection {
  title: ReactNode;
  cards: TestimonialCard[];
}

/** A single resource tile — typically a blog post linked as a card. */
export interface IndustryResource {
  title: string;
  href: string;
  image: string;
  alt: string;
  /** Small label above the title, e.g. "Article". Defaults to "Article". */
  kind?: string;
  /** Opens in a new tab (for off-site resources). */
  external?: boolean;
}

export interface IndustryResourcesSection {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  items: IndustryResource[];
}

export interface IndustryFaqSection {
  eyebrow?: string;
  title?: ReactNode;
  items: FaqItem[];
}

export interface IndustryClosing {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action: IndustryLink;
}

export interface IndustryPageContent {
  slug: string;
  /** Label used in the Solutions "By industry" nav column. */
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  hero: IndustryHeroContent;
  /** "Who it's for" tag row, between hero and benefits. */
  audience?: IndustryAudienceSection;
  benefits: IndustryBenefitsSection;
  /** "Old way vs. Keystone" contrast, between benefits and capabilities. */
  comparison?: IndustryComparisonSection;
  capabilities: IndustryCapabilitiesSection;
  /** Numbered "how it works" narrative, between capabilities and results. */
  journey?: IndustryJourneySection;
  stats: IndustryStatsSection;
  /** Case-study / proof rail. */
  testimonials: IndustryTestimonialsSection;
  /** "What's included" grid, between proof and resources. */
  included?: IndustryIncludedSection;
  resources: IndustryResourcesSection;
  faq: IndustryFaqSection;
  closing: IndustryClosing;
}

export interface IndustryPageTemplateProps {
  content: IndustryPageContent;
}

// ── Template ─────────────────────────────────────────────────────────────────

/**
 * The full body of an industry landing page, composed from design-system
 * sections and driven entirely by one `IndustryPageContent` object. Renders, in
 * order: a split hero, a benefits grid, a media + capability list, a results
 * stat band, a case-study rail, a resources card grid, an FAQ, and a full-bleed
 * green closing CTA. Mount it inside `InnerPageShell` (nav + footer + lead
 * capture). See spec 050.
 */
export function IndustryPageTemplate({ content }: IndustryPageTemplateProps) {
  const {
    hero,
    audience,
    benefits,
    comparison,
    capabilities,
    journey,
    stats,
    testimonials,
    included,
    resources,
    faq,
    closing,
  } = content;

  return (
    <main>
      <SplitHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        primary={hero.primary}
        secondary={hero.secondary}
        media={
          <SpotlightCard
            background={{ kind: 'image', src: hero.media.image, alt: hero.media.alt }}
            aspect={5 / 6}
            title={hero.media.statement}
            titleSize="sm"
            caption={hero.media.tagline}
          />
        }
      />

      {audience ? <IndustryAudiences section={audience} /> : null}

      <ContentSection
        eyebrow={benefits.eyebrow}
        title={benefits.title}
        centered
        ariaLabel="Why Keystone for your business"
      >
        <FeatureGrid items={benefits.items} />
      </ContentSection>

      {comparison ? <IndustryComparison section={comparison} /> : null}

      <ContentSection
        eyebrow={capabilities.eyebrow}
        title={capabilities.title}
        centered
        ariaLabel="What Keystone runs for you"
      >
        <MediaFeatureList
          media={<ServiceMedia image={capabilities.media.image} alt={capabilities.media.alt} />}
          panel={capabilities.panel}
          mediaSide={capabilities.mediaSide}
          features={capabilities.features}
        />
      </ContentSection>

      {journey ? (
        <ContentSection
          eyebrow={journey.eyebrow}
          title={journey.title}
          description={journey.description}
          centered
          ariaLabel="How Keystone works for you"
        >
          <ProcessSteps
            ariaLabel="How it works, step by step"
            steps={journey.steps.map((step) => ({
              id: step.id,
              eyebrow: step.eyebrow,
              title: step.title,
              description: step.description,
              media: <ServiceMedia image={step.image} alt={step.alt} />,
            }))}
          />
        </ContentSection>
      ) : null}

      <ContentSection
        tone="ink"
        eyebrow={stats.eyebrow}
        title={stats.title}
        centered
        ariaLabel="Results"
      >
        <StatStrip tone="ink" stats={stats.stats} />
      </ContentSection>

      <TestimonialCarousel
        title={testimonials.title}
        cards={testimonials.cards}
        ariaLabel="Customer results"
      />

      {included ? (
        <ContentSection
          eyebrow={included.eyebrow}
          title={included.title}
          description={included.description}
          centered
          ariaLabel="What's included"
        >
          <FeatureGrid items={included.items} />
        </ContentSection>
      ) : null}

      <ContentSection
        eyebrow={resources.eyebrow}
        title={resources.title}
        description={resources.description}
        centered
        ariaLabel="Resources"
      >
        <CardGrid columns={3}>
          {resources.items.map((item) => (
            <div key={item.href}>
              <SpotlightCard
                background={{ kind: 'image', src: item.image, alt: item.alt }}
                aspect={4 / 3}
                eyebrow={item.kind ?? 'Article'}
                title={item.title}
                titleSize="sm"
                href={item.href}
                external={item.external}
                affordance="arrow"
              />
            </div>
          ))}
        </CardGrid>
      </ContentSection>

      <ContentSection
        eyebrow={faq.eyebrow}
        title={faq.title}
        centered
        ariaLabel="Frequently asked questions"
      >
        <FaqAccordion items={faq.items} centered />
      </ContentSection>

      <CtaBand
        tone="accent"
        fullBleed
        eyebrow={closing.eyebrow}
        title={closing.title}
        description={closing.description}
        primary={closing.action}
      />
    </main>
  );
}
