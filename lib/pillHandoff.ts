/**
 * Module-level store for sharing EveryChannel pill viewport positions
 * with ProductScreens. Using a plain store (not React state) avoids
 * re-renders — positions are captured once when EveryChannel reaches
 * its Complete state and read once at the start of ProductScreens'
 * entrance animation.
 */

let _pillRectsMap = new Map<string, DOMRect>();

/**
 * Called by EveryChannel when masterTl reaches Complete state.
 * Captures current viewport-relative rects for each labelled pill.
 */
export function registerEveryChannelPillRects(map: Map<string, DOMRect>): void {
  _pillRectsMap = map;
}

/**
 * Called by ProductScreens at the start of its entrance animation.
 * Returns the stored map — empty if EveryChannel hasn't completed yet
 * (visitor jumped directly to the section).
 */
export function getEveryChannelPillRects(): Map<string, DOMRect> {
  return _pillRectsMap;
}
