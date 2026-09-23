/** Footer navigation link. */

import type { ReactNode } from "react";
import { IconNavTrigger } from "../icons";
import { EXTERNAL_LINK } from "../site-links";

interface FooterItemProps {
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
  chrome = "light",
  href,
  arrow = false,
  external = false,
  forceState,
  children,
}: FooterItemProps) {
  return (
    <a
      className="type fitem"
      data-chrome={chrome}
      data-state={forceState}
      href={href}
      {...(external ? EXTERNAL_LINK : {})}
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
