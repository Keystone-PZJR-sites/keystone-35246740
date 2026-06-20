'use client';

/**
 * WorkShowcase — rasterized card gallery.
 *
 * Card visuals are exported WebP state pairs so decorative card typography and
 * mock UI chrome do not trigger Google font or image bursts during initial page
 * load. The live DOM remains responsible for section headings, category labels,
 * carousel semantics, and progressive loading behavior.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { log } from '@/lib/logger';
import { DESKTOP_MEDIA } from '@/design-system/tokens/breakpoints';
import { useNearViewport } from '@/lib/useNearViewport';

gsap.registerPlugin(ScrollTrigger);

// Cards per industry tab — used to map card index ↔ industry index.
const CARDS_PER_INDUSTRY = 5;
const CARD_CASCADE_DELAY_MS = 350;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WorkIndustry {
  id: string;
  label: string;
  activeColor: string;
  subLabels: string[];
  subLabelsColor: string;
  chipBg: string;
  chipText: string;
}

export interface HeadlinePart {
  text: string;
  oblique?: boolean;
}

export interface WorkCardVisual {
  defaultSrc: string;
  focusedSrc: string;
  /** Intrinsic 2x export width in pixels. Rendered at 50% CSS size. */
  width: number;
  /** Intrinsic 2x export height in pixels. Rendered at 50% CSS size. */
  height: number;
}

type WorkCardBase = {
  industryId: string;
  chipLabel: string;
  /** Rasterized default/focused card states for the production WorkShowcase. */
  visual: WorkCardVisual;
};

export type WorkCardType = 'sales' | 'ads' | 'social' | 'web' | 'content' | 'listings';

export type WorkCardData = WorkCardBase & {
  type: WorkCardType;
};

export interface WorkShowcaseProps {
  headlineParts: HeadlinePart[];
  industries: WorkIndustry[];
  cards: WorkCardData[];
  /** When true: skip GSAP + Embla, render all cards in a static scrollable grid for preview/testing */
  staticPreview?: boolean;
}

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

function Chip({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <div
      className="work-chip flex items-center justify-center whitespace-nowrap rounded-full"
      style={{
        backgroundColor: bg,
        paddingTop: '5px',
        paddingBottom: '4px',
        paddingLeft: '12px',
        paddingRight: '12px',
      }}
    >
      <span
        style={{
          fontFamily: "'FK Grotesk Mono', monospace",
          fontSize: '12px',
          lineHeight: '18px',
          color,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export interface RenderWorkCardOptions {
  focused?: boolean;
  showChip?: boolean;
  load?: boolean;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

function WorkShowcaseAssetCard({
  card,
  chipBg,
  chipText,
  focused = false,
  showChip = false,
  load = true,
  loading = 'lazy',
  fetchPriority = 'low',
}: {
  card: WorkCardData;
  chipBg: string;
  chipText: string;
} & RenderWorkCardOptions) {
  const visual = card.visual;

  const renderedWidth = visual.width / 2;
  const renderedHeight = visual.height / 2;

  return (
    <div className="work-card-wrapper work-asset-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      <div
        className="ws-scale-root work-asset-card-shell"
        style={{
          '--ws-natural-w': `${renderedWidth}px`,
          '--ws-natural-h': `${renderedHeight}px`,
        } as React.CSSProperties}
      >
        {load ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={visual.defaultSrc}
              alt=""
              width={visual.width}
              height={visual.height}
              loading={loading}
              decoding="async"
              fetchPriority={fetchPriority}
              className="work-asset-card-img work-asset-card-img-default"
              aria-hidden="true"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={visual.focusedSrc}
              alt=""
              width={visual.width}
              height={visual.height}
              loading={loading}
              decoding="async"
              fetchPriority={fetchPriority}
              className="work-asset-card-img work-asset-card-img-focused"
              data-visible={focused ? 'true' : 'false'}
              aria-hidden="true"
            />
          </>
        ) : (
          <div className="work-asset-card-placeholder" aria-hidden="true" />
        )}
      </div>
      <div
        className="work-chip-slot"
        data-visible={showChip ? 'true' : 'false'}
        aria-hidden={showChip ? undefined : 'true'}
      >
        <Chip label={card.chipLabel} bg={chipBg} color={chipText} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared card renderer — looks up chip colours from the matching
// `WorkIndustry` and renders the rasterized card state pair. Used by both the
// desktop carousel and `MobileWorkShowcase`, so visual definitions live in one
// place.
// ---------------------------------------------------------------------------

export function renderWorkCard(
  card: WorkCardData,
  industries: WorkIndustry[],
  key: string | number,
  options: RenderWorkCardOptions = {},
): React.ReactElement {
  const industry = industries.find((ind) => ind.id === card.industryId);
  const chipBg = industry?.chipBg ?? 'var(--color-work-muted,#cbc5b4)';
  const chipText = industry?.chipText ?? 'var(--color-work-text,#4f4d4a)';

  return (
    <WorkShowcaseAssetCard
      key={key}
      card={card}
      chipBg={chipBg}
      chipText={chipText}
      {...options}
    />
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function WorkShowcase({
  headlineParts,
  industries,
  cards,
  staticPreview,
}: WorkShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    dragFree: false,
    containScroll: false,
    duration: 50,
  });

  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);
  // Which card has the persistent "in-focus" (lifted + saturated) visual state.
  // Starts at 0 — Embla centers this card on first render.
  const [focusedCardIndex, setFocusedCardIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [loadedCardIndexes, setLoadedCardIndexes] = useState<Set<number>>(() => new Set());
  const autoScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoScrollingRef = useRef(false);
  const prefetchedSrcsRef = useRef<Set<string>>(new Set());

  // Refs for the 5 original cards of the first industry — used by the GSAP entrance animation.
  // Explicit refs avoid selecting Embla's prepended loop-clones which share the same class name.
  const initialCardRefs = useRef<(HTMLElement | null)[]>([null, null, null, null, null]);

  // Stable ref so the GSAP closure always calls the current startAutoScroll.
  const startAutoScrollRef = useRef<() => void>(() => {});

  const industryForCard = useCallback(
    (cardIndex: number) => Math.floor(cardIndex / CARDS_PER_INDUSTRY),
    [],
  );

  // WorkShowcase asset policy: the live HTML headline/tabs render immediately,
  // but rasterized card states stay as measured placeholders until the section
  // approaches the viewport. This removes the initial Google-font burst without
  // replacing it with a 50-image burst that can compete with the hero video.
  const isNear = useNearViewport(sectionRef, '-25% 0px');

  const markCardLoaded = useCallback((cardIndex: number) => {
    setLoadedCardIndexes((prev) => {
      if (prev.has(cardIndex)) return prev;
      const next = new Set(prev);
      next.add(cardIndex);
      return next;
    });
  }, []);

  const cardIndexesForCenteredLoopWindow = useCallback((industryIndex: number) => {
    const totalCards = cards.length;
    const firstCardIndex = industryIndex * CARDS_PER_INDUSTRY;
    const visualStartIndex = (firstCardIndex - 3 + totalCards) % totalCards;

    return Array.from({ length: CARDS_PER_INDUSTRY * 3 }, (_, offset) => (
      (visualStartIndex + offset) % totalCards
    ));
  }, [cards.length]);

  const cascadeLoadIndustryWindow = useCallback((industryIndex: number) => {
    if (!isNear) return () => {};

    const timers = cardIndexesForCenteredLoopWindow(industryIndex).map((cardIndex, order) => (
      globalThis.setTimeout(() => markCardLoaded(cardIndex), order * CARD_CASCADE_DELAY_MS)
    ));

    return () => timers.forEach((timer) => globalThis.clearTimeout(timer));
  }, [cardIndexesForCenteredLoopWindow, isNear, markCardLoaded]);

  const prefetchCardVisual = useCallback((visual: WorkCardVisual | undefined) => {
    if (!visual || typeof window === 'undefined') return;

    [visual.defaultSrc, visual.focusedSrc].forEach((src) => {
      if (prefetchedSrcsRef.current.has(src)) return;
      prefetchedSrcsRef.current.add(src);
      const img = new window.Image();
      img.decoding = 'async';
      img.src = src;
    });
  }, []);

  const shouldLoadCard = useCallback((cardIndex: number) => (
    isNear && loadedCardIndexes.has(cardIndex)
  ), [isNear, loadedCardIndexes]);

  useEffect(() => {
    return cascadeLoadIndustryWindow(activeIndustryIndex);
  }, [activeIndustryIndex, cascadeLoadIndustryWindow]);

  useEffect(() => {
    if (!isNear) return;

    const prefetchLoadedIndustries = () => {
      cards.forEach((card, index) => {
        if (shouldLoadCard(index)) {
          prefetchCardVisual(card.visual);
        }
      });
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetchLoadedIndustries, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }

    const id = globalThis.setTimeout(prefetchLoadedIndustries, 250);
    return () => globalThis.clearTimeout(id);
  }, [cards, isNear, prefetchCardVisual, shouldLoadCard]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimerRef.current !== null) {
      clearTimeout(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
    isAutoScrollingRef.current = false;
  }, []);

  const scheduleNextScroll = useCallback(() => {
    stopAutoScroll();
    autoScrollTimerRef.current = setTimeout(() => {
      if (!emblaApi) return;
      const currentIndex = emblaApi.selectedScrollSnap();
      const currentIndustry = industryForCard(currentIndex);
      const nextIndustry = (currentIndustry + 1) % industries.length;
      const nextCardIndex = nextIndustry * CARDS_PER_INDUSTRY;
      isAutoScrollingRef.current = true;
      setActiveIndustryIndex(nextIndustry);
      setFocusedCardIndex(nextCardIndex);
      emblaApi.scrollTo(nextCardIndex);
    }, 5000);
  }, [emblaApi, industries.length, industryForCard, stopAutoScroll]);

  const startAutoScroll = useCallback(() => {
    scheduleNextScroll();
  }, [scheduleNextScroll]);

  // Keep the ref current so the GSAP closure never goes stale.
  useEffect(() => { startAutoScrollRef.current = startAutoScroll; }, [startAutoScroll]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setActiveIndustryIndex(industryForCard(index));
    };

    const onSettle = () => {
      if (isAutoScrollingRef.current) {
        const index = emblaApi.selectedScrollSnap();
        setFocusedCardIndex(index);
        isAutoScrollingRef.current = false;
        scheduleNextScroll();
      }
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('settle', onSettle);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi, industryForCard, scheduleNextScroll]);

  useEffect(() => {
    return () => stopAutoScroll();
  }, [stopAutoScroll]);

  // Apply data-focused imperatively via slideNodes() so Embla's loop clones
  // (created via cloneNode) never inherit the focused state.
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.slideNodes().forEach((slide, i) => {
      slide.dataset.focused = i === focusedCardIndex ? 'true' : 'false';
    });
  }, [emblaApi, focusedCardIndex]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(`${DESKTOP_MEDIA} and (prefers-reduced-motion: no-preference)`, () => {
        const section = sectionRef.current;
        if (!section) return;

        // Only hide+offset the first 5 cards that will animate in.
        // Hiding all slides would also hide Embla's prepended loop-clones (copies
        // of the last category) which must be visible from the start so the loop
        // to the left works on first load.
        const initialCards = initialCardRefs.current.filter((el): el is HTMLElement => !!el);
        gsap.set(initialCards, { opacity: 0, y: 30 });

        // Spec 026: pin retired. The entrance plays once on viewport entry
        // (start: 'top 80%') via a direct ScrollTrigger; the visitor scrolls
        // freely through the section while the entrance is in progress.
        let played = false;

        ScrollTrigger.create({
          id: 'work-entrance',
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (played) return;
            played = true;
            log('work-entrance', 'ANIM_START', { cardCount: initialCards.length });
            gsap.to(initialCards, {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: 'power2.out',
              stagger: 0.3,
              onComplete: () => {
                // Only clear GSAP inline styles from the cards we actually animated.
                // Calling clearProps on Embla's loop-clone nodes removes their
                // Embla-injected transform, causing them to snap out of position.
                gsap.set(initialCards, { clearProps: 'opacity,y,transform' });
                startAutoScrollRef.current();
                log('work-entrance', 'ANIM_COMPLETE');
              },
            });
          },
        });
      });

      // Reduced motion: show all cards and start carousel on entry, no pin
      mm.add(`${DESKTOP_MEDIA} and (prefers-reduced-motion: reduce)`, () => {
        const section = sectionRef.current;
        if (!section) return;

        const allOriginals = Array.from(
          section.querySelectorAll('.work-card-item'),
        ) as HTMLElement[];
        gsap.set(allOriginals, { clearProps: 'all' });

        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => startAutoScrollRef.current(),
        });
      });

      // No mobile branch — MobileWorkShowcase (Spec 023) renders below 985px
      // and the desktop section is `hidden md:block`. A ScrollTrigger pinning
      // a display:none element would create zero-height trigger zones and
      // race with Embla measurements.
    }, sectionRef);

    return () => ctx.revert();
    // Pin setup is intentionally mount-only; all callbacks access state via
    // stable refs (startAutoScrollRef, initialCardRefs) to avoid stale closures.
  }, []);

  const handleCategoryClick = useCallback(
    (industryIndex: number) => {
      if (!emblaApi) return;
      stopAutoScroll();
      const firstCardIndex = industryIndex * CARDS_PER_INDUSTRY;
      emblaApi.scrollTo(firstCardIndex);
      setActiveIndustryIndex(industryIndex);
      setFocusedCardIndex(firstCardIndex);
      isAutoScrollingRef.current = true;
    },
    [emblaApi, stopAutoScroll],
  );

  const handleCardClick = useCallback(
    (cardIndex: number) => {
      if (!emblaApi) return;
      stopAutoScroll();
      emblaApi.scrollTo(cardIndex);
      setActiveIndustryIndex(industryForCard(cardIndex));
      setFocusedCardIndex(cardIndex);
    },
    [emblaApi, stopAutoScroll, industryForCard],
  );

  const handleCarouselMouseEnter = useCallback(() => {
    stopAutoScroll();
  }, [stopAutoScroll]);

  const handleCarouselMouseLeave = useCallback(() => {
    if (!emblaApi) return;
    scheduleNextScroll();
  }, [emblaApi, scheduleNextScroll]);

  const activeIndustry = industries[activeIndustryIndex];

  const renderCard = (
    card: WorkCardData,
    index: number,
    options: RenderWorkCardOptions = {},
  ) => renderWorkCard(card, industries, index, options);

  const categoryBar = (
    <div className="flex-shrink-0 flex flex-col items-center gap-4 w-full px-6">
      <div
        className="flex items-end"
        style={{ gap: 'clamp(8px, 1.65vw, 24px)' }}
      >
        {industries.map((industry, i) => (
          <button
            key={industry.id}
            className="work-category-btn uppercase leading-[0.82] whitespace-nowrap"
            data-active={i === activeIndustryIndex ? 'true' : 'false'}
            style={{
              fontFamily: "'FK Screamer', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(18px, 3.45vw, 50px)',
              ...(i === activeIndustryIndex ? { color: industry.activeColor } : undefined),
            }}
            onClick={() => handleCategoryClick(i)}
            aria-pressed={i === activeIndustryIndex}
          >
            {industry.label}
          </button>
        ))}
      </div>
      <div className="flex items-baseline gap-[8px]">
        {activeIndustry?.subLabels.map((label, i) => (
          <span key={i} className="flex items-baseline gap-[8px]">
            {i > 0 && (
              <span
                style={{
                  color: activeIndustry.subLabelsColor,
                  fontFamily: "'FK Grotesk Mono', monospace",
                  fontSize: '16px',
                  letterSpacing: '-0.32px',
                }}
              >
                •
              </span>
            )}
            <span
              style={{
                color: activeIndustry.subLabelsColor,
                fontFamily: "'FK Grotesk Mono', monospace",
                fontSize: '18px',
                letterSpacing: '-0.36px',
              }}
            >
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );

  // ── Static preview mode (no GSAP, no Embla) ─────────────────────────────
  if (staticPreview) {
    return (
      <div style={{ backgroundColor: 'var(--color-bg-primary,#f0eee6)', padding: '40px 24px' }}>
        {industries.map((industry, industryIdx) => {
          const industryCards = cards.filter((c) => c.industryId === industry.id);
          return (
            <div key={industry.id} style={{ marginBottom: '80px' }}>
              <h2
                style={{
                  fontFamily: "'FK Screamer', sans-serif",
                  fontSize: '36px',
                  color: industry.activeColor,
                  marginBottom: '24px',
                  letterSpacing: '-0.5px',
                }}
              >
                {industry.label}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start' }}>
                {industryCards.map((card, i) => (
                  <div key={i} style={{ flexShrink: 0 }}>
                    {renderCard(card, industryIdx * CARDS_PER_INDUSTRY + i, {
                      focused: true,
                      showChip: true,
                      load: true,
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      // hidden md:block — below 985px, MobileWorkShowcase (Spec 023) takes
      // over with a per-industry strip layout. The desktop section here
      // assumes ScrollSmoother + Embla + GSAP entrance, none of which suit
      // a touch device.
      // Section sizing: content-driven (see styles/sections/work-showcase.css
      // and docs/explainers/responsive.md § Section Heights). The headline,
      // category bar, and carousel stack in normal flow with --section-
      // padding-y outside the group and an equal flex gap between each
      // pair, so the inter-element rhythm matches the section's outer
      // breathing room.
      className="work-showcase-section hidden md:flex relative w-full overflow-hidden flex-col"
      style={{ backgroundColor: 'var(--color-bg-primary,#f0eee6)' }}
    >
      {/* Section headline — centered, max-width constrained and balanced so the
          browser, not a hard split, chooses the two-line wrap point. */}
      <div className="pointer-events-none flex justify-center w-full flex-shrink-0 px-6">
        <p
          className="text-center"
          style={{
            fontFamily: "'FK Roman Standard', serif",
            fontWeight: 500,
            fontSize: 'clamp(32px, 2.9vw, 40px)',
            lineHeight: '1.05',
            color: 'var(--color-work-text,#4f4d4a)',
            letterSpacing: '-0.04em',
            maxWidth: '960px',
            textWrap: 'balance',
          }}
        >
          {headlineParts.map((part, i) =>
            part.oblique ? (
              <span key={i} style={{ fontStyle: 'oblique' }}>
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
      </div>

      {/* Category bar + sub-labels — on desktop this now sits between the
          headline and the work examples. The bar's font-size and gap clamp
          together so long category names stay on one line across desktop. */}
      {categoryBar}

      {/* Carousel — sits in normal flow below the headline and category bar.
          The section's flex gap separates it from each.
          flex-1 is now a no-op (the section is content-driven) but is
          left in place so a future floor opt-in would keep the existing
          centring behaviour without churn. */}
      <div
        className="flex-1 flex items-center w-full"
        onMouseEnter={handleCarouselMouseEnter}
        onMouseLeave={handleCarouselMouseLeave}
      >
        <div
          ref={emblaRef}
          className="w-full"
          style={{ overflowX: 'clip', overflowY: 'visible' }}
        >
          <div
            className="flex items-start"
            style={{ paddingRight: '24px' }}
          >
            {cards.map((card, i) => {
              const isVisualFocused = focusedCardIndex === i || hoveredCardIndex === i;
              const shouldLoad = shouldLoadCard(i);
              return (
              <button
                key={i}
                type="button"
                className="work-card-item shrink-0"
                data-focused={isVisualFocused ? 'true' : 'false'}
                ref={i < 5 ? (el) => { initialCardRefs.current[i] = el; } : undefined}
                onClick={() => handleCardClick(i)}
                onMouseEnter={() => setHoveredCardIndex(i)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                onFocus={() => setHoveredCardIndex(i)}
                onBlur={() => setHoveredCardIndex(null)}
                aria-label={`Show case study ${i + 1} of ${cards.length}`}
                aria-current={i === focusedCardIndex ? 'true' : undefined}
              >
                {renderCard(card, i, {
                  focused: isVisualFocused,
                  showChip: isVisualFocused,
                  load: shouldLoad,
                })}
              </button>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
