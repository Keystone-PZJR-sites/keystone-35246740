/** Without an href, this CTA remains presentational for a parent link. */

import type { ReactNode } from "react";
import { IconNavTrigger } from "../icons";

interface ButtonInlineProps {
  /** Without an href, the parent owns the interaction. */
  href?: string;
  forceState?: "hover" | "focus";
  children: ReactNode;
}

export function ButtonInline({ href, forceState, children }: ButtonInlineProps) {
  const content = (
    <>
      {children}
      <span className="btn-inline-glyph">
        <IconNavTrigger variant="arrow" />
      </span>
    </>
  );
  if (href !== undefined) {
    return (
      <a className="btn-inline" href={href} data-state={forceState}>
        {content}
      </a>
    );
  }
  return (
    <span className="btn-inline" data-state={forceState}>
      {content}
    </span>
  );
}
