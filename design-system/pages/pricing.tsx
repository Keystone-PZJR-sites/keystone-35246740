import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/grid/field";
import { NavChrome } from "@/design-system/sections/nav";
import { PricingOfferSection } from "@/design-system/sections/pricing-offer";
import { PricingScaleSection } from "@/design-system/sections/pricing-scale";
import { FaqSection } from "@/design-system/sections/faq";
import { FooterSection } from "@/design-system/sections/footer";

/** Pricing page composition. It renders settled without a load
 * choreography. The grid check lives inside `.page` so its probes can
 * resolve the page's tick and interpolation weights. */
export async function PricingPage({ gridCheck }: { gridCheck?: React.ReactNode }) {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page">
      {/* Side fields are fixed page chrome. */}
      <GridField />
      <NavChrome />
      <main>
        <PricingOfferSection />
        <PricingScaleSection />
        <FaqSection />
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
