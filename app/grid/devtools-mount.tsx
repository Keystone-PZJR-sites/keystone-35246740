import dynamic from "next/dynamic";
import type { GridExpectations } from "./expectations";

/** The devtools' build-time gate (spec 002 §3.2, spec 010 §3.2): this
 * module mounts the real self-test in development; the production build
 * resolves the same import to devtools-mount.prod.tsx (the webpack
 * alias in next.config.ts), a server null component. The swap keeps the
 * production module graph of a QA route identical to its bare page —
 * no devtools code, no async chunk edge — so the bundler's shared-chunk
 * attribution (and with it the spec's route-JS budget) is undisturbed
 * by the dev-only machinery. */
const GridDevtools = dynamic(() => import("./grid-devtools"));

export default function DevtoolsMount(props: { expectations: GridExpectations }) {
  return <GridDevtools {...props} />;
}
