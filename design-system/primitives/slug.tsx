/** Eyebrow mark and label. Type holds per band so a dynamic crumb
 * does not wrap mid-slice. */

import type { ReactNode } from "react";

interface SlugProps {
  as?: "p" | "span";
  /** `rail` puts the mark in a 1t column so the label lines up with
   * a 1t-indented headline. */
  layout?: "inline" | "rail";
  className?: string;
  "aria-hidden"?: boolean;
  children: ReactNode;
}

export function Slug({
  as: Tag = "p",
  layout = "inline",
  className,
  "aria-hidden": ariaHidden,
  children,
}: SlugProps) {
  return (
    <Tag
      className={className ? `slug ${className}` : "slug"}
      data-layout={layout === "rail" ? "rail" : undefined}
      aria-hidden={ariaHidden}
    >
      <i className="slug-mark" aria-hidden="true" />
      <span className="slug-label">{children}</span>
    </Tag>
  );
}
