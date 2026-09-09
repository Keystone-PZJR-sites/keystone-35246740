/** Before-and-after cards with semantic stat pairs and lists. */

import type { CaseStudy, CaseStudyStat } from "./case-study-data";
import { CaseStudyFeatureList } from "./case-study-feature-list";
import { CaseStudyLattice, extraTickVars } from "./case-study-lattice";

function StatPair({ stats }: { stats: CaseStudyStat[] }) {
  return (
    <dl className="csft-stats">
      {stats.map((stat) => (
        <div className="csft-stat" key={stat.label}>
          <dt>
            <span className="cs-pill">{stat.label}</span>
          </dt>
          <dd>{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseStudyShiftSection({ study }: { study: CaseStudy }) {
  /* Only the variable-length after card consumes per-study growth. */
  const extra = study.extraTicks?.shift;
  return (
    <section
      className="sec cs-sec csft-sec"
      id="shift"
      aria-labelledby="shift-h"
      style={extraTickVars(extra)}
    >
      <CaseStudyLattice section="shift" extra={extra} />
      <h2 className="hx-sr" id="shift-h">
        The Shift
      </h2>
      <div className="cs-content csft-content" data-landmark="shift">
        <div className="csft-card csft-before">
          <p className="csft-label">{study.shift.beforeLabel}</p>
          <div className="csft-body">
            <StatPair stats={study.shift.beforeStats} />
            <ul className="csft-lines">
              {study.shift.beforeLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="csft-after">
          <div className="csft-card csft-after-card">
            <p className="csft-label">{study.shift.afterLabel}</p>
            <div className="csft-body">
              <StatPair stats={study.shift.afterStats} />
              <CaseStudyFeatureList items={study.shift.afterItems} icon={20} className="csft-list" />
            </div>
          </div>
          <p className="csft-tag">{study.shift.tag}</p>
        </div>
      </div>
    </section>
  );
}
