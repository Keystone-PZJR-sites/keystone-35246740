/** v2 sections — the case-study photograph mount (spec 017 §5.4).
 * One <picture> per image with a media-gated <source> per tier
 * (largest-first, the 384 file the <img> fallback — art direction,
 * not resolution steps). The header and studio exports are composited
 * (baked hard shadow + the header's multiply tint, +4px / +3px canvas
 * at 1×), so the img renders at canvas size anchored to the drawn
 * box's top-left — the wrapper owns the drawn tick box and the canvas
 * overflows it by the shadow pad (no CSS shadow or blend; the 012
 * persona baked-wash precedent). The result tiers are exact 2×. The
 * rendered sizes are per-band CSS (the owning section's stylesheet);
 * width/height attributes carry each tier's intrinsic canvas for
 * layout priming. */

import {
  CASE_STUDY_PAGE_TIERS,
  caseStudyPageSrc,
  type CaseStudyPageImage,
} from "../media";
import type { CaseStudy } from "./case-study-data";

interface CaseStudyPhotoProps {
  study: CaseStudy;
  image: CaseStudyPageImage;
  className?: string;
  /** Header photo loads eagerly (above the fold, the §6 img beat);
   * the studio and result photos lazy-load. */
  priority?: boolean;
}

export function CaseStudyPhoto({ study, image, className, priority = false }: CaseStudyPhotoProps) {
  const tiers = study.imageTiers[image];
  const fallback = tiers[384];
  return (
    <span className={className ? `cs-photo ${className}` : "cs-photo"}>
      <picture>
        {CASE_STUDY_PAGE_TIERS.filter((tier) => tier.media !== null).map((tier) => (
          <source
            key={tier.cut}
            media={tier.media ?? undefined}
            srcSet={caseStudyPageSrc(study.assetId, image, tier.cut)}
            width={tiers[tier.cut].w}
            height={tiers[tier.cut].h}
          />
        ))}
        <img
          src={caseStudyPageSrc(study.assetId, image, 384)}
          width={fallback.w}
          height={fallback.h}
          alt={study.alts[image]}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
      </picture>
    </span>
  );
}
