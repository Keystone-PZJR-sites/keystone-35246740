import "../hero/hero-page.css";
import "./engines-page.css";
import type { Metadata } from "next";

/** /engines-next — permanent, noindexed QA page for the engine section
 * (spec 020 §8, as re-ruled §9 R19). The section mounts below a
 * viewport-tall intro block so the approach, the five engine rests,
 * the carousel timer's a↔b loop, and the release are reachable by
 * scroll; the shared dev controls drive the reduced-motion simulation
 * (data-motion). Until the 023 sweep leg the section audits here
 * through the standing devtools at every engine rest. */
export const metadata: Metadata = {
  title: "Engine section",
  robots: { index: false, follow: false },
};

export default function EnginesNextLayout({ children }: { children: React.ReactNode }) {
  return children;
}
