import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LegalDocumentPageProps {
  /** Document title — "Terms of Service" or "Privacy Policy" */
  title: string;
  /** Company name displayed as the subtitle (the issuing entity) */
  companyName?: string;
  /** Effective year string, e.g. "2026" */
  effectiveYear: string;
  /** Processed markdown body (placeholders already substituted) */
  contentMarkdown: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function LegalDocumentPage({
  title,
  companyName,
  effectiveYear,
  contentMarkdown,
}: LegalDocumentPageProps) {
  return (
    <div className="inner-page" data-theme="custom">
      {/* Page header — same dark maroon as InnerNav */}
      <header className="inner-page-header">
        <div className="inner-page-header-inner">
          <h1 className="inner-page-title">{title}</h1>
          {companyName && (
            <p className="inner-page-subtitle">{companyName}</p>
          )}
          <p className="legal-effective-date">Effective {effectiveYear}</p>
        </div>
      </header>

      {/* Body */}
      <main>
        {contentMarkdown.trim() ? (
          <article className="blog-article">
            <div className="prose prose-lg blog-prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {contentMarkdown}
              </ReactMarkdown>
            </div>
          </article>
        ) : (
          <div className="blog-empty-state">
            <p className="blog-empty-title">Coming soon.</p>
            <p className="blog-empty-body">
              This document is being finalized. Check back shortly.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
