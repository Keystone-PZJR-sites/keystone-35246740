import "@/design-system/v2/index.css";
import "./portfolio-page.css";
import type { Metadata } from "next";

/** /portfolio — permanent, noindexed portfolio QA page (spec 007 §8.8).
 * Renders the section beneath the mounted nav at all bands, with a
 * replay control for the curtain-reveal entrance and a reduced-motion
 * toggle. The v2 root is the size container the engine's container
 * queries read (spec 002). */
export const metadata: Metadata = {
  title: "Portfolio",
  robots: { index: false, follow: false },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <div className="v2-root">{children}</div>;
}
