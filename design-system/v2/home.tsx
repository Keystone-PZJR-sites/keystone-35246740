import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/v2/grid/field";
import { GridRegion } from "@/design-system/v2/grid/region";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { HeroSection } from "@/design-system/v2/sections/hero";
import { PortfolioSection } from "@/design-system/v2/sections/portfolio";
import { EngineSection } from "@/design-system/v2/sections/engine";
import { TestimonialsSection } from "@/design-system/v2/sections/testimonials";
import { FooterSection } from "@/design-system/v2/sections/footer";

/** The assembled homepage — one server component, mounted bare by `/`
 * and under the QA readout by `/home-fixture` (spec 010 §6.3). All five
 * Phase 5 sections are real (specs 006–009); the stack-sum audit runs
 * against them and the footer. Social URLs come from the retained
 * Keystone data layer.
 *
 * `qa` is /home-fixture's dev-only self-test mount (spec 010 §3.2). It
 * renders inside the page div because the devtools' measurement probes
 * resolve --t and the weights, which live on .page. `/` passes nothing. */
export async function HomePage({ qa }: { qa?: React.ReactNode }) {
  const companyInfo = await getCompanyInformation();
  return (
    /* v2-choreo opts the page into the cold-load guard (see hero.css) */
    <div className="page v2-choreo">
      {/* the wide-viewport side fields (002.r2 §4.3) — never choreographed */}
      <GridField />
      <NavChrome />
      <main>
        <HeroSection />
        <PortfolioSection />
        <EngineSection />
        <TestimonialsSection />
        {/* the designed 1t row above the footer at rd2 only (007 §8.8) —
            painted lattice, not clear space: the file draws the full
            12-cell row (spec 009 §9 amendment 2026-08-27) */}
        <div className="sec hfx-clear-rd2" aria-hidden="true">
          <div className="gx">
            <GridRegion band="rd2" gx={0} gy={0} gw={12} gh={1} />
          </div>
        </div>
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
