'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { log } from '@/lib/logger';
import { DESKTOP_MEDIA } from '@/design-system/tokens/breakpoints';
import { PriceSummary } from './PriceSummary';
import type { FeatureChip } from './PriceSummary';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type { FeatureChip } from './PriceSummary';

export interface AddOnData {
  /** Pill label text */
  label: string;
  /** Description text beneath the pill */
  description: string;
}

export interface PricingSectionProps {
  /** Tagline centered above the price display */
  tagline: string;
  /** Price amount portion, e.g. "$49 " — trailing space is intentional */
  priceAmount: string;
  /** Price period portion, e.g. "/ MONTH" */
  pricePeriod: string;
  /** First line of sub-copy beneath the price */
  subCopyLine1: string;
  /** Second line of sub-copy beneath the price */
  subCopyLine2: string;
  /** Nine feature chips — label + path to checkmark icon */
  featureChips: FeatureChip[];
  /** Credits explanation paragraph */
  creditsText: string;
  /** "ADD ONS" section heading */
  addOnsHeading: string;
  /** Marketplace add-on data */
  marketplace: AddOnData;
  /** Payments add-on data */
  payments: AddOnData;
  /** "Coming soon." label shared by both add-on columns */
  comingSoonLabel: string;
  /** Path to the "+" icon used in both add-on pill chips */
  addonIconSrc: string;
}

// ---------------------------------------------------------------------------
// Sub-components (no 'use client' needed — they're rendered inside a client component)
// ---------------------------------------------------------------------------

interface AddOnColProps {
  addon: AddOnData;
  addonIconSrc: string;
  comingSoonLabel: string;
}

function AddOnCol({ addon, addonIconSrc, comingSoonLabel }: AddOnColProps) {
  return (
    <div className="pricing-addon-col">
      <div className="pricing-addon-pill">
        <Image
          src={addonIconSrc}
          width={24}
          height={24}
          alt=""
          aria-hidden="true"
        />
        <span className="pricing-addon-label">{addon.label}</span>
      </div>
      <p className="pricing-addon-description">{addon.description}</p>
      <p className="pricing-coming-soon">{comingSoonLabel}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function PricingSection({
  tagline,
  priceAmount,
  pricePeriod,
  subCopyLine1,
  subCopyLine2,
  featureChips,
  creditsText,
  addOnsHeading,
  marketplace,
  payments,
  comingSoonLabel,
  addonIconSrc,
}: PricingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Desktop / tablet + full motion ─────────────────────────────────
      mm.add(`${DESKTOP_MEDIA} and (prefers-reduced-motion: no-preference)`, () => {
        const section = sectionRef.current;
        const inner   = innerRef.current;
        if (!section || !inner) return;

        gsap.set(inner, { opacity: 0, y: 32 });

        let played = false;

        // Spec 026: no pin, no hold — entrance plays once when the section
        // first enters the viewport at the project-wide "top 80%" trigger.
        ScrollTrigger.create({
          id: 'pricing-entrance',
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (played) return;
            played = true;
            log('pricing-entrance', 'ANIM_START');
            gsap.to(inner, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              onComplete: () => log('pricing-entrance', 'ANIM_COMPLETE'),
            });
          },
        });
      });

      // ── Reduced motion: show final state immediately ────────────────────
      mm.add(`${DESKTOP_MEDIA} and (prefers-reduced-motion: reduce)`, () => {
        const inner = innerRef.current;
        if (inner) gsap.set(inner, { opacity: 1, y: 0 });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" data-pricing-anchor className="pricing-section hidden md:block" data-theme="custom">
      <div ref={innerRef} className="pricing-inner">

        {/* Tagline, two-tone price, sub-copy, and the included-feature chips.
            The `ink` tone renders as a layout passthrough (display: contents)
            so these stay direct flex children of .pricing-inner — the homepage
            layout is unchanged by the extraction. */}
        <PriceSummary
          tone="ink"
          tagline={tagline}
          priceAmount={priceAmount}
          pricePeriod={pricePeriod}
          subCopyLine1={subCopyLine1}
          subCopyLine2={subCopyLine2}
          featureChips={featureChips}
        />

        {/* Credits paragraph */}
        <p className="pricing-credits">{creditsText}</p>

        {/* "ADD ONS" heading */}
        <p className="pricing-addons-heading">{addOnsHeading}</p>

        {/* ================================================================
            Add-on columns — side-by-side on tablet/desktop, stacked on mobile.
            ================================================================ */}
        <div className="pricing-addons-row">
          <AddOnCol
            addon={marketplace}
            addonIconSrc={addonIconSrc}
            comingSoonLabel={comingSoonLabel}
          />
          <AddOnCol
            addon={payments}
            addonIconSrc={addonIconSrc}
            comingSoonLabel={comingSoonLabel}
          />
        </div>

      </div>
    </section>
  );
}
