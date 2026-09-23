import { GridRegion, type GridBand } from "../grid/region";
import { Text } from "../primitives/text";
import { Slug } from "../primitives/slug";
import { COMPANY_STORY } from "./company-data";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

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
        <Text as="h2" className="co-h2">
          {COMPANY_STORY.title}
        </Text>
      </header>

      <div className="cos-body" data-landmark="body">
        {COMPANY_STORY.paragraphs.map((paragraph) => (
          <Text key={paragraph} as="p" className="cos-p co-body-text">
            {paragraph}
          </Text>
        ))}
      </div>

      <div className="co-closer" aria-hidden="true">
        <div className="gx co-bleed-grid">
          {BANDS.map((band) => (
            <GridRegion key={band} band={band} gx={0} gy={0} gw={12} />
          ))}
        </div>
      </div>
    </section>
  );
}
