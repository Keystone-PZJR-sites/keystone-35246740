/**
 * Responsive breakpoints for the JavaScript / JSX side of the app — the single
 * place the numbers live for `matchMedia` gates, GSAP `matchMedia`, `<source
 * media>` video swaps, `<link media>` preloads, `window.innerWidth` checks, and
 * responsive image `sizes`.
 *
 * CSS does **not** import from here. Stylesheets read the same values from the
 * Tailwind theme at build time via `theme(--breakpoint-md)` /
 * `theme(--breakpoint-xl)` (see `design-system/tokens/tokens.css`). There is no
 * way to share a single literal across CSS and JS without a build step, so this
 * file mirrors the theme tokens: keep `DESKTOP_MIN_PX` in sync with
 * `--breakpoint-md` and `LARGE_DESKTOP_MIN_PX` with Tailwind's `--breakpoint-xl`.
 */

/**
 * The one mobile↔desktop boundary, used app-wide. Below this width every
 * section renders its mobile layout; at this width and up the desktop layout
 * takes over. Mirrors `--breakpoint-md` (985px) in `tokens.css`.
 */
export const DESKTOP_MIN_PX = 985;

/**
 * Large-desktop refinement tier — proportional polish on a few content pages,
 * never a mobile↔desktop swap. Mirrors Tailwind's default `--breakpoint-xl`.
 */
export const LARGE_DESKTOP_MIN_PX = 1280;

/** `(min-width: 985px)` — matches the desktop range. */
export const DESKTOP_MEDIA = `(min-width: ${DESKTOP_MIN_PX}px)`;

/** `(max-width: 984px)` — matches the mobile range (boundary minus one pixel). */
export const MOBILE_MEDIA = `(max-width: ${DESKTOP_MIN_PX - 1}px)`;
