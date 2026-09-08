import { NavChrome } from "@/design-system/v2/sections/nav";
import { SystemSection } from "@/design-system/v2/sections/system";
import { HeroDevControls } from "../hero-next/controls";

/** /system-next — the system section beneath the mounted nav, below a
 * viewport-tall runway so the Bloom entrance arms on load (spec 019
 * §6/§8). No load orchestrator mounts here, so the page renders
 * statically (no v2-choreo guard); the section's own island owns its
 * choreography. */
export default function SystemNextDevPage() {
  return (
    <div className="page">
      <NavChrome />
      <main>
        <div className="sysdev-runway">
          <p>Scroll down — the Bloom entrance arms while the diagram is below the fold.</p>
        </div>
        <SystemSection />
      </main>
      <HeroDevControls />
    </div>
  );
}
