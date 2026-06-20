import clsx from 'clsx';
import type { ReactNode } from 'react';

export type BadgeTone = 'neutral' | 'brand' | 'accent' | 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

/**
 * Tiny status / category marker (e.g. "Coming soon", a category
 * tag). Smaller and quieter than a Pill, never interactive.
 */
export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return <span className={clsx('ks-badge', `ks-badge--${tone}`, className)}>{children}</span>;
}
