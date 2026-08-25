import "@/design-system/v2/index.css";
import "./fixture-page.css";
import type { Metadata } from "next";

/** /home-fixture — the noindexed dev route that stacks the new-brand
 * homepage sections in order as Phase 5 lands them (decision 2026-08-25,
 * spec 006 §9). Today: nav · hero · portfolio placeholder · footer.
 * Phase 6 promotes this page to `/` at cutover. */
export const metadata: Metadata = {
  title: "Home fixture",
  robots: { index: false, follow: false },
};

export default function HomeFixtureLayout({ children }: { children: React.ReactNode }) {
  return <div className="v2-root">{children}</div>;
}
