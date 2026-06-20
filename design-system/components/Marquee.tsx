import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface MarqueeProps {
  /** One set of items. The component duplicates them for a seamless loop. */
  items: ReactNode[];
  /** Flip the scroll direction. Defaults to leftward. */
  reverse?: boolean;
  /** Accessible name for the region. Omit for purely decorative strips. */
  ariaLabel?: string;
  className?: string;
}

/**
 * A clipped, edge-faded viewport whose track scrolls a duplicated set of items
 * in a seamless infinite loop. The per-item gap is a trailing margin (not a flex
 * gap) so the two halves tile exactly under translateX(-50%). Scrolling pauses
 * on hover and stops under reduced motion. Layout only — it never styles the
 * items it carries. See spec 043 (LogoMarquee builds on this).
 */
export function Marquee({ items, reverse, ariaLabel, className }: MarqueeProps) {
  return (
    <div
      className={clsx('ks-marquee', reverse && 'ks-marquee--reverse', className)}
      role={ariaLabel ? 'group' : undefined}
      aria-label={ariaLabel}
    >
      <div className="ks-marquee__viewport">
        <ul className="ks-marquee__track">
          {items.map((item, i) => (
            <li key={`a-${i}`} className="ks-marquee__item">
              {item}
            </li>
          ))}
          {items.map((item, i) => (
            <li key={`b-${i}`} className="ks-marquee__item" aria-hidden="true">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
