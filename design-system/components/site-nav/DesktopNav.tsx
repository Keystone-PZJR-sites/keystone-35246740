'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowNarrowRight } from '@untitledui/icons';
import { KeystoneWordmark } from '@/design-system/primitives';
import { useGetInTouchCta } from '@/design-system/hooks/useGetInTouchCta';
import { NavDropdown } from './NavDropdown';
import { useScrollToPricing } from './useScrollToPricing';
import type { HeroNavProps } from './types';

type DesktopNavProps = Pick<
  HeroNavProps,
  'items' | 'loginLabel' | 'loginHref' | 'ctaLabel' | 'wordmarkColor'
>;

// Grace period before a menu closes on mouse-leave. Long enough to cross the
// gap between a trigger and the centered panel, short enough to feel instant.
const CLOSE_DELAY_MS = 150;

/**
 * Desktop/tablet nav bar (≥985px): a dark green rounded pill with the Keystone
 * wordmark, a centered navigation group, a Login link, and the primary
 * "Get a free demo" CTA. Dropdown panels are centered under the bar.
 *
 * Open state is owned here so only one dropdown is open at a time. Hover and
 * keyboard focus open a menu; mouse-leave closes it after a short grace delay
 * so the pointer can travel to the centered panel without it snapping shut.
 */
export function DesktopNav({
  items,
  loginLabel,
  loginHref,
  ctaLabel,
  wordmarkColor = 'var(--color-hero-accent,#6ecc8b)',
}: DesktopNavProps) {
  const { href: ctaHref, onGetInTouchClick } = useGetInTouchCta();
  const onPricingClick = useScrollToPricing();

  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback((label: string) => {
    clearCloseTimer();
    setOpenLabel(label);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenLabel(null), CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const closeNow = useCallback(() => {
    clearCloseTimer();
    setOpenLabel(null);
  }, [clearCloseTimer]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  return (
    <div className="hero-nav-bar">
      <Link href="/" aria-label="Keystone — return to home page" className="hero-nav-wordmark-link">
        <KeystoneWordmark
          color={wordmarkColor}
          alt="Keystone"
          width={154}
          height={30}
          className="hero-nav-wordmark"
        />
      </Link>

      <ul className="hero-nav-links">
        {items.map((item) => {
          if (item.type === 'dropdown') {
            return (
              <NavDropdown
                key={item.label}
                item={item}
                isOpen={openLabel === item.label}
                onOpen={() => openMenu(item.label)}
                onScheduleClose={scheduleClose}
                onCloseNow={closeNow}
              />
            );
          }
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className="hero-nav-link"
                onClick={item.scrollToPricing ? onPricingClick : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hero-nav-actions">
        <Link href={loginHref} className="hero-nav-login">
          {loginLabel}
        </Link>
        <Link href={ctaHref} onClick={onGetInTouchClick} className="hero-nav-cta">
          {ctaLabel}
          <ArrowNarrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
