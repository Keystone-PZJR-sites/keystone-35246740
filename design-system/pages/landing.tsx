import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/grid/field";
import { NavChrome } from "@/design-system/sections/nav";
import { FooterSection } from "@/design-system/sections/footer";
import { LoadOrchestrator } from "@/design-system/sections/load-orchestrator";
import { LandingHeroSection, type LandingHeroData } from "@/design-system/sections/landing-hero";
import {
  LandingBenefitsSection,
  type LandingBenefitsData,
} from "@/design-system/sections/landing-benefits";
import { LandingQuoteSection, type LandingQuoteData } from "@/design-system/sections/landing-quote";
import {
  LandingCloserSection,
  type LandingCloserData,
} from "@/design-system/sections/landing-closer";

/** Everything a landing page needs, as data. A new page is one of these
 * plus a route file — see pages/for-dentists-data.ts and
 * app/for-dentists/page.tsx. */
export interface LandingPageData {
  meta: { title: string; description: string };
  hero: LandingHeroData;
  benefits: LandingBenefitsData;
  quote: LandingQuoteData;
  closer: LandingCloserData;
}

/** Landing page composition: the four kit sections between the site's
 * chrome, with the Our Work entrance (copy rises once fonts are ready;
 * the media frame is the last beat). */
export async function LandingPage({ data }: { data: LandingPageData }) {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page load-sequence-rise">
      <GridField />
      <NavChrome />
      <main>
        <LandingHeroSection data={data.hero} />
        <LandingBenefitsSection data={data.benefits} />
        <LandingQuoteSection data={data.quote} />
        <LandingCloserSection data={data.closer} />
      </main>
      <FooterSection
        social={{
          linkedin: companyInfo?.linkedin_url,
          facebook: companyInfo?.facebook_url,
          instagram: companyInfo?.instagram_url,
          youtube: companyInfo?.youtube_url,
        }}
      />
      <LoadOrchestrator finalAnimation="hx-rise" finalSelector=".ld-hero-media" />
    </div>
  );
}
