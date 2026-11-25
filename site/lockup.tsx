"use client";

import { Icon, type IconName } from "@keystonepzjr/marketing-design-system/icon";
import { Wordmark } from "@keystonepzjr/marketing-design-system/wordmark";
import type { ReactNode, Ref } from "react";
import { LOGIN_URL } from "@/site/console";
import { useCookieChoices } from "@/site/consent/cookie-choices";
import { LEGAL_DOCUMENTS } from "@/site/legal/documents";
import "./lockup.css";

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

/** The foot every page ends on, drawn on ink by whatever holds it: the wordmark from edge to edge,
    with the way in and the ways out over it and the small print under it. */
export function Lockup({ ref, className }: { ref?: Ref<HTMLDivElement>; className?: string }) {
  return (
    <div ref={ref} className={className ? `lockup ${className}` : "lockup"}>
      <nav className="lockup__links" aria-label="Footer">
        <p className="lockup__set lockup__said">
          <span>Already with Keystone?</span>
          <a href={LOGIN_URL} className="lockup__login">
            Log in
            <Icon name="arrow-right" />
          </a>
        </p>
        <div className="lockup__set lockup__follow">
          <Out href={PODCAST}>Podcast</Out>
          {SOCIAL.map((item) => (
            <Out key={item.href} href={item.href} icon={item.icon}>
              {item.label}
            </Out>
          ))}
        </div>
      </nav>
      <Wordmark className="lockup__word" viewBox={WORD_BOX} />
      <nav className="lockup__links lockup__links--base" aria-label="Legal">
        <p className="lockup__set lockup__set--quiet">© 2026 Keystone</p>
        <div className="lockup__set lockup__set--quiet">
          {Object.values(LEGAL_DOCUMENTS).map((document) => (
            <a key={document.href} href={document.href}>
              <span className="lockup__long">{document.title}</span>
              <span className="lockup__short">{document.short}</span>
            </a>
          ))}
          <Cookies />
        </div>
      </nav>
    </div>
  );
}

function Cookies() {
  const cookies = useCookieChoices();
  return (
    <>
      <button type="button" onClick={cookies.open}>
        <span className="lockup__long">{cookies.label.long}</span>
        <span className="lockup__short">{cookies.label.short}</span>
      </button>
      {cookies.panel}
    </>
  );
}

/** A link off the site: a new tab, and said so to a screen reader. On a phone a social page is its
    mark alone and anything else its name with an arrow out (lockup.css); elsewhere, its name. */
function Out({ href, icon, children }: { href: string; icon?: IconName; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" data-icon={icon ? "" : undefined}>
      {icon ? <Icon name={icon} className="lockup__icon" /> : null}
      <span className="lockup__name">{children}</span>
      {icon ? null : <Icon name="arrow-up-right" className="lockup__out" />}
      <span className="ks-sr"> (opens in a new tab)</span>
    </a>
  );
}
