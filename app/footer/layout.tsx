import "@/design-system/v2/index.css";
import "./footer-page.css";
import type { Metadata } from "next";

/** /footer — permanent, noindexed footer QA page (spec 004 §8). Renders
 * the section alone at all bands with the drawer states toggleable. The
 * v2 root is the size container the engine's container queries read
 * (spec 002), standing in for body until the rebuild owns the root
 * layout. */
export const metadata: Metadata = {
  title: "Footer",
  robots: { index: false, follow: false },
};

export default function FooterLayout({ children }: { children: React.ReactNode }) {
  return <div className="v2-root">{children}</div>;
}
