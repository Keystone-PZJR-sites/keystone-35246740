'use client';

import type { FocusEvent, KeyboardEvent } from 'react';
import Link from 'next/link';
import { ChevronDown } from '@untitledui/icons';
import { SpotlightCard } from '../SpotlightCard';
import type { NavDropdownItem, NavPromoTone } from './types';

/**
 * Maps the nav's green / orange promo rhythm onto standard SpotlightCard solid
 * tones: green is the dark ink tile (light copy); orange is the brand tile with
 * dark text for legibility on the orange fill.
 */
const PROMO_TONE: Record<NavPromoTone, { tone: 'ink' | 'brand'; textTone?: 'dark' }> = {
  green: { tone: 'ink' },
  orange: { tone: 'brand', textTone: 'dark' },
};

interface NavDropdownProps {
  item: NavDropdownItem;
  /** Whether this dropdown's panel is currently open (owned by DesktopNav). */
  isOpen: boolean;
  /** Open this dropdown (hover in / keyboard focus). */
  onOpen: () => void;
  /** Begin the close grace period (mouse leaves the trigger + panel). */
  onScheduleClose: () => void;
  /** Close immediately (focus leaves entirely, or Escape). */
  onCloseNow: () => void;
}

/**
 * A top-level dropdown (Services / Company / Resources). Open state is owned by
 * DesktopNav so only one is open at a time. Hover and keyboard focus open it;
 * mouse-leave closes it after a short grace delay (handled by the parent) so
 * the pointer can reach the centered panel. The panel is positioned relative to
 * the full nav bar (not the trigger) so it stays centered under the bar; `wide`
 * is the Services mega menu, `compact` is the narrower Company/Resources menu.
 */
export function NavDropdown({
  item,
  isOpen,
  onOpen,
  onScheduleClose,
  onCloseNow,
}: NavDropdownProps) {
  const handleBlur = (event: FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      onCloseNow();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Escape' && isOpen) {
      onCloseNow();
    }
  };

  return (
    <li
      className="hero-nav-dropdown"
      data-open={isOpen ? 'true' : undefined}
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
      onFocus={onOpen}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button type="button" className="hero-nav-trigger" aria-haspopup="true" aria-expanded={isOpen}>
        {item.label}
        <ChevronDown className="hero-nav-chevron" size={16} aria-hidden="true" />
      </button>

      <div className="hero-nav-panel" data-variant={item.variant}>
        <div className="hero-nav-card">
          <div className="hero-nav-content">
            {item.categories.map((category) => (
              <div key={category.heading} className="hero-nav-category">
                <p className="hero-nav-category-heading">{category.heading}</p>
                <ul className="hero-nav-category-links">
                  {category.links.map((leaf, i) => (
                    <li key={`${leaf.label}-${i}`}>
                      <Link href={leaf.href} className="hero-nav-leaf">
                        {leaf.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <span className="hero-nav-divider" aria-hidden="true" />

          <div className="hero-nav-promo-rail">
            {item.promos.map((promo, i) => {
              const { tone, textTone } = PROMO_TONE[promo.tone];
              return (
                <SpotlightCard
                  key={`${promo.copy}-${i}`}
                  background={{ kind: 'solid', tone }}
                  textTone={textTone}
                  title={promo.copy}
                  titleSize="xs"
                  titleWeight="regular"
                  className="hero-nav-promo-tile"
                  href={promo.href}
                  affordance="arrow"
                />
              );
            })}
          </div>
        </div>
      </div>
    </li>
  );
}
