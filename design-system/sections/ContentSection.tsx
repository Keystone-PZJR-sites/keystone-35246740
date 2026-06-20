import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';

export interface ContentSectionProps {
  children: ReactNode;
  /** Optional eyebrow above the section title. */
  eyebrow?: ReactNode;
  /** Optional section title (H2). */
  title?: ReactNode;
  /** Optional supporting copy beneath the title. */
  description?: ReactNode;
  /** Center the heading block. Defaults to left-aligned. */
  centered?: boolean;
  /** Dark "ink" section instead of the default cream. */
  tone?: 'cream' | 'ink';
  /** Landmark label for assistive tech. */
  ariaLabel?: string;
  /** Anchor id, so in-page links (e.g. a hero CTA) can jump to the section. */
  id?: string;
  className?: string;
}

/**
 * A full-width inner-page section: token-driven vertical rhythm, a
 * centered max-width container, and an optional heading block built
 * from design-system primitives. Page bodies stack these.
 */
export function ContentSection({
  children,
  eyebrow,
  title,
  description,
  centered = false,
  tone = 'cream',
  ariaLabel,
  id,
  className,
}: ContentSectionProps) {
  const inverse = tone === 'ink';
  return (
    <section
      id={id}
      className={clsx('ks-section', tone === 'ink' && 'ks-section--ink', className)}
      aria-label={ariaLabel}
    >
      <div className="ks-section-inner">
        {(eyebrow || title || description) && (
          <div className={clsx('ks-section-head', centered && 'ks-section-head--center')}>
            {eyebrow ? <Eyebrow tone={inverse ? 'accent' : 'brand'}>{eyebrow}</Eyebrow> : null}
            {title ? (
              <Heading level={2} size="lg" tone={inverse ? 'inverse' : 'primary'}>
                {title}
              </Heading>
            ) : null}
            {description ? (
              <Text variant="lead" tone={inverse ? 'inverse-muted' : 'secondary'}>
                {description}
              </Text>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
