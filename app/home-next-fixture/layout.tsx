import type { Metadata } from "next";

/** /home-next-fixture — the permanent QA mount of the homepage v2
 * composition (spec 018 §8). The page-level expectations module and
 * the sweep leg land with spec 023; until then the hero section
 * audits on /hero-next. */
export const metadata: Metadata = {
  title: "Home v2 fixture",
  robots: { index: false, follow: false },
};

export default function HomeNextFixtureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
