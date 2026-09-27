/** Price list closer (cta 1184:51962 · 52478 · 52840): the start
 * button and the chat prompt beside the note from rt; stacked and
 * centred at 384, where the button fills the column. The fill is md and
 * the ghost sm in every band, as drawn. */

import { IconChat } from "@keystone-sites/marketing-design-system/icons";
import {
  ButtonFill,
  ButtonGhost,
} from "@keystone-sites/marketing-design-system/primitives/buttons";
import { PRICE_LIST_CTA } from "./price-list-cta-data";

export function PriceListCtaSection() {
  return (
    <section className="sec uc" data-landmark="cta">
      <div className="uc-actions">
        <ButtonFill size="md" chrome="teal" href={PRICE_LIST_CTA.start.href} stretch>
          {PRICE_LIST_CTA.start.label}
        </ButtonFill>
        <span className="uc-chat">
          <span className="type type-fixed ts-text-sm-regular uc-q">{PRICE_LIST_CTA.question}</span>
          <ButtonGhost size="sm" color="brown" icon={<IconChat />} action="open-chat">
            {PRICE_LIST_CTA.chat}
          </ButtonGhost>
        </span>
      </div>
      <div className="uc-notes">
        <p className="type ts-text-sm-light uc-note">{PRICE_LIST_CTA.note}</p>
      </div>
    </section>
  );
}
