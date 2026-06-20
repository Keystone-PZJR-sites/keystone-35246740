import clsx from 'clsx';
import { Minus, Plus } from '@untitledui/icons';

export interface QuantityStepperProps {
  /** Current value (the parent owns the state). */
  value: number;
  /** Called with the next clamped value when a button is pressed. */
  onChange: (next: number) => void;
  /** Accessible name for the control group, e.g. "Blog posts". */
  label: string;
  /** Lowest allowed value. Defaults to 0. */
  min?: number;
  /** Highest allowed value. Defaults to 99. */
  max?: number;
  /** Increment per press. Defaults to 1. */
  step?: number;
  className?: string;
}

/**
 * A −/value/+ quantity control. Controlled: the parent holds the number and
 * receives clamped updates. The minus button disables at `min`, the plus at
 * `max`. Built from buttons + tokens; keyboard-operable with a visible focus
 * state. The group carries an accessible name so the value reads in context.
 */
export function QuantityStepper({
  value,
  onChange,
  label,
  min = 0,
  max = 99,
  step = 1,
  className,
}: QuantityStepperProps) {
  const decrease = () => onChange(Math.max(min, value - step));
  const increase = () => onChange(Math.min(max, value + step));

  return (
    <div className={clsx('ks-stepper', className)} role="group" aria-label={label}>
      <button
        type="button"
        className="ks-stepper__btn"
        onClick={decrease}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
      >
        <Minus className="ks-stepper__icon" aria-hidden="true" />
      </button>
      <span className="ks-stepper__value">{value}</span>
      <button
        type="button"
        className="ks-stepper__btn"
        onClick={increase}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
      >
        <Plus className="ks-stepper__icon" aria-hidden="true" />
      </button>
    </div>
  );
}
