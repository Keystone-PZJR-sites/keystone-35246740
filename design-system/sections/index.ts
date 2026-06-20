// ============================================================
// Keystone Design System — Sections barrel
// ============================================================
// Full-width page sections (one per Figma section) for the
// homepage and how-it-works. Sections with a structurally
// different mobile layout ship a paired Mobile* component.
// ============================================================

export { HeroAnimatic } from './HeroAnimatic';
export type { HeroAnimaticProps } from './HeroAnimatic';
export { MobileHero } from './MobileHero';
export type { MobileHeroProps } from './MobileHero';

export { WorkShowcase, renderWorkCard } from './WorkShowcase';
export type {
  WorkShowcaseProps,
  WorkIndustry,
  WorkCardData,
  HeadlinePart,
} from './WorkShowcase';
export { MobileWorkShowcase } from './MobileWorkShowcase';
export type { MobileWorkShowcaseProps } from './MobileWorkShowcase';

export { EveryChannel } from './EveryChannel';
export type { EveryChannelProps, PillData } from './EveryChannel';
export { MobileEveryChannel } from './MobileEveryChannel';
export type { MobileEveryChannelProps, MobileEveryChannelPillData } from './MobileEveryChannel';

export { ProductScreens } from './ProductScreens';
export type { ProductScreensProps, ProductScreensTool } from './ProductScreens';
export { MobileProductScreens } from './MobileProductScreens';
export type { MobileProductScreensProps } from './MobileProductScreens';

export { ValueProps, MobileValueProps } from './ValueProps';
export type { ValuePropsProps, ValuePropCard, MobileValuePropsProps } from './ValueProps';

export { SocialProofSection } from './SocialProofSection';
export type {
  SocialProofSectionProps,
  SocialProofSlide,
  SocialProofThumbnail,
  QuoteSegment,
} from './SocialProofSection';
export { MobileSocialProof } from './MobileSocialProof';
export type {
  MobileSocialProofProps,
  MobileSocialProofThumbnail,
} from './MobileSocialProof';

export { PriceSummary } from './PriceSummary';
export type { PriceSummaryProps, PriceSummaryTone, FeatureChip } from './PriceSummary';
export { PricingSection } from './PricingSection';
export type { PricingSectionProps, AddOnData } from './PricingSection';
export { MobilePricingSection } from './MobilePricingSection';
export type { MobilePricingSectionProps } from './MobilePricingSection';
export { PricingCalculator } from './PricingCalculator';
export type { PricingCalculatorProps, PricingCalcItem } from './PricingCalculator';

export { TabbedShowcase, MobileTabbedShowcase } from './TabbedShowcase';
export type {
  TabbedShowcaseProps,
  MobileTabbedShowcaseProps,
  TabbedShowcaseTab,
} from './TabbedShowcase';

// ---- Reusable inner-page sections -----------------------------------------
// Composed by every non-home page. PageHero + CtaBand bookend a page;
// ContentSection wraps body content; the typed data sections render the
// public API entities through design-system primitives.

export { PageHero } from './PageHero';
export type { PageHeroProps } from './PageHero';
export { CenteredHero } from './CenteredHero';
export type { CenteredHeroProps } from './CenteredHero';
export { ContentSection } from './ContentSection';
export type { ContentSectionProps } from './ContentSection';
export { CtaBand } from './CtaBand';
export type { CtaBandProps, CtaBandAction } from './CtaBand';
export { FeatureGrid } from './FeatureGrid';
export type { FeatureGridProps, FeatureItem } from './FeatureGrid';
export { StatStrip } from './StatStrip';
export type { StatStripProps, Stat } from './StatStrip';

export { SplitHero } from './SplitHero';
export type { SplitHeroProps, SplitHeroAction } from './SplitHero';
export { MediaFeatureList } from './MediaFeatureList';
export type { MediaFeatureListProps, MediaFeatureItem } from './MediaFeatureList';
export { ProcessSteps } from './ProcessSteps';
export type { ProcessStepsProps, ProcessStepItem, ProcessStepService } from './ProcessSteps';
export { TestimonialCarousel } from './TestimonialCarousel';
export type {
  TestimonialCarouselProps,
  TestimonialCard,
  TestimonialResult,
  TestimonialAction,
} from './TestimonialCarousel';

export { ServicesShowcase } from './ServicesShowcase';
export type { ServicesShowcaseProps } from './ServicesShowcase';
export { TestimonialGrid } from './TestimonialGrid';
export type { TestimonialGridProps } from './TestimonialGrid';
export { TeamShowcase } from './TeamShowcase';
export type { TeamShowcaseProps } from './TeamShowcase';
export { FaqAccordion } from './FaqAccordion';
export type { FaqAccordionProps, FaqItem } from './FaqAccordion';
export { LocationsShowcase } from './LocationsShowcase';
export type { LocationsShowcaseProps } from './LocationsShowcase';
export { SocialFeed } from './SocialFeed';
export type { SocialFeedProps } from './SocialFeed';
export { JobList } from './JobList';
export type { JobListProps } from './JobList';
export { QuoteWall } from './QuoteWall';
export type { QuoteWallProps, QuoteTile } from './QuoteWall';
export { BackerGrid } from './BackerGrid';
export type { BackerGridProps, Backer } from './BackerGrid';
export { LogoMarquee } from './LogoMarquee';
export type { LogoMarqueeProps } from './LogoMarquee';
export { StoryHero } from './StoryHero';
export type { StoryHeroProps } from './StoryHero';
export { Timeline } from './Timeline';
export type { TimelineProps, TimelineMilestone } from './Timeline';
export { ContactDetails } from './ContactDetails';
export type { ContactDetailsProps } from './ContactDetails';
