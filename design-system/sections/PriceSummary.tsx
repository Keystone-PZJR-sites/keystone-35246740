import clsx from 'clsx';

export interface FeatureChip {
  /** Feature label displayed inside the pill */
  label: string;
  /** Fill color for the checkmark icon, e.g. "#FF6F5C" */
  iconColor: string;
}

/** `ink` is the dark homepage treatment; `light` is the cream pricing-page card. */
export type PriceSummaryTone = 'ink' | 'light';

export interface PriceSummaryProps {
  /** Tagline centered above the price display */
  tagline: string;
  /** Price amount portion, e.g. "$249 " — trailing space is intentional */
  priceAmount: string;
  /** Price period portion, e.g. "/ MONTH" */
  pricePeriod: string;
  /** First line of sub-copy beneath the price */
  subCopyLine1: string;
  /** Second line of sub-copy beneath the price */
  subCopyLine2: string;
  /** Feature chips — label + checkmark color */
  featureChips: FeatureChip[];
  /** Color treatment. `ink` (default) renders inline (a passthrough wrapper) so
   *  the homepage `PricingSection` layout is unchanged; `light` renders a cream card. */
  tone?: PriceSummaryTone;
}

/**
 * All checkmark icons share one path — only the fill color differs. Rendering
 * inline avoids a pile of near-identical SVG files in public/pricing/.
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

/**
 * The price card: a tagline, the two-tone price line, two supporting lines, and
 * the "everything included" chips. Lifted out of `PricingSection` so both the
 * dark homepage block and the light `/pricing` page render the same content
 * (spec 039). It carries no credits paragraph and no add-ons — those stay in
 * `PricingSection`. Presentational only; no animation.
 */
export function PriceSummary({
  tagline,
  priceAmount,
  pricePeriod,
  subCopyLine1,
  subCopyLine2,
  featureChips,
  tone = 'ink',
}: PriceSummaryProps) {
  return (
    <div className={clsx('ks-price-summary', `ks-price-summary--${tone}`)}>
      <p className="pricing-tagline">{tagline}</p>

      {/* Two-tone single line: amount (mint/ink) + period (teal). aria-label on
          the container announces the full price; the spans are aria-hidden. */}
      <p className="pricing-price" aria-label={`${priceAmount.trim()} ${pricePeriod}`}>
        <span className="pricing-price-amount" aria-hidden="true">
          {priceAmount}
        </span>
        <span className="pricing-price-period" aria-hidden="true">
          {pricePeriod}
        </span>
      </p>

      <p className="pricing-sub-copy">
        {subCopyLine1}
        <br />
        {subCopyLine2}
      </p>

      <ul className="pricing-chips" aria-label="Included features">
        {featureChips.map((chip) => (
          <li key={chip.label} className="pricing-chip">
            <CheckmarkIcon color={chip.iconColor} />
            <span className="pricing-chip-label">{chip.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
