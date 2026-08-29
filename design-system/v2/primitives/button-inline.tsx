/** v2 primitives — ButtonInline (spec 014 §4, set 648:41368; state
 * re-inks read from the updated set 2026-08-29 — 014 §9). The
 * View-Case-Study CTA: label in text/md/Regular with the 10px trigger
 * glyph (the 005 vocabulary) on a 4 gap — one size at every band
 * (material, the four-units taxonomy). States are CSS-driven: hover
 * inks the label up (text/300 → text/100) and advances the glyph 4px
 * right paint-in-place (the 003 glyph doctrine); :focus-visible
 * paints the row's bg/300 wash (the set's focus variant).
 *
 * With `href` it renders a real link (the /primitives rows). Without
 * one it renders a presentational <span> — the case-study card's
 * mount (014 §5 as amended 2026-08-29): the whole card is the link
 * there (the card's overlay carries the name and the interaction; the
 * dressing must not add a second tab stop). `forceState` exists for
 * the /primitives QA matrix only. */

import type { ReactNode } from "react";
import { IconNavTrigger } from "../icons";

interface ButtonInlineProps {
  /** Without an href the button is presentational dressing — the
   * mount's own link owns the interaction (the card pattern). */
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
