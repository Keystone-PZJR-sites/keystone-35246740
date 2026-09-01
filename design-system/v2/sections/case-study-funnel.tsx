/** v2 sections — case-study-funnel (spec 017 §3.6). Server component,
 * born settled. A stroked line-inclusive container (7t wide at rd2 —
 * narrower than its neighbors, cols 3–10) holding head · subhead ·
 * the four funnel rows · the disclaimer. The rows are a <dl> (§8.7:
 * term = the label pill, value = the numeral; the bars are
 * presentational): bar 1 fills the row to the container pad, bars
 * 2–4 are material px (130/60/40); rows 1–2 carry the numeral inside
 * the bar, rows 3–4 outside it (16px right); the end bar is teal/400
 * with its numeral teal/800. */

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
