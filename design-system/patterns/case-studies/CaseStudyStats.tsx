import clsx from 'clsx';
import type { CaseStudyStat } from './types';

export interface CaseStudyStatsProps {
  stats: CaseStudyStat[];
  /** Light text for dark / green surfaces. Defaults to dark (cream surface). */
  tone?: 'dark' | 'light';
  /** Compact row used inside cards; default is the larger hero row. */
  size?: 'sm' | 'lg';
  className?: string;
}

/**
 * A horizontal row of headline statistics — an oversized value over a small
 * label. Shared by the hero, the before/after cards, the pull quote, and the
 * gallery story card so every KPI row reads the same. Purely presentational.
 */
export function CaseStudyStats({ stats, tone = 'dark', size = 'lg', className }: CaseStudyStatsProps) {
  return (
    <dl className={clsx('ks-cs-stats', `ks-cs-stats--${tone}`, `ks-cs-stats--${size}`, className)}>
      {stats.map((stat) => (
        <div key={stat.label} className="ks-cs-stat">
          <dt className="ks-cs-stat__value">{stat.value}</dt>
          <dd className="ks-cs-stat__label">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}
