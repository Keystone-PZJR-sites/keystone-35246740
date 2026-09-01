/** v2 sections — case-study-intro (spec 017 §3.2). Server component,
 * born settled. The stat band: head + four stat cells + the
 * disclaimer cell, every cell a 1px border/000 line-inclusive box on
 * shared hairlines. Grid shapes per band: 2×2 + a 2t disclaimer row ·
 * 2×2 + a 1t row · 3+2 (disclaimer in row 2, the third slot open) ·
 * 5 across · 5 across. */

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
