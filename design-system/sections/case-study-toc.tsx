/** Desktop-only sticky table of contents for a case study. */

import { Toc } from "../primitives/toc";

const ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "business", label: "The Business" },
  { id: "shift", label: "The Shift" },
  { id: "funnel", label: "The Funnel" },
  { id: "stack", label: "The Stack" },
  { id: "result", label: "The Result" },
] as const;

export function CaseStudyToc() {
  return <Toc items={ITEMS} />;
}
