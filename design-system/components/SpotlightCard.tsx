import clsx from 'clsx';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { Play, ArrowNarrowRight } from '@untitledui/icons';
import { Card, Eyebrow, Heading, Text } from '@/design-system/primitives';
import type { HeadingSize } from '@/design-system/primitives';

// ── Types ─────────────────────────────────────────────────────────────────────

/** The card's background layer. */
export type SpotlightBackground =
  | { kind: 'image'; src: string; alt?: string }
  | { kind: 'video'; src: string; poster?: string }
  | { kind: 'gradient'; tone: 'brand' | 'mint' | 'ink' }
  | { kind: 'solid'; tone: 'cream' | 'cream-strong' | 'ink' | 'brand' };

export interface SpotlightCardProps {
  background: SpotlightBackground;
  /**
   * Darken the bottom of the card so overlaid text stays legible. Defaults to
   * true for image / video backgrounds, false for gradient / solid.
   */
  scrim?: boolean;
  /** Light or dark content. Defaults from the background. */
  textTone?: 'light' | 'dark';
  /** Vertical anchor of the text block. Defaults to bottom. */
  align?: 'top' | 'bottom';
  /** Small label above the headline. */
  eyebrow?: ReactNode;
  /** Oversized value (e.g. "+54%", "+$7M"). */
  stat?: ReactNode;
  /** Short label under the stat. */
  statLabel?: ReactNode;
  /** Headline / title. */
  title?: ReactNode;
  /** Visual size of the title, from the shared Heading scale. Defaults to `sm`. */
  titleSize?: HeadingSize;
  /**
   * Title weight. Card titles are bold by design (spec 036); `regular` is for
   * compact tiles whose copy reads as a quieter label. Defaults to `bold`.
   */
  titleWeight?: 'regular' | 'bold';
  /** Supporting copy. */
  caption?: ReactNode;
  /**
   * An arbitrary block the page supplies — a nested mini-card, a product mock,
   * an illustration. Framed inside the card above the text. Avoid interactive
   * content here when the whole card is a link (`href`).
   */
  children?: ReactNode;
  /** Fixed aspect ratio (width / height). Omit to size from content / grid. */
  aspect?: number;
  /** Make the whole card a link. Mutually exclusive with the play affordance. */
  href?: string;
  /** When the card is a link, open it in a new tab (e.g. a cross-domain URL). */
  external?: boolean;
  /**
   * A single affordance. `play` renders a real button (the card is not a link);
   * `arrow` renders a decorative forward arrow (pair it with `href`).
   */
  affordance?: 'play' | 'arrow';
  /** Accessible label for the play button. */
  affordanceLabel?: string;
  /** Click handler for the play button. */
  onPlay?: () => void;
  /**
   * A caller-supplied action — typically a `Button` — that flows as a row at
   * the top of the content, opposite the bottom-anchored text. The action is
   * the real interactive element, so the card is not turned into a whole-card
   * link (avoids nested links); give the action its own `href`. Takes
   * precedence over the decorative `arrow` affordance.
   */
  action?: ReactNode;
  /** Lift on hover. Implied when `href` is set. */
  interactive?: boolean;
  className?: string;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function defaultTextTone(bg: SpotlightBackground): 'light' | 'dark' {
  if (bg.kind === 'solid') {
    return bg.tone === 'cream' || bg.tone === 'cream-strong' ? 'dark' : 'light';
  }
  // image, video, and every gradient read on light text.
  return 'light';
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * A flexible content card built on the `Card` primitive: a transparent,
 * panel-radius Card shell carrying a background layer (photo, video, brand
 * gradient, or flat surface tone), an optional legibility scrim, and a stack of
 * eyebrow / stat / title / caption plus a page-supplied nested block. Carries at
 * most one affordance — a play button, a forward arrow, or a whole-card link.
 * One component covers every card format (spec 036); `CardGrid` composes them
 * into rows, columns, and bento layouts.
 */
export function SpotlightCard({
  background,
  scrim,
  textTone,
  align = 'bottom',
  eyebrow,
  stat,
  statLabel,
  title,
  titleSize = 'sm',
  titleWeight = 'bold',
  caption,
  children,
  aspect,
  href,
  external,
  affordance,
  affordanceLabel,
  onPlay,
  action,
  interactive,
  className,
}: SpotlightCardProps) {
  const tone = textTone ?? defaultTextTone(background);
  const isMedia = background.kind === 'image' || background.kind === 'video';
  const showScrim = scrim ?? isMedia;
  // A play button or a caller-supplied action owns interactivity, so the card
  // is not a link in those cases (no nested links); any other time an href
  // turns the whole card into a link.
  const isLink = !!href && affordance !== 'play' && !action;

  const headingTone = tone === 'light' ? 'inverse' : 'primary';
  const eyebrowTone = tone === 'light' ? 'inverse-muted' : 'brand';
  const captionTone = tone === 'light' ? 'inverse-muted' : 'tertiary';

  return (
    <Card
      as={isLink ? 'a' : 'div'}
      href={isLink ? href : undefined}
      {...(isLink && external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      tone="none"
      radius="panel"
      padded={false}
      interactive={interactive || isLink}
      className={clsx('ks-spot', `ks-spot--${tone}`, `ks-spot--align-${align}`, className)}
      style={aspect ? { aspectRatio: String(aspect) } : undefined}
    >
      {/* Background layer */}
      <span className={clsx('ks-spot__bg', `ks-spot__bg--${background.kind}`,
        background.kind === 'gradient' && `ks-spot__bg--g-${background.tone}`,
        background.kind === 'solid' && `ks-spot__bg--s-${background.tone}`)}
      >
        {background.kind === 'image' && (
          <Image
            fill
            src={background.src}
            alt={background.alt ?? ''}
            aria-hidden={background.alt ? undefined : true}
            className="ks-spot__media"
          />
        )}
        {background.kind === 'video' && (
          <video
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            poster={background.poster}
            className="ks-spot__media"
          >
            <source src={background.src} type="video/mp4" />
          </video>
        )}
      </span>

      {showScrim && <span className="ks-spot__scrim" aria-hidden="true" />}

      {/* Content */}
      <div
        className={clsx(
          'ks-spot__content',
          children && 'ks-spot__content--has-slot',
          action && 'ks-spot__content--has-action',
        )}
      >
        {action && <div className="ks-spot__action">{action}</div>}
        {children && <div className="ks-spot__slot">{children}</div>}

        {(eyebrow || stat || title || caption) && (
          <div className="ks-spot__text">
            {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
            {stat && (
              <p className="ks-spot__stat">
                <span className="ks-spot__stat-value">{stat}</span>
                {statLabel && <span className="ks-spot__stat-label">{statLabel}</span>}
              </p>
            )}
            {title && (
              <Heading
                level={3}
                size={titleSize}
                font="body"
                tone={headingTone}
                className={clsx('ks-spot__title', `ks-spot__title--${titleWeight}`)}
              >
                {title}
              </Heading>
            )}
            {caption && (
              <Text variant="small" tone={captionTone} className="ks-spot__caption">
                {caption}
              </Text>
            )}
          </div>
        )}
      </div>

      {/* Affordance */}
      {affordance === 'play' && (
        <button
          type="button"
          className="ks-spot__play"
          aria-label={affordanceLabel ?? 'Play'}
          onClick={onPlay}
        >
          <Play size={22} aria-hidden="true" />
        </button>
      )}
      {affordance === 'arrow' && !action && (
        <span className="ks-spot__arrow" aria-hidden="true">
          <ArrowNarrowRight size={20} />
        </span>
      )}
    </Card>
  );
}
