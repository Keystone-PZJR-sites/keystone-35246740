import "@/design-system/v2/index.css";
import "./testimonials-page.css";
import type { Metadata } from "next";

/** /testimonials — permanent, noindexed testimonials QA page (spec 009
 * §8.6). Renders the section beneath the mounted nav at all bands,
 * with an entrance replay control, a dwell/timer readout, and a
 * reduced-motion toggle. The v2 root is the size container the
 * engine's container queries read (spec 002). */
export const metadata: Metadata = {
  title: "Testimonials",
  robots: { index: false, follow: false },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <div className="v2-root">{children}</div>;
}
