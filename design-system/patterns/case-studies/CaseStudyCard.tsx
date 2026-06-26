import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Text } from '@/design-system/primitives/Text';
import { MOBILE_MEDIA } from '@/design-system/tokens/breakpoints';
import { CaseStudyStats } from './CaseStudyStats';
import type { CaseStudyCardContent } from './types';

export interface CaseStudyCardProps {
  /** The story this card links to. */
  slug: string;
  content: CaseStudyCardContent;
  /**
   * `row` is the wide gallery card (photo beside copy); `tile` stacks the photo
   * above the copy for the two-up "other success stories" row. Defaults to row.
   */
  variant?: 'row' | 'tile';
}

/**
 * One customer story summarized as a link card: a photo beside (or above) a
 * short result summary, a KPI row, and an attribution line. Used in the gallery
 * column and the detail page's other-stories row. The whole card links to the
 * story's detail page. See spec 051.
 */
export function CaseStudyCard({ slug, content, variant = 'row' }: CaseStudyCardProps) {
  const { summary, stats, person, business, media } = content;
  return (
    <article className={clsx('ks-cs-card', `ks-cs-card--${variant}`)}>
      <Link
        href={`/case-studies/${slug}`}
        className="ks-cs-card__link"
        aria-label={`${business} — read the full story`}
      >
        <div className="ks-cs-card__media">
          <Image
            src={media.image}
            alt={media.alt}
            fill
            sizes={
              variant === 'row'
                ? `${MOBILE_MEDIA} 100vw, 420px`
                : `${MOBILE_MEDIA} 100vw, 50vw`
            }
            className="ks-cs-card__img"
          />
        </div>

        <div className="ks-cs-card__body">
          <Text variant="bodyLg" tone="primary" className="ks-cs-card__summary">
            {summary}
          </Text>
          <CaseStudyStats stats={stats} size="sm" className="ks-cs-card__stats" />
          <Text variant="small" tone="tertiary" className="ks-cs-card__attribution">
            <span className="ks-cs-card__person">{person}</span>
            <span className="ks-cs-card__sep" aria-hidden="true">·</span>
            <span className="ks-cs-card__business">{business}</span>
          </Text>
        </div>
      </Link>
    </article>
  );
}
