"use client";

import { useComposer } from "@keystone-sites/marketing-design-system/composer";
import { useScrollProgress } from "@keystone-sites/marketing-design-system/motion";
import { Nav } from "@keystone-sites/marketing-design-system/nav";
import { useRef, useState } from "react";
import { launch, LOGIN_URL } from "@/site/console";
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

/** The homepage, inside `.ks`, the scope the Set's CSS hangs off. Every composer on it sends its
    prompt into Keystone. */
export function Home() {
  const composer = useComposer({ onSend: launch });
  const ask = useAsk(composer);
  const closing = useComposer({ onSend: launch });
  // The nav turns to ink as the foot comes up under it.
  const [dark, setDark] = useState(false);
  const sheets = useRef<HTMLSpanElement>(null);
  useScrollProgress(
    sheets,
    (_, node) => {
      setDark(node.getBoundingClientRect().top < 64);
    },
    "pass",
  );

  return (
    <div className="ks" id="top">
      <main className="home">
        <Nav
          home={{ label: "Keystone, top of page", href: "#top" }}
          links={LINKS}
          login={{ label: "Log in", href: LOGIN_URL }}
          cta={{ label: "Try Keystone", onClick: dark ? closing.focus : composer.focus }}
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
    </div>
  );
}
