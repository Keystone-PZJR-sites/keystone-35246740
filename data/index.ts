// Barrel for homepage data modules.
// Page files import from `@/data` and stay focused on composition;
// adding new sections only adds entries here, not in app/page.tsx.

export { WORK_INDUSTRIES, WORK_HEADLINE_PARTS, WORK_CARDS } from './work-showcase';
export { EVERY_CHANNEL_PILLS, MOBILE_EVERY_CHANNEL_PILLS } from './every-channel';
export { PRODUCT_SCREENS_TOOLS } from './product-screens';
export { VALUE_PROP_CARDS } from './value-props';
export {
  SOCIAL_THUMBNAILS,
  MOBILE_SOCIAL_THUMBNAILS,
  SOCIAL_SLIDES,
} from './social-proof';
export {
  SHARED_WORK_SHOWCASE_HEADLINE_PARTS,
  SHARED_WORK_SHOWCASE_INDUSTRIES,
  SHARED_WORK_SHOWCASE_CARDS,
  SHARED_PRICING_TAGLINE,
  SHARED_PRICING_PRICE_AMOUNT,
  SHARED_PRICING_PRICE_PERIOD,
  SHARED_PRICING_SUBCOPY_LINE_1,
  SHARED_PRICING_SUBCOPY_LINE_2,
  SHARED_PRICING_FEATURE_CHIPS,
  SHARED_PRICING_CREDITS_TEXT,
  SHARED_PRICING_ADDONS_HEADING,
  SHARED_PRICING_MARKETPLACE_ADDON,
  SHARED_PRICING_PAYMENTS_ADDON,
  SHARED_PRICING_COMING_SOON_LABEL,
  SHARED_PRICING_ADDON_ICON_SRC,
  SHARED_WORK_SHOWCASE_PROPS,
  SHARED_MOBILE_WORK_SHOWCASE_PROPS,
  SHARED_PRICING_SECTION_PROPS,
  SHARED_MOBILE_PRICING_SECTION_PROPS,
} from './shared-sections';
export { PRICING_PAGE } from './pricing-page';
export type { PricingPageContent } from './pricing-page';
export { HOW_IT_WORKS_PAGE } from './how-it-works-page';
export type { HowItWorksPageContent, HowItWorksStep } from './how-it-works-page';
export { CAREERS_PAGE, CAREERS_ROLES_ANCHOR } from './careers-page';
export type { CareersPageContent, CareersAction } from './careers-page';
export { LEADERSHIP_PAGE } from './leadership-page';
export type { LeadershipPageContent } from './leadership-page';
export { OUR_STORY_PAGE } from './our-story-page';
export type { OurStoryPageContent, StoryPhotoTile, StoryTileTone, StoryAction } from './our-story-page';
export { HOME_PAGE } from './home-page';
export type { HomePageContent } from './home-page';
export { LEGAL_DOCS } from './legal-pages';
export {
  CASE_STUDIES,
  CASE_STUDIES_LIST,
  getCaseStudy,
  getOtherCaseStudies,
} from './case-studies';
export { MEDIA } from './media';
export type {
  MediaImage,
  MediaImageSet,
  VideoClip,
  ResponsiveVideo,
  CardVisual,
} from './media';
