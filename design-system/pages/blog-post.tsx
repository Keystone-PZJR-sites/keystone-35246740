import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "../grid/field";
import type { BlogPostDetailModel } from "../sections/blog-data";
import { BlogPostSection } from "../sections/blog-post";
import { FooterSection } from "../sections/footer";
import { NavChrome } from "../sections/nav";

export interface BlogPostPageProps {
  post: BlogPostDetailModel;
}

export async function BlogPostPage({ post }: BlogPostPageProps) {
  const company = await getCompanyInformation();
  return (
    <div className="page">
      <GridField />
      <NavChrome />
      <main>
        <BlogPostSection post={post} />
      </main>
      <FooterSection
        social={{
          linkedin: company?.linkedin_url,
          facebook: company?.facebook_url,
          instagram: company?.instagram_url,
          youtube: company?.youtube_url,
        }}
      />
    </div>
  );
}
