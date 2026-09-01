/** v2 sections — case-study-stack (spec 017 §3.7). Server component,
 * born settled. The services table: a stroked header block over a
 * table of stroked cells, every edge a shared line-inclusive hairline
 * (the 011 R17 law). At rt+ a logo cell (the bg/300 radius-8 chip
 * holding the standing registry logomark) leads the 3×2 service
 * grid; at rm/rs the six cells run 2×3 with no logo cell. Cell
 * icons are the §5.4 hue-toned exports at per-band material sizes
 * (rd1/rd2 mount each icon's intrinsic cut). */

import {
  IconStackAds,
  IconStackContent,
  IconStackFrontDesk,
  IconStackReporting,
  IconStackReviews,
  IconStackWebsite,
} from "../icons";
import type { CaseStudy, StackCell } from "./case-study-data";
import { CaseStudyLattice } from "./case-study-lattice";

/* per-icon intrinsic cuts (the rd1/rd2 mounts); smaller bands scale
   them uniformly via the cell's icon box (fills scale cleanly) */
const CELL_ICONS: Record<StackCell["icon"], (size: number) => React.ReactNode> = {
  website: (s) => <IconStackWebsite size={s} />,
  ads: (s) => <IconStackAds size={s} />,
  "front-desk": (s) => <IconStackFrontDesk size={s} />,
  content: (s) => <IconStackContent size={s} />,
  reviews: (s) => <IconStackReviews size={s} />,
  reporting: (s) => <IconStackReporting size={s} />,
};

/* the drawn rd1/rd2 per-icon boxes (§3.7 as read — 32/28/32/28/26/30) */
const ICON_CUTS: Record<StackCell["icon"], number> = {
  website: 32,
  ads: 28,
  "front-desk": 32,
  content: 28,
  reviews: 26,
  reporting: 30,
};

function ServiceCell({ cell }: { cell: StackCell }) {
  return (
    <li className="cst-cell" data-icon={cell.icon}>
      <span className="cst-icon" aria-hidden="true">
        {CELL_ICONS[cell.icon](ICON_CUTS[cell.icon])}
      </span>
      <div className="cst-cell-text">
        <p className="cst-title">{cell.title}</p>
        <p className="cst-desc">
          {cell.descShort ? (
            <>
              {/* designed per-band shortening (§9 F4f): the short
                  string at rm/rs, the full one from rt */}
              <span className="cst-desc-short">{cell.descShort}</span>
              <span className="cst-desc-full">{cell.desc}</span>
            </>
          ) : (
            cell.desc
          )}
        </p>
      </div>
    </li>
  );
}

export function CaseStudyStackSection({ study }: { study: CaseStudy }) {
  return (
    <section className="sec cs-sec cst-sec" id="stack" aria-labelledby="stack-h">
      <CaseStudyLattice section="stack" />
      <div className="cs-content cst-content" data-landmark="stack">
        <div className="cst-header">
          <h2 className="cs-h2 cs-type" id="stack-h">
            {study.stack.head}
          </h2>
          <p className="cs-body cs-type cst-subhead">{study.stack.subhead}</p>
        </div>
        <div className="cst-table">
          <div className="cst-logo-cell" aria-hidden="true">
            <span className="cst-logo-chip">
              <i className="cst-logomark" />
            </span>
          </div>
          <ul className="cst-cells">
            {study.stack.cells.map((cell) => (
              <ServiceCell key={cell.icon} cell={cell} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
