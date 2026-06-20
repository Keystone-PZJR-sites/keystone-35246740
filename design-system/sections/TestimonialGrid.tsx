import type { Testimonial } from 'keystone-design-bootstrap/types';
import { Card } from '@/design-system/primitives/Card';
import { Text } from '@/design-system/primitives/Text';
import { primaryPhoto, initials } from '@/design-system/lib/photos';
import { plainText } from '@/design-system/lib/text';

export interface TestimonialGridProps {
  testimonials: Testimonial[];
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span className="ks-stars" aria-label={`${rounded} out of 5 stars`}>
      {'★'.repeat(rounded)}
      <span className="ks-stars__empty">{'★'.repeat(Math.max(0, 5 - rounded))}</span>
    </span>
  );
}

/** Typed testimonial grid: quote, rating, and reviewer attribution. */
export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  const sorted = [...testimonials].sort((a, b) => {
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    return 0;
  });

  return (
    <div className="ks-feature-grid">
      {sorted.map((t) => {
        const avatar = primaryPhoto(t.photo_attachments);
        const meta = [t.reviewer_title, t.company].filter(Boolean).join(', ');
        return (
          <Card key={t.id} tone="cream" className="ks-quote-card">
            {typeof t.rating === 'number' ? <Stars rating={t.rating} /> : null}
            <Text variant="lead" tone="primary" className="ks-quote-card__body">
              “{plainText(t.content_markdown, 320)}”
            </Text>
            <div className="ks-attribution">
              <span className="ks-avatar" aria-hidden={avatar ? undefined : true}>
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatar.url} alt={avatar.alt || t.reviewer_name} />
                ) : (
                  <span className="ks-avatar__initials">{initials(t.reviewer_name)}</span>
                )}
              </span>
              <span className="ks-attribution__text">
                <Text variant="small" tone="primary" as="span" className="ks-attribution__name">
                  {t.reviewer_name}
                </Text>
                {meta ? (
                  <Text variant="caption" tone="tertiary" as="span">
                    {meta}
                  </Text>
                ) : null}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
