import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/grid/field";
import { NavChrome } from "@/design-system/sections/nav";
import { WorkHeaderSection } from "@/design-system/sections/work-header";
import { WorkCasesSection } from "@/design-system/sections/work-cases";
import { WorkGallerySection } from "@/design-system/sections/work-gallery";
import { GALLERY_SITES } from "@/design-system/sections/work-gallery-data";
import { GalleryOverlay } from "@/design-system/sections/gallery-overlay";
import { FooterSection } from "@/design-system/sections/footer";
import { LoadOrchestrator } from "@/design-system/sections/load-orchestrator";

/** Our Work page composition. The portal-mounted viewer uses the same
 * gallery data as the page. The orchestrator settles after the last
 * card rise. The grid check lives inside `.page` to read grid variables. */
export async function OurWorkPage({ gridCheck }: { gridCheck?: React.ReactNode }) {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page load-sequence-rise">
      {/* Side fields stay outside the load choreography. */}
      <GridField />
      <NavChrome />
      <main>
        <WorkHeaderSection />
        <WorkCasesSection />
        <WorkGallerySection />
      </main>
      <FooterSection
        social={{
          linkedin: companyInfo?.linkedin_url,
          facebook: companyInfo?.facebook_url,
          instagram: companyInfo?.instagram_url,
          youtube: companyInfo?.youtube_url,
        }}
      />
      {/* The first card's rise is the final animation on the shared clock. */}
      <LoadOrchestrator finalAnimation="hx-rise" finalSelector=".csc" />
      <GalleryOverlay sites={GALLERY_SITES.map(({ name, url }) => ({ name, url }))} />
      {gridCheck}
    </div>
  );
}
