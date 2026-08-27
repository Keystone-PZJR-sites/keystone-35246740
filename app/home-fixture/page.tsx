import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridRegion } from "@/design-system/v2/grid/region";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { HeroSection } from "@/design-system/v2/sections/hero";
import { PortfolioSection } from "@/design-system/v2/sections/portfolio";
import { EngineSection } from "@/design-system/v2/sections/engine";
import { TestimonialsSection } from "@/design-system/v2/sections/testimonials";
import { FooterSection } from "@/design-system/v2/sections/footer";

/** All five Phase 5 sections are real (specs 006–009) — the last
 * placeholder was replaced by the testimonials section (spec 009
 * §8.6), so the stack-sum audit runs against five real sections and
 * the footer. The designed 1t clear row above the footer at rd2 stays
 * page assembly (007 §8.8's fixture element). */
export default async function HomeFixturePage() {
  const companyInfo = await getCompanyInformation();
  return (
    /* v2-choreo opts this page into the cold-load guard (see hero.css) */
    <div className="page v2-choreo">
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
    </div>
  );
}
