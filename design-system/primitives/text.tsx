import type { ElementType, ReactNode } from "react";

interface TextProps {
  as?: ElementType;
  className?: string;
  /** Keep the step's px size instead of following the grid (site chrome). */
  fixed?: boolean;
  children: ReactNode;
}

/** Typeset text. The element's CSS declares its step and ramp; see
 * `text.css`. */
export function Text({ as: Tag = "p", className, fixed, children }: TextProps) {
  const cls = [fixed ? "type type-fixed" : "type", className].filter(Boolean).join(" ");
  return <Tag className={cls}>{children}</Tag>;
}
