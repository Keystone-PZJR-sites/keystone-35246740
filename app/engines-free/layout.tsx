import "../hero/hero-page.css";
import "./engines-free-page.css";
import type { Metadata } from "next";

/** /engines-free — SANDBOX route, noindexed. The engine section
 * remounted with the free-scroll experiment island (engines-free.tsx /
 * engines-scroll-free.tsx): native scroll with no paged clamp and no
 * gesture-end snap, the ElevenLabs-Studio contract against our stage
 * grammar. Not a spec 020 QA surface — /engines-next stays the
 * canonical §9 R20 paged page. Delete this route when the experiment
 * is decided. */
export const metadata: Metadata = {
  title: "Engine section — free-scroll sandbox",
  robots: { index: false, follow: false },
};

export default function EnginesFreeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
