"use client";

/** v2 sections — the work deck's one client island (spec 021 §5/§6).
 *
 * The deck is ONE button: click, Enter, or Space anywhere on it
 * advances one position. The island owns only the front index — every
 * card's slot derives from it and the §4 slot tables in work-deck.css
 * do the geometry, so the 300ms reorder is pure CSS transitions
 * (width · top · border-radius on one clock, --motion-deck-dur/-ease).
 * Rapid clicks retarget natively: a state change mid-flight re-targets
 * each transition from its current interpolated value — overlapping
 * clocks read as a riffle and the deck settles ≤ 300ms after the last
 * click, never a queued backlog (§6). The front card's z-index flips
 * at swap start (the slot rules are state-to-state; z never
 * transitions).
 *
 * Reduced motion renders every advance state-to-state (work-deck.css
 * kills the transitions); the announcement still fires. No-JS renders
 * this island's server HTML — the settled deck with Your Health
 * Solutions in front — and the section CTA link works (§5).
 *
 * The 012 pointer lessons apply to the button surface: the cards are
 * images, so dragstart is suppressed (a press-and-move otherwise
 * becomes a native image drag and eats the click). No capture, no
 * swipe — the deck is a plain button.
 */

import { useState } from "react";
import {
  WORK_CASCADE_FALLBACK,
  WORK_CASCADE_RD1_GATE_MEDIA,
  WORK_CASCADE_RS_GATE_MEDIA,
  workCascadeSrc,
} from "../media";
import { NoiseDuo } from "../lib/noise";
import type { WorkSite } from "./work-deck-data";

interface WorkDeckIslandProps {
  sites: WorkSite[];
}

export function WorkDeckIsland({ sites }: WorkDeckIslandProps) {
  /* the one owner: which site is in front (index into the cascade
     order). The server renders 0 — YHS in front, the settled no-JS
     state (§5). The advance is a FUNCTIONAL update: clicks that land
     in one React batch (a fast double-click, synthetic bursts) must
     each advance one position — a closure read collapses them (found
     at build QA, §9). */
  const [front, setFront] = useState(0);
  const [interacted, setInteracted] = useState(false);

  const advance = () => {
    setInteracted(true);
    setFront((f) => (f + 1) % sites.length);
  };

  /* the aria-live message derives from the committed front — empty
     until the first advance so nothing announces on load (§5) */
  const announced = interacted ? `Now showing ${sites[front].name}` : "";

  return (
    <>
      <button
        type="button"
        className="wd-deck"
        aria-label="Show the next website"
        onClick={advance}
        onDragStart={(e) => e.preventDefault()}
      >
        {sites.map((site, i) => {
          /* slot 0 = front (largest, lowest, top z) … slot 5 = back */
          const slot = (i - front + sites.length) % sites.length;
          return (
            <span key={site.slug} className="wd-card" data-site={site.slug} data-slot={slot}>
              {/* the chrome is the BAR alone (§4 as amended 2026-09-06
                  — the component rebuild): fill + top/left/right
                  stroke per site, and the web-swatch grain + hairline
                  shadow ride it. The NOISE parameters read at build
                  (density 0.6, black 10% / white 15%; size the file's
                  0.5 — the 019 B9 pattern: the primitive's defaults
                  stay the extracted noise-duo values, the instance
                  carries the style's own tune). */}
              <span className="wd-bar" aria-hidden="true">
                <NoiseDuo className="wd-grain" density={0.6} darkAlpha={0.1} lightAlpha={0.15} />
                <i />
                <i />
                <i />
              </span>
              <span className="wd-shot">
                <picture>
                  <source
                    media={WORK_CASCADE_RD1_GATE_MEDIA}
                    srcSet={workCascadeSrc(site.file, 1344)}
                  />
                  <source
                    media={WORK_CASCADE_RS_GATE_MEDIA}
                    srcSet={workCascadeSrc(site.file, 768)}
                  />
                  <img
                    src={workCascadeSrc(site.file, 384)}
                    alt={`The ${site.name} website`}
                    width={WORK_CASCADE_FALLBACK.width}
                    height={WORK_CASCADE_FALLBACK.height}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </picture>
              </span>
            </span>
          );
        })}
      </button>
      <span className="hx-sr" aria-live="polite">
        {announced}
      </span>
    </>
  );
}
