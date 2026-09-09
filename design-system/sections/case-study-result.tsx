/** Result image, testimonial, narrative, and external site action. */

import { CaseStudyButton } from "../primitives/case-study-button";
import type { CaseStudy } from "./case-study-data";
import { CaseStudyLattice } from "./case-study-lattice";
import { CaseStudyPhoto } from "./case-study-photo";

export function CaseStudyResultSection({ study }: { study: CaseStudy }) {
  return (
    <section
      className="sec cs-sec csr-sec"
      id="result"
      aria-labelledby="result-h"
    >
      <CaseStudyLattice section="result" />
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
