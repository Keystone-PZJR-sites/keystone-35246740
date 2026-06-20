'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowNarrowRight } from '@untitledui/icons';
import { log } from '@/lib/logger';
import { useEmblaWithIndex } from '@/lib/useEmblaWithIndex';
import { useGetInTouchCta } from '@/design-system/hooks/useGetInTouchCta';
import { DESKTOP_MEDIA } from '@/design-system/tokens/breakpoints';

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
  getStartedHref?: string;
  cards: ValuePropCard[];
}

// ── Desktop component (md: and above) ────────────────────────────────────────

/**
 * Value Props section — desktop layout (≥985px).
 *
 * Opts into a `min-height: 100svh` floor (the site-wide default is
 * content-driven; see `docs/explainers/responsive.md` § Section Heights).
 * The cards' interior (video panel, copy panel) is absolutely positioned
 * at percentages of card height, so the cards collapse to their min-height
 * (~400 px) without a definite section height — that's a meaningful
 * visual regression vs. the Figma intent. The header row sits at the
 * top, the cards row centers below it, and standard breathing room
 * separates each from the section edges.
 *
 * Hidden below 985px — MobileValueProps takes over there.
 */
export function ValueProps({
  headlinePreamble,
  headlineItalic,
  headlineSuffix = '.',
  learnMoreLabel,
  getStartedLabel,
  getStartedHref = '/portal',
  cards,
}: ValuePropsProps) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const { onGetInTouchClick } = useGetInTouchCta();
  const [isLearnMoreHovered, setIsLearnMoreHovered] = useState(false);
  const [isGetStartedHovered, setIsGetStartedHovered] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(`${DESKTOP_MEDIA} and (prefers-reduced-motion: no-preference)`, () => {
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
            <button
              type="button"
              className="vp-cta-learn-more"
              onMouseEnter={() => setIsLearnMoreHovered(true)}
              onMouseLeave={() => setIsLearnMoreHovered(false)}
              onClick={onGetInTouchClick}
              style={{
                borderRadius: isLearnMoreHovered ? '24px' : '0px',
                transition: 'color .16s ease-in-out, background-color .16s ease-in-out, border-radius .16s ease-in-out',
              }}
            >
              {learnMoreLabel}
            </button>
            <button
              type="button"
              className="vp-cta-get-started"
              onMouseEnter={() => setIsGetStartedHovered(true)}
              onMouseLeave={() => setIsGetStartedHovered(false)}
              onClick={() => router.push(getStartedHref)}
              style={{
                borderRadius: isGetStartedHovered ? '0px' : '24px',
                transition: 'color .16s ease-in-out, background-color .16s ease-in-out, border-radius .16s ease-in-out',
              }}
            >
              {getStartedLabel}
              <span className="vp-cta-arrow" aria-hidden="true">
                <span
                  className="vp-cta-arrow-slide vp-cta-arrow-slide-current"
                  style={{
                    transform: isGetStartedHovered ? 'translateX(100%)' : 'translateX(0%)',
                  }}
                >
                  <ArrowNarrowRight size={16} color="var(--color-hero-text,#f0eee6)" />
                </span>
                <span
                  className="vp-cta-arrow-slide vp-cta-arrow-slide-next"
                  style={{
                    transform: isGetStartedHovered ? 'translateX(0%)' : 'translateX(-100%)',
                  }}
                >
                  <ArrowNarrowRight size={16} color="var(--color-hero-text,#f0eee6)" />
                </span>
              </span>
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
                    muted
                    loop
                    playsInline
                    preload="none"
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

// ── Mobile component (below 985px) ───────────────────────────────────────────

export interface MobileValuePropsProps {
  headlineLine1: string;
  headlineLine2: string;
  cards: ValuePropCard[];
}

/**
 * Value Props section — mobile carousel layout (<985px).
 *
 * Opts into `min-height: 100svh` (site-wide default is content-driven;
 * see `docs/explainers/responsive.md` § Section Heights). The carousel
 * viewport uses `flex: 1` to absorb the remaining space under the
 * header; without a definite section height that flex child resolves to
 * 0 and the carousel renders as a blank strip. Headline at the top with
 * the standard breathing room; the carousel viewport fills below.
 *
 * Hidden at 985px and above — the desktop ValueProps component takes over.
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
                    muted
                    loop
                    playsInline
                    preload="none"
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
