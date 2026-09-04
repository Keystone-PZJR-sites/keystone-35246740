/** v2 sections — case-study-result (spec 017 §3.8). Server component,
 * born settled. The proof block: the full-width site photograph (the
 * exact-2× result export — no dressing) · the pull-quote under its
 * top hairline (none at rm — drawn intent, §9 F5b) · head + body ·
 * the CaseStudyButton to the live site (sm at rm, lg above; a new
 * tab with rel="noopener" — the §3.8 external destination). */

import { CaseStudyButton } from "../primitives/case-study-button";
import type { CaseStudy } from "./case-study-data";
import { CaseStudyLattice, extraTickVars } from "./case-study-lattice";
import { CaseStudyPhoto } from "./case-study-photo";

export function CaseStudyResultSection({ study }: { study: CaseStudy }) {
  /* the clearance law: per-study whole-tick growth — the section
     height rides the --csx-* vars so the flowed interior (through the
     CTA) regains its end clearance and the CTA band starts on the
     next tick */
  const extra = study.extraTicks?.result;
  return (
    <section
      className="sec cs-sec csr-sec"
      id="result"
      aria-labelledby="result-h"
      style={extraTickVars(extra)}
    >
      <CaseStudyLattice section="result" extra={extra} />
      <div className="cs-content csr-content" data-landmark="result">
        <div className="csr-img">
          <CaseStudyPhoto study={study} image="result" />
        </div>
        <figure className="csr-quote">
          <blockquote className="cs-quote csr-quote-body">{study.result.quote}</blockquote>
          <figcaption className="cs-quote-attrib cs-body cs-type">
            {study.result.attribution}
          </figcaption>
        </figure>
        <h2 className="cs-h2 cs-type csr-head" id="result-h">
          {study.result.head}
        </h2>
        {/* two drawn paragraphs on the style's paragraph spacing */}
        <div className="csr-body">
          {study.result.body.map((para) => (
            <p key={para.slice(0, 24)} className="cs-body cs-type">
              {para}
            </p>
          ))}
        </div>
        <div className="csr-cta csr-cta-sm">
          <CaseStudyButton label={study.result.buttonLabel} href={study.liveUrl} size="sm" />
        </div>
        <div className="csr-cta csr-cta-lg">
          <CaseStudyButton label={study.result.buttonLabel} href={study.liveUrl} size="lg" />
        </div>
      </div>
    </section>
  );
}
