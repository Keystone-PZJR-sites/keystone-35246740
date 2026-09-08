/** v2 sections — the case-study carousel (spec 022). Server component.
 *
 * The homepage's closing content section: a header (the standing
 * marker-construction slug, the Kyoto headline) and three case-study
 * preview cards in a strip — one active at full color, the others
 * resting as ghosts on the lattice. The 012 persona-carousel machine
 * without the slider: one k ∈ {0,1,2} (resting 0 — Zivel, as drawn),
 * written by strip swipe, inactive-card select, and arrow keys; the
 * island (case-carousel-island) owns it. Born settled — no entrance
 * choreography, no timers (§5).
 *
 * Three drawn anchors (384 · 768 · 1344, plan.md three-anchor policy):
 * rs derives from the 384 design (geometry on the tick, type on the R9
 * midpoint walk), rd1 from the 1344 design zooming on the tick —
 * case-carousel.css carries the construction.
 *
 * Every card is one link to its /case-studies/{slug} (the 012/014
 * overlay pattern — a real <a>, first in the card for the focus
 * dressing): Zivel resolves; YHS and Bare Lúx 404 until their Phase B
 * content passes (§5, the 014 F9 precedent). With JS, an inactive
 * card's link activates as SELECT (the island intercepts click, which
 * carries keyboard Enter with it — §9 R6); no-JS keeps all three live.
 *
 * The CTA pill is presentational (aria-hidden — the overlay link
 * carries the action and its name): the standing gray button-fill
 * chrome as a <span>, sm · md · lg per band (§4 as amended — the drawn
 * boxes are the stale-scale artifact class, §9 R2).
 *
 * The stats render from the shared work-cases-data canon (§9 R3 — the
 * cross-surface ruling): all three stats in the DOM, the third shown
 * at the xl design only (§4 as amended at the build fresh read); the
 * Bare Lúx star rides its stat's ink (IconStar stretched to the drawn
 * 17×16 box — the 15×14 glyph's scale-artifact class, no new cut). */

import { GridRegion, type GridBand } from "../grid/region";
import { InterpText } from "../primitives/text";
import { IconNavTrigger, IconStar } from "../icons";
import {
  CASE_CAROUSEL_LANDSCAPE,
  CASE_CAROUSEL_RT_GATE_MEDIA,
  caseCarouselSrc,
} from "../media";
import { CaseCarouselIsland } from "./case-carousel-island";
import {
  CAROUSEL_DESCRIPTIONS,
  CAROUSEL_STUDIES,
  caseCarouselFile,
} from "./case-carousel-data";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* ---- exposure map (§2), section-local ticks — read per-cell through
   the bridge at the spec's writing and re-verified at the build's
   fresh-read pass. The full-lattice run behind the strip includes the
   pre-footer row the section owns (§1). 384: col 11 beside the header
   (rows 0–5), the full field rows 6–22; 768: cols 10–11 rows 0–4, full
   rows 5–11; 1344: the east field cols 8–11 rows 0–3, full rows 4–8.
   Derived bands render their source anchor's map. The lattice reads
   through the inactive cards (the translucent-ghost pattern). */

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}

const SECTION_MAP: Record<GridBand, R[]> = {
  /* gy rides the base band's 2t leading clearance (§9 B15) — the
     drawn rows 189–190 are bare */
  rm: [
    { gx: 11, gy: 2, gh: 6 },
    { gx: 0, gy: 8, gw: 12, gh: 17 },
  ],
  rs: [
    { gx: 11, gy: 2, gh: 6 },
    { gx: 0, gy: 8, gw: 12, gh: 17 },
  ], // derived from 384 (§1)
  rt: [
    { gx: 10, gy: 0, gw: 2, gh: 5 },
    { gx: 0, gy: 5, gw: 12, gh: 7 },
  ],
  rd1: [
    { gx: 8, gy: 0, gw: 4, gh: 4 },
    { gx: 0, gy: 4, gw: 12, gh: 5 },
  ], // derived from 1344 (§1)
  rd2: [
    { gx: 8, gy: 0, gw: 4, gh: 4 },
    { gx: 0, gy: 4, gw: 12, gh: 5 },
  ],
};

/** The presentational pill (§4): the button-fill chrome as a span —
 * never an interactive element (the overlay link owns the action). */
function CtaPill({ size, mount }: { size: "sm" | "md" | "lg"; mount: string }) {
  return (
    <span
      className={`cc-cta ${mount} btn-fill`}
      data-size={size}
      data-chrome="gray"
      data-shape="pill"
      aria-hidden="true"
    >
      <span className="btn-label">
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
    <section className="sec v2-cc" aria-label="Case studies" data-landmark="case-carousel">
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) =>
          SECTION_MAP[band].map((r, i) => <GridRegion key={`${band}-r${i}`} band={band} {...r} />),
        )}
      </div>

      {/* the header (§3): the slug pair at every band (§9 F5) and the
          one canon headline (§9 F4) wrapping naturally in its drawn box */}
      <div className="cc-head">
        <InterpText as="p" style="text-xs-medium" className="cc-slug">
          <span className="cc-marker" aria-hidden="true" />
          <span>Demand that turns into growth</span>
        </InterpText>
        <InterpText as="h2" style="display-serif-xs-extralight" className="cc-h2">
          Marketing that delivers on its promise.
        </InterpText>
      </div>

      <CaseCarouselIsland>
        <div className="cc-carousel">
          <ul className="cc-strip" data-landmark="strip">
            {CAROUSEL_STUDIES.map((study, i) => {
              const description = CAROUSEL_DESCRIPTIONS[study.site];
              /* the leading "keystone" renders as the inline wordmark
                 (the 006 construction); the sr string carries the word */
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
                        <InterpText as="p" style="text-md-light" className="cc-desc">
                          <span className="hx-sr">{description}</span>
                          <span aria-hidden="true">
                            <span className="cc-wm" />
                            {` ${visualRest}`}
                          </span>
                        </InterpText>
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
                              <InterpText as="span" style="text-2xl-light" className="cc-stat-v">
                                {stat.value}
                                {stat.star && <IconStar className="cc-star" />}
                              </InterpText>
                              <InterpText as="span" style="text-xs-regular" className="cc-stat-l">
                                {stat.label}
                              </InterpText>
                            </div>,
                          ])}
                        </div>
                      </div>
                      <CtaPill size="sm" mount="cc-cta-rm" />
                      <CtaPill size="md" mount="cc-cta-rt" />
                      <CtaPill size="lg" mount="cc-cta-rd" />
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
