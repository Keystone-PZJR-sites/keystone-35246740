import Image from 'next/image';
import { Text } from '@/design-system/primitives/Text';
import { MOBILE_MEDIA } from '@/design-system/tokens/breakpoints';
import { CaseStudyStats } from './CaseStudyStats';
import type { CaseStudyQuoteContent } from './types';

export interface CaseStudyQuoteProps {
  content: CaseStudyQuoteContent;
}

/**
 * The emotional peak: a large pull quote and its attribution, a row of result
 * statistics, and a supporting photo filling one side of a dark panel. Stacks
 * at mobile, quote first. See spec 051.
 */
export function CaseStudyQuote({ content }: CaseStudyQuoteProps) {
  const { quote, attribution, results, media } = content;
  return (
    <section className="ks-cs-quote" aria-label="In their words">
      <div className="ks-cs-quote__inner">
        <figure className="ks-cs-quote__body">
          <blockquote className="ks-cs-quote__text">
            <span aria-hidden="true">“</span>
            {quote}
            <span aria-hidden="true">”</span>
          </blockquote>
          <Text as="figcaption" variant="small" tone="inverse-muted" className="ks-cs-quote__attribution">
            {attribution}
          </Text>
          <CaseStudyStats stats={results} tone="light" size="sm" className="ks-cs-quote__stats" />
        </figure>

        <div className="ks-cs-quote__media">
          <Image
            src={media.image}
            alt={media.alt}
            fill
            sizes={`${MOBILE_MEDIA} 100vw, 440px`}
            className="ks-cs-quote__img"
          />
        </div>
      </div>
    </section>
  );
}
