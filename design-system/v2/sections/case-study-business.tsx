/** v2 sections — case-study-business (spec 017 §3.4). Server
 * component, born settled. Head + long body + the quote-callout: the
 * pull-quote beside the studio photograph (stacked at rm/rs, side by
 * side under a top hairline at rt+, the image bleeding to the page's
 * right edge). The photograph mounts the composited studio export
 * (baked hard-shadow-square-md, +3px canvas; the right shadow clips
 * at the page edge on the bleed boxes — as rendered, §5.4). The quote
 * is a <figure>/<blockquote> with its attribution (§8.7). */

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
        {/* two drawn paragraphs on the style's paragraph spacing */}
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
