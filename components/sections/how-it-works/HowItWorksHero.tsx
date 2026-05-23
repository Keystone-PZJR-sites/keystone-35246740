'use client';

import Image from 'next/image';
import { ArrowNarrowRight } from '@untitledui/icons';
import { useEmblaWithIndex } from '@/lib/useEmblaWithIndex';
import { useGetInTouchCta } from '@/components/sections/useGetInTouchCta';
import { HowItWorksPill } from './HowItWorksPill';
import type {
  HowItWorksHeroPill,
  HowItWorksHeroSlide,
} from '@/data/how-it-works';

interface HowItWorksHeroProps {
  headline: string;
  supportingCopy: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  pills: HowItWorksHeroPill[];
  slides: HowItWorksHeroSlide[];
}

export function HowItWorksHero({
  headline,
  supportingCopy,
  primaryCtaLabel,
  secondaryCtaLabel,
  pills,
  slides,
}: HowItWorksHeroProps) {
  const { href: getInTouchHref, onGetInTouchClick } = useGetInTouchCta();
  const { emblaRef, activeIndex, scrollTo } = useEmblaWithIndex({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
  });

  return (
    <section className="hiw-hero-section" aria-labelledby="hiw-hero-title">
      <div className="hiw-hero-grid">
        <div className="hiw-hero-copy">
          <h2 id="hiw-hero-title" className="hiw-hero-title">
            {headline}
          </h2>
          <p className="hiw-hero-supporting-copy">{supportingCopy}</p>

          <div className="hiw-hero-cta-row">
            <a
              href={getInTouchHref}
              onClick={onGetInTouchClick}
              className="hiw-hero-cta-primary"
            >
              {primaryCtaLabel}
              <ArrowNarrowRight size={16} />
            </a>
            <a href="/portal" className="hiw-hero-cta-secondary">
              {secondaryCtaLabel}
            </a>
          </div>
        </div>

        <div className="hiw-hero-media-shell">
          <div className="hiw-hero-pill-cluster" role="tablist" aria-label="How it works modules">
            {pills.map((pill, index) => (
              <HowItWorksPill
                key={pill.id}
                label={pill.label}
                bg={pill.bg}
                text={pill.text}
                active={index === activeIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>

          <div
            ref={emblaRef}
            className="hiw-hero-carousel-viewport"
            role="region"
            aria-label="How it works hero examples carousel"
          >
            <ul className="hiw-hero-carousel-container">
              {slides.map((slide) => (
                <li key={slide.id} className="hiw-hero-carousel-slide">
                  <div className="hiw-hero-carousel-image-shell">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      width={slide.width}
                      height={slide.height}
                      className="hiw-hero-carousel-image"
                      unoptimized
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {slides.length > 1 && (
            <div className="hiw-hero-carousel-controls">
              <p className="hiw-hero-carousel-progress" aria-live="polite">
                {activeIndex + 1} / {slides.length}
              </p>
              <button
                type="button"
                className="hiw-carousel-control"
                onClick={() => {
                  const nextIndex = activeIndex + 1 >= slides.length ? 0 : activeIndex + 1;
                  scrollTo(nextIndex);
                }}
                aria-label="Next hero example"
              >
                <ArrowNarrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
