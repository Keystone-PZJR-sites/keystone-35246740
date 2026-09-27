import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@keystone-sites/marketing-design-system/grid/field";
import { NavChrome } from "@keystone-sites/marketing-design-system/sections/nav";
import { WorkHeaderSection } from "@/site/sections/work-header";
import { WorkCasesSection } from "@/site/sections/work-cases";
import { WorkGallerySection } from "@/site/sections/work-gallery";
import { GALLERY_SITES } from "@/site/sections/work-gallery-data";
import { GalleryOverlay } from "@keystone-sites/marketing-design-system/sections/gallery-overlay";
import { FooterSection } from "@keystone-sites/marketing-design-system/sections/footer";
import { LoadOrchestrator } from "@keystone-sites/marketing-design-system/sections/load-orchestrator";

/** Our Work page composition. The portal-mounted viewer uses the same
 * gallery data as the page. The orchestrator settles after the last
 * card rise. */
export async function OurWorkPage({
  openGallerySite,
}: {
  /** 1-based gallery site to open on load (from `?gallery=`). */
  openGallerySite?: number;
}) {
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
      <GalleryOverlay
        sites={GALLERY_SITES.map(({ name, url }) => ({ name, url }))}
        openSite={openGallerySite}
      />
    </div>
  );
}
