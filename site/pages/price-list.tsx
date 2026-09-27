import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@keystone-sites/marketing-design-system/grid/field";
import { NavChrome } from "@keystone-sites/marketing-design-system/sections/nav";
import { FooterSection } from "@keystone-sites/marketing-design-system/sections/footer";
import { PriceListHeaderSection } from "@/site/sections/price-list-header";
import { PriceListTableSection } from "@/site/sections/price-list-table";
import { PriceListCtaSection } from "@/site/sections/price-list-cta";

/** Price list composition (Usage price list · r5, 1184:51216): the
 * pricing page's à la carte companion. Renders settled, like pricing. */
export async function PriceListPage() {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page">
      {/* Side fields are fixed page chrome. */}
      <GridField />
      <NavChrome />
      <main>
        <PriceListHeaderSection />
        <PriceListTableSection />
        <PriceListCtaSection />
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
