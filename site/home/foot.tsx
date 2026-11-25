"use client";

import { Button } from "@keystonepzjr/marketing-design-system/button";
import { Composer, type ComposerState } from "@keystonepzjr/marketing-design-system/composer";
import { useScrollProgress } from "@keystonepzjr/marketing-design-system/motion";
import { useEffect, useRef } from "react";
import { Lockup } from "@/site/lockup";
import { AskLine, Chips } from "./ask";
import { COPY, WILDCARDS } from "./content";

// What a visitor still wants to know at the foot. Each drops into the composer as written.
const QUESTIONS = [
  "What is Keystone?",
  "What types of businesses is Keystone for?",
  "What does it cost?",
  "What else can I ask?",
] as const;
// The longest, left out on a phone so the rest sit on two lines.
const OFF_PHONE: string = QUESTIONS[1];

/** The composer again, on ink (Figma › 05 Composer on ink): the fold's own arrangement over four
    questions to ask, as one block at the middle of a window of its own. The foot then holds while
    the site's lockup comes up from the window's foot and the composer makes room. The page
    writes the hold's progress (--home-p) and the lockup's height (--home-lock), which the
    composer's rise is worked out from. */
export function Foot({ composer }: { composer: ComposerState }) {
  const ref = useRef<HTMLElement>(null);
  const lockup = useRef<HTMLDivElement>(null);
  useScrollProgress(
    ref,
    (progress, node) => {
      node.style.setProperty("--home-p", progress.toFixed(4));
    },
    "pin",
  );
  // Where the foot doesn't hold (foot.css), the line scrolls up under the nav: it fades over its
  // first line's height as it comes up, and is gone as it reaches the nav's bottom edge.
  const title = useRef<HTMLHeadingElement>(null);
  useScrollProgress(title, (_, node) => {
    const nav = document.querySelector(".ks-nav")?.getBoundingClientRect().bottom ?? 0;
    const rect = node.getBoundingClientRect();
    const fade = Math.min(1, Math.max(0, (rect.top - nav) / (rect.height / 2)));
    node.style.setProperty("--home-fade", fade.toFixed(3));
  });
  useEffect(() => {
    const node = ref.current;
    const box = lockup.current;
    if (!node || !box) return;
    const set = () => {
      node.style.setProperty("--home-lock", `${box.offsetHeight}px`);
    };
    set();
    const observer = new ResizeObserver(set);
    observer.observe(box);
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <footer ref={ref} className="home-foot ks-ground" data-ground="ink">
      <div className="home-foot__stage">
        <div className="home-foot__ask">
          <h2 ref={title} className="ks-h1 home-foot__title">
            {COPY.close[0]}
            <br />
            {COPY.close[1]}
          </h2>
          <div className="home-composer">
            <Composer
              composer={composer}
              tone="ink"
              placeholder={<AskLine />}
              prompts={WILDCARDS}
            />
          </div>
          <Chips>
            {QUESTIONS.map((question) => (
              <Button
                key={question}
                className={question === OFF_PHONE ? "home-off-phone" : undefined}
                onClick={() => {
                  composer.load(question);
                }}
              >
                {question}
              </Button>
            ))}
          </Chips>
        </div>
        <Lockup ref={lockup} className="home-foot__lockup" />
      </div>
    </footer>
  );
}
