import "../hero/hero-page.css";
import "./system-page.css";
import type { Metadata } from "next";

/** /system-next — permanent, noindexed QA page for the system section
 * (spec 019 §8). The section mounts below a viewport-tall intro block
 * so both rest states are reachable: the pre-fire state on load (the
 * island arms — the diagram starts below the trigger) and the settled
 * state after the Bloom run. The shared dev controls drive the replay
 * (v2:replay) and the reduced-motion simulation (data-motion); the
 * devbar styles are the /hero route's, shared. */
export const metadata: Metadata = {
  title: "System section",
  robots: { index: false, follow: false },
};

export default function SystemNextLayout({ children }: { children: React.ReactNode }) {
  return children;
}
