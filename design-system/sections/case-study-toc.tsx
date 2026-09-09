"use client";

/** Desktop-only sticky table of contents.
 * The active item is the last section above one-third of the viewport. */

import { useLayoutEffect, useState } from "react";

const ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "business", label: "The Business" },
  { id: "shift", label: "The Shift" },
  { id: "funnel", label: "The Funnel" },
  { id: "stack", label: "The Stack" },
  { id: "result", label: "The Result" },
] as const;

export function CaseStudyToc() {
  const [active, setActive] = useState<string>(ITEMS[0].id);

  useLayoutEffect(() => {
    const sections = ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    // Start at the first section so the active range clamps at both ends.
    const compute = () => {
      const line = window.innerHeight / 3;
      let current = sections[0].id;
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= line) current = sec.id;
      }
      setActive(current);
    };

    // Pin the observer boundary to one-third of the viewport.
    const io = new IntersectionObserver(compute, {
      rootMargin: "0px 0px -66.667% 0px",
      threshold: [0, 1],
    });
    sections.forEach((sec) => io.observe(sec));
    compute();
    return () => io.disconnect();
  }, []);

  return (
    <nav className="toc" aria-label="On this page" data-active={active} data-landmark="toc">
      <ul className="toc-list">
        {ITEMS.map((item) => (
          <li key={item.id} className="toc-item" data-id={item.id}>
            <a href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
