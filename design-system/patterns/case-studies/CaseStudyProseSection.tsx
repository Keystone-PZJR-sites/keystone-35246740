import clsx from 'clsx';
import Image from 'next/image';
import { ContentSection } from '@/design-system/sections/ContentSection';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { MOBILE_MEDIA } from '@/design-system/tokens/breakpoints';
import { CaseStudyCallout } from './CaseStudyCallout';
import type { CaseStudyProseBlock } from './types';

export interface CaseStudyProseSectionProps {
  block: CaseStudyProseBlock;
}

/**
 * A readable long-form section: an optional eyebrow + heading over a stack of
 * paragraphs, with an optional supporting photo that holds its side as the prose
 * scrolls past at desktop, and an optional highlighted callout. Without media it
 * renders as a single centered measure for comfortable reading.
 */
export function CaseStudyProseSection({ block }: CaseStudyProseSectionProps) {
  const { eyebrow, title, body, media, mediaSide = 'end', callout } = block;

  const prose = (
    <div className="ks-cs-prose__copy">
      {eyebrow ? <Eyebrow tone="brand">{eyebrow}</Eyebrow> : null}
      {title ? (
        <Heading level={2} size="lg" tone="primary">
          {title}
        </Heading>
      ) : null}
      {body.map((paragraph, index) => (
        <Text key={index} variant="body" tone="secondary">
          {paragraph}
        </Text>
      ))}
      {callout ? <CaseStudyCallout {...callout} className="ks-cs-prose__callout" /> : null}
    </div>
  );

  if (!media) {
    return (
      <ContentSection ariaLabel={title ?? 'Story'} className="ks-cs-prose ks-cs-prose--solo">
        <div className="ks-cs-prose__solo-inner">{prose}</div>
      </ContentSection>
    );
  }

  return (
    <ContentSection
      ariaLabel={title ?? 'Story'}
      className={clsx('ks-cs-prose', `ks-cs-prose--media-${mediaSide}`)}
    >
      <div className="ks-cs-prose__inner">
        {prose}
        <figure className="ks-cs-prose__media">
          <Image
            src={media.image}
            alt={media.alt}
            fill
            sizes={`${MOBILE_MEDIA} 100vw, 480px`}
            className="ks-cs-prose__img"
          />
          {media.caption ? (
            <figcaption className="ks-cs-prose__cap">{media.caption}</figcaption>
          ) : null}
        </figure>
      </div>
    </ContentSection>
  );
}
