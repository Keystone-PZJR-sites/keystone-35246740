import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/v2/grid/field";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { HeroV2Section } from "@/design-system/v2/sections/hero-v2";
import { SystemSection } from "@/design-system/v2/sections/system";
import { EnginesSection } from "@/design-system/v2/sections/engines";
import { WorkDeckSection } from "@/design-system/v2/sections/work-deck";
import { CaseCarouselSection } from "@/design-system/v2/sections/case-carousel";
import { FooterSection } from "@/design-system/v2/sections/footer";

/** The assembled homepage (the Phase 10 v2 composition, promoted to
 * `/` at the spec 023 §4 cutover; born as home-next.tsx, spec 018 §8):
 * nav · hero (018) · system (019) · engines (020) · work deck (021) ·
 * case-study carousel (022) · footer. Mounted by `/`. Social URLs
 * come from the retained Keystone data layer.
 *
 * `qa` is `/`'s dev-only self-test mount (spec 023 §1/§2, amended
 * 2026-09-08 — `/home-fixture` retired). It renders inside the page
 * div because the devtools' measurement probes resolve --t and the
 * weights, which live on .page. The production build stubs it. */
export async function HomePage({ qa }: { qa?: React.ReactNode }) {
  const companyInfo = await getCompanyInformation();
  return (
    /* v2-choreo opts the page into the cold-load guard (hero-v2.css) */
    <div className="page v2-choreo">
      {/* the wide-viewport side fields (002.r2 §4.3) — never choreographed */}
      <GridField />
      <NavChrome />
      <main>
        <HeroV2Section />
        <SystemSection />
        <EnginesSection />
        <WorkDeckSection />
        <CaseCarouselSection />
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
