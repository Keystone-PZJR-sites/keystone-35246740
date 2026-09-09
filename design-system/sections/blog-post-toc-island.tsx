"use client";

import { useLayoutEffect, useState } from "react";
import { BLOG_POST_CONTENT } from "./blog-post-data";

const PAGE_COLUMNS = 12;
const MAX_TICK_PX = 112;
const TAIL_TICKS = 2;
const ROW_ROUNDING_EPSILON_PX = 0.5;
const VIEWPORT_LINE_DIVISOR = 3;
const TOC_ROOT_MARGIN = "0px 0px -66.667% 0px";
const TOC_THRESHOLDS = [0, 1];

export interface BlogPostTocItem {
  id: string;
  label: string;
}

export interface BlogPostTocIslandProps {
  items: BlogPostTocItem[];
}

export function BlogPostTocIsland({ items }: BlogPostTocIslandProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useLayoutEffect(() => {
    const page = document.querySelector<HTMLElement>(".page");
    const article = document.querySelector<HTMLElement>(".blog-post");
    const body = article?.querySelector<HTMLElement>(".bp-body");
    if (!page || !article || !body) return;

    const publishContentRows = () => {
      const articleBox = article.getBoundingClientRect();
      const bodyBox = body.getBoundingClientRect();
      const tick = Math.min(articleBox.width / PAGE_COLUMNS, MAX_TICK_PX);
      const tail = tick * TAIL_TICKS;
      const contentHeight = bodyBox.bottom - articleBox.top + tail;
      const rows = Math.ceil((contentHeight - ROW_ROUNDING_EPSILON_PX) / tick);
      article.style.setProperty("--bp-content-rows", String(rows));
    };
    const resizeObserver = new ResizeObserver(publishContentRows);
    resizeObserver.observe(page);
    resizeObserver.observe(body);
    publishContentRows();

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) {
      return () => {
        resizeObserver.disconnect();
        article.style.removeProperty("--bp-content-rows");
      };
    }

    const compute = () => {
      const line = window.innerHeight / VIEWPORT_LINE_DIVISOR;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActive(current);
    };

    const sectionObserver = new IntersectionObserver(compute, {
      rootMargin: TOC_ROOT_MARGIN,
      threshold: TOC_THRESHOLDS,
    });
    sections.forEach((section) => sectionObserver.observe(section));
    compute();
    return () => {
      sectionObserver.disconnect();
      resizeObserver.disconnect();
      article.style.removeProperty("--bp-content-rows");
    };
  }, [items]);

  if (items.length === 0) return null;
  return (
    <div className="bp-toc-rail" data-landmark="toc">
      <nav className="bp-toc" aria-label={BLOG_POST_CONTENT.tocAriaLabel} data-active={active}>
        <p className="bp-toc-label">{BLOG_POST_CONTENT.tocLabel}</p>
        <ul className="bp-toc-list">
          {items.map((item) => (
            <li className="bp-toc-item" key={item.id}>
              <a href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
