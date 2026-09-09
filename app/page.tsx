import { HomePage } from "@/design-system/v2/home";
import HomeQa from "./home-qa";

/** `/` — the new-brand homepage. HomeQa is the sweep hook (dev-only;
 * production aliases it to a null stub). No on-page readout. */
export default function Home() {
  return <HomePage qa={<HomeQa />} />;
}
