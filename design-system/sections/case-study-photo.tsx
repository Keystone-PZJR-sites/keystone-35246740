/** Art-directed picture whose intrinsic dimensions prime layout.
 * Header and studio canvases include their visual treatment and overflow
 * the wrapper by the pad configured in section CSS. */

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
  /** Above-the-fold images load eagerly; other images lazy-load. */
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
