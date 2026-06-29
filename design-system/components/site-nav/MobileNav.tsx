'use client';

import { useCallback, useId, useState } from 'react';
import Link from 'next/link';
import { ArrowNarrowRight, ChevronDown, Menu02, XClose } from '@untitledui/icons';
import { KeystoneWordmark } from '@/design-system/primitives';
import { useGetInTouchCta } from '@/design-system/hooks/useGetInTouchCta';
import { useScrollToPricing } from './useScrollToPricing';
import type { HeroNavProps, NavItem } from './types';

type MobileNavProps = Pick<
  HeroNavProps,
  'items' | 'loginLabel' | 'loginHref' | 'ctaLabel' | 'wordmarkColor' | 'openMenuLabel' | 'closeMenuLabel'
>;

/**
 * Mobile nav (<985px): a compact dark rounded bar with a circular green menu
 * button. Opening reveals a calm light panel below the bar. Services, Company,
 * and Resources are accordion rows — only one open at a time. Pricing and
 * "How it works" are direct links. Nested content reuses the desktop category
 * and link labels, without promo tiles (Spec 034).
 */
export function MobileNav({
  items,
  loginLabel,
  loginHref,
  ctaLabel,
  wordmarkColor = 'var(--color-hero-accent,#6ecc8b)',
  openMenuLabel = 'Open navigation menu',
  closeMenuLabel = 'Close navigation menu',
}: MobileNavProps) {
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [openRow, setOpenRow] = useState<string | null>(null);
  const { href: ctaHref, onGetInTouchClick } = useGetInTouchCta();

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setOpenRow(null);
  }, []);

  const onPricingClick = useScrollToPricing(closeMenu);

  const toggleRow = useCallback((label: string) => {
    setOpenRow((current) => (current === label ? null : label));
  }, []);

  return (
    <div className="hero-nav-mobile">
      <div className="hero-nav-mobile-bar">
        <Link href="/" aria-label="Keystone — return to home page" className="hero-nav-mobile-wordmark-link">
          <KeystoneWordmark
            color={wordmarkColor}
            alt="Keystone"
            width={154}
            height={30}
            className="hero-nav-mobile-wordmark"
          />
        </Link>

        <div className="hero-nav-mobile-controls">
          <Link
            href={ctaHref}
            className="hero-nav-mobile-top-cta"
            onClick={(event) => {
              closeMenu();
              onGetInTouchClick(event);
            }}
          >
            Get a Demo
          </Link>
          <button
            type="button"
            className="hero-nav-mobile-toggle"
            aria-expanded={isOpen}
            aria-controls={panelId}
            aria-label={isOpen ? closeMenuLabel : openMenuLabel}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <XClose size={20} aria-hidden="true" /> : <Menu02 size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div id={panelId} className="hero-nav-mobile-panel">
          <ul className="hero-nav-mobile-rows">
            {items.map((item) => (
              <MobileRow
                key={item.label}
                item={item}
                isExpanded={openRow === item.label}
                onToggle={() => toggleRow(item.label)}
                onPricingClick={onPricingClick}
                onNavigate={closeMenu}
              />
            ))}
          </ul>

          <div className="hero-nav-mobile-actions">
            <Link href={loginHref} className="hero-nav-mobile-login" onClick={closeMenu}>
              {loginLabel}
            </Link>
            <Link
              href={ctaHref}
              className="hero-nav-mobile-cta"
              onClick={(event) => {
                closeMenu();
                onGetInTouchClick(event);
              }}
            >
              {ctaLabel}
              <ArrowNarrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

interface MobileRowProps {
  item: NavItem;
  isExpanded: boolean;
  onToggle: () => void;
  onPricingClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onNavigate: () => void;
}

function MobileRow({ item, isExpanded, onToggle, onPricingClick, onNavigate }: MobileRowProps) {
  const contentId = useId();

  if (item.type === 'link') {
    return (
      <li>
        <Link
          href={item.href}
          className="hero-nav-mobile-link"
          onClick={item.scrollToPricing ? onPricingClick : onNavigate}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        className="hero-nav-mobile-accordion-trigger"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={onToggle}
      >
        {item.label}
        <ChevronDown
          className="hero-nav-mobile-accordion-chevron"
          data-open={isExpanded}
          size={18}
          aria-hidden="true"
        />
      </button>

      <div id={contentId} className="hero-nav-mobile-accordion-content" data-open={isExpanded}>
        <div className="hero-nav-mobile-accordion-inner">
          {item.categories.map((category) => (
            <div key={category.heading} className="hero-nav-mobile-category">
              <p className="hero-nav-mobile-category-heading">{category.heading}</p>
              <ul className="hero-nav-mobile-category-links">
                {category.links.map((leaf, i) => (
                  <li key={`${leaf.label}-${i}`}>
                    <Link
                      href={leaf.href}
                      className="hero-nav-mobile-leaf"
                      onClick={onNavigate}
                      {...(leaf.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {leaf.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}
