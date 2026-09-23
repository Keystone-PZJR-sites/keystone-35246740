"use client";

/** A sticky table of contents: one link per section id, the active one
 * marked by the section whose top has crossed a third of the viewport.
 * The host decides where it sits (a rail beside the content, desktop
 * only); this draws the list. */

import { useMemo } from "react";
import { useActiveSection } from "../lib/use-active-section";

export interface TocItem {
  id: string;
  label: string;
}

export interface TocProps {
  items: readonly TocItem[];
  ariaLabel?: string;
}

export function Toc({ items, ariaLabel = "On this page" }: TocProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const active = useActiveSection(ids);
  if (items.length === 0) return null;
  return (
    <nav className="toc" aria-label={ariaLabel} data-active={active} data-landmark="toc">
      <ul className="toc-list">
        {items.map((item) => (
          <li key={item.id} className="toc-item" data-id={item.id}>
            <a
              className="type type-fixed"
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
