import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridRegion, type GridBand } from "@/design-system/v2/grid/region";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { HeroSection } from "@/design-system/v2/sections/hero";
import { PortfolioSection } from "@/design-system/v2/sections/portfolio";
import { FooterSection } from "@/design-system/v2/sections/footer";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/** Stands in for the remaining Phase 5 rows (spec 007 §8.8) so the
 * footer joint stays testable: engine 21t/13t/9t/9t/8t and testimonials
 * 11t/9t/7t/8t/11t, from the anchor frames at writing time; specs
 * 008/009 replace them. */
function PhasePlaceholder({
  name,
  ticks,
}: {
  name: string;
  ticks: Record<GridBand, number>;
}) {
  return (
    <section
      className={`sec hfx-placeholder hfx-${name.toLowerCase()}`}
      aria-label={`${name} placeholder`}
    >
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => (
          <GridRegion key={band} band={band} gx={0} gy={0} gw={12} gh={ticks[band]} />
        ))}
      </div>
      <p>{name} — {name === "Engine" ? "spec 008" : "spec 009"}</p>
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
        <PortfolioSection />
        <PhasePlaceholder
          name="Engine"
          ticks={{ rm: 21, rs: 13, rt: 9, rd1: 9, rd2: 8 }}
        />
        <PhasePlaceholder
          name="Testimonials"
          ticks={{ rm: 11, rs: 9, rt: 7, rd1: 8, rd2: 11 }}
        />
        {/* the designed 1t clear row above the footer at rd2 only (§8.8) */}
        <div className="hfx-clear-rd2" aria-hidden="true" />
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
