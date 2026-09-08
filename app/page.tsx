import { HomePage } from "@/design-system/v2/home";

/** `/` — the new-brand homepage (the v2 composition since the spec 023
 * §4 cutover). The page mounts the shared composition bare;
 * `/home-fixture` mounts the same composition as the permanent QA
 * surface. */
export default function Home() {
  return <HomePage />;
}
