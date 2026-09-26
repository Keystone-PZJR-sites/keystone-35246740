/** "Need something different?" (custom-inquiry: 1129:17222 · 1170:32930
 * · 1170:33824). The 1344 frame is preceded by one painted lattice row
 * (1176:41574); the narrower frames sit in unpainted air. */

import { GridRegion } from "../grid/region";
import { IconChat } from "../icons";
import { ButtonGhost } from "../primitives/buttons";
import { PRICING_INQUIRY } from "./pricing-inquiry-data";

export function PricingInquirySection() {
  return (
    <section className="sec pinq" data-landmark="inquiry">
      <div className="gx" aria-hidden="true">
        <GridRegion band="rd2" gx={0} gy={0} gw={12} gh={1} />
      </div>
      {/* Three grid children: the button shares the body's row at 384 and
          spans both rows from 768. */}
      <h2 className="type ts-display-serif-xs-light pinq-head">{PRICING_INQUIRY.heading}</h2>
      <p className="type ts-text-md-light pinq-body">{PRICING_INQUIRY.body}</p>
      <div className="pinq-cta">
        <ButtonGhost size="inherit" color="brown" icon={<IconChat />} action="open-chat">
          {PRICING_INQUIRY.chat}
        </ButtonGhost>
      </div>
    </section>
  );
}
