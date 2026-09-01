import type { Metadata } from "next";

/** /case-study-fixture — the permanent, noindexed QA surface for the
 * assembled case-study page (spec 017 §7/§8.4): the shared
 * composition on the Zivel record under the grid devtools readout. */
export const metadata: Metadata = {
  title: "Case Study Fixture | Keystone QA",
  robots: { index: false, follow: false },
};

export default function CaseStudyFixtureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
