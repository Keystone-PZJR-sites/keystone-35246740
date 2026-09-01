/** v2 sections — case-study-shift (spec 017 §3.5). Server component,
 * born settled. The before/after cards: before on lightgray/200 +
 * 1px border/000, after on base/white + border + the resting
 * hard-shadow-square (drawn at rest, not a hover state) — side by
 * side at rt+ sharing their touching edge (line-inclusive), stacked
 * at rm/rs. Each card: the nav-label chrome, the stat pair (with the
 * drawn 1px bg/500 divider at rd1/rd2), and the body lines / the
 * 20-glyph checklist. The Wow! tag hangs below the after card's
 * bottom-left into the section gap (the 012 bottom-tag grammar).
 * Stats are per-card <dl>s; the tag is decorative-adjacent real
 * text. */

import type { CaseStudy, CaseStudyStat } from "./case-study-data";
import { CaseStudyChecklist } from "./case-study-checklist";
import { CaseStudyLattice } from "./case-study-lattice";

function StatPair({ stats }: { stats: CaseStudyStat[] }) {
  /* the rd1/rd2 1px bg/500 divider between the halves is the second
     stat's ::before (§3.5 — drawn at the desktop bands only) */
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
  return (
    <section className="sec cs-sec csft-sec" id="shift" aria-labelledby="shift-h">
      <CaseStudyLattice section="shift" />
      <h2 className="hx-sr" id="shift-h">
        The Shift
      </h2>
      <div className="cs-content csft-content" data-landmark="shift">
        <div className="csft-card csft-before">
          <p className="csft-label">{study.shift.beforeLabel}</p>
          <div className="csft-body">
            <StatPair stats={study.shift.beforeStats} />
            {/* a drawn unordered list (bullets at every band —
                re-read 2026-08-31) */}
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
              <CaseStudyChecklist items={study.shift.afterChecklist} icon={20} className="csft-list" />
            </div>
          </div>
          <p className="csft-tag">{study.shift.tag}</p>
        </div>
      </div>
    </section>
  );
}
