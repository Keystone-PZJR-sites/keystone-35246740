import "@/design-system/v2/index.css";
import "./hero-page.css";
import type { Metadata } from "next";

/** /hero — permanent, noindexed hero QA page (spec 006 §8). Renders the
 * section beneath the mounted nav at all bands, with a replay control
 * for the load choreography and a reduced-motion toggle. The v2 root is
 * the size container the engine's container queries read (spec 002). */
export const metadata: Metadata = {
  title: "Hero",
  robots: { index: false, follow: false },
};

export default function HeroLayout({ children }: { children: React.ReactNode }) {
  return <div className="v2-root">{children}</div>;
}
