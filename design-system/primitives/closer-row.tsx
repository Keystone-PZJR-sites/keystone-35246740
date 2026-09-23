/** Flow closer (the faq-gaprow idiom): one painted row of 12 cells, one
 * tick below a content-sized section's last content. The page rhythm
 * reads [content] → 1t → [row] → 1t (the next section's padding-top) →
 * [content], so the grid is perceptual, carried by these rows, not by
 * whole-tick section budgets. Mount it last inside a `.sec` that pads
 * 1t inline; the row bleeds back out to the full 12 columns. */

import { GridRegion, type GridBand } from "../grid/region";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

export function CloserRow() {
  return (
    <div className="closer-row" aria-hidden="true">
      <div className="gx closer-row-bleed">
        {BANDS.map((band) => (
          <GridRegion key={band} band={band} gx={0} gy={0} gw={12} />
        ))}
      </div>
    </div>
  );
}
