import type { Metadata } from "next";

/** /home-fixture — the permanent, noindexed QA surface for the
 * assembled homepage (spec 010 §6.3). Renders the same composition `/`
 * mounts; the spec 010 self-test readout mounts here (dev-only). */
export const metadata: Metadata = {
  title: "Home fixture",
  robots: { index: false, follow: false },
};

export default function HomeFixtureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
