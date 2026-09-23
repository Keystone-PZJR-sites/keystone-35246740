import type { ElementType, ReactNode } from "react";

interface TextProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Typeset text. The element's CSS declares its step and ramp; see
 * `text.css`. */
export function Text({ as: Tag = "p", className, children }: TextProps) {
  return <Tag className={className ? `type ${className}` : "type"}>{children}</Tag>;
}
