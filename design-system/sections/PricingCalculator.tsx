'use client';

import { useState } from 'react';
import { Button } from '@/design-system/primitives/Button';
import { Text } from '@/design-system/primitives/Text';
import { QuantityStepper } from '@/design-system/primitives/QuantityStepper';
import { CtaModalButton } from '@/design-system/components/CtaModalButton';
import { isGetInTouchHref } from '@/design-system/constants/routes';

export interface PricingCalcItem {
  /** Stable key. */
  id: string;
  /** Row title, e.g. "Blog posts". */
  label: string;
  /** One-line description of the work. */
  description: string;
  /** Unit noun shown after the price, e.g. "post". */
  unit: string;
  /** Price per unit, in whole currency units. */
  unitPrice: number;
  /** Optional max quantity (defaults to the stepper's own max). */
  max?: number;
}

export interface PricingCalculatorProps {
  /** Name of the included plan the total builds on. */
  planName: string;
  /** Short line under the plan name. */
  planNote: string;
  /** Base monthly price in whole currency units. */
  basePrice: number;
  /** Period label shown after each total, e.g. "/mo". */
  period: string;
  /** The optional extra-work line items. */
  items: PricingCalcItem[];
  /** Quiet reassurance line under the total. */
  note?: string;
  /** Primary action label beside the total. */
  actionLabel: string;
  /** Primary action href. Defaults to /get-in-touch (matches CtaBand). */
  actionHref?: string;
  /** Currency symbol. Defaults to "$". */
  currencySymbol?: string;
}

// Explicit locale so the SSR string and the first client render match.
const NUMBER_FORMAT = new Intl.NumberFormat('en-US');

/**
 * The "only pay for what you use" estimator (spec 039). The included plan is
 * the floor; each extra-work row adds quantity × unit price to a live monthly
 * total. The parent page stays a server component and feeds this its data; the
 * per-row quantities live here in React state. The total is announced politely
 * as it changes.
 */
export function PricingCalculator({
  planName,
  planNote,
  basePrice,
  period,
  items,
  note,
  actionLabel,
  actionHref = '/get-in-touch',
  currencySymbol = '$',
}: PricingCalculatorProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const setQuantity = (id: string, next: number) =>
    setQuantities((prev) => ({ ...prev, [id]: next }));

  const extrasTotal = items.reduce(
    (sum, item) => sum + (quantities[item.id] ?? 0) * item.unitPrice,
    0,
  );
  const total = basePrice + extrasTotal;

  const money = (amount: number) => `${currencySymbol}${NUMBER_FORMAT.format(amount)}`;

  return (
    <div className="ks-calc">
      <div className="ks-calc__base">
        <div className="ks-calc__row-text">
          <p className="ks-calc__base-name">{planName}</p>
          <Text variant="small" tone="tertiary">
            {planNote}
          </Text>
        </div>
        <p className="ks-calc__base-price">
          {money(basePrice)}
          <span className="ks-calc__period">{period}</span>
        </p>
      </div>

      <ul className="ks-calc__rows">
        {items.map((item) => (
          <li key={item.id} className="ks-calc__row">
            <div className="ks-calc__row-text">
              <p className="ks-calc__row-label">{item.label}</p>
              <Text variant="small" tone="tertiary">
                {item.description}
              </Text>
            </div>
            <p className="ks-calc__row-price">
              {money(item.unitPrice)} <span className="ks-calc__unit">/ {item.unit}</span>
            </p>
            <QuantityStepper
              className="ks-calc__row-stepper"
              label={item.label}
              value={quantities[item.id] ?? 0}
              onChange={(next) => setQuantity(item.id, next)}
              max={item.max}
            />
          </li>
        ))}
      </ul>

      <div className="ks-calc__footer">
        <div className="ks-calc__total">
          <Text variant="small" tone="tertiary">
            Estimated monthly total
          </Text>
          <p className="ks-calc__total-value" aria-live="polite">
            {money(total)}
            <span className="ks-calc__period">{period}</span>
          </p>
        </div>
        {isGetInTouchHref(actionHref) ? (
          <CtaModalButton variant="primary" size="lg" withArrow className="ks-calc__action">
            {actionLabel}
          </CtaModalButton>
        ) : (
          <Button
            variant="primary"
            size="lg"
            href={actionHref}
            withArrow
            className="ks-calc__action"
          >
            {actionLabel}
          </Button>
        )}
      </div>

      {note ? (
        <Text variant="small" tone="quaternary" className="ks-calc__note">
          {note}
        </Text>
      ) : null}
    </div>
  );
}
