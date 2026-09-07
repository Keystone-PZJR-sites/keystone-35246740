import { NavChrome } from "@/design-system/v2/sections/nav";
import { CaseCarouselSection } from "@/design-system/v2/sections/case-carousel";
import { HeroDevControls } from "../hero/controls";

/** /case-carousel-next — the case-study carousel beneath the mounted
 * nav (spec 022 §8). No load orchestrator mounts here, so the page
 * renders statically; the section is born settled at k = 0 (Zivel
 * active) and the island owns the machine. Swipe the strip, click an
 * inactive card, or arrow with focus inside the strip to move k; the
 * active card's link opens its case study. */
export default function CaseCarouselNextDevPage() {
  return (
    <div className="page">
      <NavChrome />
      <main>
        <div className="ccdev-runway">
          <p>The case-study carousel is below — swipe, click a ghost card, or use arrow keys.</p>
        </div>
        <CaseCarouselSection />
        <div className="ccdev-tail">
          <p>Past the section.</p>
        </div>
      </main>
      <HeroDevControls />
    </div>
  );
}
