/** Responsive service grid for the case-study stack. */

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

/* Wider bands use each icon's intrinsic cut; narrower bands scale in CSS. */
const CELL_ICONS: Record<StackCell["icon"], (size: number) => React.ReactNode> = {
  website: (s) => <IconStackWebsite size={s} />,
  ads: (s) => <IconStackAds size={s} />,
  "front-desk": (s) => <IconStackFrontDesk size={s} />,
  content: (s) => <IconStackContent size={s} />,
  reviews: (s) => <IconStackReviews size={s} />,
  reporting: (s) => <IconStackReporting size={s} />,
};

/* Intrinsic icon cuts preserve their differing visual weights. */
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
              {/* Narrow bands use the compact description. */}
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
