import "./engine-page.css";
import type { Metadata } from "next";

/** /engine — permanent, noindexed engine QA page (spec 008 §8.6).
 * Renders the section beneath the mounted nav at all bands, with a
 * state readout, an interrupt-storm control (rapid re-targeting), and
 * a reduced-motion toggle. */
export const metadata: Metadata = {
  title: "Engine",
  robots: { index: false, follow: false },
};

export default function EngineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
