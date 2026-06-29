import type { ReactNode } from 'react';
import {
  SplitHero,
  ContentSection,
  MediaFeatureList,
  type MediaFeatureItem,
  FaqAccordion,
  type FaqItem,
  TestimonialCarousel,
  type TestimonialCard,
  CtaBand,
} from '@/design-system/sections';
import {
  SpotlightCard,
  type SpotlightBackground,
  CardGrid,
  CardGridItem,
} from '@/design-system/components';
import { ServiceMedia } from './ServiceMedia';
import { BentoMock, type BentoMockKind } from './BentoMocks';

// ── Content model ─────────────────────────────────────────────────────────────

export interface ServiceLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ServiceHeroContent {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  primary?: ServiceLink;
  secondary?: ServiceLink;
  /** The media card beside the copy. */
  media: {
    image: string;
    alt: string;
    /** Deliverables line — short statements summarizing what's delivered. */
    statement: string;
    /** Brand tagline punch, e.g. "Social Media, Optimized." */
    tagline: string;
  };
}

export interface ServiceFeatureSection {
  eyebrow?: string;
  title: ReactNode;
  media: { image: string; alt: string };
  mediaSide?: 'start' | 'end';
  features: MediaFeatureItem[];
}

export interface ServiceBentoTile {
  id: string;
  background: SpotlightBackground;
  eyebrow?: string;
  title?: ReactNode;
  caption?: string;
  /** A small product mock framed inside the tile. */
  mock?: BentoMockKind;
  /** Columns the tile spans at desktop. Default 1. */
  colSpan?: number;
  /** Fixed aspect ratio (width / height) — e.g. a wide banner photo tile. */
  aspect?: number;
}

export interface ServiceBentoSection {
  eyebrow?: string;
  title: ReactNode;
  columns?: 2 | 3 | 4 | 6;
  tiles: ServiceBentoTile[];
}

export interface ServiceFaqSection {
  eyebrow?: string;
  title?: ReactNode;
  items: FaqItem[];
}

export interface ServiceTestimonialsSection {
  title: ReactNode;
  cards: TestimonialCard[];
}

export interface ServiceClosing {
  title: ReactNode;
  action: ServiceLink;
}

export interface ServicePageContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: ServiceHeroContent;
  featureSection: ServiceFeatureSection;
  bento: ServiceBentoSection;
  faq: ServiceFaqSection;
  testimonials: ServiceTestimonialsSection;
  closing: ServiceClosing;
}

export interface ServicePageTemplateProps {
  content: ServicePageContent;
}

// ── Template ─────────────────────────────────────────────────────────────────

/**
 * The full body of a service detail page, composed from design-system sections
 * and driven entirely by one `ServicePageContent` object. Renders, in order: a
 * split hero, a media + feature-list section, a feature bento (spec 036), an
 * FAQ, a testimonial rail, and a full-bleed green closing CTA. Mount it inside
 * `InnerPageShell` (nav + footer + lead capture). See spec 037.
 */
export function ServicePageTemplate({ content }: ServicePageTemplateProps) {
  const { hero, featureSection, bento, faq, testimonials, closing } = content;

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
            className="ks-svc-hero-card"
          />
        }
      />

      <ContentSection
        eyebrow={featureSection.eyebrow}
        title={featureSection.title}
        centered
        ariaLabel="What you get"
      >
        <MediaFeatureList
          media={<ServiceMedia image={featureSection.media.image} alt={featureSection.media.alt} />}
          mediaSide={featureSection.mediaSide}
          features={featureSection.features}
        />
      </ContentSection>

      <ContentSection
        eyebrow={bento.eyebrow}
        title={bento.title}
        centered
        ariaLabel="How it grows your business"
      >
        <CardGrid columns={bento.columns ?? 2} className="ks-svc-bento">
          {bento.tiles.map((tile) => {
            const card = (
              <SpotlightCard
                background={tile.background}
                aspect={tile.aspect}
                eyebrow={tile.eyebrow}
                title={tile.title}
                caption={tile.caption}
                align="bottom"
              >
                {tile.mock ? <BentoMock kind={tile.mock} /> : undefined}
              </SpotlightCard>
            );
            return tile.colSpan && tile.colSpan > 1 ? (
              <CardGridItem key={tile.id} colSpan={tile.colSpan}>
                {card}
              </CardGridItem>
            ) : (
              <div key={tile.id}>{card}</div>
            );
          })}
        </CardGrid>
      </ContentSection>

      <ContentSection
        eyebrow={faq.eyebrow}
        title={faq.title}
        centered
        ariaLabel="Frequently asked questions"
      >
        <div className="ks-svc-faq">
          <FaqAccordion items={faq.items} />
        </div>
      </ContentSection>

      <TestimonialCarousel
        title={testimonials.title}
        cards={testimonials.cards}
        ariaLabel="What our clients say"
      />

      <CtaBand
        tone="accent"
        fullBleed
        title={closing.title}
        primary={closing.action}
      />
    </main>
  );
}
