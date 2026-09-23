"use client";

/** The id of the last section whose top has crossed one-third of the
 * viewport, for sticky tables of contents. Clamps to the first section
 * above the page and the last below it. */

import { useLayoutEffect, useState } from "react";

const VIEWPORT_LINE_DIVISOR = 3;
/* Pins the observer boundary to one-third of the viewport. */
const ROOT_MARGIN = "0px 0px -66.667% 0px";
const THRESHOLDS = [0, 1];

export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useLayoutEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const compute = () => {
      const line = window.innerHeight / VIEWPORT_LINE_DIVISOR;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActive(current);
    };
    const io = new IntersectionObserver(compute, {
      rootMargin: ROOT_MARGIN,
      threshold: THRESHOLDS,
    });
    sections.forEach((section) => io.observe(section));
    compute();
    return () => io.disconnect();
    // A new id list is a new table of contents.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("\u0000")]);

  return active;
}
