import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single entry in the legal sidebar — one of the site's legal documents. */
export interface LegalDoc {
  label: string;
  href: string;
}

export interface LegalDocumentPageProps {
  /** Document title — "Privacy Policy" or "Terms of Service" */
  title: string;
  /** Short "last updated" string shown under the title, e.g. "2026" */
  updated?: string;
  /** Processed markdown body (placeholders already substituted) */
  contentMarkdown: string;
  /** The full set of legal documents, rendered as the left sidebar nav */
  docs: LegalDoc[];
  /** href of the document being viewed (marks the active sidebar entry) */
  activeHref: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Legal document layout: a sticky left sidebar listing every legal document
 * with the current one marked active, beside a single long-form column that
 * renders the document's markdown body. Composed on the inner-page surface;
 * typography reuses the shared blog prose. Colors/spacing reference tokens.
 */
export function LegalDocumentPage({
  title,
  updated,
  contentMarkdown,
  docs,
  activeHref,
}: LegalDocumentPageProps) {
  return (
    <div className="inner-page" data-theme="custom">
      <div className="ks-legal">
        <aside className="ks-legal__sidebar">
          <nav className="ks-legal__nav" aria-label="Legal documents">
            <p className="ks-legal__nav-heading">Legal</p>
            <ul className="ks-legal__nav-list">
              {docs.map((doc) => {
                const active = doc.href === activeHref;
                return (
                  <li key={doc.href}>
                    <a
                      href={doc.href}
                      className={clsx(
                        'ks-legal__nav-link',
                        active && 'ks-legal__nav-link--active',
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className="ks-legal__nav-dot" aria-hidden="true" />
                      {doc.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <article className="ks-legal__doc">
          <header className="ks-legal__head">
            <Heading level={1} size="xl" font="body" className="ks-legal__title">
              {title}
            </Heading>
            {updated ? (
              <Text variant="small" tone="tertiary" className="ks-legal__updated">
                Updated {updated}
              </Text>
            ) : null}
          </header>

          {contentMarkdown.trim() ? (
            <div className="ks-legal__prose prose prose-lg blog-prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentMarkdown}</ReactMarkdown>
            </div>
          ) : (
            <div className="blog-empty-state">
              <p className="blog-empty-title">Coming soon.</p>
              <p className="blog-empty-body">
                This document is being finalized. Check back shortly.
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
