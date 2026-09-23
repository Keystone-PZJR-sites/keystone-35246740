import { Fragment, type ReactNode } from "react";
import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/grid/field";
import { NavChrome } from "@/design-system/sections/nav";
import { FooterSection } from "@/design-system/sections/footer";
import { LoadOrchestrator } from "@/design-system/sections/load-orchestrator";
import { LandingHeroSection, type LandingHeroData } from "@/design-system/sections/landing-hero";
import {
  LandingBenefitsSection,
  type LandingBenefitsData,
} from "@/design-system/sections/landing-benefits";
import { LandingQuoteSection, type LandingQuoteData } from "@/design-system/sections/landing-quote";
import {
  LandingCloserSection,
  type LandingCloserData,
} from "@/design-system/sections/landing-closer";

/** One section of a landing page: its kind names the component, the
 * rest is that section's data. Order and count are the page's; a kind
 * may repeat. To add a kind, write the section (sections/landing-*.tsx),
 * add its variant here, and add one line to `SECTIONS`. */
export type LandingSection =
  | ({ kind: "hero" } & LandingHeroData)
  | ({ kind: "benefits" } & LandingBenefitsData)
  | ({ kind: "quote" } & LandingQuoteData)
  | ({ kind: "closer" } & LandingCloserData);

export interface LandingPageData {
  meta: { title: string; description: string };
  sections: readonly LandingSection[];
}

const SECTIONS: {
  [K in LandingSection["kind"]]: (data: Extract<LandingSection, { kind: K }>) => ReactNode;
} = {
  hero: (data) => <LandingHeroSection data={data} />,
  benefits: (data) => <LandingBenefitsSection data={data} />,
  quote: (data) => <LandingQuoteSection data={data} />,
  closer: (data) => <LandingCloserSection data={data} />,
};

function renderSection(section: LandingSection): ReactNode {
  /* The map is exhaustive and keyed by kind; the union cannot be
     narrowed through the lookup, so the call is widened once here. */
  const render = SECTIONS[section.kind] as (data: LandingSection) => ReactNode;
  return render(section);
}

/** Landing page composition: the data's sections, in its order, between
 * the site's chrome, with the Our Work entrance (copy rises once fonts
 * are ready; a hero's media frame is the last beat). */
export async function LandingPage({ data }: { data: LandingPageData }) {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page load-sequence-rise">
      <GridField />
      <NavChrome />
      <main>
        {data.sections.map((section, i) => (
          <Fragment key={`${section.kind}-${i}`}>{renderSection(section)}</Fragment>
        ))}
      </main>
      <FooterSection
        social={{
          linkedin: companyInfo?.linkedin_url,
          facebook: companyInfo?.facebook_url,
          instagram: companyInfo?.instagram_url,
          youtube: companyInfo?.youtube_url,
        }}
      />
      <LoadOrchestrator finalAnimation="hx-rise" finalSelector=".ld-hero-media" />
    </div>
  );
}
