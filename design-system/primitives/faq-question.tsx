import { IconChevronDownSmall } from "../icons";

/** FAQ disclosure row with content-derived open height. */

type FaqQuestionSize = "xs" | "sm" | "md" | "lg" | "xl";

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
