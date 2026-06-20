'use client';

import { useCallback, type MouseEvent } from 'react';
import { useLeadCapture } from '@/design-system/components/LeadCaptureModal';
import { GET_IN_TOUCH_HREF } from '@/design-system/constants/routes';

export { GET_IN_TOUCH_HREF };

/**
 * Centralized "Get in touch" CTA behavior:
 * - Desktop/tablet: open lead-capture modal.
 * - Mobile: route to /get-in-touch (handled in LeadCaptureProvider.openModal).
 */
export function useGetInTouchCta() {
  const { openModal } = useLeadCapture();

  const onGetInTouchClick = useCallback((event: MouseEvent<HTMLElement>) => {
    // Keep semantic links for no-JS fallback while routing behavior stays in one place.
    if (event.currentTarget instanceof HTMLAnchorElement) {
      event.preventDefault();
    }
    openModal(event.currentTarget);
  }, [openModal]);

  return {
    href: GET_IN_TOUCH_HREF,
    onGetInTouchClick,
  };
}
