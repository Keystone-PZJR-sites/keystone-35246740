import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/v2/grid/field";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { BlogTopSection } from "@/design-system/v2/sections/blog-top";
import { BlogListsSection } from "@/design-system/v2/sections/blog-lists";
import { FooterSection } from "@/design-system/v2/sections/footer";
import type { BlogLandingModel } from "@/design-system/v2/sections/blog-data";

/** The assembled blog landing (spec 024 §8 · spec 025 §8). The stack:
 * nav · blog-top · blog-lists · footer. The page (app/blog/page.tsx)
 * fetches the landing model through `blog-data.ts` and feeds it here
 * and to the blog-qa expectations (one fetch, one snapshot — the
 * data-dependent expectations derive from the same model the page
 * rendered).
 *
 * No `v2-choreo`: the sections render settled (024 §5 · 025 §6); the
 * lists are the plan's first data-driven surface and an empty backend
 * renders the top + footer alone (025 §5 — BlogListsSection returns
 * null). The company-info fetch feeds the footer's socials AND the
 * podcast card's YouTube link (the 004 wiring through the shared
 * podcast-links module).
 *
 * `qa` is the dev-only sweep slot (the HomePage pattern); production
 * aliases the wrapper to the null stub. */
export async function BlogPage({
  landing,
  qa,
}: {
  landing: BlogLandingModel;
  qa?: React.ReactNode;
}) {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page">
      {/* the wide-viewport side fields (002.r2 §4.3) — never choreographed */}
      <GridField />
      <NavChrome />
      <main>
        <BlogTopSection youtubeUrl={companyInfo?.youtube_url} />
        <BlogListsSection landing={landing} />
      </main>
      <FooterSection
        social={{
          linkedin: companyInfo?.linkedin_url,
          facebook: companyInfo?.facebook_url,
          instagram: companyInfo?.instagram_url,
          youtube: companyInfo?.youtube_url,
        }}
      />
      {qa}
    </div>
  );
}
