import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@keystone-sites/marketing-design-system/grid/field";
import { NavChrome } from "@keystone-sites/marketing-design-system/sections/nav";
import { CaseStudyHeaderSection } from "@/site/sections/case-study-header";
import { CaseStudyIntroSection } from "@/site/sections/case-study-intro";
import { CaseStudyOverviewSection } from "@/site/sections/case-study-overview";
import { CaseStudyBusinessSection } from "@/site/sections/case-study-business";
import { CaseStudyShiftSection } from "@/site/sections/case-study-shift";
import { CaseStudyFunnelSection } from "@/site/sections/case-study-funnel";
import { CaseStudyStackSection } from "@/site/sections/case-study-stack";
import { CaseStudyResultSection } from "@/site/sections/case-study-result";
import { CaseStudyCtaSection } from "@/site/sections/case-study-cta";
import { CaseStudyToc } from "@/site/sections/case-study-toc";
import { FooterSection } from "@keystone-sites/marketing-design-system/sections/footer";
import { LoadOrchestrator } from "@keystone-sites/marketing-design-system/sections/load-orchestrator";
import type { CaseStudy } from "@/site/sections/case-study-data";

/** Assembles a case study from its typed record. */
export async function CaseStudyPage({ study }: { study: CaseStudy }) {
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
    </div>
  );
}
