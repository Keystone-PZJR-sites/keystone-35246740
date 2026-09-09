import type { BlogLandingModel } from "@/design-system/sections/blog-data";
import GridMount from "../mount";
import { blogExpectations } from "./blog-expectations";

export interface BlogGridCheckProps {
  landing: BlogLandingModel;
}

/** Development-only blog grid check. */
export default function BlogGridCheck({ landing }: BlogGridCheckProps) {
  return <GridMount expectations={blogExpectations(landing)} />;
}
