import {
  COMPANY_HERO_POSTERS,
  COMPANY_HERO_VIDEO_TIERS,
  companyHeroVideoAsset,
  type CompanyHeroPosterTier,
  type CompanyHeroVideoIndex,
  type CompanyHeroVideoTier,
  type VideoAsset,
} from "../media";

export interface CompanyHeroVideoSource {
  tier: CompanyHeroVideoTier;
  media: string | null;
  webm: VideoAsset;
  mp4: VideoAsset;
}

export interface CompanyHeroVideoClip {
  id: string;
  sources: CompanyHeroVideoSource[];
}

const SOURCE_ORDER: CompanyHeroVideoTier[] = ["desktop", "tablet", "phone"];

function videoClip(index: CompanyHeroVideoIndex, id: string): CompanyHeroVideoClip {
  return {
    id,
    sources: SOURCE_ORDER.map((tier) => ({
      tier,
      media: COMPANY_HERO_VIDEO_TIERS[tier].media,
      webm: companyHeroVideoAsset(index, tier, "webm"),
      mp4: companyHeroVideoAsset(index, tier, "mp4"),
    })),
  };
}

/* Playback order approved 2026-09-12. The source ids record the export
 * lineage; public filenames use their stable sequence positions. */
export const COMPANY_HERO_VIDEO_SEQUENCE: CompanyHeroVideoClip[] = [
  videoClip(1, "6214718"),
  videoClip(2, "2858392"),
  videoClip(3, "everychannel-02"),
  videoClip(4, "socialproof-04"),
  videoClip(5, "6214876"),
  videoClip(6, "socialproof-05"),
];

export const COMPANY_HERO_VIDEO_POSTERS: CompanyHeroPosterTier[] = COMPANY_HERO_POSTERS;
