import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface LegalContentSectionProps {
  eyebrow: string;
  title: string;
  markdown: string;
}

export function LegalContentSection({ eyebrow, title, markdown }: LegalContentSectionProps) {
  return (
    <article className="sec legal-section">
      <header className="legal-header">
        <p className="legal-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </header>
      <div className="legal-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </article>
  );
}
