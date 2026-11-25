"use client";

import { useComposer } from "@keystonepzjr/marketing-design-system/composer";
import { useScrollProgress } from "@keystonepzjr/marketing-design-system/motion";
import { Nav } from "@keystonepzjr/marketing-design-system/nav";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { HANDOFF_SCRIPT, launch, LOGIN_URL } from "@/site/console";
import { useAsk } from "./ask";
import { Foot } from "./foot";
import { Hero } from "./hero";
import { Platform } from "./platform";
import { Pricing } from "./pricing";
import { Steps } from "./steps";
import "./home.css";

const LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "How it Works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
];

const TRY_PROMPT = "I want to try Keystone";

/** The homepage, inside `.ks`, the scope the Set's CSS hangs off. Every composer on it sends its
    prompt into Keystone. */
export function Home() {
  const composer = useComposer({ onSend: (prompt, from) => launch(prompt, from, "site_hero") });
  const ask = useAsk(composer);
  const closing = useComposer({ onSend: (prompt, from) => launch(prompt, from, "site_foot") });
  // The nav turns to ink as the foot comes up under it. While the foot reaches the window's foot,
  // Safari's toolbar and what lies past the page's end are ink too (page.css).
  const [dark, setDark] = useState(false);
  const [foot, setFoot] = useState(false);
  const sheets = useRef<HTMLSpanElement>(null);
  useScrollProgress(
    sheets,
    (_, node) => {
      const top = node.getBoundingClientRect().top;
      setDark(top < 64);
      setFoot(top < window.innerHeight);
    },
    "pass",
  );
  useEffect(() => {
    document.documentElement.toggleAttribute("data-foot", foot);
    return () => document.documentElement.removeAttribute("data-foot");
  }, [foot]);

  return (
    <div className="ks" id="top">
      {foot && <span className="home-sill" aria-hidden />}
      <main className="home">
        <Nav
          home={{ label: "Keystone, top of page", href: "#top" }}
          links={LINKS}
          login={{ label: "Log in", href: LOGIN_URL }}
          cta={{
            label: "Try Keystone",
            onClick: () => {
              if (dark) closing.load(TRY_PROMPT);
              else ask.drop(TRY_PROMPT);
            },
          }}
          tone={dark ? "ink" : undefined}
        />
        <Hero composer={composer} ask={ask} />
        {/* The platform pins inside its own block and scrolls off when its five parts are through. */}
        <div className="home-deck">
          <Platform onChoose={ask.pick} />
        </div>
        <Steps />
        {/* The plans fill the window and hold a while before the composer rises over them. */}
        <div className="home-deck">
          <span id="pricing" className="home-anchor" aria-hidden />
          <Pricing composer={closing} />
          <span className="home-wait" aria-hidden />
          <span ref={sheets} className="home-anchor" aria-hidden />
          <Foot composer={closing} />
        </div>
      </main>
      <Script src={HANDOFF_SCRIPT} strategy="lazyOnload" />
    </div>
  );
}
