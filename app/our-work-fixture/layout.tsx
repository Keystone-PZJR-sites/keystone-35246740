import type { Metadata } from "next";

/** /our-work-fixture — the permanent, noindexed QA surface for the
 * assembled Our Work page (spec 014 §8.4). Renders the same
 * composition `/our-work` mounts; the page-level self-test readout
 * mounts here when spec 016 delivers the expectations module. */
export const metadata: Metadata = {
  title: "Our Work fixture",
  robots: { index: false, follow: false },
};

export default function OurWorkFixtureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
