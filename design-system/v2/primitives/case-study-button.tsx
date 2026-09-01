/** v2 primitives — CaseStudyButton (spec 017 §5.3, set 715:50431).
 * The underlined view-the-live-site link: label + IconArrowRight on a
 * 12 gap — material per size (lg: text/lg/Light with the 24 icon ·
 * sm: text/md/Light with the 20 icon). States are CSS-driven: hover
 * inks the label up (text/300 → text/100) and advances the glyph 4px
 * right paint-in-place (the 014 ButtonInline glyph-advance grammar on
 * the standing 003 hover clock — gap 12 → 16); :focus-visible paints
 * the bg/300 wash (the set's focus variant). The icon holds its own
 * text/500 ink through every state, as drawn.
 *
 * The destination is external by purpose (the study's live site —
 * §3.8, the site's first external link): a real <a> opening a new tab
 * with rel="noopener". `forceState` exists for the /primitives QA
 * matrix only. */

import { IconArrowRight } from "../icons";

interface CaseStudyButtonProps {
  label: string;
  href: string;
  size?: "lg" | "sm";
  forceState?: "hover" | "focus";
}

export function CaseStudyButton({ label, href, size = "lg", forceState }: CaseStudyButtonProps) {
  return (
    <a
      className="csb"
      href={href}
      target="_blank"
      rel="noopener"
      data-size={size}
      data-state={forceState}
    >
      <span className="csb-label">{label}</span>
      <span className="csb-glyph">
        <IconArrowRight size={size === "lg" ? 24 : 20} />
      </span>
    </a>
  );
}
