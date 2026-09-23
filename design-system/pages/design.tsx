import {
  getCompanyInformation,
  getForm,
  getTeamMembers,
} from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/grid/field";
import { NavChrome } from "@/design-system/sections/nav";
import { FooterSection } from "@/design-system/sections/footer";
import { DesignHeadSection, DesignTabs } from "@/design-system/sections/design-head";
import { DesignFoundationsSection } from "@/design-system/sections/design-foundations";
import { DesignPrimitivesSection } from "@/design-system/sections/design-primitives";
import { DesignSectionsSection } from "@/design-system/sections/design-sections";
import { DesignRulesSection } from "@/design-system/sections/design-rules";
import { DesignToc } from "@/design-system/sections/design-toc";
import {
  getBlogFiltered,
  getBlogLanding,
  getBlogPostDetail,
} from "@/design-system/sections/blog-data";
import { toTeamRoster } from "@/design-system/sections/company-team";
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
