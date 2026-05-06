// Server component — no GSAP, no state, no browser APIs required.
import Image from 'next/image';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FeatureChip {
  /** Feature label displayed inside the pill */
  label: string;
  /** Fill color for the checkmark icon, e.g. "#FF6F5C" */
  iconColor: string;
}

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
// Sub-components
// ---------------------------------------------------------------------------

/**
 * All nine checkmark icons share the same path — only the fill color differs.
 * Rendering inline avoids nine near-identical SVG files in public/pricing/.
 */
function CheckmarkIcon({ color }: { color: string }) {
  return (
    <svg
      width="23.25"
      height="23.25"
      viewBox="0 0 23.2516 23.2516"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="pricing-chip-icon"
    >
      <path
        d="M20.8593 7.0536L9.23344 18.6794C9.16596 18.747 9.08582 18.8006 8.99761 18.8371C8.90941 18.8737 8.81485 18.8925 8.71937 18.8925C8.62388 18.8925 8.52933 18.8737 8.44112 18.8371C8.35291 18.8006 8.27277 18.747 8.20529 18.6794L3.11899 13.5931C2.98265 13.4568 2.90605 13.2719 2.90605 13.079C2.90605 12.8862 2.98265 12.7013 3.11899 12.565C3.25533 12.4286 3.44025 12.352 3.63307 12.352C3.82589 12.352 4.01081 12.4286 4.14715 12.565L8.71937 17.1381L19.8311 6.02544C19.9674 5.8891 20.1524 5.81251 20.3452 5.81251C20.538 5.81251 20.7229 5.8891 20.8593 6.02544C20.9956 6.16179 21.0722 6.34671 21.0722 6.53952C21.0722 6.73234 20.9956 6.91726 20.8593 7.0536Z"
        fill={color}
      />
    </svg>
  );
}

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
  return (
    <section className="pricing-section" data-theme="custom">
      <div className="pricing-inner">

        {/* Tagline */}
        <p className="pricing-tagline">{tagline}</p>

        {/* ================================================================
            Price display — two-tone single line: "$49 " (mint) + "/ MONTH" (teal)
            aria-label on the container announces the full price string.
            Both spans are aria-hidden so screen readers use the container label.
            ================================================================ */}
        <p
          className="pricing-price"
          aria-label={`${priceAmount.trim()} ${pricePeriod}`}
        >
          {/* white-space: pre on this span preserves the intentional trailing space */}
          <span className="pricing-price-amount" aria-hidden="true">
            {priceAmount}
          </span>
          <span className="pricing-price-period" aria-hidden="true">
            {pricePeriod}
          </span>
        </p>

        {/* Sub-copy */}
        <p className="pricing-sub-copy">
          {subCopyLine1}
          <br />
          {subCopyLine2}
        </p>

        {/* ================================================================
            Feature chips — nine pill-shaped chips in a centered flex-wrap row.
            Max-width 1177px (set in CSS) forces the 5+4 desktop layout.
            ================================================================ */}
        <div className="pricing-chips" role="list" aria-label="Included features">
          {featureChips.map((chip) => (
            <div key={chip.label} className="pricing-chip" role="listitem">
              <CheckmarkIcon color={chip.iconColor} />
              <span className="pricing-chip-label">{chip.label}</span>
            </div>
          ))}
        </div>

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
