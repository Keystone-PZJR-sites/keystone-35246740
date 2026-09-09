/** Interpolated type driven by each section's band-specific size and
 * line-height pairs. Pinning the slant axis prevents WebKit from
 * rendering GT Standard as oblique. */

import type { CSSProperties, ElementType, ReactNode } from "react";

interface InterpTextProps {
  /** Class hook under which the consumer's CSS restates the per-band
   * pairs; the primitive only wires family/weight/tracking/opsz. */
  style: string;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function InterpText({ style, as: Tag = "p", className, children }: InterpTextProps) {
  const css: CSSProperties = {
    "--_ts-font": `var(--ts-${style}-font)`,
    letterSpacing: `var(--ts-${style}-ls)`,
    fontVariationSettings: `"opsz" var(--ts-${style}-opsz, 10), var(--font-sans-slnt)`,
  } as CSSProperties;
  return (
    <Tag className={className ? `interpolated-text ${className}` : "interpolated-text"} style={css}>
      {children}
    </Tag>
  );
}
