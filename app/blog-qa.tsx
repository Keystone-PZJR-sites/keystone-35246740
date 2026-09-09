import DevtoolsMount from "./grid/devtools-mount";
import { blogExpectations } from "./blog-expectations";
import type { BlogLandingModel } from "@/design-system/v2/sections/blog-data";

/** Dev-only blog-landing sweep hook (spec 025 §8). The expectations
 * derive from the landing model the page rendered (the data-dependent
 * ruling); production aliases this module to `qa.prod.tsx` — no
 * panel, no expectations on the live graph. */
export default function BlogQa({ landing }: { landing: BlogLandingModel }) {
  return <DevtoolsMount expectations={blogExpectations(landing)} />;
}
