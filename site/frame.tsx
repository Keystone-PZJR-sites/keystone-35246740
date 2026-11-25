import { Nav } from "@keystonepzjr/marketing-design-system/nav";
import type { ReactNode } from "react";
import { LOGIN_URL } from "@/site/console";
import { Lockup } from "@/site/lockup";
import "./frame.css";

const LINKS = [
  { label: "Platform", href: "/#platform" },
  { label: "How it Works", href: "/#how" },
  { label: "Pricing", href: "/#pricing" },
];

/** A page of the site's own beside the homepage: the nav, then one centred column with the title
    over what the page holds, and the site's lockup on ink at the foot. Over the title, the legal
    documents with this one marked; under it, what the page is, a word on its length and what to
    do next. */
export function Frame({
  title,
  description,
  documents,
  meta,
  action,
  children,
}: {
  title: string;
  description?: string;
  documents?: { label: string; href: string; current: boolean }[];
  meta?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="ks">
      <Nav
        home={{ label: "Keystone, home", href: "/" }}
        links={LINKS}
        login={{ label: "Log in", href: LOGIN_URL }}
        cta={{ label: "Try Keystone", href: "/" }}
      />
      <main className="ks-page frame">
        <div className="frame__col">
          <header className="frame__head">
            {documents ? (
              <nav className="frame__docs" aria-label="Legal documents">
                {documents.map((document) => (
                  <a
                    key={document.href}
                    href={document.href}
                    className="frame__doc"
                    aria-current={document.current ? "page" : undefined}
                  >
                    {document.label}
                  </a>
                ))}
              </nav>
            ) : null}
            <h1 className="ks-h2">{title}</h1>
            {description ? <p className="ks-lead frame__lead">{description}</p> : null}
            {meta ? <p className="ks-meta frame__meta">{meta}</p> : null}
            {action ? <div className="frame__action">{action}</div> : null}
          </header>
          {children}
        </div>
      </main>
      <footer className="ks-ground frame__foot" data-ground="ink">
        <Lockup />
      </footer>
    </div>
  );
}
