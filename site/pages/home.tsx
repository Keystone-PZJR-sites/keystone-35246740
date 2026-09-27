import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@keystone-sites/marketing-design-system/grid/field";
import { NavChrome } from "@keystone-sites/marketing-design-system/sections/nav";
import { HeroSection } from "@/site/sections/hero";
import { SystemSection } from "@/site/sections/system";
import { EnginesSection } from "@/site/sections/engines";
import { WorkDeckSection } from "@/site/sections/work-deck";
import { CaseCarouselSection } from "@/site/sections/case-carousel";
import { FooterSection } from "@keystone-sites/marketing-design-system/sections/footer";

/** Homepage composition. The grid check renders inside `.page` so its
 * probes can resolve the page's tick and interpolation weights. */
export async function HomePage() {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page load-sequence">
      {/* Side fields stay outside the load choreography. */}
      <GridField />
      <NavChrome />
      <main>
        <HeroSection />
        <SystemSection />
        <EnginesSection />
        <WorkDeckSection />
        <CaseCarouselSection />
      </main>
      <FooterSection
        social={{
          linkedin: companyInfo?.linkedin_url,
          facebook: companyInfo?.facebook_url,
          instagram: companyInfo?.instagram_url,
          youtube: companyInfo?.youtube_url,
        }}
      />
    </div>
  );
}
