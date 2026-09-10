/** Case-study heading, art-directed photo, metadata, and service tags.
 * Visual line breaks and tag ordering vary by band without changing
 * the accessible reading order. */

import { Slug } from "../primitives/slug";
import type { CaseStudy, CaseStudyTag } from "./case-study-data";
import { CaseStudyLattice } from "./case-study-lattice";
import { CaseStudyPhoto } from "./case-study-photo";

/* Tablet visual order places Phone answering before Social. */
const RT_ORDER: Record<number, number> = { 0: 1, 1: 2, 2: 5, 3: 3, 4: 7, 5: 9 };

function Tag({ tag, index }: { tag: CaseStudyTag; index: number }) {
  return (
    <li
      className="cs-tag"
      data-color={tag.color}
      style={{ "--tag-order": RT_ORDER[index] } as React.CSSProperties}
    >
      {tag.label}
    </li>
  );
}

export function CaseStudyHeaderSection({ study }: { study: CaseStudy }) {
  return (
    <section className="sec cs-sec csh-sec">
      <CaseStudyLattice section="header" />
      <div className="cs-content csh-content" data-landmark="header">
        <header className="csh">
          <div className="csh-head flow-budget">
            <Slug className="hx-rise" aria-hidden>
              Case Study
            </Slug>
            <h1 className="csh-h1 hx-rise">
              {study.h1.seg1}
              {study.h1.seg2 && <br className="csh-br-rt" aria-hidden="true" />}
              {study.h1.seg2}
              {study.h1.seg3 && <br className="csh-br-rsd2" aria-hidden="true" />}
              {study.h1.seg3}
            </h1>
          </div>

          {/* The photo sits beside the text column from tablet upward. */}
          <div className="csh-img hx-rise">
            <CaseStudyPhoto study={study} image="header" priority />
          </div>

          {/* Metadata and tags share one entrance beat. */}
          <div className="csh-meta hx-rise">
            <dl className="csh-pairs">
              <div className="csh-col">
                <div className="csh-pair">
                  <dt>Category</dt>
                  <dd>{study.metadata.category}</dd>
                </div>
                <div className="csh-pair">
                  <dt>Location</dt>
                  <dd>{study.metadata.location}</dd>
                </div>
              </div>
              <div className="csh-col">
                <div className="csh-pair">
                  <dt>Founders</dt>
                  <dd>{study.metadata.founders}</dd>
                </div>
                <div className="csh-pair">
                  <dt>On Keystone Since</dt>
                  <dd>{study.metadata.since}</dd>
                </div>
              </div>
            </dl>

            <ul className="cs-tags">
              {study.tags.slice(0, 4).map((tag, i) => (
                <Tag key={tag.label} tag={tag} index={i} />
              ))}
              {/* Wrap markers preserve the intended row grouping. */}
              <li className="cs-tagbr cs-tagbr-a" aria-hidden="true" />
              {study.tags.slice(4).map((tag, i) => (
                <Tag key={tag.label} tag={tag} index={i + 4} />
              ))}
              <li className="cs-tagbr cs-tagbr-b" aria-hidden="true" />
            </ul>
          </div>
        </header>
      </div>
    </section>
  );
}
