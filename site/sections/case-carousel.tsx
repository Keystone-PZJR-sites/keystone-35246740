import { GridRegion, type GridBand } from "@keystone-sites/marketing-design-system/grid/region";
import { Slug } from "@keystone-sites/marketing-design-system/primitives/slug";
import { IconNavTrigger, IconStar } from "@keystone-sites/marketing-design-system/icons";
import {
  CASE_CAROUSEL_LANDSCAPE,
  CASE_CAROUSEL_RT_GATE_MEDIA,
  caseCarouselSrc,
} from "@keystone-sites/marketing-design-system/media";
import { CaseCarouselIsland } from "./case-carousel-island";
import { CAROUSEL_DESCRIPTIONS, CAROUSEL_STUDIES, caseCarouselFile } from "./case-carousel-data";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}

const SECTION_MAP: Record<GridBand, R[]> = {
  rm: [
    { gx: 11, gy: 0, gh: 8 },
    { gx: 0, gy: 8, gw: 12, gh: 17 },
  ],
  rs: [
    { gx: 11, gy: 0, gh: 8 },
    { gx: 0, gy: 8, gw: 12, gh: 17 },
  ],
  rt: [
    { gx: 10, gy: 0, gw: 2, gh: 5 },
    { gx: 0, gy: 5, gw: 12, gh: 7 },
  ],
  rd1: [
    { gx: 8, gy: 0, gw: 4, gh: 4 },
    { gx: 0, gy: 4, gw: 12, gh: 5 },
  ],
  rd2: [
    { gx: 8, gy: 0, gw: 4, gh: 4 },
    { gx: 0, gy: 4, gw: 12, gh: 5 },
  ],
};

/** Presentational button chrome sized per band by `.cc-cta`; the card
 * overlay owns the action. */
function CtaPill() {
  return (
    <span className="cc-cta btn-fill" data-chrome="gray" data-shape="pill" aria-hidden="true">
      <span className="type type-fixed btn-body">
        Read the case study
        <span className="btn-glyph">
          <IconNavTrigger variant="arrow" />
        </span>
      </span>
    </span>
  );
}

export function CaseCarouselSection() {
  return (
    <section
      className="sec case-carousel-section"
      aria-label="Case studies"
      data-landmark="case-carousel"
    >
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) =>
          SECTION_MAP[band].map((r, i) => <GridRegion key={`${band}-r${i}`} band={band} {...r} />),
        )}
      </div>

      <div className="cc-head flow-budget">
        <Slug layout="rail">Demand that turns into growth</Slug>
        <h2 className="type ts-display-serif-xs-extralight cc-h2">
          Marketing that delivers on its promise.
        </h2>
      </div>

      <CaseCarouselIsland>
        <div className="cc-carousel">
          <ul className="cc-strip" data-landmark="strip">
            {CAROUSEL_STUDIES.map((study, i) => {
              const description = CAROUSEL_DESCRIPTIONS[study.site];
              /* Keep the wordmark text available to assistive technology. */
              const visualRest = description.replace(/^keystone\s+/, "");
              return (
                <li key={study.site} className="cc-slot" data-landmark="card">
                  <article
                    className="cc-card"
                    data-study={study.site}
                    data-state={i === 0 ? "active" : "inactive"}
                    data-index={i}
                  >
                    <a
                      className="cc-link"
                      href={`/case-studies/${study.slug}`}
                      aria-label={`Read the ${study.name} case study`}
                    />
                    <div className="cc-info">
                      <div className="cc-body">
                        <p className="type ts-text-md-light cc-desc">
                          <span className="hx-sr">{description}</span>
                          <span aria-hidden="true">
                            <span className="cc-wm" />
                            {` ${visualRest}`}
                          </span>
                        </p>
                        <div className="cc-stats">
                          {study.stats.map((stat, si) => [
                            si > 0 && (
                              <i
                                key={`d${si}`}
                                className={si === 2 ? "cc-div cc-div-2" : "cc-div"}
                                aria-hidden="true"
                              />
                            ),
                            <div
                              key={stat.label}
                              className={si === 2 ? "cc-stat cc-stat-3" : "cc-stat"}
                            >
                              <span className="type ts-text-2xl-light cc-stat-v">
                                {stat.value}
                                {stat.star && <IconStar className="cc-star" />}
                              </span>
                              <span className="type ts-text-xs-regular cc-stat-l">
                                {stat.label}
                              </span>
                            </div>,
                          ])}
                        </div>
                      </div>
                      <CtaPill />
                    </div>
                    <div className="cc-image">
                      <picture>
                        <source
                          media={CASE_CAROUSEL_RT_GATE_MEDIA}
                          srcSet={caseCarouselSrc(caseCarouselFile(i), "portrait")}
                        />
                        <img
                          src={caseCarouselSrc(caseCarouselFile(i), "landscape")}
                          width={CASE_CAROUSEL_LANDSCAPE.width}
                          height={CASE_CAROUSEL_LANDSCAPE.height}
                          alt={study.alt}
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </CaseCarouselIsland>
    </section>
  );
}
