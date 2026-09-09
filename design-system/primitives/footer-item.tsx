/** Footer navigation link. */

import type { ReactNode } from "react";
import { IconNavTrigger } from "../icons";

interface FooterItemProps {
  size?: "sm" | "md";
  chrome?: "light" | "dark";
  href: string;
  /** Trailing arrow glyph; tints with the label in every state. */
  arrow?: boolean;
  /** Open in a new tab (external destinations). */
  external?: boolean;
  forceState?: "hover" | "focus";
  children: ReactNode;
}

export function FooterItem({
  size = "md",
  chrome = "light",
  href,
  arrow = false,
  external = false,
  forceState,
  children,
}: FooterItemProps) {
  return (
    <a
      className="fitem"
      data-size={size}
      data-chrome={chrome}
      data-state={forceState}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="fitem-label">{children}</span>
      {arrow && (
        <span className="fitem-glyph">
          <IconNavTrigger variant="arrow" />
        </span>
      )}
    </a>
  );
}
