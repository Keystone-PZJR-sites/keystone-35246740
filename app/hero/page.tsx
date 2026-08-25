import { NavChrome } from "@/design-system/v2/sections/nav";
import { HeroSection } from "@/design-system/v2/sections/hero";
import { HeroDevControls } from "./controls";

/** /hero — the section beneath the mounted nav, so the §6 load
 * choreography is complete (including the nav's t=0 entry). The hero
 * stays server-rendered; the dev controls drive the replay through the
 * v2:replay event and the reduced-motion simulation through the page
 * root's data-motion attribute. */
export default function HeroDevPage() {
  return (
    /* v2-choreo opts this page into the cold-load guard: choreographed
       elements stay hidden until the orchestrator's class lands */
    <div className="page v2-choreo">
      <NavChrome />
      <main>
        <HeroSection />
      </main>
      <HeroDevControls />
    </div>
  );
}
