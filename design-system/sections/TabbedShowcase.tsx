'use client';

import { useId, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';
import { ArrowNarrowLeft, ArrowNarrowRight } from '@untitledui/icons';
import { Eyebrow, Heading } from '@/design-system/primitives';
import { useEmblaWithIndex } from '@/lib/useEmblaWithIndex';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TabbedShowcaseTab {
  /** Stable identifier — also the React key. */
  id: string;
  /** Short label shown in the tab row (desktop) and the header (mobile). */
  name: string;
  /** Small label above the headline. */
  eyebrow: string;
  /** Short statement, one to three lines. */
  headline: string;
  /**
   * Arbitrary visual the page supplies — a product mock, image, or
   * illustration. The component only frames it; any meaningful imagery
   * carries its own alt text from the page.
   */
  visual: ReactNode;
}

interface TabbedShowcaseBaseProps {
  tabs: TabbedShowcaseTab[];
  /** Accessible name for the section / tablist. */
  ariaLabel?: string;
  /** How long each tab stays active before auto-advancing, in milliseconds. */
  intervalMs?: number;
}

export type TabbedShowcaseProps = TabbedShowcaseBaseProps;
export type MobileTabbedShowcaseProps = TabbedShowcaseBaseProps;

/** Default dwell time per tab. One value for the whole component (spec 035). */
const DEFAULT_INTERVAL_MS = 5000;

// ── Shared panel body ─────────────────────────────────────────────────────────

/**
 * Eyebrow + headline + visual. Shared by the desktop crossfade layers and the
 * mobile carousel slides; the container (`.tsw-panel-layer` / `.mtsw-slide`)
 * owns the direction, this owns the content.
 */
function PanelBody({ tab }: { tab: TabbedShowcaseTab }) {
  return (
    <>
      <div className="tsw-panel-text">
        <Eyebrow className="tsw-panel-eyebrow">{tab.eyebrow}</Eyebrow>
        {/* Heading's body face ships at semibold (no FK Grotesk Neue cut, so it
            renders Regular); the showcase headline is intentionally bold per
            spec, so the real 700 weight is set on `.tsw-panel-headline`. */}
        <Heading level={3} font="body" className="tsw-panel-headline">
          {tab.headline}
        </Heading>
      </div>
      <div className="tsw-panel-visual">{tab.visual}</div>
    </>
  );
}

/**
 * The auto-advance indicator. A CSS `scaleX` keyframe whose duration is the
 * `--tsw-interval` custom property; `key` remounts it (restarting from empty)
 * whenever the active tab changes, and `onAnimationEnd` advances to the next
 * tab. Hover / focus pausing and the reduced-motion static bar are pure CSS
 * (see the stylesheet) — no timers, no effects.
 */
function ProgressFill({ activeKey, onComplete }: { activeKey: number; onComplete: () => void }) {
  return <span key={activeKey} className="tsw-fill" onAnimationEnd={onComplete} />;
}

// ── Desktop (≥ 985px) ───────────────────────────────────────────────────────

/**
 * Tabbed Showcase — desktop layout (≥985px). A horizontal tablist sits above a
 * single crossfading panel. Hidden below 985px, where MobileTabbedShowcase
 * takes over. See spec 035.
 */
export function TabbedShowcase({
  tabs,
  ariaLabel,
  intervalMs = DEFAULT_INTERVAL_MS,
}: TabbedShowcaseProps) {
  const [active, setActive] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const baseId = useId();
  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = `${baseId}-panel`;

  const select = (i: number) => {
    setActive(i);
    setFocusIndex(i);
  };
  const goNext = () => setActive((i) => (i + 1) % tabs.length);

  // Manual-activation tablist: arrows move focus (roving tabindex), Enter /
  // Space activate via the native button click.
  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    let next = focusIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (focusIndex + 1) % tabs.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (focusIndex - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    setFocusIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      className="tsw-section hidden md:block"
      aria-label={ariaLabel}
      style={{ '--tsw-interval': `${intervalMs}ms` } as CSSProperties}
    >
      <div className="tsw-inner">
        <div className="tsw-tabs" role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown}>
          {tabs.map((tab, i) => {
            const isActive = i === active;
            return (
              <div key={tab.id} className="tsw-tab-col">
                <button
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={tabId(i)}
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={i === focusIndex ? 0 : -1}
                  className="tsw-tab"
                  data-active={isActive ? 'true' : 'false'}
                  onClick={() => select(i)}
                >
                  {tab.name}
                </button>
                <div className="tsw-track">
                  {isActive && <ProgressFill activeKey={active} onComplete={goNext} />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="tsw-panel" role="tabpanel" id={panelId} aria-labelledby={tabId(active)}>
          <div className="tsw-panel-stack">
            {tabs.map((tab, i) => (
              <div
                key={tab.id}
                className="tsw-panel-layer"
                data-active={i === active ? 'true' : 'false'}
                aria-hidden={i === active ? undefined : true}
              >
                <PanelBody tab={tab} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Mobile / tablet (< 985px) ────────────────────────────────────────────────

/**
 * Tabbed Showcase — mobile carousel layout (<985px). The active tab's name and
 * progress track sit above a swipeable single-panel carousel, with dot
 * indicators and previous / next arrows below. Hidden at 985px and up, where
 * the desktop TabbedShowcase takes over. See spec 035.
 */
export function MobileTabbedShowcase({
  tabs,
  ariaLabel,
  intervalMs = DEFAULT_INTERVAL_MS,
}: MobileTabbedShowcaseProps) {
  const { emblaRef, emblaApi, activeIndex, scrollTo } = useEmblaWithIndex({
    align: 'center',
    containScroll: 'trimSnaps',
    loop: true,
  });

  const goNext = () => emblaApi?.scrollNext();
  const activeTab = tabs[activeIndex] ?? tabs[0];

  return (
    <section
      className="mtsw-section md:hidden"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      style={{ '--tsw-interval': `${intervalMs}ms` } as CSSProperties}
    >
      <div className="mtsw-header">
        <span className="mtsw-active-name">{activeTab?.name}</span>
        <div className="tsw-track mtsw-track">
          <ProgressFill activeKey={activeIndex} onComplete={goNext} />
        </div>
      </div>

      <div className="mtsw-viewport" ref={emblaRef}>
        <ul className="mtsw-container">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className="mtsw-slide"
              aria-roledescription="slide"
              aria-label={tab.name}
            >
              <div className="mtsw-panel">
                <PanelBody tab={tab} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mtsw-dots" aria-label="Choose a feature">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            className="mtsw-dot"
            data-active={i === activeIndex ? 'true' : 'false'}
            aria-label={`Show ${tab.name}`}
            aria-current={i === activeIndex ? 'true' : undefined}
            onClick={() => scrollTo(i)}
          >
            <span className="mtsw-dot-mark" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="mtsw-arrows">
        <button
          type="button"
          className="mtsw-arrow"
          aria-label="Previous feature"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ArrowNarrowLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="mtsw-arrow"
          aria-label="Next feature"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ArrowNarrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
