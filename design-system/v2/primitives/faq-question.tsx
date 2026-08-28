import { IconChevronDownSmall } from "../icons";

/** v2 primitives — faq-question (spec 013 §4, set 613:21448).
 *
 * A disclosure row: transparent fill, a 1px border/000 top hairline,
 * a fixed question row with the 12px chevron, and the answer region
 * revealed by the row's moving clip edge (the 004 draw-down grammar).
 *
 * Sizes are material-per-size (xs · sm · md · lg · xl — one per band);
 * the mount owns the width, like the footer rows. Closed heights are
 * the designed constants; **open heights are content-derived** (§4 as
 * amended, §9 R7): the smallest whole-tick height whose bottom padding
 * ≥ its top padding. In a section the island measures the answer and
 * publishes `--fq-open` (ticks) and `--drawer-extra` (the §7.2 audit
 * contract); the bare `size` mounts on /primitives render the designed
 * anchor materials with the placeholder-copy derivations as fixed px.
 *
 * The answer stays in layout when closed (visibility-hidden, off the
 * accessibility tree) so a no-JS render carries the copy and the
 * island can measure it at rest.
 */

export type FaqQuestionSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface FaqQuestionProps {
  /** Base for the disclosure's aria-controls wiring. */
  id: string;
  question: string;
  answer: string;
  /** Designed anchor size — catalog mounts only; section mounts are
   * unsized and ride the band restatements in faq.css. */
  size?: FaqQuestionSize;
  open?: boolean;
  onToggle?: () => void;
}

export function FaqQuestion({ id, question, answer, size, open = false, onToggle }: FaqQuestionProps) {
  const answerId = `${id}-answer`;
  return (
    <li className="fq" data-size={size} data-open={open || undefined} data-drawer="" data-landmark="item">
      <h3 className="fq-h">
        <button
          type="button"
          className="fq-trigger"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={onToggle}
        >
          <span className="fq-q">{question}</span>
          <IconChevronDownSmall className="fq-chevron" />
        </button>
      </h3>
      <div className="fq-answer" id={answerId}>
        <p className="fq-a">{answer}</p>
      </div>
    </li>
  );
}
