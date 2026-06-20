'use client';

import { useCallback, type MouseEvent } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Both the desktop and mobile pricing sections carry `data-pricing-anchor`,
// but only one is laid out at a given breakpoint. We pick the visible one
// (`offsetParent` is null for a `display: none` element) so the scroll target
// is correct on either viewport.
function getVisiblePricingTarget(): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  const candidates = document.querySelectorAll<HTMLElement>('[data-pricing-anchor]');
  for (const el of candidates) {
    if (el.offsetParent !== null) return el;
  }
  return candidates[0] ?? null;
}

/**
 * Click handler for the "Pricing" nav item. On the homepage it scrolls to the
 * pricing area — through ScrollSmoother when active (desktop), or native smooth
 * scroll otherwise (mobile). Falls back to the link's href when the target is
 * absent (e.g. navigating from another page).
 */
export function useScrollToPricing(onNavigate?: () => void) {
  return useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    const target = getVisiblePricingTarget();
    if (!target) return;

    event.preventDefault();
    onNavigate?.();

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(target, true, 'top top');
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [onNavigate]);
}
