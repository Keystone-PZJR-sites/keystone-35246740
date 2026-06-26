import clsx from 'clsx';
import Image from 'next/image';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { MOBILE_MEDIA } from '@/design-system/tokens/breakpoints';
import type { CaseStudyNarrativeContent } from './types';

export interface CaseStudyNarrativeProps {
  content: CaseStudyNarrativeContent;
}

/**
 * The story body: a column of short heading + paragraph blocks beside a single
 * supporting photo that holds its side as the prose scrolls past at desktop.
 * Stacks at mobile, prose first. See spec 051.
 */
export function CaseStudyNarrative({ content }: CaseStudyNarrativeProps) {
  const { blocks, media, mediaSide = 'end' } = content;
  return (
    <section
      className={clsx('ks-cs-narrative', `ks-cs-narrative--media-${mediaSide}`)}
      aria-label="The story"
    >
      <div className="ks-cs-narrative__inner">
        <div className="ks-cs-narrative__prose">
          {blocks.map((block) => (
            <div key={block.id} className="ks-cs-narrative__block">
              <Heading level={2} size="md" font="body" tone="primary">
                {block.heading}
              </Heading>
              <Text variant="body" tone="tertiary">
                {block.body}
              </Text>
            </div>
          ))}
        </div>

        <div className="ks-cs-narrative__media">
          <Image
            src={media.image}
            alt={media.alt}
            fill
            sizes={`${MOBILE_MEDIA} 100vw, 480px`}
            className="ks-cs-narrative__img"
          />
        </div>
      </div>
    </section>
  );
}
