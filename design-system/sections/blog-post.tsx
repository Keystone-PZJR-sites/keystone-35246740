import { GridRegion } from "../grid/region";
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
        <GridRegion band="rm" gx={11} gy={6} gh={3} />
        <GridRegion band="rs" gx={11} gy={6} gh={3} />
        <GridRegion band="rm" gx={0} gy={9} gw={12} gh={7} />
        <GridRegion band="rs" gx={0} gy={9} gw={12} gh={7} />
        <GridRegion band="rt" gx={1} gy={5} gw={10} />
        <GridRegion band="rt" gx={0} gy={6} gw={12} gh={5} />
        {(["rm", "rs", "rt", "rd1", "rd2"] as const).map((band) => (
          <GridRegion key={band} band={band} gx={0} gyb={0} gw={12} />
        ))}
      </div>

      <div className="bp-rounder">
        <header className="flow-budget bp-head" data-landmark="head">
          <div className="bp-crumb">
            <span className="bp-marker" aria-hidden="true" />
            <InterpText as="span" style="text-xs-medium" className="bp-crumb-text">
              <a href={SITE_LINKS.blog}>{BLOG_POST_CONTENT.blogLabel}</a>
              {primaryTag && (
                <>
                  <span aria-hidden="true">/</span>
                  <a href={`${SITE_LINKS.blog}?tag=${encodeURIComponent(primaryTag.slug)}`}>
                    {primaryTag.name}
                  </a>
                </>
              )}
            </InterpText>
          </div>
          <InterpText as="h1" style="display-serif-sm-plus-thin" className="bp-h1">
            {post.title}
          </InterpText>
        </header>

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
    </article>
  );
}
