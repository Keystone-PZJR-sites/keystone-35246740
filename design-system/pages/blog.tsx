import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import type { ReactNode } from "react";
import { GridField } from "../grid/field";
import { FooterSection } from "../sections/footer";
import { BlogCategorySection } from "../sections/blog-category";
import { BlogListsSection } from "../sections/blog-lists";
import { BlogTopSection } from "../sections/blog-top";
import type { BlogPageModel } from "../sections/blog-data";
import { NavChrome } from "../sections/nav";

export interface BlogPageProps {
  model: BlogPageModel;
  gridCheck?: ReactNode;
}

export async function BlogPage({ model, gridCheck }: BlogPageProps) {
  const company = await getCompanyInformation();
  return (
    <div className="page">
      <GridField />
      <NavChrome />
      <main>
        {model.type === "landing" ? (
          <>
            <BlogTopSection youtubeUrl={company?.youtube_url} />
            <BlogListsSection landing={model.landing} />
          </>
        ) : (
          <BlogCategorySection model={model.filtered} />
        )}
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
