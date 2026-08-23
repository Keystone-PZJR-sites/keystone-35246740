/** v2 primitives — Text and InterpText (spec 003 §7).
 *
 * Text applies one Figma text style from the type tokens by name
 * (`--ts-<name>-font/-ls/-opsz`), with the optical size pinned. Kyoto
 * (serif) styles carry no opsz token; the fallback resolves to the GT
 * Standard default and is ignored by fonts without the axis.
 *
 * InterpText rides the band weights (spec 002): the consumer's own CSS
 * restates the unitless px pairs `--fs0/--fs1/--lh0/--lh1` per band —
 * those values are section design data and never live in the primitive.
 */

import type { CSSProperties, ElementType, ReactNode } from "react";

interface TextProps {
  /** Token type-style name, e.g. "text-md-regular" or
   * "display-serif-2xl-light" (see tokens/type.css). */
  style: string;
  as?: ElementType;
  color?: string;
  className?: string;
  children: ReactNode;
}

export function Text({ style, as: Tag = "p", color, className, children }: TextProps) {
  const css: CSSProperties = {
    font: `var(--ts-${style}-font)`,
    letterSpacing: `var(--ts-${style}-ls)`,
    fontVariationSettings: `"opsz" var(--ts-${style}-opsz, 10)`,
    ...(color && { color: `var(--color-${color})` }),
  };
  return (
    <Tag className={className ? `v2-text ${className}` : "v2-text"} style={css}>
      {children}
    </Tag>
  );
}

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
    fontVariationSettings: `"opsz" var(--ts-${style}-opsz, 10)`,
  } as CSSProperties;
  return (
    <Tag className={className ? `v2-interp ${className}` : "v2-interp"} style={css}>
      {children}
    </Tag>
  );
}
