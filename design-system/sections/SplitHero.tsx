import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { Button } from '@/design-system/primitives/Button';
import { CtaModalButton } from '@/design-system/components/CtaModalButton';
import { isGetInTouchHref } from '@/design-system/constants/routes';

export interface SplitHeroAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface SplitHeroProps {
  /** Small label above the headline. */
  eyebrow?: ReactNode;
  /** Page H1. Rendered in the display face. */
  title: ReactNode;
  /** Supporting line beneath the title. */
  subtitle?: ReactNode;
  /** Solid primary action. */
  primary?: SplitHeroAction;
  /** Quieter secondary action. */
  secondary?: SplitHeroAction;
  /**
   * The media block beside the copy — typically a `SpotlightCard` carrying a
   * photo and an overlaid statement.
   */
  media: ReactNode;
  /** Put the media on the left instead of the right. Defaults to right. */
  mediaSide?: 'start' | 'end';
}

/**
 * A two-column page opener: an eyebrow / headline / supporting line / actions
 * column beside a single media card. Built for service and landing
 * pages that lead with a story rather than the dark `PageHero` band. Stacks to
 * one column (copy first) below the 985px boundary. See spec 037.
 */
export function SplitHero({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  media,
  mediaSide = 'end',
}: SplitHeroProps) {
  return (
    <header className={clsx('ks-split-hero', `ks-split-hero--media-${mediaSide}`)}>
      <div className="ks-split-hero__inner">
        <div className="ks-split-hero__copy">
          {eyebrow ? <Eyebrow tone="brand">{eyebrow}</Eyebrow> : null}
          <Heading level={1} size="xl" className="ks-split-hero__title">
            {title}
          </Heading>
          {subtitle ? (
            <Text variant="lead" tone="secondary" className="ks-split-hero__subtitle">
              {subtitle}
            </Text>
          ) : null}
          {(primary || secondary) && (
            <div className="ks-split-hero__actions">
              {primary ? (
                isGetInTouchHref(primary.href) ? (
                  <CtaModalButton variant="primary" size="lg">
                    {primary.label}
                  </CtaModalButton>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    href={primary.href}
                    external={primary.external}
                  >
                    {primary.label}
                  </Button>
                )
              ) : null}
              {secondary ? (
                <Button
                  variant="secondary"
                  size="lg"
                  href={secondary.href}
                  external={secondary.external}
                >
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          )}
        </div>

        <div className="ks-split-hero__media">
          {media}
        </div>
      </div>
    </header>
  );
}
