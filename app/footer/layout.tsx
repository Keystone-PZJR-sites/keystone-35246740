import "./footer-page.css";
import type { Metadata } from "next";

/** /footer — permanent, noindexed footer QA page (spec 004 §8). Renders
 * the section alone at all bands with the drawer states toggleable. */
export const metadata: Metadata = {
  title: "Footer",
  robots: { index: false, follow: false },
};

export default function FooterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
