import "@/design-system/v2/index.css";
import "./harness.css";
import type { Metadata } from "next";

/** /grid — permanent, noindexed grid-engine dev harness (spec 002 §3).
 * The v2 root below is the size container the engine's container queries
 * read (engine.css); it takes the place of `body` until the rebuild owns
 * the root layout. */
export const metadata: Metadata = {
  title: "Grid harness",
  robots: { index: false, follow: false },
};

export default function GridLayout({ children }: { children: React.ReactNode }) {
  return <div className="v2-root">{children}</div>;
}
