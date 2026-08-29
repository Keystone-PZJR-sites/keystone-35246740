import { OurWorkPage } from "@/design-system/v2/our-work";

/** The QA mount of the shared Our Work composition (spec 014 §8.4).
 * The page-level self-test (expectations module + devtools readout)
 * lands with spec 016's page assembly; until then the fixture mounts
 * the composition bare under its noindexed layout. */
export default function OurWorkFixturePage() {
  return <OurWorkPage />;
}
