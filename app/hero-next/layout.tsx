import "../hero/hero-page.css";
import type { Metadata } from "next";

/** /hero-next — permanent, noindexed QA page for the v2 hero (spec
 * 018 §8). Same shape as /hero: the section beneath the mounted nav,
 * with the replay control and the reduced-motion toggle (the devbar
 * styles are the /hero route's, shared). */
export const metadata: Metadata = {
  title: "Hero v2",
  robots: { index: false, follow: false },
};

export default function HeroNextLayout({ children }: { children: React.ReactNode }) {
  return children;
}
