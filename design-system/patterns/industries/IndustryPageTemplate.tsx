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
  benefits: IndustryBenefitsSection;
  capabilities: IndustryCapabilitiesSection;
  stats: IndustryStatsSection;
  /** Case-study / proof rail. */
  testimonials: IndustryTestimonialsSection;
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
  const { hero, benefits, capabilities, stats, testimonials, resources, faq, closing } = content;

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

      <ContentSection
        eyebrow={benefits.eyebrow}
        title={benefits.title}
        centered
        ariaLabel="Why Keystone for your industry"
      >
        <FeatureGrid items={benefits.items} />
      </ContentSection>

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
