import dynamic from "next/dynamic";
import type { GridExpectations } from "./expectations";

/** Development-only grid validation. The `NODE_ENV` check is statically
 * resolved at build time, so the panel and its client graph are dropped
 * from production bundles. */
const GridPanel =
  process.env.NODE_ENV === "development" ? dynamic(() => import("./panel")) : null;

export default function GridMount(props: { expectations: GridExpectations }) {
  if (!GridPanel) return null;
  return <GridPanel {...props} />;
}
