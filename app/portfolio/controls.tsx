"use client";

/** /portfolio QA controls (spec 007 §8.8): replay the curtain-reveal
 * entrance and simulate reduced motion. Replay dispatches v2:replay —
 * the gallery island resets to the at-rest state and re-runs the
 * entrance from the observer. The toggle mirrors the media query
 * through the page root's data-motion attribute, which both the CSS
 * and the islands honor. */

import { useState } from "react";

export function PortfolioDevControls() {
  const [reduced, setReduced] = useState(false);

  const replay = () => {
    window.dispatchEvent(new Event("v2:replay"));
  };

  const toggle = (next: boolean) => {
    setReduced(next);
    const page = document.querySelector<HTMLElement>(".page");
    if (!page) return;
    if (next) page.dataset.motion = "reduce";
    else delete page.dataset.motion;
    /* re-render the resulting state: settled when reduced, the full
       entrance when restored */
    window.dispatchEvent(new Event("v2:replay"));
  };

  return (
    <div className="pf-devbar">
      <button type="button" onClick={replay}>
        Replay
      </button>
      <label>
        <input
          type="checkbox"
          checked={reduced}
          onChange={(e) => toggle(e.target.checked)}
        />
        Reduced motion
      </label>
    </div>
  );
}
