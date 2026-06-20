import type { SocialPost } from 'keystone-design-bootstrap/types';
import { Card } from '@/design-system/primitives/Card';
import { Text } from '@/design-system/primitives/Text';
import { Pill } from '@/design-system/primitives/Pill';
import { Link } from '@/design-system/primitives/Link';
import { primaryPhoto } from '@/design-system/lib/photos';
import { plainText } from '@/design-system/lib/text';

export interface SocialFeedProps {
  posts: SocialPost[];
}

function imageFor(post: SocialPost): string | null {
  if (post.image_urls && post.image_urls.length > 0) return post.image_urls[0];
  return primaryPhoto(post.photo_attachments)?.url ?? null;
}

/** Typed social-post grid: platform, optional image, and caption. */
export function SocialFeed({ posts }: SocialFeedProps) {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime(),
  );

  return (
    <div className="ks-feature-grid">
      {sorted.map((post) => {
        const image = imageFor(post);
        return (
          <Card key={post.id} tone="cream" className="ks-social-card">
            {image ? (
              <span className="ks-photo-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" />
              </span>
            ) : null}
            <Pill tone="cream" size="sm">
              {post.platform}
            </Pill>
            <Text variant="body" tone="secondary">
              {plainText(post.content_markdown, 200)}
            </Text>
            {post.external_post_url ? (
              <Link href={post.external_post_url} tone="brand" external>
                View post →
              </Link>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}
