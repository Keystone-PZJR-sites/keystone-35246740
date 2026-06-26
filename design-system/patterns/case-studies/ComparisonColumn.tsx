import clsx from 'clsx';
import { Check } from '@untitledui/icons';
import { Text } from '@/design-system/primitives/Text';
import { CaseStudyStats } from './CaseStudyStats';
import type { CaseStudyComparisonColumn } from './types';

export interface ComparisonColumnProps {
  column: CaseStudyComparisonColumn;
  /**
   * `before` is the quiet cream card; `after` is the brand-green card with light
   * text. Drives the surface and the stat / text tones.
   */
  variant: 'before' | 'after';
}

/**
 * One side of the before / after contrast: a label, a KPI row, and a short list
 * of plain points. The `after` variant sits on the brand green with light text.
 * See spec 051.
 */
export function ComparisonColumn({ column, variant }: ComparisonColumnProps) {
  const isAfter = variant === 'after';
  return (
    <div className={clsx('ks-cs-compare__col', `ks-cs-compare__col--${variant}`)}>
      <Text
        variant="caption"
        tone={isAfter ? 'inverse' : 'tertiary'}
        className="ks-cs-compare__label"
      >
        {column.label}
      </Text>

      <CaseStudyStats stats={column.stats} tone={isAfter ? 'light' : 'dark'} size="sm" />

      <ul className="ks-cs-compare__points">
        {column.points.map((point, index) => (
          <li key={index} className="ks-cs-compare__point">
            {isAfter ? (
              <Check className="ks-cs-compare__point-icon" aria-hidden="true" />
            ) : (
              <span className="ks-cs-compare__point-dot" aria-hidden="true" />
            )}
            <Text
              variant="small"
              tone={isAfter ? 'inverse-muted' : 'secondary'}
              as="span"
            >
              {point}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
