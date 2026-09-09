/** Server-safe duotone grain matching Figma's `noise-duo` effect.
 * User-space filtering keeps grain size independent of the box; optional
 * clips use object-bounding-box fractions for proportional scaling. */

import { useId, type ReactNode } from "react";

interface NoiseDuoProps {
  /** Speckle size in CSS px. */
  size?: number;
  /** Total coverage from 0..1, split evenly across both inks. */
  density?: number;
  /** Ink colors and alphas. */
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
