import {
  getCompanyInformation,
  getForm,
  getTeamMembers,
} from "@keystone-sites/core/lib/server-api";
import { GridField } from "@keystone-sites/marketing-design-system/grid/field";
import { NavChrome } from "@keystone-sites/marketing-design-system/sections/nav";
import { FooterSection } from "@keystone-sites/marketing-design-system/sections/footer";
import { DesignHeadSection, DesignTabs } from "@/site/sections/design-head";
import { DesignFoundationsSection } from "@/site/sections/design-foundations";
import { DesignPrimitivesSection } from "@/site/sections/design-primitives";
import { DesignSectionsSection } from "@/site/sections/design-sections";
import { DesignRulesSection } from "@/site/sections/design-rules";
import { DesignToc } from "@/site/sections/design-toc";
import { getBlogFiltered, getBlogLanding, getBlogPostDetail } from "@/site/sections/blog-data";
import { toTeamRoster } from "@/site/sections/company-team";
import { readRules, readTokens, readTypeStyles } from "./design-source";

/** The design system, rendered from its source. Not indexed, not in the
 * sitemap; in the visual gate like every route. The sections chapter
 * mounts every page's sections, so it loads what those pages load. */
export async function DesignPage() {
  const [companyInfo, tokens, typeStyles, rules, team, form, blogLanding, blogFiltered] =
    await Promise.all([
      getCompanyInformation(),
      readTokens(),
      readTypeStyles(),
      readRules(),
      getTeamMembers(),
      getForm("lead"),
      getBlogLanding(),
      getBlogFiltered({ page: 1 }),
    ]);
  const firstPost = blogLanding.featured?.slug ?? blogLanding.recent[0]?.slug;
  const blogPost = firstPost ? await getBlogPostDetail(firstPost) : null;

  return (
    <div className="page">
      <GridField />
      <NavChrome />
      <main>
        <DesignHeadSection />
        {/* One chapter at a time; the tabs pick it (design.css). */}
        <div className="ds-body">
          <DesignTabs />
          <div className="ds-chapters">
            <DesignFoundationsSection tokens={tokens} typeStyles={typeStyles} />
            <DesignPrimitivesSection />
            <DesignSectionsSection
              data={{
                team: toTeamRoster(team),
                form,
                blogLanding,
                blogFiltered,
                blogPost,
                youtubeUrl: companyInfo?.youtube_url ?? undefined,
              }}
            />
            <DesignRulesSection markdown={rules} />
            <DesignToc />
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
