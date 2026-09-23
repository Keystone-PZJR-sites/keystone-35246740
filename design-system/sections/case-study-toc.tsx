"use client";

/** Desktop-only sticky table of contents. */

import { useActiveSection } from "../lib/use-active-section";

const ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "business", label: "The Business" },
  { id: "shift", label: "The Shift" },
  { id: "funnel", label: "The Funnel" },
  { id: "stack", label: "The Stack" },
  { id: "result", label: "The Result" },
] as const;
const IDS = ITEMS.map((item) => item.id);

export function CaseStudyToc() {
  const active = useActiveSection(IDS);
  return (
    <nav className="toc" aria-label="On this page" data-active={active} data-landmark="toc">
      <ul className="toc-list">
        {ITEMS.map((item) => (
          <li key={item.id} className="toc-item" data-id={item.id}>
            <a className="type type-fixed" href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
