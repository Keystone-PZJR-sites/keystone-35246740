/** v2 sections — the case-study checklist (spec 017 §3.3/§3.5): rows
 * on the double-checkmark glyph. Two mounts share it — the Overview's
 * five-point list (24 icon) and the after-card's four-point list (20
 * icon); row type and gaps are the owning section's CSS. Icons are
 * decorative (aria-hidden inside the export); the rows are real list
 * text. */

import { IconDoubleCheckmark } from "../icons";

interface CaseStudyChecklistProps {
  items: string[];
  icon?: 24 | 20;
  className?: string;
}

export function CaseStudyChecklist({ items, icon = 24, className }: CaseStudyChecklistProps) {
  return (
    <ul className={className ? `cs-check ${className}` : "cs-check"}>
      {items.map((item) => (
        <li key={item}>
          <IconDoubleCheckmark size={icon} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
