/** Cards inherit responsive geometry from their section. The inline CTA
 * is presentational so the overlay remains the only tab stop. */

import { CASE_STUDY_TIERS, caseStudySrc } from "../media";
import type { CaseStudySummary } from "../sections/work-cases-data";
import { IconStar } from "../icons";
import { ButtonInline } from "./button-inline";

interface CaseStudyCardProps {
  study: CaseStudySummary;
  /** Loads the image eagerly. */
  eager?: boolean;
  /** Flips alternating image rows; centered layouts ignore it. */
  flip?: boolean;
  /** Applies the section entrance class. */
  rise?: boolean;
  /** Renders hover dressing statically. */
  forceState?: "hover";
}

export function CaseStudyCard({ study, eager = false, flip = false, rise = false, forceState }: CaseStudyCardProps) {
  const fallback = CASE_STUDY_TIERS[CASE_STUDY_TIERS.length - 1];
  return (
    <article
      className={rise ? "csc hx-rise" : "csc"}
      data-flip={flip || undefined}
      data-state={forceState}
      data-landmark="card"
    >
      <div className="csc-img">
        <picture>
          {CASE_STUDY_TIERS.filter((t) => t.media !== null).map((t) => (
            <source
              key={t.cut}
              media={t.media ?? undefined}
              srcSet={caseStudySrc(study.site, t.cut)}
              width={t.width}
              height={t.height}
            />
          ))}
          <img
            src={caseStudySrc(study.site, fallback.cut)}
            width={fallback.width}
            height={fallback.height}
            alt={study.alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        </picture>
      </div>
      <div className="csc-profile">
        <div className="csc-lede">
          <p className="csc-category">{study.category}</p>
          <h2 className="csc-title">{study.name}</h2>
          <p className="csc-desc">{study.description}</p>
        </div>
        <div className="csc-foot">
          <p className="csc-slug">{study.statSlug}</p>
          <dl className="csc-stats">
            {study.stats.map((stat) => (
              <div key={stat.label} className="csc-stat">
                <dt className="csc-stat-label">{stat.label}</dt>
                <dd className="csc-stat-value">
                  {stat.value}
                  {stat.star && (
                    <span className="csc-star" aria-hidden="true">
                      <IconStar />
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          {/* The overlay link owns interaction and the accessible name. */}
          <div className="csc-cta" aria-hidden="true">
            <ButtonInline>View Case Study</ButtonInline>
          </div>
        </div>
      </div>
      {/* Last-child overlay spans both boxes. */}
      <a
        className="csc-link"
        href={`/case-studies/${study.slug}`}
        aria-label={`View the ${study.name} case study`}
      />
    </article>
  );
}
