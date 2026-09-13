import { GridRegion, type GridBand } from "../grid/region";
import { InterpText } from "../primitives/text";
import { Slug } from "../primitives/slug";
import { COMPANY_BACKERS } from "./company-data";
import { COMPANY_INVESTORS } from "./company-backers-data";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* Lattice: the 1fr wall renders in unpainted air; the flow closer ends
 * the section exactly one tick below the last portrait row. The
 * section is content-sized — the page grid is perceptual, carried by
 * the closer rows. No gutter furniture. */
export function CompanyBackersSection() {
  return (
    <section
      className="sec company-backers"
      aria-label="Investors"
      data-landmark="company-backers"
    >
      <header className="cob-head" data-landmark="head">
        <Slug>{COMPANY_BACKERS.eyebrow}</Slug>
        <InterpText as="h2" style="display-serif-xs-extralight" className="co-h2">
          {COMPANY_BACKERS.title}
        </InterpText>
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
            <span className="co-cell-name">{investor.name}</span>
          </li>
        ))}
      </ul>

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
