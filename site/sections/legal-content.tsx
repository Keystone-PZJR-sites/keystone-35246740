import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const PROSE_COMPONENTS: Components = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="type type-fixed ts-display-serif-xs-light legal-h2">{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="type type-fixed ts-text-xl-medium legal-h3">{children}</h3>
  ),
};

export interface LegalContentSectionProps {
  eyebrow: string;
  title: string;
  markdown: string;
}

export function LegalContentSection({ eyebrow, title, markdown }: LegalContentSectionProps) {
  return (
    <article className="sec legal-section">
      <header className="legal-header">
        <p className="type type-fixed ts-text-nav-label legal-eyebrow">{eyebrow}</p>
        <h1 className="type type-fixed ts-display-serif-md-extralight legal-h1">{title}</h1>
      </header>
      <div className="type type-fixed ts-text-md-light legal-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={PROSE_COMPONENTS}>
          {markdown}
        </ReactMarkdown>
      </div>
    </article>
  );
}
