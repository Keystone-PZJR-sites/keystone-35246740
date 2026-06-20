import clsx from 'clsx';
import Link from 'next/link';
import { ArrowNarrowRight } from '@untitledui/icons';
import type { MouseEventHandler, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
/** `inverse` retunes colors for use on a dark (ink) surface. */
export type ButtonTone = 'default' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  /** When set, renders an anchor (internal links use next/link). */
  href?: string;
  /** Force a full-page anchor + new tab for off-site destinations. */
  external?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit';
  disabled?: boolean;
  /** Append the trailing arrow used across Keystone CTAs. */
  withArrow?: boolean;
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
}

/**
 * The general-purpose Keystone action. Renders a <button> by
 * default, or an anchor when `href` is set. (The animated
 * lead-capture submit button is a separate primitive, CtaDefault.)
 */
export function Button({
  children,
  variant = 'primary',
  tone = 'default',
  size = 'md',
  href,
  external = false,
  onClick,
  type = 'button',
  disabled = false,
  withArrow = false,
  fullWidth = false,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = clsx(
    'ks-btn',
    `ks-btn--${variant}`,
    `ks-btn--${tone}`,
    `ks-btn--${size}`,
    fullWidth && 'ks-btn--full',
    className,
  );

  const content = (
    <>
      <span className="ks-btn__label">{children}</span>
      {withArrow && <ArrowNarrowRight className="ks-btn__arrow" aria-hidden="true" />}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
