'use client';

import Image from 'next/image';
import { ArrowNarrowLeft, ArrowNarrowRight } from '@untitledui/icons';
import { Card } from '@/design-system/primitives/Card';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { Button } from '@/design-system/primitives/Button';
import { useEmblaWithIndex } from '@/lib/useEmblaWithIndex';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TestimonialResult {
  /** Oversized value, e.g. "+54%". */
  value: string;
  /** Short label beneath the value. */
  label: string;
}

export interface TestimonialAction {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * One proof card: a declarative statement backed by up to two KPIs (and an
 * optional action) beside a supporting photo that fills one side of the card.
 * Not a case study — no attribution, no quotation.
 */
export interface TestimonialCard {
  id: string;
  statement: string;
  /** Supporting photo, filling one side of the card. */
  image: string;
  alt: string;
  results?: TestimonialResult[];
  action?: TestimonialAction;
}

export interface TestimonialCarouselProps {
  /** Section title — rendered in the display face. */
  title: React.ReactNode;
  cards: TestimonialCard[];
  /** Accessible name for the carousel region. */
  ariaLabel?: string;
}

// ── Card ──────────────────────────────────────────────────────────────────────

function ProofCard({ card }: { card: TestimonialCard }) {
  return (
    <Card tone="cream" radius="panel" padded={false} className="ks-trail__card">
      <div className="ks-trail__card-body">
        <Text variant="bodyLg" tone="primary" className="ks-trail__statement">
          {card.statement}
        </Text>
        {card.action ? (
          <Button
            variant="primary"
            size="sm"
            href={card.action.href}
            external={card.action.external}
            withArrow
            className="ks-trail__action"
          >
            {card.action.label}
          </Button>
        ) : null}
        {card.results && card.results.length > 0 ? (
          <div className="ks-trail__results">
            {card.results.map((result) => (
              <div key={result.label} className="ks-trail__result">
                <span className="ks-trail__result-value">{result.value}</span>
                <span className="ks-trail__result-label">{result.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="ks-trail__card-media">
        <Image
          fill
          src={card.image}
          alt={card.alt}
          className="ks-trail__card-img"
          sizes="(max-width: 768px) 90vw, 420px"
        />
      </div>
    </Card>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────

/**
 * A horizontally scrollable rail of proof cards. Each card pairs a declarative
 * statement and a results / KPI row (no attribution) with a supporting photo
 * filling one side. A left title sits opposite previous / next buttons. Uses the
 * shared Embla hook the site's other rails use, so reduced motion snaps without
 * animation. See specs 037 and 046.
 */
export function TestimonialCarousel({ title, cards, ariaLabel }: TestimonialCarouselProps) {
  const { emblaRef, emblaApi } = useEmblaWithIndex({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  return (
    <section className="ks-trail" aria-roledescription="carousel" aria-label={ariaLabel}>
      <div className="ks-trail__head">
        <Heading level={2} size="lg" tone="primary">
          {title}
        </Heading>
        <div className="ks-trail__nav">
          <button
            type="button"
            className="ks-trail__arrow"
            aria-label="Previous testimonials"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ArrowNarrowLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="ks-trail__arrow"
            aria-label="Next testimonials"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ArrowNarrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="ks-trail__viewport" ref={emblaRef}>
        <ul className="ks-trail__container">
          {cards.map((card) => (
            <li key={card.id} className="ks-trail__slide" aria-roledescription="slide">
              <ProofCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
