'use client';

/**
 * MobileWorkShowcase — Spec 023.
 *
 * Mobile counterpart to the desktop `WorkShowcase`. Below 768px the desktop
 * section is hidden and this component takes over: five vertically-stacked
 * industry strips, each with its own horizontally-swipeable Embla carousel.
 *
 * Section sizing: this section's content (five stacked industry strips)
 * naturally exceeds one viewport, so it neither needs nor opts into a
 * `min-height: 100svh` floor. See `docs/explainers/responsive.md`
 * § Section Heights for the site-wide policy, and Spec 015 (Mobile
 * Experience Model) + Spec 023 for the layout rationale specific to
 * this section.
 *
 * Each strip is its own component instance with its own Embla via
 * `useEmblaWithIndex` — strips track their swipe position independently and
 * share nothing except the rendered card components.
 *
 * Card visuals are reused from the desktop `WorkShowcase` via the exported
 * `renderWorkCard` helper. Scoped CSS in `mobile-work-showcase.css` strips
 * the desktop chrome that does not apply on mobile (label chip, hover lift,
 * desaturated default state).
 */

import { Fragment, useCallback, type KeyboardEvent } from 'react';
import { useEmblaWithIndex } from '@/lib/useEmblaWithIndex';
import { renderWorkCard } from './WorkShowcase';
import type {
  WorkCardData,
  WorkIndustry,
  HeadlinePart,
} from './WorkShowcase';

export interface MobileWorkShowcaseProps {
  headlineParts: HeadlinePart[];
  industries: WorkIndustry[];
  cards: WorkCardData[];
}

export function MobileWorkShowcase({
  headlineParts,
  industries,
  cards,
}: MobileWorkShowcaseProps) {
  // Plain text headline used as the section's accessible name.
  const headlineText = headlineParts.map((part) => part.text).join('');

  return (
    <section
      className="mws-section md:hidden"
      aria-label={headlineText}
    >
      <p className="mws-headline">
        {headlineParts.map((part, i) =>
          part.oblique ? (
            <em key={i} className="mws-headline-oblique">
              {part.text}
            </em>
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )}
      </p>

      {industries.map((industry, i) => {
        const industryCards = cards.filter(
          (c) => c.industryId === industry.id,
        );
        return (
          <Fragment key={industry.id}>
            {i > 0 && <hr className="mws-divider" aria-hidden="true" />}
            <IndustryStrip industry={industry} cards={industryCards} />
          </Fragment>
        );
      })}
    </section>
  );
}

function IndustryStrip({
  industry,
  cards,
}: {
  industry: WorkIndustry;
  cards: WorkCardData[];
}) {
  const tallestH = Math.max(...cards.map((c) => c.visual.height / 2));
  const { emblaRef, activeIndex, scrollTo } = useEmblaWithIndex({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
  });

  // Left / Right arrow keys advance the rail by one card while focus is
  // anywhere inside it. Embla's `scrollTo` is clamped against the slide
  // count so we never request an out-of-range snap.
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next = Math.max(0, Math.min(cards.length - 1, activeIndex + dir));
      if (next === activeIndex) return;
      e.preventDefault();
      scrollTo(next);
    },
    [activeIndex, cards.length, scrollTo],
  );

  return (
    <section
      className="mws-strip"
      aria-label={`${industry.label.toLowerCase()} work`}
    >
      <h2 className="mws-strip-name" style={{ color: industry.activeColor }}>
        {industry.label}
      </h2>
      <div
        className="mws-sublabels"
        style={{ color: industry.subLabelsColor }}
      >
        {industry.subLabels.map((label, i) => (
          <Fragment key={`${industry.id}-${label}`}>
            {i > 0 && (
              <span className="mws-bullet" aria-hidden="true">
                •
              </span>
            )}
            <span className="mws-sublabel">{label}</span>
          </Fragment>
        ))}
      </div>
      <div className="mws-rail-clip">
        <div
          ref={emblaRef}
          className="mws-rail-viewport"
          role="region"
          aria-label={`${industry.label.toLowerCase()} carousel`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <ul
            className="mws-rail-container"
            style={{ '--mws-tallest-h': `${tallestH}px` } as React.CSSProperties}
          >
            {cards.map((card, i) => (
              <li key={i} className="mws-rail-slide">
                {renderWorkCard(card, [industry], i, {
                  focused: true,
                  load: true,
                  loading: 'lazy',
                })}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
