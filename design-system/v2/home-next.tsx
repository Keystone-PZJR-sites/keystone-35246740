import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/v2/grid/field";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { HeroV2Section } from "@/design-system/v2/sections/hero-v2";
import { FooterSection } from "@/design-system/v2/sections/footer";

/** The homepage v2 composition (spec 018 §8) — the Phase 10 parallel
 * build: nav · hero-v2 · footer for now; 019–022 splice their sections
 * in as they land. Mounted bare by the noindexed /home-next and under
 * /home-next-fixture; `/` and `/home-fixture` keep mounting v1 until
 * the spec 023 cutover.
 *
 * `qa` is the fixture route's devtools mount point — the page-level
 * expectations module and sweep leg land with 023; until then the
 * fixture passes nothing and the hero audits on /hero-next. */
export async function HomeNextPage({ qa }: { qa?: React.ReactNode }) {
  const companyInfo = await getCompanyInformation();
  return (
    /* v2-choreo opts the page into the cold-load guard (hero.css) */
    <div className="page v2-choreo">
      {/* the wide-viewport side fields (002.r2 §4.3) — never choreographed */}
      <GridField />
      <NavChrome />
      <main>
        <HeroV2Section />
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
