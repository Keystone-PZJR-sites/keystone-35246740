/** v2 primitives — ButtonInline (spec 014 §4, set 648:41368). The
 * View-Case-Study CTA: a real link — label in text/md/Regular with the
 * 10px trigger glyph (the 005 vocabulary) on a 4 gap — one size at
 * every band (material, the four-units taxonomy). States are
 * CSS-driven: hover advances the glyph 4px right paint-in-place (the
 * 003 glyph doctrine); :focus-visible paints the row's bg/400 wash
 * (the set's focus variant). `forceState` exists for the /primitives
 * QA matrix only. */

import type { ReactNode } from "react";
import { IconNavTrigger } from "../icons";

interface ButtonInlineProps {
  href: string;
  forceState?: "hover" | "focus";
  children: ReactNode;
}

export function ButtonInline({ href, forceState, children }: ButtonInlineProps) {
  return (
    <a className="btn-inline" href={href} data-state={forceState}>
      {children}
      <span className="btn-inline-glyph">
        <IconNavTrigger variant="arrow" />
      </span>
    </a>
  );
}
