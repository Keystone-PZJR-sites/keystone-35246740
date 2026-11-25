"use client";

import { Button } from "@keystonepzjr/marketing-design-system/button";
import type { ComposerState } from "@keystonepzjr/marketing-design-system/composer";
import { Plans } from "@keystonepzjr/marketing-design-system/plans";
import { useEffect, useRef } from "react";
import { PLANS } from "./content";

const PRICING_PROMPT = "How does Keystone pricing work?";

// What each plan's button says: the plan's verb, and Keystone.
const PLAN_CTA: Record<string, string> = {
  Starter: "Start with Keystone",
  Growth: "Grow with Keystone",
  Scale: "Scale with Keystone",
};

/** Pricing: the line over the three plans. Each plan's button, and the one across from the line,
    puts its question to the composer at the page's foot. The section pins once its foot reaches
    the window's foot (or its top the window's top, in a window taller than it), so the composer
    comes up over it. */
export function Pricing({ composer }: { composer: ComposerState }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const set = () => {
      node.style.setProperty(
        "--home-pin",
        `${Math.min(0, window.innerHeight - node.offsetHeight)}px`,
      );
    };
    set();
    const observer = new ResizeObserver(set);
    observer.observe(node);
    window.addEventListener("resize", set);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", set);
    };
  }, []);
  return (
    <section ref={ref} className="home-pricing" aria-labelledby="home-pricing-title">
      <div className="home-pricing__inner">
        <header className="home-pricing__head">
          <h2 id="home-pricing-title" className="ks-h2">
            Simple plans, no contracts.
          </h2>
          <Button
            className="home-pricing__ask"
            onClick={() => {
              composer.load(PRICING_PROMPT);
            }}
          >
            Ask Keystone about pricing
          </Button>
        </header>
        <Plans
          plans={PLANS}
          label={(plan) => PLAN_CTA[plan] ?? `Start with ${plan}`}
          per="/month"
          onChoose={(plan) => {
            composer.load(`Help me get started with the ${plan} plan for my business.`);
          }}
        />
      </div>
    </section>
  );
}
