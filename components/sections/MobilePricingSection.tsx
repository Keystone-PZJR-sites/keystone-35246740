'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createSectionPin } from '@/lib/sectionPin';
import type { AddOnData } from './PricingSection';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MobilePricingSectionProps {
  tagline: string;
  priceAmount: string;
  pricePeriod: string;
  subCopyLine1: string;
  subCopyLine2: string;
  creditsText: string;
  addOnsHeading: string;
  marketplace: AddOnData;
  payments: AddOnData;
  comingSoonLabel: string;
  addonIconSrc: string;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function MobilePricingSection({
  tagline,
  priceAmount,
  pricePeriod,
  subCopyLine1,
  subCopyLine2,
  creditsText,
  addOnsHeading,
  marketplace,
  payments,
  comingSoonLabel,
  addonIconSrc,
}: MobilePricingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(max-width: 767px)', () => {
        const section = sectionRef.current;
        if (!section) return;

        createSectionPin({
          id: 'mobile-pricing-pin',
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
      className="mprice-section md:hidden"
      data-theme="custom"
      aria-label="Pricing"
    >
      {/* Tagline — Figma top=56, w=189.52px, text-center */}
      <p className="mprice-tagline">{tagline}</p>

      {/* Price — Figma top=144, centered */}
      <p
        className="mprice-price"
        aria-label={`${priceAmount.trim()} ${pricePeriod}`}
      >
        <span className="mprice-price-amount" aria-hidden="true">
          {priceAmount}
        </span>
        <span className="mprice-price-period" aria-hidden="true">
          {pricePeriod}
        </span>
      </p>

      {/* Sub-copy — Figma top=251, w=301px, whitespace-pre-wrap */}
      <div
        className="mprice-subcopy"
        aria-label={`${subCopyLine1} ${subCopyLine2}`}
      >
        <p aria-hidden="true">{subCopyLine1}</p>
        <p aria-hidden="true">{subCopyLine2}</p>
      </div>

      {/* ADD ONS heading — Figma top=365, centered */}
      <p className="mprice-addons-heading">{addOnsHeading}</p>

      {/* Credits — Figma top=422, w=309px */}
      <p className="mprice-credits">{creditsText}</p>

      {/* Add-ons block: pills + desc in one centred wrapper so both
          share the same horizontal axis at every viewport width. */}
      <div className="mprice-addons-block">
        {/* Pills row — each pill centred within its column slot */}
        <div className="mprice-addon-pills-row">
          <div className="mprice-pill-col">
            <div className="mprice-addon-pill" aria-label={marketplace.label}>
              <Image
                src={addonIconSrc}
                className="mprice-addon-icon"
                width={18}
                height={18}
                alt=""
                aria-hidden
              />
              <span className="mprice-addon-label">{marketplace.label}</span>
            </div>
          </div>
          <div className="mprice-pill-col">
            <div className="mprice-addon-pill" aria-label={payments.label}>
              <Image
                src={addonIconSrc}
                className="mprice-addon-icon"
                width={18}
                height={18}
                alt=""
                aria-hidden
              />
              <span className="mprice-addon-label">{payments.label}</span>
            </div>
          </div>
        </div>

        {/* Description columns — text top-aligned so both start at the same Y */}
        <div className="mprice-desc-row">
          <div className="mprice-desc-col">
            <div className="mprice-desc-text-wrap">
              <p className="mprice-desc-para">{marketplace.description}</p>
              <p className="mprice-coming-soon">{comingSoonLabel}</p>
            </div>
          </div>
          <div className="mprice-desc-col">
            <div className="mprice-desc-text-wrap">
              <p className="mprice-desc-para">{payments.description}</p>
              <p className="mprice-coming-soon">{comingSoonLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
