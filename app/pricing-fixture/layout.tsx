import type { Metadata } from "next";

/** /pricing-fixture — the permanent, noindexed QA surface for the
 * assembled pricing page (spec 011 §8). Renders the same composition
 * `/pricing` mounts; the page-level self-test readout mounts here when
 * spec 013 delivers the expectations module. */
export const metadata: Metadata = {
  title: "Pricing fixture",
  robots: { index: false, follow: false },
};

export default function PricingFixtureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
