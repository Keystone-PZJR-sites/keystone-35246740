import Link from 'next/link';
import type { BlogPost } from 'keystone-design-bootstrap/types';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import type { TagWithCount } from './utils';
import { BlogPostCard } from './BlogPostCard';
import { BlogHighlightCard } from './BlogHighlightCard';

interface BlogCategorySectionProps {
  tag: TagWithCount;
  posts: BlogPost[];
}

/**
 * One rich, editorial section for a top topic: a left rail (topic name, the
 * tag's own description, and a "View all" link to the filtered gallery) beside
 * a feature post and up to two smaller posts. Anchored by `#topic-<slug>` so
 * the topic band's pills can jump here.
 */
export function BlogCategorySection({ tag, posts }: BlogCategorySectionProps) {
  if (posts.length === 0) return null;
  const [feature, ...rest] = posts;
  const secondary = rest.slice(0, 2);

  return (
    <section id={`topic-${tag.slug}`} className="blog-cat" aria-label={tag.name}>
      <div className="blog-cat__rail">
        <Heading level={2} size="lg" className="blog-cat__title">
          {tag.name}
        </Heading>
        {tag.description && (
          <Text variant="body" tone="tertiary" className="blog-cat__desc">
            {tag.description}
          </Text>
        )}
        <Link href={`/blog?tag=${tag.slug}`} className="blog-cat__view-all">
          View all
          <span aria-hidden="true"> →</span>
        </Link>
      </div>

      <div className="blog-cat__feature">
        <BlogPostCard post={feature} />
      </div>

      {secondary.length > 0 && (
        <div className="blog-cat__secondary">
          {secondary.map((post) => (
            <BlogHighlightCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
