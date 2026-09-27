import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@keystone-sites/marketing-design-system/grid/field";
import { NavChrome } from "@keystone-sites/marketing-design-system/sections/nav";
import { FooterSection } from "@keystone-sites/marketing-design-system/sections/footer";
import { UsageHeaderSection } from "@/site/sections/usage-header";
import { UsageTableSection } from "@/site/sections/usage-table";
import { UsageCtaSection } from "@/site/sections/usage-cta";

/** Usage price list composition (Usage price list · r5, 1184:51216): the
 * pricing page's à la carte companion. Renders settled, like pricing. */
export async function UsagePriceListPage() {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page">
      {/* Side fields are fixed page chrome. */}
      <GridField />
      <NavChrome />
      <main>
        <UsageHeaderSection />
        <UsageTableSection />
        <UsageCtaSection />
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
