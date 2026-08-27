import "./nav-page.css";
import type { Metadata } from "next";

/** /nav — permanent, noindexed nav QA page (spec 005 §7). Renders the
 * chrome over a lattice fixture at all bands; drawer and panel states
 * are toggleable through the real interactions. */
export const metadata: Metadata = {
  title: "Nav",
  robots: { index: false, follow: false },
};

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return children;
}
