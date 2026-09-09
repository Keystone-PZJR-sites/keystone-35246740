import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/v2/grid/field";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { WorkHeaderSection } from "@/design-system/v2/sections/work-header";
import { WorkCasesSection } from "@/design-system/v2/sections/work-cases";
import { WorkGallerySection } from "@/design-system/v2/sections/work-gallery";
import { GALLERY_SITES } from "@/design-system/v2/sections/work-gallery-data";
import { GalleryOverlay } from "@/design-system/v2/sections/gallery-overlay";
import { FooterSection } from "@/design-system/v2/sections/footer";
import { LoadOrchestrator } from "@/design-system/v2/sections/load-orchestrator";

/** The assembled Our Work page — one server component, mounted by
 * `/our-work` (spec 014 §8.4). The composition: the header
 * (014), the case studies (014), and the gallery (015 — spliced
 * 2026-08-28) over the footer, plus the fullscreen gallery viewer
 * (016 — spliced 2026-08-29): a portal-mounted overlay island fed the
 * §4.2 site data from the one 015 data module; it wires the standing
 * open-gallery contract, so the 015 CTAs and tile triggers go live
 * with no markup change. The page carries three islands of its own —
 * the orchestrator, the 015 strip machine, and the viewer (six on the
 * page with the nav pair and footer-nav, the 016 §7.3 budget).
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
 * `qa` is the dev-only sweep slot. It renders inside the page div
 * because the probes resolve --t and the weights, which live on
 * .page. Production stubs the slot. */
export async function OurWorkPage({ qa }: { qa?: React.ReactNode }) {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page v2-choreo-rise">
      {/* the wide-viewport side fields (002.r2 §4.3) — never choreographed */}
      <GridField />
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
      {/* the 016 viewer: renders nothing until an open-gallery trigger
          fires; the name/url pairs are the §4.2 canon (one module) */}
      <GalleryOverlay sites={GALLERY_SITES.map(({ name, url }) => ({ name, url }))} />
      {qa}
    </div>
  );
}
