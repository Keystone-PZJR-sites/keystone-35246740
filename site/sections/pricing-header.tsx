/** Pricing header (1129:17105 · 1170:32287 · 1170:33193): slug,
 * headline, subhead, and the chat prompt. Unpainted. */

import { IconChat } from "@keystone-sites/marketing-design-system/icons";
import { ButtonGhost } from "@keystone-sites/marketing-design-system/primitives/buttons";
import { Slug } from "@keystone-sites/marketing-design-system/primitives/slug";
import { PRICING_HEADER } from "./pricing-header-data";

export function PricingHeaderSection() {
  return (
    <section className="sec ph" data-landmark="header">
      <Slug className="ph-slug">{PRICING_HEADER.slug}</Slug>
      <h1 className="type ts-display-serif-sm-plus-thin ramp-h1 ph-h1">
        {PRICING_HEADER.headline}
      </h1>
      <p className="type ts-text-md-light ramp-body ph-sub">{PRICING_HEADER.subhead}</p>
      <div className="ph-chat">
        <span className="type type-fixed ts-text-md-light ph-q">{PRICING_HEADER.question}</span>
        <ButtonGhost size="inherit" color="brown" icon={<IconChat />} action="open-chat">
          {PRICING_HEADER.chat}
        </ButtonGhost>
      </div>
    </section>
  );
}
