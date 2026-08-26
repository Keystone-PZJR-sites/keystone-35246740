import { NavChrome } from "@/design-system/v2/sections/nav";
import { PortfolioSection } from "@/design-system/v2/sections/portfolio";
import { PortfolioDevControls } from "./controls";

/** /portfolio — the section beneath the mounted nav (spec 007 §8.8).
 * The section stays server-rendered; the dev controls drive the
 * entrance replay through the v2:replay event and the reduced-motion
 * simulation through the page root's data-motion attribute. No
 * v2-choreo class — this page mounts no load orchestrator; the
 * section's own pre-hydration guard covers the reveal cards. */
export default function PortfolioDevPage() {
  return (
    <div className="page">
      <NavChrome />
      <main>
        <PortfolioSection />
      </main>
      <PortfolioDevControls />
    </div>
  );
}
