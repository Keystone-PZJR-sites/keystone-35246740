/** Overview narrative, items, and frame-bottom stat row. */

import type { CaseStudy } from "./case-study-data";
import { CaseStudyFeatureList } from "./case-study-feature-list";
import { CaseStudyLattice } from "./case-study-lattice";
import { CaseStudyStatCell } from "./case-study-stat-cell";

export function CaseStudyOverviewSection({ study }: { study: CaseStudy }) {
  return (
    <section
      className="sec cs-sec cso-sec"
      id="overview"
      aria-labelledby="overview-h"
    >
      <CaseStudyLattice section="overview" />
      <div className="cs-content cso-content" data-landmark="overview">
        <div className="cso-frame">
          <h2 className="cs-h2 cs-type" id="overview-h">
            {study.overview.head}
          </h2>
          <p className="cs-body cs-type cso-body">{study.overview.body}</p>
          <CaseStudyFeatureList items={study.overview.items} className="cso-list" />
          <div className="cso-stats">
            {study.overview.stats.map((stat) => (
              <CaseStudyStatCell key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
