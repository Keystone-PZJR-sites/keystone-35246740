import Image from 'next/image';
import { ContentSection } from '@/design-system/sections/ContentSection';
import { Text } from '@/design-system/primitives/Text';
import type { CaseStudyGalleryBlock } from './types';

export interface CaseStudyGalleryProps {
  block: CaseStudyGalleryBlock;
}

/**
 * A responsive grid of supporting photos with optional per-image captions and a
 * closing note. Sized from the image count so two-up and three-up galleries both
 * read cleanly.
 */
export function CaseStudyGallery({ block }: CaseStudyGalleryProps) {
  const { eyebrow, title, caption, images } = block;
  return (
    <ContentSection eyebrow={eyebrow} title={title} centered ariaLabel={title ?? 'Gallery'}>
      <div className="ks-cs-photogrid" data-count={images.length}>
        {images.map((image) => (
          <figure key={image.image} className="ks-cs-photogrid__item">
            <div className="ks-cs-photogrid__media">
              <Image
                src={image.image}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 90vw, 360px"
                className="ks-cs-photogrid__img"
              />
            </div>
            {image.caption ? (
              <figcaption className="ks-cs-photogrid__cap">{image.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {caption ? (
        <Text variant="caption" tone="tertiary" className="ks-cs-photogrid__note">
          {caption}
        </Text>
      ) : null}
    </ContentSection>
  );
}
