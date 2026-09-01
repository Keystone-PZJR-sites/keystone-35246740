"use client";

/** v2 sections — the sticky TOC island (spec 017 §4). rd2-only chrome
 * (the ≥1130 structural gate — a display switch, never measured): a
 * col-1 rail beside the section stack, scrolling with the page until
 * 1t from the viewport top, then fixed (CSS sticky inside the rail —
 * no measurement), releasing when the rail ends at The Result's end.
 *
 * The island owns one value — the active section id. Scrollspy (§4):
 * active = the last section whose top sits at or above one-third of
 * the viewport height; the ends clamp (above the first section the
 * first is active, past the last the last). Driven by an
 * IntersectionObserver on the six section roots (no scroll-handler
 * math): any boundary crossing of the one-third line triggers one
 * recompute. The id renders as `data-active` on the list root and
 * `aria-current` on the active anchor; CSS draws the dressing (the
 * 2px teal/400 rule, the Medium ink) state-to-state (§6 — no slide).
 *
 * Clicks are native anchor navigation (the sections carry ids);
 * smooth scroll under motion-ok is CSS on the composition, instant
 * under reduce. No-JS renders this same markup server-side with the
 * drawn resting state (Overview active) and working anchors. */

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const sections = ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    // the §4 rule: the last section whose top is at or above the
    // one-third line; the ends clamp by construction (the first
    // section is the floor, the last never releases downward)
    const compute = () => {
      const line = window.innerHeight / 3;
      let current = sections[0].id;
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= line) current = sec.id;
      }
      setActive(current);
    };

    // boundary crossings of the one-third line trigger the recompute;
    // rootMargin pins the observation band to that line so the
    // callback fires exactly when a top crosses it
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
