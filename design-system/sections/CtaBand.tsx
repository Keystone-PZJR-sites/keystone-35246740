import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { Button } from '@/design-system/primitives/Button';
import { CtaModalButton } from '@/design-system/components/CtaModalButton';
import { isGetInTouchHref } from '@/design-system/constants/routes';

export interface CtaBandAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface CtaBandProps {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  /** Primary action. Defaults to "Get in touch" → /get-in-touch. */
  primary?: CtaBandAction;
  /** Optional secondary action. */
  secondary?: CtaBandAction;
  /**
   * Panel color. `ink` is the default dark inset panel; `accent` is the deep
   * brand-green band (spec 037). Both carry light text.
   */
  tone?: 'ink' | 'accent';
  /**
   * Drop the rounded inset panel and page gutter so the band spans edge to
   * edge. Defaults to false (the inset panel).
   */
  fullBleed?: boolean;
}

const DEFAULT_PRIMARY: CtaBandAction = {
  label: 'Get in touch',
  href: '/get-in-touch',
};

/**
 * The closing call-to-action that ends most inner pages: a dark
 * panel on the cream page with a headline and one or two actions.
 * Built entirely from primitives.
 */
export function CtaBand({
  title,
  description,
  eyebrow,
  primary,
  secondary,
  tone = 'ink',
  fullBleed = false,
}: CtaBandProps) {
  const primaryAction = primary ?? DEFAULT_PRIMARY;
  return (
    <section
      className={clsx('ks-cta-band', fullBleed && 'ks-cta-band--full')}
      aria-label="Get started"
    >
      <div className="ks-cta-band-inner">
        <div className={clsx('ks-cta-band-panel', `ks-cta-band-panel--${tone}`)}>
          {eyebrow ? <Eyebrow tone="accent">{eyebrow}</Eyebrow> : null}
          <Heading level={2} size="lg" tone="inverse">
            {title}
          </Heading>
          {description ? (
            <Text variant="lead" tone="inverse-muted">
              {description}
            </Text>
          ) : null}
          <div className="ks-cta-band-actions">
            {isGetInTouchHref(primaryAction.href) ? (
              <CtaModalButton variant="primary" tone="inverse" size="lg" withArrow>
                {primaryAction.label}
              </CtaModalButton>
            ) : (
              <Button
                variant="primary"
                tone="inverse"
                size="lg"
                href={primaryAction.href}
                external={primaryAction.external}
                withArrow
              >
                {primaryAction.label}
              </Button>
            )}
            {secondary ? (
              <Button
                variant="secondary"
                tone="inverse"
                size="lg"
                href={secondary.href}
                external={secondary.external}
              >
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
