import { CloserRow } from "../primitives/closer-row";
import { Slug } from "../primitives/slug";
import { COMPANY_STORY } from "./company-data";

/* Lattice: copy renders in unpainted air; the flow closer (the
 * faq-gaprow idiom) ends the section exactly one tick below the last
 * paragraph. The section is content-sized. No gutter furniture. */
export function CompanyStorySection() {
  return (
    <section
      className="sec company-story"
      aria-label="Why we built Keystone"
      data-landmark="company-story"
    >
      <header className="cos-head" data-landmark="head">
        <Slug>{COMPANY_STORY.eyebrow}</Slug>
        <h2 className="type ts-display-serif-xs-extralight co-h2">{COMPANY_STORY.title}</h2>
      </header>

      <div className="cos-body" data-landmark="body">
        {COMPANY_STORY.paragraphs.map((paragraph) => (
          <p className="type ts-text-md-light cos-p co-body-text" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>

      <CloserRow />
    </section>
  );
}
