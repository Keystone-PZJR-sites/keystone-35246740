import clsx from 'clsx';
import NextLink from 'next/link';
import type { MouseEventHandler, ReactNode } from 'react';

export type LinkTone = 'default' | 'brand' | 'inverse';

export interface LinkProps {
  children: ReactNode;
  href: string;
  tone?: LinkTone;
  /** Show the underline at rest (otherwise it appears on hover/focus). */
  underline?: boolean;
  /** Off-site link: full anchor, new tab, rel guard. */
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  'aria-label'?: string;
}

/**
 * Text link primitive. Internal links route through next/link;
 * external links open safely in a new tab. Color + underline are
 * token-backed and consistent everywhere.
 */
export function Link({
  children,
  href,
  tone = 'default',
  underline = false,
  external = false,
  onClick,
  className,
  'aria-label': ariaLabel,
}: LinkProps) {
  const classes = clsx('ks-link', `ks-link--${tone}`, underline && 'ks-link--underline', className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer noopener"
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </NextLink>
  );
}
