/** "Need something different?" (custom-inquiry: 1129:17222 · 1170:32930
 * · 1170:33824). Every frame is preceded by one painted twelve-column
 * lattice row (1176:41574 · 1213:54250 · 1213:54264); rs and rd1 carry
 * it from the anchors they derive from. */

import { GridRegion, type GridBand } from "@keystone-sites/marketing-design-system/grid/region";
import { IconChat } from "@keystone-sites/marketing-design-system/icons";
import { ButtonGhost } from "@keystone-sites/marketing-design-system/primitives/buttons";
import { PRICING_INQUIRY } from "./pricing-inquiry-data";

const LATTICE_BANDS: readonly GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

export function PricingInquirySection() {
  return (
    <section className="sec pinq" data-landmark="inquiry">
      <div className="gx" aria-hidden="true">
        {LATTICE_BANDS.map((band) => (
          <GridRegion key={band} band={band} gx={0} gy={0} gw={12} gh={1} />
        ))}
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
