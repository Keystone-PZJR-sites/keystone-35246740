'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createSectionPin, logSectionEvent } from '@/lib/sectionPin';
import { useLeadCapture } from './LeadCaptureModal';

gsap.registerPlugin(ScrollTrigger);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ValuePropCard {
  id: string;
  /** Path to the looping background video. */
  videoSrc: string;
  /**
   * Optional CSS left offset for manually cropping a landscape video into the
   * portrait card. When omitted the video fills the container via object-fit.
   * Only set these once the final video assets are in place.
   */
  videoLeft?: string;
  /** Optional CSS width override — pair with videoLeft for manual crop. */
  videoWidth?: string;
  /** Optional CSS height override (default "100%"). */
  videoHeight?: string;
  /** Background color of the lower colored panel. */
  cardBg: string;
  /** Color for the headline and body copy. */
  textColor: string;
  /** Headline text — rendered in FK Screamer uppercase. */
  headline: string;
  /** Body copy. */
  copy: string;
}

export interface ValuePropsProps {
  /**
   * The leading portion of the section headline, up to and including the space
   * before the italic word. E.g. "Not an agency. Not software. Something ".
   */
  headlinePreamble: string;
  /** The italic word in the headline. E.g. "better". */
  headlineItalic: string;
  /** Text following the italic word. E.g. ".". */
  headlineSuffix?: string;
  learnMoreLabel: string;
  getStartedLabel: string;
  cards: ValuePropCard[];
}

// ── Desktop component (md: and above) ────────────────────────────────────────

/**
 * Value Props section — desktop layout (≥768px).
 *
 * Full-viewport pinned section (h-screen) on a warm cream background. Three
 * value-proposition cards sit side-by-side; each has a looping video on top
 * and a distinctively-coloured shaped panel below. The section pins at the top
 * of the viewport while its entrance animation plays, matching the standard
 * scroll-state-machine behaviour used by every other full-screen section.
 *
 * Hidden below 768px — MobileValueProps takes over there.
 */
export function ValueProps({
  headlinePreamble,
  headlineItalic,
  headlineSuffix = '.',
  learnMoreLabel,
  getStartedLabel,
  cards,
}: ValuePropsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const { openModal } = useLeadCapture();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const section = sectionRef.current;
        if (!section) return;

        const els = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
        if (!els.length) return;

        // Start hidden so entrance plays on section entry.
        gsap.set(els, { y: 60, opacity: 0 });

        let played = false;
        let animComplete = false;

        const playEntrance = () => {
          logSectionEvent('value-props-pin', 'ANIM_ENTER_CALLED', { played });
          if (played) return;
          played = true;
          logSectionEvent('value-props-pin', 'ANIM_START', { cardCount: els.length });

          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.12,
            onComplete: () => {
              gsap.set(els, { clearProps: 'y,opacity,transform' });
              animComplete = true;
              logSectionEvent('value-props-pin', 'ANIM_COMPLETE');
            },
          });
        };

        createSectionPin({
          id: 'value-props-pin',
          section,
          onEnter: playEntrance,
          isAnimComplete: () => animComplete,
        });
      });

      // Reduced motion: skip animation, still pin the section so the visitor
      // experiences the same scroll rhythm as the rest of the page.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: reduce)', () => {
        const section = sectionRef.current;
        if (!section) return;

        createSectionPin({
          id: 'value-props-pin',
          section,
          onEnter: () => {},
          isAnimComplete: () => true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="vp-section hidden md:block"
      aria-labelledby="vp-headline"
    >
      {/* Header row */}
      <div className="vp-header">
        <p id="vp-headline" className="vp-headline">
          {headlinePreamble}
          <em>{headlineItalic}</em>
          {headlineSuffix}
        </p>
        <div className="vp-cta-bubble" aria-label="Page actions">
          <button type="button" className="vp-cta-learn-more"
            onClick={(e) => openModal(e.currentTarget)}
          >
            {learnMoreLabel}
          </button>
          <button type="button" className="vp-cta-get-started"
            onClick={(e) => openModal(e.currentTarget)}
          >
            {getStartedLabel}
            {/* Right-arrow icon — 16×16, inline SVG */}
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="vp-cta-arrow"
            >
              <path
                d="M13.854 8.354l-4.5 4.5a.5.5 0 01-.708-.708L12.293 8.5H2.5a.5.5 0 010-1h9.793L8.646 3.854a.5.5 0 11.708-.708l4.5 4.5a.5.5 0 010 .708z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards row */}
      <div className="vp-cards-row">
        {cards.map((card, i) => (
          <div
            key={card.id}
            ref={el => { cardRefs.current[i] = el; }}
            className="vp-card"
          >
            {/* Video panel — rounded top corners */}
            <div className="vp-card-video-wrap">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                className="vp-card-video"
                style={card.videoLeft ? {
                  left: card.videoLeft,
                  width: card.videoWidth,
                  height: card.videoHeight ?? '100%',
                } : undefined}
              >
                <source src={card.videoSrc} type="video/mp4" />
              </video>
            </div>

            {/* Colored panel — diagonal notch at top-left */}
            <div
              className="vp-card-panel"
              style={{ backgroundColor: card.cardBg }}
            >
              <p
                className="vp-card-headline"
                style={{ color: card.textColor }}
              >
                {card.headline}
              </p>
              <p
                className="vp-card-copy"
                style={{ color: card.textColor }}
              >
                {card.copy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Mobile component (below 768px) ───────────────────────────────────────────

export interface MobileValuePropsProps {
  headlineLine1: string;
  headlineLine2: string;
  cards: ValuePropCard[];
}

/**
 * Value Props section — mobile carousel layout (<768px).
 *
 * An Embla carousel showing the active card elevated above its neighbours via
 * `translateY`, matching the WorkShowcase desktop interaction pattern. The
 * active card carries `data-focused="true"` so CSS handles the lift purely
 * through a transition — no GSAP needed on mobile.
 *
 * No scroll-triggered entrance animation — the section appears immediately as
 * the visitor scrolls to it, per the mobile experience model (Spec 015).
 *
 * Hidden at 768px and above — the desktop ValueProps component takes over.
 */
export function MobileValueProps({
  headlineLine1,
  headlineLine2,
  cards,
}: MobileValuePropsProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  // Pin the section at full viewport height so the carousel gets the same
  // scroll-dwell treatment as every other section on the page.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(max-width: 767px)', () => {
        const section = sectionRef.current;
        if (!section) return;

        createSectionPin({
          id: 'mobile-value-props-pin',
          section,
          onEnter: () => {},
          isAnimComplete: () => true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mvp-section md:hidden" aria-label="Why Keystone">
      {/* Section headline */}
      <div className="mvp-header">
        <p className="mvp-headline">
          <span className="mvp-headline-line1">{headlineLine1}</span>
          <em className="mvp-headline-line2">{headlineLine2}</em>
        </p>
        <div className="mvp-divider" aria-hidden="true" />
      </div>

      {/* Embla carousel — active card is lifted via data-focused CSS.
          Each slide is a <button> so keyboard users can advance the carousel
          by tabbing through cards and pressing Enter/Space. The active slide
          stays in the tab order but its handler is a no-op (Embla pagination
          dots / drag gesture cover the "advance from active" case). */}
      <div className="mvp-carousel-viewport" ref={emblaRef}>
        <ul className="mvp-carousel-container">
          {cards.map((card, i) => (
            <li key={card.id} className="mvp-slide-item">
            <button
              type="button"
              className="mvp-slide"
              data-focused={i === activeIndex ? 'true' : 'false'}
              aria-label={`${i + 1} of ${cards.length}: ${card.headline}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              onClick={() => {
                if (emblaApi && i !== activeIndex) emblaApi.scrollTo(i);
              }}
            >
              {/* Video panel */}
              <div className="mvp-slide-video-wrap">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  className="mvp-slide-video"
                  style={card.videoLeft ? {
                    left: card.videoLeft,
                    width: card.videoWidth,
                    height: card.videoHeight ?? '100%',
                  } : undefined}
                >
                  <source src={card.videoSrc} type="video/mp4" />
                </video>
              </div>

              {/* Colored panel */}
              <div
                className="mvp-slide-panel"
                style={{ backgroundColor: card.cardBg }}
              >
                <p
                  className="mvp-slide-headline"
                  style={{ color: card.textColor }}
                >
                  {card.headline}
                </p>
                <p
                  className="mvp-slide-copy"
                  style={{ color: card.textColor }}
                >
                  {card.copy}
                </p>
              </div>
            </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
