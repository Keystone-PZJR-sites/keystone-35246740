import { GridRegion, type GridBand } from "../grid/region";
import { ButtonFill } from "../primitives/buttons";
import { InterpText } from "../primitives/text";
import { Slug } from "../primitives/slug";
import { SITE_LINKS } from "../site-links";
import { COMPANY_CAREERS } from "./company-data";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* Lattice: head, copy, and CTA in unpainted air; the flow closer sits
 * flush at the section end — it meets the footer's own top row like
 * the blog-category strip. The CTA never sits on the painted seam. No
 * gutter furniture. */
export function CompanyCareersSection() {
  return (
    <section
      id="careers"
      className="sec company-careers"
      aria-label="Careers"
      data-landmark="company-careers"
    >
      <header className="coc-head" data-landmark="head">
        <Slug>{COMPANY_CAREERS.eyebrow}</Slug>
        <InterpText as="h2" style="display-serif-xs-extralight" className="co-h2">
          {COMPANY_CAREERS.title}
        </InterpText>
        <InterpText as="p" style="text-md-light" className="coc-copy co-body-text">
          {COMPANY_CAREERS.copy}
        </InterpText>
      </header>

      {/* Primitives are material: the section mounts one size per band. */}
      <div className="coc-cta" data-landmark="cta">
        <span className="coc-cta-md">
          <ButtonFill size="md" chrome="teal" href={SITE_LINKS.contact}>
            {COMPANY_CAREERS.ctaLabel}
          </ButtonFill>
        </span>
        <span className="coc-cta-lg">
          <ButtonFill size="lg" chrome="teal" href={SITE_LINKS.contact}>
            {COMPANY_CAREERS.ctaLabel}
          </ButtonFill>
        </span>
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
