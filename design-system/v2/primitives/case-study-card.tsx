/** v2 primitives — CaseStudyCard (spec 014 §4, set 648:41389). A
 * two-part card: the site image (an art-directed <picture> tier set on
 * the structural gates, §7.1) and the profile card (a bg/000 box, 1px
 * border/000, line-inclusive per the 011 R17 law). Prop-driven —
 * content arrives from the section's data module, never hardcoded.
 *
 * Interior sizing is var-driven (--csc-* consumed against the --csc-u
 * unit, case-study-card.css): an unsized card takes its numbers from
 * its mount, so one DOM instance per study rides the section's band
 * restatements as weight-riding band constants (the grid-digest law).
 * The `size`/`arrangement` props render a designed set variant
 * statically for the /primitives catalog; section mounts leave them
 * unset, ride the band gates in work-cases.css, and carry `flip` for
 * the alternating right-image rows (§5).
 *
 * Semantics (§8.5): an <article> with an <h2> (the customer name);
 * the stats are a <dl> (label <dt>, value <dd> — the group renders
 * value-over-label via column-reverse); the star is aria-hidden beside
 * its numeral (the "Average rating" label carries the meaning); the
 * View Case Study CTA is a real <a> to `/case-studies/{slug}`
 * (§9 F9). */

import { CASE_STUDY_TIERS, caseStudySrc } from "../media";
import type { CaseStudy } from "../sections/work-cases-data";
import { IconStar } from "../icons";
import { ButtonInline } from "./button-inline";

export type CaseStudyCardSize = "xl" | "lg" | "md" | "sm" | "xs";
export type CaseStudyCardArrangement = "left-image" | "right-image" | "centered";

interface CaseStudyCardProps {
  study: CaseStudy;
  /** Card 1 loads eager; cards 2–3 lazy (§7.1). */
  eager?: boolean;
  /** Section mounts: the alternating right-image arrangement at the
   * row bands (card 2, §5); centered bands ignore it. */
  flip?: boolean;
  /** The card rides the page's rises-only entrance (§6 as amended
   * 2026-08-28) — card 1 in the section mount; the shadow beat and
   * delay live in work-cases.css. */
  rise?: boolean;
  /** Designed set variant for the /primitives catalog only; section
   * mounts are unsized and ride the band restatements. */
  size?: CaseStudyCardSize;
  arrangement?: CaseStudyCardArrangement;
}

export function CaseStudyCard({ study, eager = false, flip = false, rise = false, size, arrangement }: CaseStudyCardProps) {
  const fallback = CASE_STUDY_TIERS[CASE_STUDY_TIERS.length - 1];
  return (
    <article
      className={rise ? "csc hx-rise" : "csc"}
      data-size={size}
      data-arrangement={arrangement}
      data-flip={flip || undefined}
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
          <div className="csc-cta">
            <ButtonInline href={`/case-studies/${study.slug}`}>View Case Study</ButtonInline>
          </div>
        </div>
      </div>
    </article>
  );
}
