import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { WorkHeaderSection } from "@/design-system/v2/sections/work-header";
import { WorkCasesSection } from "@/design-system/v2/sections/work-cases";
import { FooterSection } from "@/design-system/v2/sections/footer";
import { LoadOrchestrator } from "@/design-system/v2/sections/load-orchestrator";

/** The assembled Our Work page — one server component, mounted bare by
 * `/our-work` and under the QA readout by `/our-work-fixture` (spec
 * 014 §8.4, the spec 010 §6.3 pattern). The interim composition (the
 * 011 pattern): the header (014) and the case studies (014) over the
 * footer — 015 (the gallery) and 016 (the fullscreen overlay + page
 * assembly) splice their sections in as they land; until then the
 * footer sits directly below the section end.
 *
 * The entrance (014 §6 as amended 2026-08-28, owner direction): the
 * rises-only load choreography — `v2-choreo-rise` opts the page into
 * the rises-only cold-load guard (our-work.css; the nav never reloads,
 * the lattice never sweeps, there is no highlight pass) and the
 * orchestrator island settles the run on the card shadow beat, the
 * choreography's final animation. The page's one island; both sections
 * stay island-free. Social URLs come from the retained Keystone data
 * layer.
 *
 * `qa` is /our-work-fixture's dev-only self-test mount slot (the 013
 * §7 pattern; the Our Work expectations module lands with 016). It
 * renders inside the page div because the devtools' probes resolve
 * --t and the weights, which live on .page. `/our-work` passes
 * nothing. */
export async function OurWorkPage({ qa }: { qa?: React.ReactNode }) {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page v2-choreo-rise">
      <NavChrome />
      <main>
        <WorkHeaderSection />
        <WorkCasesSection />
      </main>
      <FooterSection
        social={{
          linkedin: companyInfo?.linkedin_url,
          facebook: companyInfo?.facebook_url,
          instagram: companyInfo?.instagram_url,
          youtube: companyInfo?.youtube_url,
        }}
      />
      <LoadOrchestrator finalAnimation="wk-shadow-in" />
      {qa}
    </div>
  );
}
