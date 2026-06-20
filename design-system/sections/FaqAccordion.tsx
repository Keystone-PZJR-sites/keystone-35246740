import type { FaqQuestion } from 'keystone-design-bootstrap/types';
import { plainText } from '@/design-system/lib/text';

/** A plain question / answer pair, for authored (non-API) FAQ content. */
export interface FaqItem {
  id: string | number;
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  /** API-typed FAQ entities (sorted by `sort_order`). */
  questions?: FaqQuestion[];
  /** Plain authored question / answer pairs, used in source order. */
  items?: FaqItem[];
  /** Center the list under a centered ContentSection heading. */
  centered?: boolean;
}

/**
 * FAQ list rendered as native <details> elements — fully expandable with no
 * client JavaScript. Accepts either the API-typed `questions` (sorted by
 * `sort_order`) or a plain `items` list of authored pairs. Styling is
 * token-driven.
 */
export function FaqAccordion({ questions, items, centered = false }: FaqAccordionProps) {
  const normalized: FaqItem[] = items
    ? items
    : [...(questions ?? [])]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((q) => ({
          id: q.id,
          question: q.question,
          answer: plainText(q.answer_markdown || q.answer),
        }));

  const list = (
    <div className="ks-faq">
      {normalized.map((item) => (
        <details key={item.id} className="ks-faq__item">
          <summary className="ks-faq__question">
            <span>{item.question}</span>
            <span className="ks-faq__icon" aria-hidden="true" />
          </summary>
          <div className="ks-faq__answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );

  return centered ? <div className="ks-faq-center">{list}</div> : list;
}
