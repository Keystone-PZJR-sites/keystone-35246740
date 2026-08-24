import "@/design-system/v2/index.css";
import "./nav-page.css";
import type { Metadata } from "next";

/** /nav — permanent, noindexed nav QA page (spec 005 §7). Renders the
 * chrome over a lattice fixture at all bands; drawer and panel states
 * are toggleable through the real interactions. The v2 root is the size
 * container the engine's container queries read (spec 002). */
export const metadata: Metadata = {
  title: "Nav",
  robots: { index: false, follow: false },
};

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return <div className="v2-root">{children}</div>;
}
