import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';

export type TextVariant = 'lead' | 'bodyLg' | 'body' | 'small' | 'caption' | 'mono';
export type TextTone =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'brand'
  | 'inverse'
  | 'inverse-muted';

export interface TextProps {
  children: ReactNode;
  /** Type scale step. Defaults to body. */
  variant?: TextVariant;
  /** Color role. `inverse*` tones read on dark (ink) surfaces. */
  tone?: TextTone;
  /** Rendered element. Defaults to <p>; use `as="span"` for inline. */
  as?: ElementType;
  className?: string;
}

/**
 * Body copy primitive. Renders FK Grotesk Neue at one of the scale
 * steps, colored by a token-backed tone. Never set font, size, or
 * color on text directly — pick a variant + tone.
 */
export function Text({
  children,
  variant = 'body',
  tone = 'primary',
  as: Tag = 'p',
  className,
}: TextProps) {
  return (
    <Tag className={clsx('ks-text', `ks-text--${variant}`, `ks-text--${tone}`, className)}>
      {children}
    </Tag>
  );
}
