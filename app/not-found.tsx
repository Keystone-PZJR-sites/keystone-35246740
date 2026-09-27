import type { Metadata } from "next";
import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@keystone-sites/marketing-design-system/grid/field";
import { LegalContentSection } from "@/site/sections/legal-content";
import { NavChrome } from "@keystone-sites/marketing-design-system/sections/nav";
import { FooterSection } from "@keystone-sites/marketing-design-system/sections/footer";
import { LEGAL_EYEBROW } from "@/site/pages/legal-data";

export const metadata: Metadata = {
  title: "Page not found | Keystone",
  robots: { index: false },
};

const NOT_FOUND_MARKDOWN = `That page is not here. It may have moved, or the link may be out of date.

[Back to the home page](/) · [See our work](/our-work/) · [Pricing](/pricing/)`;

/** Same composition as the legal pages: chrome, one prose block, footer. */
export default async function NotFound() {
  const company = await getCompanyInformation();
  return (
    <div className="page legal-page">
      <GridField />
      <NavChrome />
      <main>
        <LegalContentSection
          eyebrow={LEGAL_EYEBROW}
          title="Page not found"
          markdown={NOT_FOUND_MARKDOWN}
        />
      </main>
      <FooterSection
        social={{
          linkedin: company?.linkedin_url,
          facebook: company?.facebook_url,
          instagram: company?.instagram_url,
          youtube: company?.youtube_url,
        }}
      />
    </div>
  );
}
