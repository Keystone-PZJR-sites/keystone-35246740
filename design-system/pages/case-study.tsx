import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/grid/field";
import { NavChrome } from "@/design-system/sections/nav";
import { CaseStudyHeaderSection } from "@/design-system/sections/case-study-header";
import { CaseStudyIntroSection } from "@/design-system/sections/case-study-intro";
import { CaseStudyOverviewSection } from "@/design-system/sections/case-study-overview";
import { CaseStudyBusinessSection } from "@/design-system/sections/case-study-business";
import { CaseStudyShiftSection } from "@/design-system/sections/case-study-shift";
import { CaseStudyFunnelSection } from "@/design-system/sections/case-study-funnel";
import { CaseStudyStackSection } from "@/design-system/sections/case-study-stack";
import { CaseStudyResultSection } from "@/design-system/sections/case-study-result";
import { CaseStudyCtaSection } from "@/design-system/sections/case-study-cta";
import { CaseStudyToc } from "@/design-system/sections/case-study-toc";
import { FooterSection } from "@/design-system/sections/footer";
import { LoadOrchestrator } from "@/design-system/sections/load-orchestrator";
import type { CaseStudy } from "@/design-system/sections/case-study-data";

/** Assembles a case study from its typed record.
 * The grid check stays inside `.page` so probes inherit its tick and
 * interpolation variables. */
export async function CaseStudyPage({
  study,
  gridCheck,
}: {
  study: CaseStudy;
  gridCheck?: React.ReactNode;
}) {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page load-sequence-case-study">
      {/* Side fields stay outside the load choreography. */}
      <GridField />
      <NavChrome />
      <main>
        <CaseStudyHeaderSection study={study} />
        {/* This stack bounds the sticky TOC from Overview through Result. */}
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
      {/* The header photo's rise is the final animation. */}
      <LoadOrchestrator finalAnimation="hx-rise" finalSelector=".csh-img" />
      {gridCheck}
    </div>
  );
}
