import "../hero/hero-page.css";
import "./work-page.css";
import type { Metadata } from "next";

/** /work-next — permanent, noindexed QA page for the work section
 * (spec 021 §8). The section mounts below a short runway with a tail
 * block after it, so both band hairlines sit against scrollable
 * context; the shared dev controls drive the reduced-motion simulation
 * (data-motion). Until the 023 sweep leg the section audits here —
 * every deck position is a rest state (six states, cycled by
 * clicking). */
export const metadata: Metadata = {
  title: "Work section",
  robots: { index: false, follow: false },
};

export default function WorkNextLayout({ children }: { children: React.ReactNode }) {
  return children;
}
