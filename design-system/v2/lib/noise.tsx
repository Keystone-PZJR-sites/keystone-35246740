/** v2 lib — the shared duotone grain primitive (spec 019 §7; owner
 * direction 2026-09-05: born shared — the 020 visibility engine is the
 * known second consumer). An SVG feTurbulence build of the file's
 * `noise-duo` effect style: two independent speckle layers (a dark ink
 * and a light ink) are cut from one turbulence field by discrete
 * thresholds, so total coverage rides `density` and each ink carries
 * its own alpha. The filter runs in user-space pixels, so the grain
 * character never scales with the box; the optional `clip` shapes are
 * objectBoundingBox fractions, so a proportional consumer (the 019
 * petal cluster) clips with ratios.
 *
 * The exact Figma noise raster is not reproducible and not required —
 * acceptance is a side-by-side character match (spec 019 §7). The
 * props are the tuning levers; the defaults carry the file's noise-duo
 * constants (size 0.5 · density 0.8 · black 15% / white 15%).
 *
 * Server-safe; the consumer positions and sizes the svg via className.
 */

import { useId, type ReactNode } from "react";

interface NoiseDuoProps {
  /** Speckle size in CSS px (the Figma noiseSize semantic — the
   * file's 0.5 is sub-pixel grain). The grain rect renders inside a
   * scaled group, so the turbulence cells land at this size. */
  size?: number;
  /** Total speckle coverage 0..1, split evenly across the two inks
   * (the file's density 0.8). */
  density?: number;
  /** Ink colors and alphas (the file's black 15% / white 15%). */
  dark?: string;
  darkAlpha?: number;
  light?: string;
  lightAlpha?: number;
  /** Optional clip shapes in objectBoundingBox units (0..1). */
  clip?: ReactNode;
  className?: string;
}

/* turbulence cell frequency in the scaled user space — one cell per
   user unit reads as one speckle per `size` CSS px */
const BASE_FREQUENCY = 0.9;

/* discrete threshold: the top `coverage` of the channel range passes —
   a fixed-step table keeps the cut stable across renderers */
function thresholdTable(coverage: number): string {
  const steps = 24;
  const cut = Math.round(steps * (1 - coverage));
  return Array.from({ length: steps }, (_, i) => (i < cut ? "0" : "1")).join(" ");
}

export function NoiseDuo({
  size = 0.5,
  density = 0.8,
  dark = "#000000",
  darkAlpha = 0.15,
  light = "#ffffff",
  lightAlpha = 0.15,
  clip,
  className,
}: NoiseDuoProps) {
  const id = useId();
  const filterId = `${id}nd`;
  const clipId = `${id}ndc`;
  const table = thresholdTable(density / 2);
  /* the rect over-sizes by 1/size and the group scales back down, so
     the user-space turbulence cells render at `size` CSS px while the
     painted area stays the full box */
  const overscan = `${100 / size}%`;
  const grain = (
    <g transform={`scale(${size})`}>
      <rect width={overscan} height={overscan} filter={`url(#${filterId})`} />
    </g>
  );
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <defs>
        <filter id={filterId} x="0" y="0" width="100%" height="100%" primitiveUnits="userSpaceOnUse">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={BASE_FREQUENCY}
            numOctaves={1}
            seed={7}
            stitchTiles="stitch"
            result="field"
          />
          {/* dark ink: the field's R channel over the threshold */}
          <feColorMatrix
            in="field"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
            result="dark-a"
          />
          <feComponentTransfer in="dark-a" result="dark-m">
            <feFuncA type="discrete" tableValues={table} />
          </feComponentTransfer>
          <feFlood floodColor={dark} floodOpacity={darkAlpha} result="dark-c" />
          <feComposite in="dark-c" in2="dark-m" operator="in" result="dark" />
          {/* light ink: the G channel — an independent speckle set */}
          <feColorMatrix
            in="field"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 1 0 0 0"
            result="light-a"
          />
          <feComponentTransfer in="light-a" result="light-m">
            <feFuncA type="discrete" tableValues={table} />
          </feComponentTransfer>
          <feFlood floodColor={light} floodOpacity={lightAlpha} result="light-c" />
          <feComposite in="light-c" in2="light-m" operator="in" result="light" />
          <feMerge>
            <feMergeNode in="dark" />
            <feMergeNode in="light" />
          </feMerge>
        </filter>
        {clip && (
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {clip}
          </clipPath>
        )}
      </defs>
      {clip ? <g clipPath={`url(#${clipId})`}>{grain}</g> : grain}
    </svg>
  );
}
