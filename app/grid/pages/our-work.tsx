import GridMount from "../mount";
import { OUR_WORK_EXPECTATIONS } from "./our-work-expectations";

/** Development-only Our Work grid check. */
export default function OurWorkGridCheck() {
  return <GridMount expectations={OUR_WORK_EXPECTATIONS} />;
}
