/** v2 sections — case-study-header (spec 017 §3.1). Server component.
 * The template page's first section — page rows 0 → the intro top:
 * slug · H1 · the site photo · the metadata <dl> · the tag chips.
 *
 * The H1 renders each band's drawn break explicitly (§9 F4g — designed
 * per-viewport rag: rt breaks after seg1, rs/rd2 after seg2; rm/rd1
 * wrap naturally in their weight-riding boxes). The accessible string
 * is the single-spaced canon (a <br> reads as whitespace).
 *
 * The tags are one real <ul> (§8.7 — decorative color, real text) in
 * the canonical order; the drawn per-band wrap and the rt-only
 * reorder (§3.1 as built — Phone answering joins row 1 before Social
 * at rt alone) are presentational: forced break items plus flex
 * `order` at rt, so the accessibility tree always reads the canon
 * order. The slug is an aria-hidden eyebrow (§8.7); the page <h1> is
 * the H1.
 *
 * The photo mounts per the §5.4 rule: the wrapper owns the drawn tick
 * box, the composited canvas (baked hard-shadow-square + the 10%
 * multiply tint) anchors to its top-left and overflows by the shadow
 * pad. Eager + priority — it is the §6 choreography's final beat.
 *
 * The entrance (§6): four beats — slug · H1 · metadata column (with
 * the tags) · the photo — on the hx-rise grammar; delays in
 * case-study-header.css. Everything else on the page is born settled. */

import type { CaseStudy, CaseStudyTag } from "./case-study-data";
import { CaseStudyLattice } from "./case-study-lattice";
import { CaseStudyPhoto } from "./case-study-photo";

/* The rt visual order (§3.1 as built): Phone answering (canon index 3)
   moves before Social (index 2); rows run 3+2+1. The map is flex
   `order` per canon index at the rt band. */
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
      <div className="cs-content" data-landmark="header">
        <header className="csh">
          <p className="csh-slug hx-rise" aria-hidden="true">
            <i className="csh-slug-dot" />
            Case Study
          </p>
          <h1 className="csh-h1 hx-rise">
            {study.h1.seg1}
            <br className="csh-br-rt" aria-hidden="true" />
            {study.h1.seg2}
            <br className="csh-br-rsd2" aria-hidden="true" />
            {study.h1.seg3}
          </h1>

          {/* the photo: in flow at rm/rs (between H1 and metadata),
              absolute beside the text column at rt+ (§3.1) */}
          <div className="csh-img hx-rise">
            <CaseStudyPhoto study={study} image="header" priority />
          </div>

          {/* one rise beat covers the metadata column and the tags (§6) */}
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
              {/* forced wrap (drawn rag balance, the 012 precedent):
                  after chip 4 at every band; the second break serves
                  the rt 3+2+1 rows */}
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
