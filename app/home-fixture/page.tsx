import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridRegion, type GridBand } from "@/design-system/v2/grid/region";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { HeroSection } from "@/design-system/v2/sections/hero";
import { FooterSection } from "@/design-system/v2/sections/footer";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/** Stands in for the portfolio section (spec 007) so the hero's bottom
 * joint, the page stack sum, and the landmark audit are testable with
 * the hero mounted above it (spec 006 §10). Provisional 8t field. */
function PortfolioPlaceholder() {
  return (
    <section className="sec hfx-placeholder" aria-label="Portfolio placeholder">
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => (
          <GridRegion key={band} band={band} gx={0} gy={0} gw={12} gh={8} />
        ))}
      </div>
      <p>Portfolio — spec 007</p>
    </section>
  );
}

export default async function HomeFixturePage() {
  const companyInfo = await getCompanyInformation();
  return (
    /* v2-choreo opts this page into the cold-load guard (see hero.css) */
    <div className="page v2-choreo">
      <NavChrome />
      <main>
        <HeroSection />
        <PortfolioPlaceholder />
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
