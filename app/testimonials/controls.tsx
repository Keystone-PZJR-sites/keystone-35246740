"use client";

/** /testimonials QA controls (spec 009 §8.6): replay the staggered
 * entrance, read the rotation timer, and simulate reduced motion.
 * Replay dispatches v2:replay — the block island resets to the
 * at-rest state and re-runs the entrance from its gate observer. The
 * readout listens to the island's v2:tst-timer events and counts the
 * running dwell down. The toggle mirrors the media query through the
 * page root's data-motion attribute, which both the CSS and the
 * island honor. */

import { useEffect, useRef, useState } from "react";

const READOUT_TICK = 250;

export function TestimonialsDevControls() {
  const [reduced, setReduced] = useState(false);
  const [timer, setTimer] = useState("off");
  const target = useRef<number | null>(null);

  useEffect(() => {
    const onTimer = (e: Event) => {
      const { state, delay } = (e as CustomEvent<{ state: string; delay?: number }>).detail;
      if (state === "scheduled" && typeof delay === "number") {
        target.current = Date.now() + delay;
      } else {
        target.current = null;
        setTimer("held / off");
      }
    };
    const tick = window.setInterval(() => {
      if (target.current === null) return;
      const left = target.current - Date.now();
      setTimer(left > 0 ? `beat in ${(left / 1000).toFixed(1)}s` : "sliding…");
    }, READOUT_TICK);
    window.addEventListener("v2:tst-timer", onTimer);
    return () => {
      window.clearInterval(tick);
      window.removeEventListener("v2:tst-timer", onTimer);
    };
  }, []);

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
    <div className="tst-devbar">
      <button type="button" onClick={replay}>
        Replay
      </button>
      <span className="tst-devtimer">{timer}</span>
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
