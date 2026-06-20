import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';

export type EyebrowTone = 'brand' | 'accent' | 'tertiary' | 'inverse-muted';

export interface EyebrowProps {
  children: ReactNode;
  tone?: EyebrowTone;
  as?: ElementType;
  className?: string;
}

/**
 * Small uppercase label that sits above a heading to name a
 * section ("Our mission", a pricing tagline, etc.).
 */
export function Eyebrow({ children, tone = 'brand', as: Tag = 'span', className }: EyebrowProps) {
  return (
    <Tag className={clsx('ks-eyebrow', `ks-eyebrow--${tone}`, className)}>{children}</Tag>
  );
}
