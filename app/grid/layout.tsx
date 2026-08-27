import "./harness.css";
import type { Metadata } from "next";

/** /grid — permanent, noindexed grid-engine dev harness (spec 002 §3).
 * The root layout owns the v2 root (the engine's size container). */
export const metadata: Metadata = {
  title: "Grid harness",
  robots: { index: false, follow: false },
};

export default function GridLayout({ children }: { children: React.ReactNode }) {
  return children;
}
