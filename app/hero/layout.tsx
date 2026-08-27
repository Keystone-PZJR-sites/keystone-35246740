import "./hero-page.css";
import type { Metadata } from "next";

/** /hero — permanent, noindexed hero QA page (spec 006 §8). Renders the
 * section beneath the mounted nav at all bands, with a replay control
 * for the load choreography and a reduced-motion toggle. */
export const metadata: Metadata = {
  title: "Hero",
  robots: { index: false, follow: false },
};

export default function HeroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
