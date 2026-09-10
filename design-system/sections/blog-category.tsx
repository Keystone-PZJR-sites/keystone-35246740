import type { CSSProperties } from "react";
import { GridDecor, GridRegion, type GridBand } from "../grid/region";
import { ButtonArrow } from "../primitives/buttons";
import { Slug } from "../primitives/slug";
import { InterpText } from "../primitives/text";
import { SITE_LINKS } from "../site-links";
import { ArticleCard, FeaturedArticleCard } from "./blog-cards";
import { BLOG_CATEGORY_CONTENT } from "./blog-category-data";
import {
  blogPageHref,
  blogPageWindow,
  type BlogFilteredModel,
} from "./blog-data";
import {
  BLOG_FEATURE_GAP_TICKS,
  BLOG_FEATURE_TICKS,
  blogStackTicks,
} from "./blog-layout";

const HEADER_TICKS = { rm: 8, rt: 4, rd: 4 } as const;
const PAGINATION_GAP_TICKS = { rm: 2, rt: 1, rd: 1 } as const;
const PAGINATION_TICKS = { rm: 2, rt: 1, rd: 1 } as const;
const PRE_FOOTER_TICKS = 2;
const FEATURED_FIELD_END = { rm: 25, rt: 9, rd: 8 } as const;
const ROWS_FIELD_END = { rm: 19, rt: 9, rd: 8 } as const;

interface BlogCategoryTickSet {
  rm: number;
  rt: number;
  rd: number;
  stack: ReturnType<typeof blogStackTicks>;
}

export function blogCategoryTicks(model: BlogFilteredModel): BlogCategoryTickSet {
  const count = model.type === "search" && model.posts.length === 0 ? 1 : model.posts.length;
  const stack = blogStackTicks(count);
  const hasFeatured = model.featured !== null;
  const totalFor = (family: "rm" | "rt" | "rd") =>
    HEADER_TICKS[family] +
    (hasFeatured ? BLOG_FEATURE_TICKS[family] + BLOG_FEATURE_GAP_TICKS : 0) +
    stack[family] +
    PAGINATION_GAP_TICKS[family] +
    PAGINATION_TICKS[family] +
    PRE_FOOTER_TICKS;
  return {
    rm: totalFor("rm"),
    rt: totalFor("rt"),
    rd: totalFor("rd"),
    stack,
  };
}

interface Region {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}

function exposedField(
  family: "rm" | "rt" | "rd",
  hasFeatured: boolean,
): Region {
  const firstFullRow = family === "rm" ? 8 : 4;
  const drawnFullEnd = (hasFeatured ? FEATURED_FIELD_END : ROWS_FIELD_END)[family];
  return {
    gx: 0,
    gy: 0,
    gw: 12,
    gh: drawnFullEnd - firstFullRow,
  };
}

const FAMILIES: {
  family: "rm" | "rt" | "rd";
  bands: GridBand[];
}[] = [
  { family: "rm", bands: ["rm", "rs"] },
  { family: "rt", bands: ["rt"] },
  { family: "rd", bands: ["rd1", "rd2"] },
];

export interface BlogCategorySectionProps {
  model: BlogFilteredModel;
}

export function BlogCategorySection({ model }: BlogCategorySectionProps) {
  const ticks = blogCategoryTicks(model);
  const previousPage =
    model.pagination.currentPage > 1
      ? blogPageHref(model.pagination, model.pagination.currentPage - 1)
      : null;
  const nextPage =
    model.pagination.currentPage < model.pagination.totalPages
      ? blogPageHref(model.pagination, model.pagination.currentPage + 1)
      : null;
  const style = {
    "--bc-total-rm": ticks.rm,
    "--bc-total-rt": ticks.rt,
    "--bc-total-rd": ticks.rd,
    "--bc-stack-rm": ticks.stack.rm,
    "--bc-stack-rt": ticks.stack.rt,
    "--bc-stack-rd": ticks.stack.rd,
  } as CSSProperties;

  return (
    <section
      className="sec blog-category"
      aria-label={model.type === "search" ? BLOG_CATEGORY_CONTENT.searchLabel : model.heading}
      data-landmark="blog-category"
      data-mode={model.type}
      data-featured={model.featured ? "" : undefined}
      style={style}
    >
      <div className="gx" aria-hidden="true">
        {FAMILIES.flatMap(({ bands }) =>
          bands.map((band) => (
            <GridRegion key={`${band}-footer-row`} band={band} gx={0} gyb={0} gw={12} />
          )),
        )}
      </div>

      <header className="bc-head" data-landmark="head">
        <Slug>
          <a href={SITE_LINKS.blog}>{BLOG_CATEGORY_CONTENT.blogLabel}</a>
          <span aria-hidden="true">/</span>
          <span>
            {model.type === "search"
              ? BLOG_CATEGORY_CONTENT.searchLabel
              : BLOG_CATEGORY_CONTENT.categoryLabel}
          </span>
        </Slug>
        <InterpText as="h1" style="display-serif-sm-plus-thin" className="bc-h1">
          {model.heading}
        </InterpText>
      </header>

      <div className="bc-content">
        <div className="gx bc-content-grid" aria-hidden="true">
          {FAMILIES.flatMap(({ family, bands }) =>
            bands.map((band) => (
              <GridRegion
                key={`${band}-content-field`}
                band={band}
                {...exposedField(family, model.featured !== null)}
              />
            )),
          )}
          <GridDecor band="rt" gx={11} gy={1}>
            <span className="f-cell round" />
          </GridDecor>
        </div>

        {model.featured && (
          <div className="bc-featured" data-landmark="feat">
            <FeaturedArticleCard post={model.featured} />
          </div>
        )}

        <div className="bc-cards-frame" data-landmark="cards">
          {model.posts.length > 0 ? (
            <ul className="bc-cards">
              {model.posts.map((post) => (
                <li key={post.slug}>
                  <ArticleCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            model.type === "search" && (
              <InterpText as="p" style="text-xl-light" className="bc-empty">
                {BLOG_CATEGORY_CONTENT.emptyResults}
              </InterpText>
            )
          )}
        </div>

        <nav
          className="bc-pagination"
          aria-label={BLOG_CATEGORY_CONTENT.pagesLabel}
          data-landmark="pagination"
          data-current-page={model.pagination.currentPage}
          data-total-pages={model.pagination.totalPages}
        >
          <span className="bc-page-button bc-page-previous">
            <span className="bc-page-arrow-md">
              <ButtonArrow
                size="md"
                chrome="gray"
                href={previousPage}
                label={BLOG_CATEGORY_CONTENT.previousPageLabel}
              />
            </span>
            <span className="bc-page-arrow-lg">
              <ButtonArrow
                size="lg"
                chrome="gray"
                href={previousPage}
                label={BLOG_CATEGORY_CONTENT.previousPageLabel}
              />
            </span>
          </span>
          <span className="bc-page-window">
            {blogPageWindow(
              model.pagination.currentPage,
              model.pagination.totalPages,
            ).map((item) =>
              item.type === "ellipsis" ? (
                <span className="bc-page-cell" key={item.key} aria-hidden="true">
                  {BLOG_CATEGORY_CONTENT.ellipsis}
                </span>
              ) : (
                <a
                  className="bc-page-cell"
                  href={blogPageHref(model.pagination, item.page)}
                  aria-current={
                    item.page === model.pagination.currentPage ? "page" : undefined
                  }
                  key={item.page}
                >
                  {item.page}
                </a>
              ),
            )}
          </span>
          <span className="bc-page-button bc-page-next">
            <span className="bc-page-arrow-md">
              <ButtonArrow
                size="md"
                chrome="gray"
                href={nextPage}
                label={BLOG_CATEGORY_CONTENT.nextPageLabel}
              />
            </span>
            <span className="bc-page-arrow-lg">
              <ButtonArrow
                size="lg"
                chrome="gray"
                href={nextPage}
                label={BLOG_CATEGORY_CONTENT.nextPageLabel}
              />
            </span>
          </span>
        </nav>
      </div>
    </section>
  );
}
