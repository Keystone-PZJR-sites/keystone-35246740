"use client";

/** Advances the website deck as one button. CSS derives every card's
 * geometry from the front index and retargets interrupted transitions.
 * Native image dragging is blocked so a press-and-move still resolves
 * as a deck interaction. */

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
  /* Functional updates preserve every click when React batches input. */
  const [front, setFront] = useState(0);
  const [interacted, setInteracted] = useState(false);

  const advance = () => {
    setInteracted(true);
    setFront((f) => (f + 1) % sites.length);
  };

  /* Keep the live region quiet until the first interaction. */
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
              {/* The bar owns the browser chrome, grain, and shadow. */}
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
