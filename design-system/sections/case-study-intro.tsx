/** Intro heading, four stats, and a disclaimer in a responsive grid. */

import type { CaseStudy } from "./case-study-data";
import { CaseStudyLattice } from "./case-study-lattice";
import { CaseStudyDisclaimerCell, CaseStudyStatCell } from "./case-study-stat-cell";

export function CaseStudyIntroSection({ study }: { study: CaseStudy }) {
  return (
    <section className="sec cs-sec csi-sec">
      <CaseStudyLattice section="intro" />
      <div className="cs-content" data-landmark="intro">
        <h2 className="csi-head">{study.intro.head}</h2>
        <div className="csi-grid">
          {study.intro.stats.map((stat) => (
            <CaseStudyStatCell key={stat.label} stat={stat} />
          ))}
          <CaseStudyDisclaimerCell text={study.intro.disclaimer} />
        </div>
      </div>
    </section>
  );
}
