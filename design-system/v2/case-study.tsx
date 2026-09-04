import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/v2/grid/field";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { CaseStudyHeaderSection } from "@/design-system/v2/sections/case-study-header";
import { CaseStudyIntroSection } from "@/design-system/v2/sections/case-study-intro";
import { CaseStudyOverviewSection } from "@/design-system/v2/sections/case-study-overview";
import { CaseStudyBusinessSection } from "@/design-system/v2/sections/case-study-business";
import { CaseStudyShiftSection } from "@/design-system/v2/sections/case-study-shift";
import { CaseStudyFunnelSection } from "@/design-system/v2/sections/case-study-funnel";
import { CaseStudyStackSection } from "@/design-system/v2/sections/case-study-stack";
import { CaseStudyResultSection } from "@/design-system/v2/sections/case-study-result";
import { CaseStudyCtaSection } from "@/design-system/v2/sections/case-study-cta";
import { CaseStudyToc } from "@/design-system/v2/sections/case-study-toc";
import { FooterSection } from "@/design-system/v2/sections/footer";
import { LoadOrchestrator } from "@/design-system/v2/sections/load-orchestrator";
import type { CaseStudy } from "@/design-system/v2/sections/case-study-data";

/** The assembled case-study page (spec 017 §8.4) — one server
 * component rendering wholly from the study record (§5.1, the
 * template law): the header over the eight-section stack and the CTA
 * band, the rd2-only sticky-TOC rail beside the stack (§4), the
 * footer, and the §6 entrance. Mounted bare by
 * `/case-studies/[slug]` (static params from the data module —
 * unpopulated slugs 404, §9 F9) and under the QA readout by
 * `/case-study-fixture`.
 *
 * Two islands of its own — the TOC and the orchestrator (five on the
 * page with the nav pair and footer-nav, the §7.3 budget). The
 * entrance (§6): the rises-only choreography through the generalized
 * orchestrator at its third consumer, opted in by the page's own
 * `v2-choreo-cs` guard (case-study.css); four beats — slug · H1 ·
 * metadata · the header photo — and the settle rides the photo's
 * rise (the .csh-img mount, the run's last beat). Everything below
 * the header is born settled; a no-JS or reduced-motion render is
 * the settled page with the TOC's resting state and working anchors.
 *
 * `qa` is /case-study-fixture's dev-only self-test mount slot (the
 * 013 §7 pattern). It renders inside the page div because the
 * devtools' probes resolve --t and the weights, which live on .page. */
export async function CaseStudyPage({ study, qa }: { study: CaseStudy; qa?: React.ReactNode }) {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page v2-choreo-cs">
      {/* the wide-viewport side fields (002.r2 §4.3) — never choreographed */}
      <GridField />
      <NavChrome />
      <main>
        <CaseStudyHeaderSection study={study} />
        {/* the TOC rail's containing block: the stack from the intro
            to the CTA band (the rail spans Overview → The Result) */}
        <div className="cs-stack">
          <CaseStudyIntroSection study={study} />
          <CaseStudyOverviewSection study={study} />
          <CaseStudyBusinessSection study={study} />
          <CaseStudyShiftSection study={study} />
          <CaseStudyFunnelSection study={study} />
          <CaseStudyStackSection study={study} />
          <CaseStudyResultSection study={study} />
          <CaseStudyCtaSection />
          <div className="toc-rail">
            <CaseStudyToc />
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
      {/* the photo's rise is the choreography's final beat (§6): the
          settle rides its animationend */}
      <LoadOrchestrator finalAnimation="hx-rise" finalSelector=".csh-img" />
      {qa}
    </div>
  );
}
