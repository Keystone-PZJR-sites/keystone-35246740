import clsx from 'clsx';
import { ContentSection } from '@/design-system/sections/ContentSection';
import { Text } from '@/design-system/primitives/Text';
import type { CaseStudyChartBlock } from './types';

export interface CaseStudyChartProps {
  block: CaseStudyChartBlock;
}

/**
 * A dependency-free horizontal bar chart. Each bar's width is its value relative
 * to the largest bar in the block; the human-readable `display` sits beside the
 * label, and a `highlight` bar paints in the brand accent. Token-driven, no
 * client JS. The whole figure is exposed to assistive tech as a single image
 * with the title as its label.
 */
export function CaseStudyChart({ block }: CaseStudyChartProps) {
  const { eyebrow, title, caption, bars, footnote } = block;
  const max = Math.max(...bars.map((bar) => bar.value), 1);

  return (
    <ContentSection
      eyebrow={eyebrow}
      title={title}
      description={caption}
      ariaLabel={title ?? 'Chart'}
    >
      <figure className="ks-cs-chart-figure">
        <div className="ks-cs-chart" role="img" aria-label={title ?? 'Bar chart'}>
          {bars.map((bar) => {
            const pct = Math.max(4, Math.round((bar.value / max) * 100));
            return (
              <div key={bar.label} className="ks-cs-chart__row">
                <div className="ks-cs-chart__row-head">
                  <span className="ks-cs-chart__label">{bar.label}</span>
                  <span
                    className={clsx(
                      'ks-cs-chart__value',
                      bar.highlight && 'ks-cs-chart__value--hl',
                    )}
                  >
                    {bar.display}
                  </span>
                </div>
                <div className="ks-cs-chart__track">
                  <span
                    className={clsx('ks-cs-chart__fill', bar.highlight && 'ks-cs-chart__fill--hl')}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {footnote ? (
          <Text as="figcaption" variant="caption" tone="tertiary" className="ks-cs-chart__footnote">
            {footnote}
          </Text>
        ) : null}
      </figure>
    </ContentSection>
  );
}
