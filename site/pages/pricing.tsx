import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@keystone-sites/marketing-design-system/grid/field";
import { NavChrome } from "@keystone-sites/marketing-design-system/sections/nav";
import { PricingHeaderSection } from "@/site/sections/pricing-header";
import { PricingPlansSection } from "@/site/sections/pricing-plans";
import { PricingIncludesSection } from "@/site/sections/pricing-includes";
import { PricingScaleSection } from "@/site/sections/pricing-scale";
import { PricingInquirySection } from "@/site/sections/pricing-inquiry";
import { FaqSection } from "@keystone-sites/marketing-design-system/sections/faq";
import { FAQ_HEAD, FAQ_ITEMS } from "../sections/faq-data";
import { FooterSection } from "@keystone-sites/marketing-design-system/sections/footer";

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
        <FaqSection head={FAQ_HEAD} items={FAQ_ITEMS} />
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
