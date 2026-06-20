import { Heading } from '@/design-system/primitives/Heading';
import type { TagWithCount } from './utils';

interface BlogTopicBandProps {
  tags: TagWithCount[];
  title?: string;
}

/**
 * The full-bleed green "Explore topics" band: a centered heading above a
 * wrapping row of pills for the top topics. Each pill jumps to that topic's
 * rich section further down the gallery.
 */
export function BlogTopicBand({ tags, title = 'Explore topics' }: BlogTopicBandProps) {
  if (tags.length === 0) return null;
  return (
    <section className="blog-topic-band" aria-label={title}>
      <div className="blog-topic-band__inner">
        <Heading level={2} size="lg" tone="inverse" className="blog-topic-band__title">
          {title}
        </Heading>
        <ul className="blog-topic-band__pills">
          {tags.map((tag) => (
            <li key={tag.id}>
              <a href={`#topic-${tag.slug}`} className="blog-topic-pill">
                {tag.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
