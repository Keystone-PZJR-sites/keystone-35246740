/** Semantic stat and disclaimer cells; owning sections control layout and type. */

import { IconStarLg } from "../icons";
import type { CaseStudyStat } from "./case-study-data";

export function CaseStudyStatCell({ stat }: { stat: CaseStudyStat }) {
  return (
    <dl className="cs-cell">
      <dt className="cs-cell-label">
        <span className="cs-pill">{stat.label}</span>
      </dt>
      <dd className="cs-cell-value">
        {stat.value}
        {stat.star && (
          <span className="cs-cell-star" aria-hidden="true">
            <IconStarLg />
          </span>
        )}
      </dd>
    </dl>
  );
}

export function CaseStudyDisclaimerCell({ text }: { text: string }) {
  return (
    <p className="cs-cell cs-cell-disclaimer">
      <span className="cs-pill">{text}</span>
    </p>
  );
}
