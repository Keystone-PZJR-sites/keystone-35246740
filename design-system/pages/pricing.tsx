import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/grid/field";
import { NavChrome } from "@/design-system/sections/nav";
import { PricingHeaderSection } from "@/design-system/sections/pricing-header";
import { PricingPlansSection } from "@/design-system/sections/pricing-plans";
import { PricingIncludesSection } from "@/design-system/sections/pricing-includes";
import { PricingScaleSection } from "@/design-system/sections/pricing-scale";
import { PricingInquirySection } from "@/design-system/sections/pricing-inquiry";
import { FaqSection } from "@/design-system/sections/faq";
import { FooterSection } from "@/design-system/sections/footer";

/** Pricing page composition. It renders settled without a load
 * choreography. The grid check lives inside `.page` so its probes can
 * resolve the page's tick and interpolation weights. */
export async function PricingPage() {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page">
      {/* Side fields are fixed page chrome. */}
      <GridField />
      <NavChrome />
      <main>
        <PricingHeaderSection />
        <PricingPlansSection />
        <PricingIncludesSection />
        <PricingScaleSection />
        <PricingInquirySection />
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
    </div>
  );
}
