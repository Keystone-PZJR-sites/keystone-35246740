import { HomePage } from "@/design-system/v2/home";

/** `/` — the new-brand homepage (spec 010 §6.3). The page mounts the
 * shared composition bare; `/home-fixture` mounts the same composition
 * as the permanent QA surface. */
export default function Home() {
  return <HomePage />;
}
