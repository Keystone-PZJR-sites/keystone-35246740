/** v2 sections — case-study-overview (spec 017 §3.3). Server
 * component, born settled. Head + body + the five-point checklist on
 * the double-checkmark glyph + the three-cell stat row anchored at
 * the drawn frame's bottom. The section carries the id the sticky
 * TOC's anchors target (§4). At rd2 the content column narrows to
 * cols 3–11 with the drawn 64px interior top pad (the §1 F1 re-box);
 * the TOC rests level with that interior line. */

import type { CaseStudy } from "./case-study-data";
import { CaseStudyChecklist } from "./case-study-checklist";
import { CaseStudyLattice, extraTickVars } from "./case-study-lattice";
import { CaseStudyStatCell } from "./case-study-stat-cell";

export function CaseStudyOverviewSection({ study }: { study: CaseStudy }) {
  /* the clearance law: per-study whole-tick growth where the copy runs
     longer than the drawn frame — the section and frame heights ride
     the --csx-* vars, the stat row slides down with the frame bottom,
     the east rail extends in the lattice */
  const extra = study.extraTicks?.overview;
  return (
    <section
      className="sec cs-sec cso-sec"
      id="overview"
      aria-labelledby="overview-h"
      style={extraTickVars(extra)}
    >
      <CaseStudyLattice section="overview" extra={extra} />
      <div className="cs-content cso-content" data-landmark="overview">
        <div className="cso-frame">
          <h2 className="cs-h2 cs-type" id="overview-h">
            {study.overview.head}
          </h2>
          <p className="cs-body cs-type cso-body">{study.overview.body}</p>
          <CaseStudyChecklist items={study.overview.checklist} className="cso-list" />
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
