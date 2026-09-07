import "../hero/hero-page.css";
import "./engines-free-2-page.css";
import type { Metadata } from "next";

/** /engines-free-2 — SANDBOX route, noindexed. The engine section
 * remounted with the DISTANCE-MAPPED free scroll island
 * (engines-free-2.tsx / engines-scroll-free-2.tsx): ten scroll stops,
 * one per drawing, so a single pass plays every a AND b state — the
 * answer to /engines-free's structural miss (free scroll removes the
 * dwell, so its timer never showed the b drawings on a pass-through).
 * Not a spec 020 QA surface — /engines-next stays the canonical §9
 * R20 paged page. Delete this route when the experiment is decided. */
export const metadata: Metadata = {
  title: "Engine section — distance-mapped sandbox",
  robots: { index: false, follow: false },
};

export default function EnginesFree2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
