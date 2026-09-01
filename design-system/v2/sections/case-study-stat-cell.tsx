/** v2 sections — the case-study stat cell (spec 017 §3.2/§3.3): a
 * stroked line-inclusive box, numeral and pill label bottom-anchored
 * at the band pad. Each cell is its own <dl> pair (the 014 pattern:
 * the pill label is the term, the numeral the value; visual order —
 * numeral above label — is CSS). The intro's fifth cell is the
 * disclaimer variant — a plain paragraph in the pill chrome,
 * wrap-pinned. The 5★ numeral mounts the IconStarLg export beside
 * the digit, inked yellow/400 (§3.2). Sizing and type live in the
 * owning section's CSS. */

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
