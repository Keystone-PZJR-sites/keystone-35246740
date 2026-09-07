import "../hero/hero-page.css";
import "./engines-free-2-page.css";
import type { Metadata } from "next";

/** /engines-free-2 — the engine section's permanent, noindexed QA
 * page (spec 020 §8 as re-ruled §9 R24). The distance-mapped free
 * scroll contract was promoted to the canonical island here on
 * 2026-09-06 (owner ruling — §9 R24); this route, born as the
 * experiment sandbox, is its QA surface, succeeding the retired
 * /engines-next (and the retired /engines-free dwell-timer variant).
 * It mounts the canonical EnginesSection — there is no fork. */
export const metadata: Metadata = {
  title: "Engine section",
  robots: { index: false, follow: false },
};

export default function EnginesFree2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
