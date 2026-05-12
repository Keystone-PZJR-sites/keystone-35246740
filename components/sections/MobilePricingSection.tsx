'use client';

import Image from 'next/image';
import type { AddOnData } from './PricingSection';

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
  return (
    <section
      className="mprice-section md:hidden"
      data-theme="custom"
      aria-label="Pricing"
    >
      {/* Centered inner column — content sits in normal flow, vertically
          centered when there is room, growing when it isn't. */}
      <div className="mprice-inner">
        <p className="mprice-tagline">{tagline}</p>

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

        <div
          className="mprice-subcopy"
          aria-label={`${subCopyLine1} ${subCopyLine2}`}
        >
          <p aria-hidden="true">{subCopyLine1}</p>
          <p aria-hidden="true">{subCopyLine2}</p>
        </div>

        <p className="mprice-addons-heading">{addOnsHeading}</p>

        <p className="mprice-credits">{creditsText}</p>

        {/* Add-ons block: pills + descriptions stacked below in normal flow. */}
        <div className="mprice-addons-block">
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
      </div>
    </section>
  );
}
