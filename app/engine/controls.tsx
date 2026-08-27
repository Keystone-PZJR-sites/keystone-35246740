"use client";

/** /engine QA controls (spec 008 §8.6): a live state readout, an
 * interrupt-storm control, and a reduced-motion toggle.
 *
 * The readout polls the DOM on animation frames — the island's inline
 * `--_f` writes, the active engine, the mode, and the row's
 * edge-to-edge sum (the §10 mid-flight assertion: the five card widths
 * must sum to the row's exact width at every frame). The storm drives
 * rapid re-targeting through the cards' real click path (§7.1's
 * interruption contract). The toggle mirrors the media query through
 * the page root's data-motion attribute, which both the CSS and the
 * island honor. */

import { useEffect, useRef, useState } from "react";

const STORM_PRESSES = 16;
const STORM_GAP_MS = 90;

export function EngineDevControls() {
  const [reduced, setReduced] = useState(false);
  const [readout, setReadout] = useState("");
  const timers = useRef<Set<number>>(new Set());

  useEffect(() => {
    let raf = 0;
    const poll = () => {
      const row = document.querySelector<HTMLElement>(".eng-row");
      const cards = [...document.querySelectorAll<HTMLElement>(".eng-card")];
      if (row && cards.length) {
        const mode = getComputedStyle(row).getPropertyValue("--eng-mode").trim();
        const active = cards.find((c) => c.dataset.active !== undefined)?.dataset.engine ?? "?";
        const fs = cards
          .map((c) => (parseFloat(getComputedStyle(c).getPropertyValue("--_f")) || 0).toFixed(3))
          .join(" ");
        let sum = "";
        if (mode === "accordion") {
          const total = cards.reduce((n, c) => n + c.getBoundingClientRect().width, 0);
          sum = ` · sum ${total.toFixed(2)} / row ${row.getBoundingClientRect().width.toFixed(2)}`;
        }
        setReadout(`${mode} · active ${active} · f ${fs}${sum}`);
      }
      raf = requestAnimationFrame(poll);
    };
    raf = requestAnimationFrame(poll);
    const pending = timers.current;
    return () => {
      cancelAnimationFrame(raf);
      pending.forEach((t) => window.clearTimeout(t));
      pending.clear();
    };
  }, []);

  const storm = () => {
    const hits = [...document.querySelectorAll<HTMLButtonElement>(".eng-hit")];
    if (!hits.length) return;
    for (let i = 0; i < STORM_PRESSES; i++) {
      const t = window.setTimeout(() => {
        timers.current.delete(t);
        hits[Math.floor(Math.random() * hits.length)].click();
      }, i * STORM_GAP_MS);
      timers.current.add(t);
    }
  };

  const toggle = (next: boolean) => {
    setReduced(next);
    const page = document.querySelector<HTMLElement>(".page");
    if (!page) return;
    if (next) page.dataset.motion = "reduce";
    else delete page.dataset.motion;
  };

  return (
    <div className="eng-devbar">
      <span className="eng-devbar-state">{readout}</span>
      <button type="button" onClick={storm}>
        Interrupt storm
      </button>
      <label>
        <input type="checkbox" checked={reduced} onChange={(e) => toggle(e.target.checked)} />
        Reduced motion
      </label>
    </div>
  );
}
