/** Opens the live site in a new tab without opener access. */

import { IconArrowRight } from "../icons";
import { EXTERNAL_LINK } from "../site-links";

interface CaseStudyButtonProps {
  label: string;
  href: string;
  size?: "lg" | "sm";
  forceState?: "hover" | "focus";
}

export function CaseStudyButton({ label, href, size = "lg", forceState }: CaseStudyButtonProps) {
  return (
    <a className="csb" href={href} {...EXTERNAL_LINK} data-size={size} data-state={forceState}>
      <span className="csb-label">{label}</span>
      <span className="csb-glyph">
        <IconArrowRight size={size === "lg" ? 24 : 20} />
      </span>
    </a>
  );
}
