import { GridRegion } from "../grid/region";
import { Slug } from "../primitives/slug";
import { InterpText } from "../primitives/text";
import { SITE_LINKS } from "../site-links";
import type { BlogPostDetailModel } from "./blog-data";
import { BLOG_POST_CONTENT } from "./blog-post-data";
import { BlogPostMarkdown } from "./blog-post-markdown";
import { BlogPostTocIsland } from "./blog-post-toc-island";

export interface BlogPostSectionProps {
  post: BlogPostDetailModel;
}

export function BlogPostSection({ post }: BlogPostSectionProps) {
  const primaryTag = post.tags[0] ?? null;
  const tocItems = post.sections.map(({ id, heading }) => ({ id, label: heading }));

  return (
    <article className="sec blog-post" data-landmark="blog-post">
      <div className="gx" aria-hidden="true">
        {(["rm", "rs", "rt", "rd1", "rd2"] as const).map((band) => (
          <GridRegion key={band} band={band} gx={0} gyb={0} gw={12} />
        ))}
      </div>

      <div className="bp-rounder">
        <header className="bp-head" data-landmark="head">
          <Slug>
            <a href={SITE_LINKS.blog}>{BLOG_POST_CONTENT.blogLabel}</a>
            {primaryTag && (
              <>
                <span aria-hidden="true">/</span>
                <a href={`${SITE_LINKS.blog}?tag=${encodeURIComponent(primaryTag.slug)}`}>
                  {primaryTag.name}
                </a>
              </>
            )}
          </Slug>
          <InterpText as="h1" style="display-serif-sm-plus-thin" className="bp-h1">
            {post.title}
          </InterpText>
        </header>

        <div className="bp-content-row">
          <div className="gx bp-content-grid" aria-hidden="true">
            {/* Six rows start 1t down, so one exposed row remains below the 6t hero. */}
            <GridRegion band="rm" gx={0} gy={1} gw={12} gh={6} />
            <GridRegion band="rs" gx={0} gy={1} gw={12} gh={6} />
            <GridRegion band="rt" gx={1} gy={0} gw={10} />
            <GridRegion band="rt" gx={0} gy={1} gw={12} gh={6} />
          </div>

          <div className="bp-body" data-landmark="body">
            <div className="bp-hero" data-landmark="hero">
              <img src={post.imageUrl} alt="" width={784} height={448} fetchPriority="high" />
            </div>
            <BlogPostMarkdown markdown={post.ledeMarkdown} variant="lede" />
            <div className="bp-section-stack">
              {post.sections.map((section) => (
                <section className="bp-article-section" id={section.id} key={section.id}>
                  <h2>{section.heading}</h2>
                  <BlogPostMarkdown markdown={section.markdown} variant="body" />
                </section>
              ))}
            </div>
          </div>

          <BlogPostTocIsland items={tocItems} />
        </div>
      </div>
    </article>
  );
}
