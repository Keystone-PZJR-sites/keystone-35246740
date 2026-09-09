/** Semantic funnel rows with presentational proportional bars. */

import type { CaseStudy } from "./case-study-data";
import { CaseStudyLattice } from "./case-study-lattice";

export function CaseStudyFunnelSection({ study }: { study: CaseStudy }) {
  return (
    <section className="sec cs-sec csf-sec" id="funnel" aria-labelledby="funnel-h">
      <CaseStudyLattice section="funnel" />
      <div className="cs-content csf-content" data-landmark="funnel">
        <div className="csf-box">
          <h2 className="cs-h2 cs-type" id="funnel-h">
            {study.funnel.head}
          </h2>
          <p className="cs-body cs-type csf-subhead">{study.funnel.subhead}</p>
          <dl className="csf-rows">
            {study.funnel.rows.map((row, i) => (
              <div className="csf-row" key={row.label} data-end={i === study.funnel.rows.length - 1 || undefined}>
                <dt className="csf-label">
                  <span className="cs-pill">{row.label}</span>
                </dt>
                <dd className="csf-value">
                  <i
                    className="csf-bar"
                    aria-hidden="true"
                    data-fill={row.bar === "fill" || undefined}
                    style={row.bar !== "fill" ? { width: `${row.bar}px` } : undefined}
                  >
                    {(i === 0 || i === 1) && <span className="csf-num">{row.value}</span>}
                  </i>
                  {i > 1 && <span className="csf-num csf-num-out">{row.value}</span>}
                </dd>
              </div>
            ))}
          </dl>
          <p className="csf-disclaimer">{study.funnel.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
