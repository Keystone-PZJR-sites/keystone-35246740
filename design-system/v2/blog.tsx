import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/v2/grid/field";
import { NavChrome } from "@/design-system/v2/sections/nav";
import { BlogTopSection } from "@/design-system/v2/sections/blog-top";
import { FooterSection } from "@/design-system/v2/sections/footer";

/** The assembled blog landing (spec 024 §8; the Resources phase's
 * first surface). The stack so far: nav · blog-top · footer — the
 * post lists (featured, recent, category sections) arrive with spec
 * 025 on the same route.
 *
 * No `v2-choreo`: the sections render settled (024 §5); the page-level
 * load choreography rides the 025 assembly. The company-info fetch
 * feeds the footer's socials AND the podcast card's YouTube link (the
 * 004 wiring through the shared podcast-links module — Spotify/Apple
 * are its constants, YouTube is `youtube_url` with the "#" fallback).
 *
 * The expectations module, `blog-qa` wrapper, and sweep leg land with
 * the 025 assembly (024 §8). */
export async function BlogPage() {
  const companyInfo = await getCompanyInformation();
  return (
    <div className="page">
      {/* the wide-viewport side fields (002.r2 §4.3) — never choreographed */}
      <GridField />
      <NavChrome />
      <main>
        <BlogTopSection youtubeUrl={companyInfo?.youtube_url} />
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
