import { getCompanyInformation, getTeamMembers } from "@keystone-sites/core/lib/server-api";
import { GridField } from "../grid/field";
import { FooterSection } from "../sections/footer";
import { NavChrome } from "../sections/nav";
import { CompanyHeroSection } from "../sections/company-hero";
import { CompanyStorySection } from "../sections/company-story";
import { CompanyBackersSection } from "../sections/company-backers";
import { CompanyTeamSection, toTeamRoster } from "../sections/company-team";
import { CompanyCareersSection } from "../sections/company-careers";

export async function CompanyPage() {
  const [company, team] = await Promise.all([getCompanyInformation(), getTeamMembers()]);
  return (
    <div className="page">
      <GridField />
      <NavChrome />
      <main>
        <CompanyHeroSection />
        <CompanyStorySection />
        <CompanyBackersSection />
        <CompanyTeamSection members={toTeamRoster(team)} />
        <CompanyCareersSection />
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
