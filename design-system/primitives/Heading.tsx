import clsx from 'clsx';
import type { ReactNode } from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'display' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type HeadingTone = 'primary' | 'secondary' | 'brand' | 'accent' | 'inverse';
export type HeadingFont = 'display' | 'body';

export interface HeadingProps {
  children: ReactNode;
  /** Semantic heading rank for the document outline. */
  level?: HeadingLevel;
  /** Visual size, decoupled from semantic level. Defaults to match level. */
  size?: HeadingSize;
  /** display = FK Screamer (headline face), body = FK Grotesk Neue. */
  font?: HeadingFont;
  tone?: HeadingTone;
  className?: string;
}

const SIZE_FOR_LEVEL: Record<HeadingLevel, HeadingSize> = {
  1: 'display',
  2: 'xl',
  3: 'lg',
  4: 'md',
  5: 'sm',
  6: 'sm',
};

/**
 * Headline primitive. The display font is FK Screamer; tone is
 * token-backed. Visual `size` is independent of semantic `level`
 * so the outline stays correct while the design scales freely.
 */
export function Heading({
  children,
  level = 2,
  size,
  font = 'display',
  tone = 'primary',
  className,
}: HeadingProps) {
  const Tag = `h${level}` as const;
  const resolvedSize = size ?? SIZE_FOR_LEVEL[level];
  return (
    <Tag
      className={clsx(
        'ks-heading',
        `ks-heading--${resolvedSize}`,
        `ks-heading--font-${font}`,
        `ks-heading--${tone}`,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
