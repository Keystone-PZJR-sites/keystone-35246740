'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { log } from '@/lib/logger';
import { useEmblaWithIndex } from '@/lib/useEmblaWithIndex';
import { useLeadCapture } from './LeadCaptureModal';

gsap.registerPlugin(ScrollTrigger);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ValuePropCard {
  id: string;
  /**
   * Path to a static image shown in the top panel of the card.
   * When set, takes precedence over videoSrc.
   */
  imageSrc?: string;
  /** Path to the looping background video (used when imageSrc is absent). */
  videoSrc?: string;
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
 * Spec 026 retired the pin: the section now sizes to its content, with a
 * `min-height: 100svh` floor so it still fills the visible viewport on tall
 * windows. The header row sits at the top, the cards row centers below it,
 * and standard breathing room separates each from the section edges.
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

        gsap.set(els, { y: 60, opacity: 0 });

        let played = false;

        ScrollTrigger.create({
          id: 'value-props-entrance',
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (played) return;
            played = true;
            log('value-props-entrance', 'ANIM_START', { cardCount: els.length });

            gsap.to(els, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.12,
              onComplete: () => {
                gsap.set(els, { clearProps: 'y,opacity,transform' });
                log('value-props-entrance', 'ANIM_COMPLETE');
              },
            });
          },
        });
      });

      // Reduced motion: nothing to do — cards render in their final state by
      // default; the entrance only ever set `y: 60, opacity: 0` inside the
      // motion branch.
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="vp-section hidden md:block"
      aria-labelledby="vp-headline"
    >
      <div className="vp-inner">
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
              {/* Media panel — rounded top corners */}
              <div className="vp-card-video-wrap">
                {card.imageSrc ? (
                  <Image
                    fill
                    src={card.imageSrc}
                    alt=""
                    aria-hidden="true"
                    className="vp-card-video"
                  />
                ) : (
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
                )}
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
 * Spec 026: not pinned. Section is at least one viewport tall (min-height:
 * 100svh) but grows if the carousel needs more room. Headline at the top
 * with the standard breathing room; the carousel viewport fills below.
 *
 * Hidden at 768px and above — the desktop ValueProps component takes over.
 */
export function MobileValueProps({
  headlineLine1,
  headlineLine2,
  cards,
}: MobileValuePropsProps) {
  const { emblaRef, activeIndex, scrollTo } = useEmblaWithIndex({
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
  });

  return (
    <section className="mvp-section md:hidden" aria-label="Why Keystone">
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
          by tabbing through cards and pressing Enter/Space. */}
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
                if (i !== activeIndex) scrollTo(i);
              }}
            >
              {/* Media panel */}
              <div className="mvp-slide-video-wrap">
                {card.imageSrc ? (
                  <Image
                    fill
                    src={card.imageSrc}
                    alt=""
                    aria-hidden="true"
                    className="mvp-slide-video"
                  />
                ) : (
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
                )}
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
