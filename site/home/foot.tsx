"use client";

import { Chip } from "@keystone-sites/marketing-design-system/chip";
import { Composer, type ComposerState } from "@keystone-sites/marketing-design-system/composer";
import { Icon, type IconName } from "@keystone-sites/marketing-design-system/icon";
import { useScrollProgress } from "@keystone-sites/marketing-design-system/motion";
import { Wordmark } from "@keystone-sites/marketing-design-system/wordmark";
import { type ReactNode, useEffect, useRef } from "react";
import { LOGIN_URL } from "@/site/console";
import { useCookieChoices } from "@/site/consent/cookie-choices";
import { AskLine, Chips, Trim } from "./ask";
import { COPY } from "./content";

// What a visitor still wants to know at the foot. Each drops into the composer as written.
const QUESTIONS = [
  "What is Keystone?",
  "What types of businesses is Keystone for?",
  "What does it cost?",
  "What else can I ask?",
] as const;
// The longest, left out on a phone so the rest sit on two lines.
const OFF_PHONE: string = QUESTIONS[1];

// The small print, then the visitor's cookie choices. Each with the word a phone shows, so the
// four sit on one line there.
const LEGAL = [
  { label: "Terms of Service", short: "Terms", href: "/terms" },
  { label: "Privacy Policy", short: "Privacy", href: "/privacy-policy" },
  { label: "Accessibility", short: "Accessibility", href: "/accessibility" },
] as const;

const PODCAST = "https://open.spotify.com/show/41MuXEI3TIvCAQW20Ko9cX";
const SOCIAL: readonly { label: string; href: string; icon: IconName }[] = [
  { label: "Instagram", href: "https://www.instagram.com/keystonebiz/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/keystonebiz", icon: "facebook" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/keystone-local-ai",
    icon: "linkedin",
  },
  { label: "YouTube", href: "https://www.youtube.com/@KeystoneGrowthForLocal", icon: "youtube" },
];

// The wordmark's letters without the room the drawing leaves around them, so it can be set edge
// to edge.
const WORD_BOX = "2.76 3.2 313.7 64.2";

/** The composer again, on ink (Figma › 05 Composer on ink): the fold's own arrangement over four
    questions to ask, as one block at the middle of a window of its own. The foot then holds while
    the lockup comes up from the window's foot and the composer makes room: the wordmark from edge
    to edge, with the way in and the ways out over it and the small print under it. The page
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
          <h2 className="ks-h1 home-foot__title">
            {COPY.close[0]}
            <br />
            {COPY.close[1]}
          </h2>
          <div className="home-composer">
            <Trim />
            <Composer composer={composer} tone="ink" placeholder={<AskLine />} />
          </div>
          <Chips>
            {QUESTIONS.map((question) => (
              <Chip
                key={question}
                className={question === OFF_PHONE ? "home-off-phone" : undefined}
                onClick={() => {
                  composer.load(question);
                }}
              >
                {question}
              </Chip>
            ))}
          </Chips>
        </div>
        <div ref={lockup} className="home-foot__lockup">
          <nav className="home-foot__links" aria-label="Footer">
            <p className="home-foot__set home-foot__said">
              <span>Already with Keystone?</span>
              <a href={LOGIN_URL} className="home-foot__login">
                Log in
                <Icon name="arrow-right" />
              </a>
            </p>
            <div className="home-foot__set home-foot__follow">
              <Out href={PODCAST}>Podcast</Out>
              {SOCIAL.map((item) => (
                <Out key={item.href} href={item.href} icon={item.icon}>
                  {item.label}
                </Out>
              ))}
            </div>
          </nav>
          <Wordmark className="home-foot__word" viewBox={WORD_BOX} />
          <nav className="home-foot__links home-foot__links--base" aria-label="Legal">
            <p className="home-foot__set home-foot__set--quiet">© 2026 Keystone</p>
            <div className="home-foot__set home-foot__set--quiet">
              {LEGAL.map((item) => (
                <a key={item.href} href={item.href}>
                  <span className="home-foot__long">{item.label}</span>
                  <span className="home-foot__short">{item.short}</span>
                </a>
              ))}
              <Cookies />
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function Cookies() {
  const cookies = useCookieChoices();
  return (
    <>
      <button type="button" onClick={cookies.open}>
        <span className="home-foot__long">{cookies.label.long}</span>
        <span className="home-foot__short">{cookies.label.short}</span>
      </button>
      {cookies.panel}
    </>
  );
}

/** A link off the site: a new tab, and said so to a screen reader. On a phone a social page is its
    mark alone and anything else its name with an arrow out (foot.css); elsewhere, its name. */
function Out({ href, icon, children }: { href: string; icon?: IconName; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" data-icon={icon ? "" : undefined}>
      {icon ? <Icon name={icon} className="home-foot__icon" /> : null}
      <span className="home-foot__name">{children}</span>
      {icon ? null : <Icon name="arrow-up-right" className="home-foot__out" />}
      <span className="ks-sr"> (opens in a new tab)</span>
    </a>
  );
}
