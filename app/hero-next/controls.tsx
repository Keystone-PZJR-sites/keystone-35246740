"use client";

/** Shared QA controls for the section dev routes (born on /hero, spec
 * 006 §8; rehomed here when the v1 routes retired — spec 023 §4):
 * replay the load choreography and simulate reduced motion. Replay
 * dispatches v2:replay — the orchestrator re-flips the page class and
 * the islands reset. The toggle mirrors the media query through the
 * page root's data-motion attribute, which both the CSS and the
 * islands honor. */

import "./controls.css";
import { useState } from "react";

export function HeroDevControls() {
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
    /* re-render the resulting state: branded/settled when reduced,
       full choreography when restored */
    window.dispatchEvent(new Event("v2:replay"));
  };

  return (
    <div className="hx-devbar">
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
