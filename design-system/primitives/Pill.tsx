import clsx from 'clsx';
import type { MouseEventHandler, ReactNode } from 'react';

export type PillTone = 'ink' | 'cream' | 'brand' | 'accent' | 'outline';
export type PillSize = 'sm' | 'md';

export interface PillProps {
  children: ReactNode;
  tone?: PillTone;
  size?: PillSize;
  /** Render as a toggle button instead of a static label. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Selected state for the interactive variant. */
  active?: boolean;
  className?: string;
}

/**
 * Rounded label / toggle. Static by default; pass `onClick` to
 * render an accessible toggle (used for channel + tool selectors).
 */
export function Pill({
  children,
  tone = 'ink',
  size = 'md',
  onClick,
  active = false,
  className,
}: PillProps) {
  const classes = clsx(
    'ks-pill',
    `ks-pill--${tone}`,
    `ks-pill--${size}`,
    onClick && 'ks-pill--interactive',
    active && 'ks-pill--active',
    className,
  );

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick} aria-pressed={active}>
        {children}
      </button>
    );
  }

  return <span className={classes}>{children}</span>;
}
