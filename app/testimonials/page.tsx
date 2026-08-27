import { NavChrome } from "@/design-system/v2/sections/nav";
import { TestimonialsSection } from "@/design-system/v2/sections/testimonials";
import { TestimonialsDevControls } from "./controls";

/** /testimonials — the section beneath the mounted nav (spec 009
 * §8.6). The section stays server-rendered; the dev controls drive
 * the entrance replay through the v2:replay event, show the island's
 * dwell/timer state through v2:tst-timer, and simulate reduced motion
 * through the page root's data-motion attribute. No v2-choreo class —
 * this page mounts no load orchestrator; the section's own
 * pre-hydration guard covers the entrance participants. */
export default function TestimonialsDevPage() {
  return (
    <div className="page">
      <NavChrome />
      <main>
        <TestimonialsSection />
      </main>
      <TestimonialsDevControls />
    </div>
  );
}
