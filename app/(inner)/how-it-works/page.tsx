import type { Metadata } from 'next';
import {
  MobilePricingSection,
  MobileWorkShowcase,
  PricingSection,
  WorkShowcase,
} from '@/components/sections';
import {
  PRODUCT_SCREENS_TOOLS,
  WORK_CARDS,
  WORK_INDUSTRIES,
  SHARED_WORK_SHOWCASE_PROPS,
  SHARED_MOBILE_WORK_SHOWCASE_PROPS,
  SHARED_PRICING_SECTION_PROPS,
  SHARED_MOBILE_PRICING_SECTION_PROPS,
} from '@/data';
import {
  buildHowItWorksHeroPills,
  buildHowItWorksHeroSlides,
  buildHowItWorksModules,
  randomizeModuleMediaOrder,
  HOW_IT_WORKS_HERO_HEADLINE,
  HOW_IT_WORKS_HERO_SUPPORTING_COPY,
  HOW_IT_WORKS_PRIMARY_CTA_LABEL,
  HOW_IT_WORKS_SECONDARY_CTA_LABEL,
} from '@/data/how-it-works';
import {
  HowItWorksHero,
  HowItWorksModules,
} from '@/components/sections/how-it-works';

const MODULE_SECTION_ID = 'how-it-works-modules';

export const metadata: Metadata = {
  title: 'How It Works | Keystone',
  description:
    'A practical module-by-module overview of how Keystone handles website, ads, social, content, reviews, leads, and sales execution for local businesses.',
};

export default function HowItWorksPage() {
  const baseModules = buildHowItWorksModules(
    WORK_CARDS,
    WORK_INDUSTRIES,
    PRODUCT_SCREENS_TOOLS,
  );
  const heroPills = buildHowItWorksHeroPills(baseModules);
  const heroSlides = buildHowItWorksHeroSlides(baseModules);
  const modules = randomizeModuleMediaOrder(baseModules);

  return (
    <div className="inner-page" data-theme="custom">
      <main>
        <HowItWorksHero
          headline={HOW_IT_WORKS_HERO_HEADLINE}
          supportingCopy={HOW_IT_WORKS_HERO_SUPPORTING_COPY}
          primaryCtaLabel={HOW_IT_WORKS_PRIMARY_CTA_LABEL}
          secondaryCtaLabel={HOW_IT_WORKS_SECONDARY_CTA_LABEL}
          pills={heroPills}
          slides={heroSlides}
        />

        <HowItWorksModules id={MODULE_SECTION_ID} modules={modules} />

        <PricingSection {...SHARED_PRICING_SECTION_PROPS} />
        <MobilePricingSection {...SHARED_MOBILE_PRICING_SECTION_PROPS} />

        <WorkShowcase {...SHARED_WORK_SHOWCASE_PROPS} />
        <MobileWorkShowcase {...SHARED_MOBILE_WORK_SHOWCASE_PROPS} />
      </main>
    </div>
  );
}
