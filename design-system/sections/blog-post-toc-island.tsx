"use client";

import { useLayoutEffect, useMemo } from "react";
import { useActiveSection } from "../lib/use-active-section";
import { BLOG_POST_CONTENT } from "./blog-post-data";

const PAGE_COLUMNS = 12;
const MAX_TICK_PX = 112;
const TAIL_TICKS = 2;
const ROW_ROUNDING_EPSILON_PX = 0.5;
const CONTENT_ROWS_PROPERTY = "--bp-content-rows";

export interface BlogPostTocItem {
  id: string;
  label: string;
}

export interface BlogPostTocIslandProps {
  items: BlogPostTocItem[];
}

export function BlogPostTocIsland({ items }: BlogPostTocIslandProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const active = useActiveSection(ids);

  /* Publish the article's row count so the lattice grows with the copy. */
  useLayoutEffect(() => {
    const page = document.querySelector<HTMLElement>(".page");
    const article = document.querySelector<HTMLElement>(".blog-post");
    const body = article?.querySelector<HTMLElement>(".bp-body");
    if (!page || !article || !body) return;

    const publishContentRows = () => {
      const articleBox = article.getBoundingClientRect();
      const tick = Math.min(articleBox.width / PAGE_COLUMNS, MAX_TICK_PX);
      const bodyBox = body.getBoundingClientRect();
      const tail = tick * TAIL_TICKS;
      const contentHeight = bodyBox.bottom - articleBox.top + tail;
      const rows = Math.ceil((contentHeight - ROW_ROUNDING_EPSILON_PX) / tick);
      article.style.setProperty(CONTENT_ROWS_PROPERTY, String(rows));
    };
    const resizeObserver = new ResizeObserver(publishContentRows);
    resizeObserver.observe(page);
    resizeObserver.observe(body);
    publishContentRows();
    return () => {
      resizeObserver.disconnect();
      article.style.removeProperty(CONTENT_ROWS_PROPERTY);
    };
  }, []);

  if (items.length === 0) return null;
  return (
    <div className="bp-toc-rail" data-landmark="toc">
      <nav className="bp-toc" aria-label={BLOG_POST_CONTENT.tocAriaLabel} data-active={active}>
        <p className="type type-fixed bp-toc-label">{BLOG_POST_CONTENT.tocLabel}</p>
        <ul className="bp-toc-list">
          {items.map((item) => (
            <li className="bp-toc-item" key={item.id}>
              <a className="type type-fixed" href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
