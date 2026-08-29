import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { WorkHeaderSection } from "@/design-system/v2/sections/work-header";
import { WorkCasesSection } from "@/design-system/v2/sections/work-cases";
import { WorkGallerySection } from "@/design-system/v2/sections/work-gallery";
import { FooterSection } from "@/design-system/v2/sections/footer";
import { LoadOrchestrator } from "@/design-system/v2/sections/load-orchestrator";

/** The assembled Our Work page — one server component, mounted bare by
 * `/our-work` and under the QA readout by `/our-work-fixture` (spec
 * 014 §8.4, the spec 010 §6.3 pattern). The composition: the header
 * (014), the case studies (014), and the gallery (015 — spliced
 * 2026-08-28) over the footer; 016 (the fullscreen overlay + page
 * assembly) lands last. The page carries two islands: the
 * orchestrator and the 015 strip machine (the gallery's own).
 *
 * The entrance (014 §6 as amended 2026-08-28; the shadow beat retired
 * 2026-08-29 with the whole-card interaction rework): the rises-only
 * load choreography — `v2-choreo-rise` opts the page into the
 * rises-only cold-load guard (our-work.css; the nav never reloads,
 * the lattice never sweeps, there is no highlight pass) and the
 * orchestrator island settles the run on card 1's fade-rise, the
 * choreography's final animation (five beats). Social URLs come from
 * the retained Keystone data layer.
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
        <WorkGallerySection />
      </main>
      <FooterSection
        social={{
          linkedin: companyInfo?.linkedin_url,
          facebook: companyInfo?.facebook_url,
          instagram: companyInfo?.instagram_url,
          youtube: companyInfo?.youtube_url,
        }}
      />
      {/* card 1's rise is the choreography's final beat (the shadow
          beat retired 2026-08-29 with the resting image shadow — 014
          §9); the selector pins the settle to the card's own hx-rise,
          the last to end on the shared clock */}
      <LoadOrchestrator finalAnimation="hx-rise" finalSelector=".csc" />
      {qa}
    </div>
  );
}
