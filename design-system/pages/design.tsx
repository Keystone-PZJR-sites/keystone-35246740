import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/grid/field";
import { NavChrome } from "@/design-system/sections/nav";
import { FooterSection } from "@/design-system/sections/footer";
import { DesignHeadSection, DesignTabs } from "@/design-system/sections/design-head";
import { DesignFoundationsSection } from "@/design-system/sections/design-foundations";
import { DesignPrimitivesSection } from "@/design-system/sections/design-primitives";
import { DesignSectionsSection } from "@/design-system/sections/design-sections";
import { DesignRulesSection } from "@/design-system/sections/design-rules";
import { readRules, readTokens, readTypeStyles } from "./design-source";

/** The design system, rendered from its source. Not indexed, not in the
 * sitemap; in the visual gate like every route. */
export async function DesignPage() {
  const [companyInfo, tokens, typeStyles, rules] = await Promise.all([
    getCompanyInformation(),
    readTokens(),
    readTypeStyles(),
    readRules(),
  ]);
  return (
    <div className="page">
      <GridField />
      <NavChrome />
      <main>
        <DesignHeadSection />
        {/* One chapter at a time; the hash picks it (design.css). */}
        <div className="ds-body">
          <DesignTabs />
          <div className="ds-chapters">
            <DesignFoundationsSection tokens={tokens} typeStyles={typeStyles} />
            <DesignPrimitivesSection />
            <DesignSectionsSection />
            <DesignRulesSection markdown={rules} />
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
