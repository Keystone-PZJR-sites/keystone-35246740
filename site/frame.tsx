import { Footer } from "@keystonepzjr/marketing-design-system/footer";
import { Nav } from "@keystonepzjr/marketing-design-system/nav";
import type { ReactNode } from "react";
import { LOGIN_URL } from "@/site/console";
import { SmallPrint } from "@/site/legal/small-print";
import "./frame.css";

const LINKS = [
  { label: "Platform", href: "/#platform" },
  { label: "How it Works", href: "/#how" },
  { label: "Pricing", href: "/#pricing" },
];

/** A page of the site's own beside the homepage: the nav, a title, what the page holds, and the
    foot with the small print. */
export function Frame({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
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
        <header className="frame__head">
          <h1 className="ks-h2">{title}</h1>
          {description ? <p className="ks-lead">{description}</p> : null}
        </header>
        {children}
      </main>
      <Footer links={<SmallPrint />} note="© 2026 Keystone" />
    </div>
  );
}
