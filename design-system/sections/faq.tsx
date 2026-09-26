/** Pricing FAQ (1161:26591 · 1176:41460 · 1176:41769): a heading beside
 * a single-open accordion, with the east rail painted down the twelfth
 * column. The footer follows directly; there is no gap row. */

import { GridRegion, type GridBand } from "../grid/region";
import { FaqIsland } from "./faq-island";
import { FAQ_HEAD, FAQ_ITEMS } from "./faq-data";

interface Rail {
  gx: number;
  gy: number;
  gh: number;
}

/* The static rail run per band: header rows plus six closed rows. */
const RAIL: Record<GridBand, Rail> = {
  rm: { gx: 11, gy: 0, gh: 15 },
  rs: { gx: 11, gy: 0, gh: 9 },
  rt: { gx: 11, gy: 0, gh: 6 },
  rd1: { gx: 11, gy: 0, gh: 6 },
  rd2: { gx: 11, gy: 0, gh: 6 },
};

const BANDS = Object.keys(RAIL) as GridBand[];

export function FaqSection() {
  return (
    <section className="sec faq-section" data-landmark="faq">
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => (
          <GridRegion key={band} band={band} {...RAIL[band]} />
        ))}
      </div>

      <div className="faq-header" data-landmark="header">
        {/* The 768 frame centres the heading in a two-tick sub-box. */}
        <div className="faq-head-box">
          <h2 className="type ts-display-serif-xs-extralight faq-head">{FAQ_HEAD}</h2>
        </div>
      </div>

      <FaqIsland items={FAQ_ITEMS} />
    </section>
  );
}
