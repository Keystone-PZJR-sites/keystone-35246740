/** The site's CTA row: one fill button, then the chat prompt from rs
 * ("Got a question?" and a ghost button that opens the site chat). The
 * row sets `--btn-size` per band — md · lg from rt · xl from rd2 — so
 * both controls size together; a mount that wants another scale
 * restates the keyword on `.cta-row`. */

import { IconChat } from "../icons";
import { ButtonFill, ButtonGhost } from "./buttons";

export interface CtaLink {
  label: string;
  href: string;
}

interface CtaRowProps {
  cta: CtaLink;
  question?: string;
  chatLabel?: string;
  className?: string;
}

export function CtaRow({
  cta,
  question = "Got a question?",
  chatLabel = "Talk to us",
  className,
}: CtaRowProps) {
  return (
    <div className={className ? `cta-row ${className}` : "cta-row"} data-landmark="cta">
      <ButtonFill size="inherit" href={cta.href}>
        {cta.label}
      </ButtonFill>
      <span className="type type-fixed ts-text-md-light cta-row-q">{question}</span>
      <ButtonGhost size="inherit" color="brown" icon={<IconChat />} action="open-chat">
        {chatLabel}
      </ButtonGhost>
    </div>
  );
}
