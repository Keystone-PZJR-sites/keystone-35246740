import clsx from 'clsx';
import { Text } from '@/design-system/primitives/Text';
import type { CaseStudyInlineCallout } from './types';

export type CaseStudyCalloutProps = CaseStudyInlineCallout & {
  className?: string;
};

/**
 * A highlighted aside. `insight` / `tip` / `metric` read as a labeled note on a
 * tinted surface; `quote` renders a short pulled line in quotation marks with an
 * optional attribution. Used both as a standalone block and nested in a prose
 * section.
 */
export function CaseStudyCallout({
  variant = 'insight',
  label,
  text,
  attribution,
  className,
}: CaseStudyCalloutProps) {
  const isQuote = variant === 'quote';
  return (
    <aside className={clsx('ks-cs-callout', `ks-cs-callout--${variant}`, className)}>
      {label ? <span className="ks-cs-callout__label">{label}</span> : null}

      {isQuote ? (
        <blockquote className="ks-cs-callout__quote">
          <span aria-hidden="true">“</span>
          {text}
          <span aria-hidden="true">”</span>
        </blockquote>
      ) : (
        <Text variant="bodyLg" tone="primary" className="ks-cs-callout__text">
          {text}
        </Text>
      )}

      {attribution ? (
        <Text variant="small" tone="tertiary" className="ks-cs-callout__attr">
          {attribution}
        </Text>
      ) : null}
    </aside>
  );
}
