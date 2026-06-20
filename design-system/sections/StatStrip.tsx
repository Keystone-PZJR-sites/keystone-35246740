import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';

export interface Stat {
  value: string;
  label: string;
  /** Optional one-line description beneath the label. */
  description?: string;
}

export interface StatStripProps {
  stats: Stat[];
  /** Color family. Defaults to ink (dark band). */
  tone?: 'cream' | 'ink';
}

/** A row of headline statistics. Static, copy-driven. */
export function StatStrip({ stats, tone = 'ink' }: StatStripProps) {
  const inverse = tone === 'ink';
  return (
    <div className="ks-stat-strip">
      {stats.map((stat) => (
        <div key={stat.label} className="ks-stat">
          <Heading level={3} size="lg" tone={inverse ? 'accent' : 'brand'}>
            {stat.value}
          </Heading>
          <Text variant="small" tone={inverse ? 'inverse' : 'primary'}>
            {stat.label}
          </Text>
          {stat.description ? (
            <Text variant="small" tone={inverse ? 'inverse-muted' : 'tertiary'}>
              {stat.description}
            </Text>
          ) : null}
        </div>
      ))}
    </div>
  );
}
