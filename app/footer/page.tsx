import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { FooterSection } from "@/design-system/v2/sections/footer";

/** /footer — the section alone on the page, so the stack sum equals the
 * footer's §1 tick totals exactly. Social URLs come from the retained
 * Keystone data layer, the same source the shipping chrome uses. */
export default async function FooterDevPage() {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page">
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
