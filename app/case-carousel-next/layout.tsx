import "../hero/hero-page.css";
import "./cc-page.css";
import type { Metadata } from "next";

/** /case-carousel-next — permanent, noindexed QA page for the
 * case-study carousel (spec 022 §8). The section mounts below a short
 * runway with a tail block after it, so the section boundary and the
 * pre-footer lattice row sit against scrollable context; the shared
 * dev controls drive the reduced-motion simulation (data-motion).
 * Until the 023 sweep leg the section audits here at each k. */
export const metadata: Metadata = {
  title: "Case-study carousel",
  robots: { index: false, follow: false },
};

export default function CaseCarouselNextLayout({ children }: { children: React.ReactNode }) {
  return children;
}
