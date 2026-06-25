import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export type CardTone = 'cream' | 'ink' | 'none';
export type CardRadius = 'component' | 'panel';

export interface CardOwnProps {
  children: ReactNode;
  /**
   * Background + default text color the card sits on. Defaults to cream.
   * `none` is transparent with no border or shadow — for cards whose own
   * children paint the surface (e.g. SpotlightCard's media / gradient layer).
   */
  tone?: CardTone;
  /** Corner-radius scale. `panel` is the larger feature-card radius. Defaults to `component`. */
  radius?: CardRadius;
  /** Standard internal padding. Off for cards whose children own their padding. Defaults to true. */
  padded?: boolean;
  /** Lift on hover (for cards that link somewhere). */
  interactive?: boolean;
  as?: ElementType;
  className?: string;
}

export type CardProps = CardOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, keyof CardOwnProps> & {
    /** Present when the card renders as an anchor (as="a"). */
    href?: string;
    /** Anchor target (e.g. "_blank" for external links). */
    target?: string;
    /** Anchor rel — pair "noopener noreferrer" with target="_blank". */
    rel?: string;
  };

/**
 * The shared card foundation: a rounded box with a tone, optional border /
 * shadow, internal padding, and a hover lift. The building block for value
 * props, services, team members, blog cards, etc. — and the shell that
 * `SpotlightCard` builds on for its larger media tiles. Extra props (e.g. href
 * when `as="a"`) are forwarded to the underlying element.
 */
export function Card({
  children,
  tone = 'cream',
  radius = 'component',
  padded = true,
  interactive = false,
  as: Tag = 'div',
  className,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={clsx(
        'ks-card',
        `ks-card--${tone}`,
        radius === 'panel' && 'ks-card--panel',
        !padded && 'ks-card--flush',
        interactive && 'ks-card--interactive',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
