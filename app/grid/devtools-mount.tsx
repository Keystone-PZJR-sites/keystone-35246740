import dynamic from "next/dynamic";
import type { GridExpectations } from "./expectations";

/** The sweep's build-time gate (spec 002 §3.2, spec 010 §3.2): this
 * module mounts the self-test in development; production aliases it
 * to a server null stub. Live pages import it only through a `*-qa`
 * wrapper that is also stubbed, so the production graph stays the
 * bare composition. */
const GridDevtools = dynamic(() => import("./grid-devtools"));

export default function DevtoolsMount(props: { expectations: GridExpectations }) {
  return <GridDevtools {...props} />;
}
