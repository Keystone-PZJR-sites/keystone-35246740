'use client';

import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { Button } from '@/design-system/primitives/Button';
import { useGetInTouchCta } from '@/design-system/hooks/useGetInTouchCta';

/**
 * The universal sidebar call-to-action on a blog post. Its copy is not in the
 * post data, so it is the same on every post for now — a single hardcoded
 * Keystone promo whose action opens the standard "get in touch" flow.
 */
export function BlogPromoCard() {
  const { href, onGetInTouchClick } = useGetInTouchCta();
  return (
    <aside className="blog-promo" aria-label="Get started with Keystone">
      <Heading level={2} size="sm" font="body" tone="inverse" className="blog-promo__title">
        See how Keystone can grow your business
      </Heading>
      <Text variant="small" tone="inverse-muted" className="blog-promo__body">
        The modern sales &amp; marketing team for local businesses. Get a personalized
        walkthrough.
      </Text>
      <Button
        variant="primary"
        tone="inverse"
        size="sm"
        href={href}
        onClick={onGetInTouchClick}
        withArrow
      >
        Get started
      </Button>
    </aside>
  );
}
