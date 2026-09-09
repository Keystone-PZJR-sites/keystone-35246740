/** Feature list shared by the overview and after card.
 * Owning sections control row typography and spacing. */

import { IconDoubleCheckmark } from "../icons";

interface CaseStudyFeatureListProps {
  items: string[];
  icon?: 24 | 20;
  className?: string;
}

export function CaseStudyFeatureList({ items, icon = 24, className }: CaseStudyFeatureListProps) {
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
