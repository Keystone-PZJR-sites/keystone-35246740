'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { firePixelEvent } from 'keystone-design-bootstrap/tracking';

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Customer-site patch: track industry landing pages as ViewContent.
 *
 * Keystone design-bootstrap does not currently include `/industries` route
 * mappings in MetaPixelTracker, so industry paid-traffic landings can be
 * missed in Meta Events Manager. This local tracker closes that gap without
 * changing shared bootstrap code.
 */
export function IndustryPageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const industrySlugMatch = pathname.match(/^\/industries\/(.+)$/);
    if (industrySlugMatch) {
      firePixelEvent('ViewContent', {
        contentName: slugToTitle(industrySlugMatch[1]),
        contentCategory: 'Industry',
      });
      return;
    }

    if (pathname === '/industries') {
      firePixelEvent('ViewContent', {
        contentName: 'Industries',
        contentCategory: 'Industries',
      });
    }
  }, [pathname]);

  return null;
}
