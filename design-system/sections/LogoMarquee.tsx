import { Marquee } from '@/design-system/components/Marquee';

export interface LogoMarqueeProps {
  /** Company wordmarks, rendered as styled text (not logo images). */
  logos: string[];
  /** Optional lead-in label beside the scrolling row. */
  label?: string;
  /** Flip the scroll direction. Defaults to leftward. */
  reverse?: boolean;
  /** Accessible name for the region. */
  ariaLabel?: string;
}

/**
 * A lead-in label beside an infinitely scrolling row of company wordmarks
 * (text, never reproduced logo images). The seamless loop, hover-pause, and
 * reduced-motion handling come from the shared Marquee. See spec 042.
 */
export function LogoMarquee({ logos, label, reverse, ariaLabel }: LogoMarqueeProps) {
  return (
    <section className="ks-logo-marquee" aria-label={ariaLabel}>
      {label ? <p className="ks-logo-marquee__label">{label}</p> : null}
      <Marquee
        className="ks-logo-marquee__marquee"
        reverse={reverse}
        items={logos.map((logo) => (
          <span key={logo} className="ks-logo-marquee__logo">
            {logo}
          </span>
        ))}
      />
    </section>
  );
}
