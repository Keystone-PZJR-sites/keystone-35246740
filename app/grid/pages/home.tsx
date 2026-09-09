import GridMount from "../mount";
import { PAGE_EXPECTATIONS } from "./home-expectations";

/** Development-only homepage grid check. */
export default function HomeGridCheck() {
  return <GridMount expectations={PAGE_EXPECTATIONS} />;
}
