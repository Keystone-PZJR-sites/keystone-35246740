import "@/design-system/v2/index.css";
import "./engine-page.css";
import type { Metadata } from "next";

/** /engine — permanent, noindexed engine QA page (spec 008 §8.6).
 * Renders the section beneath the mounted nav at all bands, with a
 * state readout, an interrupt-storm control (rapid re-targeting), and
 * a reduced-motion toggle. The v2 root is the size container the
 * engine's container queries read (spec 002). */
export const metadata: Metadata = {
  title: "Engine",
  robots: { index: false, follow: false },
};

export default function EngineLayout({ children }: { children: React.ReactNode }) {
  return <div className="v2-root">{children}</div>;
}
