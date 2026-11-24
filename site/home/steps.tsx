"use client";

import type { Hue } from "@keystone-sites/marketing-design-system/hue";
import {
  useInView,
  useReducedMotion,
  useScrollProgress,
} from "@keystone-sites/marketing-design-system/motion";
import { type CSSProperties, useEffect, useRef, useState } from "react";

// The copilot, the workspace, routines and integrations: each a word, what it means, and the part
// of Keystone that does it, on a block of its own hue.
const STEPS: readonly { hue: Hue; title: string; body: string; more: string }[] = [
  {
    hue: "pear",
    title: "Flexible",
    body: "Keystone does it for you, or tells you how to do it yourself.",
    more: "The Keystone copilot is designed for businesses like yours.",
  },
  {
    hue: "blue",
    title: "Organized",
    body: "Your contacts, conversations, campaigns and charts, all in one place.",
    more: "The workspace puts every customer and every result on one screen.",
  },
  {
    hue: "amber",
    title: "Automatic",
    body: "Any job, on a schedule or whenever it makes sense.",
    more: "Keystone routines run the jobs you’d otherwise have to remember.",
  },
  {
    hue: "purple",
    title: "Connected",
    body: "Keystone has its own adapters, or builds one just for you.",
    more: "Keystone integrations give the copilot the full picture from every tool you use.",
  },
];

/** How Keystone works (Figma › 03 How Keystone works): one line over a row of four square blocks,
    a hue each, wider than the page. In view, the blocks come on one after another and the lattice
    comes on around them as the fold's marks do, fill first and rules after. Then the section pins
    and the scroll carries the row right to left until its last block stands a cell in from the
    page's edge. */
export function Steps() {
  const ref = useRef<HTMLElement>(null);
  const run = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const blocks = useRef<HTMLOListElement>(null);
  const seen = useInView(row);
  const reduce = useReducedMotion();
  const [ended, setEnded] = useState(false);

  // The run is a window tall, a held stretch, then twice the row's overhang, so the row stays put
  // a moment after it pins and then moves at half the scroll. Block four's strip waits for the end.
  useEffect(() => {
    const node = run.current;
    const track = blocks.current;
    const section = ref.current;
    if (!node || !track || !section) return;
    const measure = () => {
      const room = section.clientWidth - parseFloat(getComputedStyle(section).paddingLeft) * 2;
      node.style.setProperty("--home-over", `${Math.max(0, track.scrollWidth - room)}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    return () => {
      observer.disconnect();
    };
  }, []);
  useScrollProgress(
    run,
    (progress, node) => {
      const travel = node.offsetHeight - window.innerHeight;
      const over = parseFloat(node.style.getPropertyValue("--home-over")) || 0;
      const hold = Math.max(0, travel - over * 2);
      const moved =
        over > 0 ? Math.min(1, Math.max(0, (progress * travel - hold) / (over * 2))) : 0;
      row.current?.style.setProperty("--home-p", moved.toFixed(4));
      if (moved >= 0.9) setEnded(true);
    },
    "pin",
  );

  return (
    <div ref={run} className="home-how" id="how">
      <section
        ref={ref}
        className="home-steps"
        data-in={seen ? "" : undefined}
        data-still={reduce ? "" : undefined}
        data-end={ended ? "" : undefined}
        aria-labelledby="home-steps-title"
      >
        <h2 id="home-steps-title" className="ks-h2 home-steps__title">
          Keystone works for you,
          <br />
          while you’re working your business.
        </h2>
        <div ref={row} className="home-steps__row">
          <span className="home-steps__strip home-steps__strip--two" data-hue="blue" aria-hidden />
          <span
            className="home-steps__strip home-steps__strip--four"
            data-hue="purple"
            aria-hidden
          />
          <ol ref={blocks} className="home-steps__grid">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="home-step"
                data-hue={step.hue}
                style={{ "--i": index } as CSSProperties}
              >
                <span className="home-step__n">{String(index + 1).padStart(2, "0")}</span>
                <div className="home-step__text">
                  <h3 className="home-step__title">{step.title}</h3>
                  <div className="home-step__body">
                    <p>{step.body}</p>
                    <p>{step.more}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <span className="home-corner home-corner--one" data-hue="pear" aria-hidden>
            <span className="home-corner__fill" />
          </span>
          <span className="home-corner home-corner--three" data-hue="amber" aria-hidden>
            <span className="home-corner__fill" />
          </span>
        </div>
      </section>
    </div>
  );
}
