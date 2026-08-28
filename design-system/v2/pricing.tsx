import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { PricingOfferSection } from "@/design-system/v2/sections/pricing-offer";
import { FooterSection } from "@/design-system/v2/sections/footer";

/** The assembled pricing page — one server component, mounted bare by
 * `/pricing` and under the QA readout by `/pricing-fixture` (spec 011
 * §8, the spec 010 §6.3 pattern). Born here with the offer section
 * (011); 012 (price scale + persona carousel) and 013 (FAQ) splice
 * their sections in as they land. The page-level expectations module
 * and sweep leg follow with 013.
 *
 * No `v2-choreo`: the page has no load choreography (011 §9 R10) —
 * every section renders settled. Social URLs come from the retained
 * Keystone data layer.
 *
 * `qa` is /pricing-fixture's dev-only self-test mount slot (unused
 * until 013 delivers the expectations module); it renders inside the
 * page div because the devtools' probes resolve --t and the weights,
 * which live on .page. `/pricing` passes nothing. */
export async function PricingPage({ qa }: { qa?: React.ReactNode }) {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page">
      <NavChrome />
      <main>
        <PricingOfferSection />
      </main>
      <FooterSection
        social={{
          linkedin: companyInfo?.linkedin_url,
          facebook: companyInfo?.facebook_url,
          instagram: companyInfo?.instagram_url,
          youtube: companyInfo?.youtube_url,
        }}
      />
      {qa}
    </div>
  );
}
