import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/grid/field";
import { NavChrome } from "@/design-system/sections/nav";
import { HeroSection } from "@/design-system/sections/hero";
import { SystemSection } from "@/design-system/sections/system";
import { EnginesSection } from "@/design-system/sections/engines";
import { WorkDeckSection } from "@/design-system/sections/work-deck";
import { CaseCarouselSection } from "@/design-system/sections/case-carousel";
import { FooterSection } from "@/design-system/sections/footer";

/** Homepage composition. The grid check renders inside `.page` so its
 * probes can resolve the page's tick and interpolation weights. */
export async function HomePage({ gridCheck }: { gridCheck?: React.ReactNode }) {
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
      {gridCheck}
    </div>
  );
}
