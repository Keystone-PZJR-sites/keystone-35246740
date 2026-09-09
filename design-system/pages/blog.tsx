import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import type { ReactNode } from "react";
import { GridField } from "../grid/field";
import { FooterSection } from "../sections/footer";
import { BlogListsSection } from "../sections/blog-lists";
import { BlogTopSection } from "../sections/blog-top";
import type { BlogLandingModel } from "../sections/blog-data";
import { NavChrome } from "../sections/nav";

export interface BlogPageProps {
  landing: BlogLandingModel;
  searchQuery?: string;
  gridCheck?: ReactNode;
}

export async function BlogPage({ landing, searchQuery, gridCheck }: BlogPageProps) {
  const company = await getCompanyInformation();
  return (
    <div className="page">
      <GridField />
      <NavChrome />
      <main>
        <BlogTopSection youtubeUrl={company?.youtube_url} searchQuery={searchQuery} />
        <BlogListsSection landing={landing} />
      </main>
      <FooterSection
        social={{
          linkedin: company?.linkedin_url,
          facebook: company?.facebook_url,
          instagram: company?.instagram_url,
          youtube: company?.youtube_url,
        }}
      />
      {gridCheck}
    </div>
  );
}
