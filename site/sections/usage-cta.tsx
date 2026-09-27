/** Usage price list closer (cta 1184:51962 · 52478 · 52840): the start
 * button and the chat prompt beside the two notes from rt; stacked and
 * centred at 384, where the button fills the column. The fill is md and
 * the ghost sm in every band, as drawn. */

import { IconChat } from "@keystone-sites/marketing-design-system/icons";
import {
  ButtonFill,
  ButtonGhost,
} from "@keystone-sites/marketing-design-system/primitives/buttons";
import { USAGE_CTA } from "./usage-cta-data";

export function UsageCtaSection() {
  return (
    <section className="sec uc" data-landmark="cta">
      <div className="uc-actions">
        <ButtonFill size="md" chrome="teal" href={USAGE_CTA.start.href} stretch>
          {USAGE_CTA.start.label}
        </ButtonFill>
        <span className="uc-chat">
          <span className="type type-fixed ts-text-sm-regular uc-q">{USAGE_CTA.question}</span>
          <ButtonGhost size="sm" color="brown" icon={<IconChat />} action="open-chat">
            {USAGE_CTA.chat}
          </ButtonGhost>
        </span>
      </div>
      <div className="uc-notes">
        <p className="type ts-text-sm-light uc-note">{USAGE_CTA.note}</p>
        <p className="type ts-text-xs-regular uc-footnote">{USAGE_CTA.footnote}</p>
      </div>
    </section>
  );
}
