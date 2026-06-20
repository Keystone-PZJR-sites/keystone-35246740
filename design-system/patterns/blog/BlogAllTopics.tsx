import Link from 'next/link';
import { Heading } from '@/design-system/primitives/Heading';
import type { TagWithCount } from './utils';

interface BlogAllTopicsProps {
  tags: TagWithCount[];
  title?: string;
}

/**
 * The full flat tag list — every topic as a chip linking to its filtered
 * gallery, with its article count. This guarantees every tag is reachable even
 * though only the top few get a rich section above.
 */
export function BlogAllTopics({ tags, title = 'All topics' }: BlogAllTopicsProps) {
  if (tags.length === 0) return null;
  return (
    <section className="blog-all-topics" aria-label={title}>
      <Heading level={2} size="md" className="blog-section-heading">
        {title}
      </Heading>
      <ul className="blog-all-topics__chips">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link href={`/blog?tag=${tag.slug}`} className="blog-chip">
              <span className="blog-chip__label">{tag.name}</span>
              <span className="blog-chip__count">{tag.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
