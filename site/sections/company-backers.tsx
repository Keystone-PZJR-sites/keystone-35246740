import { CloserRow } from "@keystone-sites/marketing-design-system/primitives/closer-row";
import { Slug } from "@keystone-sites/marketing-design-system/primitives/slug";
import { COMPANY_BACKERS } from "./company-data";
import { COMPANY_INVESTORS } from "./company-backers-data";

/* Lattice: the 1fr wall renders in unpainted air; the flow closer ends
 * the section exactly one tick below the last portrait row. The
 * section is content-sized — the page grid is perceptual, carried by
 * the closer rows. No gutter furniture. */
export function CompanyBackersSection() {
  return (
    <section className="sec company-backers" aria-label="Investors" data-landmark="company-backers">
      <header className="cob-head" data-landmark="head">
        <Slug>{COMPANY_BACKERS.eyebrow}</Slug>
        <h2 className="type ts-display-serif-xs-extralight co-h2">{COMPANY_BACKERS.title}</h2>
      </header>

      {/* Names render as visible captions, so the portraits stay alt="". */}
      <ul className="cob-wall" data-landmark="wall">
        {COMPANY_INVESTORS.map((investor) => (
          <li key={investor.id} className="co-cell">
            <span className="co-cell-photo">
              <img
                src={investor.portrait.src}
                width={investor.portrait.width}
                height={investor.portrait.height}
                alt=""
                loading="lazy"
              />
            </span>
            <span className="type ts-text-sm-medium co-cell-name">{investor.name}</span>
          </li>
        ))}
      </ul>

      <CloserRow />
    </section>
  );
}
