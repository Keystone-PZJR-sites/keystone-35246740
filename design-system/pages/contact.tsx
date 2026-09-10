import { getCompanyInformation, getForm } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/grid/field";
import { NavChrome } from "@/design-system/sections/nav";
import { FooterSection } from "@/design-system/sections/footer";
import { ContactSection } from "@/design-system/sections/contact";

/** Contact page — lead form posts to `/api/form`. Not linked from chrome. */
export async function ContactPage() {
  const [company, form] = await Promise.all([getCompanyInformation(), getForm("lead")]);

  return (
    <div className="page contact-page">
      <GridField />
      <NavChrome />
      <main>
        <ContactSection form={form} />
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
