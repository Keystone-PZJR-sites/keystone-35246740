"use client";

/** The /design/ side rail: a table of contents for the open chapter.
 * Chapters are switched by the radio tabs (CSS `:has(:checked)`) with a
 * hash fallback, so the rail follows the same state: it listens to the
 * tab group and the hash, then reads `[data-toc]` headings out of the
 * chapter that is showing. Headings are the source; nothing is listed
 * twice. */

import { useEffect, useState } from "react";
import { DESIGN_CHAPTERS } from "./design-head";
import { Toc, type TocItem } from "../primitives/toc";

const CHAPTER_IDS = DESIGN_CHAPTERS.map((chapter) => chapter.id);

function openChapter(): string {
  const checked = document.querySelector<HTMLInputElement>(".ds-tab-input:checked");
  if (checked) return checked.value;
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash) {
    const target = document.getElementById(hash);
    const chapter = target?.closest<HTMLElement>(".ds-chapters > .ds-sec[id]");
    if (chapter) return chapter.id;
  }
  return CHAPTER_IDS[0];
}

function chapterItems(chapterId: string): TocItem[] {
  const chapter = document.getElementById(chapterId);
  if (!chapter) return [];
  return [...chapter.querySelectorAll<HTMLElement>("[data-toc]")].flatMap((heading) => {
    const id = heading.id || heading.closest<HTMLElement>("[id]")?.id;
    const label = heading.dataset.toc || heading.textContent?.trim();
    return id && label ? [{ id, label }] : [];
  });
}

export function DesignToc() {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const update = () => setItems(chapterItems(openChapter()));
    const tabs = document.querySelector<HTMLElement>(".ds-tabs");
    tabs?.addEventListener("change", update);
    window.addEventListener("hashchange", update);
    update();
    return () => {
      tabs?.removeEventListener("change", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  return (
    <div className="ds-toc-rail">
      <Toc items={items} ariaLabel="In this chapter" />
    </div>
  );
}
