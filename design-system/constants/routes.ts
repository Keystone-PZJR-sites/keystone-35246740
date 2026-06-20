// Plain route constants shared by both server and client modules. Keeping these
// out of any 'use client' file means server components can compare against the
// actual string value (a 'use client' export would arrive as a client
// reference, not the literal).

/** The lead-capture ("get a free demo") destination. */
export const GET_IN_TOUCH_HREF = '/get-in-touch';

/**
 * True when an href targets the lead-capture destination. Such CTAs render as
 * the shared CtaModalButton, which opens the demo modal instead of navigating.
 * Tolerates a trailing slash (Next emits canonical trailing-slash URLs).
 */
export function isGetInTouchHref(href: string): boolean {
  return href.replace(/\/+$/, '') === GET_IN_TOUCH_HREF;
}
