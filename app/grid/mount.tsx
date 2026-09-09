import dynamic from "next/dynamic";
import type { GridExpectations } from "./expectations";

/** Mounts grid validation in development. Production resolves this
 * module to a server-only null component. */
const GridPanel = dynamic(() => import("./panel"));

export default function GridMount(props: { expectations: GridExpectations }) {
  return <GridPanel {...props} />;
}
