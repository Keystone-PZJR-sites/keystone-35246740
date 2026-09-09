import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/v2/grid/field";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { PricingOfferSection } from "@/design-system/v2/sections/pricing-offer";
import { PricingScaleSection } from "@/design-system/v2/sections/pricing-scale";
import { FaqSection } from "@/design-system/v2/sections/faq";
import { FooterSection } from "@/design-system/v2/sections/footer";

/** The assembled pricing page — one server component, mounted by
 * `/pricing` (spec 011 §8). The stack is complete: the offer (011),
 * the price scale + persona carousel (012), and the FAQ (013) over
 * the footer.
 *
 * No `v2-choreo`: the page has no load choreography (011 §9 R10) —
 * every section renders settled. Social URLs come from the retained
 * Keystone data layer.
 *
 * `qa` is the dev-only sweep slot. It renders inside the page div
 * because the probes resolve --t and the weights, which live on
 * .page. Production stubs the slot. */
export async function PricingPage({ qa }: { qa?: React.ReactNode }) {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page">
      {/* the wide-viewport side fields (002.r2 §4.3) — never choreographed */}
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
      {qa}
    </div>
  );
}
