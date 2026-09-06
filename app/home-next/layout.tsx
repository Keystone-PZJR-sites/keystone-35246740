import type { Metadata } from "next";

/** /home-next — the noindexed dev mount of the homepage v2 composition
 * (spec 018 §8). `/` keeps mounting v1 until the spec 023 cutover. */
export const metadata: Metadata = {
  title: "Home v2",
  robots: { index: false, follow: false },
};

export default function HomeNextLayout({ children }: { children: React.ReactNode }) {
  return children;
}
