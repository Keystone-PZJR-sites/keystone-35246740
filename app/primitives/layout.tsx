import "@/design-system/v2/index.css";
import "./catalog.css";
import type { Metadata } from "next";

/** /primitives — permanent, noindexed QA surface (spec 003 §8): the full
 * variant × state matrix of the core primitives, the icon sheet, and the
 * token catalog (the page spec 001's last criterion calls for). */
export const metadata: Metadata = {
  title: "Primitives",
  robots: { index: false, follow: false },
};

export default function PrimitivesLayout({ children }: { children: React.ReactNode }) {
  return <div className="v2-root">{children}</div>;
}
