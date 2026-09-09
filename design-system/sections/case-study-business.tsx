/** Business narrative with a semantic testimonial and studio image. */

import type { CaseStudy } from "./case-study-data";
import { CaseStudyLattice } from "./case-study-lattice";
import { CaseStudyPhoto } from "./case-study-photo";

export function CaseStudyBusinessSection({ study }: { study: CaseStudy }) {
  return (
    <section className="sec cs-sec csb-sec" id="business" aria-labelledby="business-h">
      <CaseStudyLattice section="business" />
      <div className="cs-content csb-content" data-landmark="business">
        <h2 className="cs-h2 cs-type" id="business-h">
          {study.business.head}
        </h2>
        <div className="csb-body">
          {study.business.body.map((para) => (
            <p key={para.slice(0, 24)} className="cs-body cs-type">
              {para}
            </p>
          ))}
        </div>
        <figure className="csb-callout">
          <div className="csb-quote">
            <blockquote className="cs-quote csb-quote-body">{study.business.quote}</blockquote>
            <figcaption className="cs-quote-attrib cs-body cs-type">
              {study.business.attribution}
            </figcaption>
          </div>
          <div className="csb-img">
            <CaseStudyPhoto study={study} image="studio" />
          </div>
        </figure>
      </div>
    </section>
  );
}
