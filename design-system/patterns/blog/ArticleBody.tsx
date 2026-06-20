import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createSlugger } from './utils';

/** Flattens a React node tree to its visible text (for heading anchor ids). */
function nodeToText(node: ReactNode): string {
  if (node == null || node === false || node === true) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join('');
  if (isValidElement(node)) {
    return nodeToText((node.props as { children?: ReactNode }).children);
  }
  return '';
}

interface ArticleBodyProps {
  markdown: string;
}

/**
 * Renders the post's markdown as static HTML with our prose treatment. Section
 * headings (h2/h3) get stable, de-duplicated anchor ids — built by the same
 * slugger `extractHeadings` uses — so the sidebar "In this article" links jump
 * to the right place. The content itself is not under our control; callouts and
 * charts inside the markdown are styled generically, not parsed.
 */
export function ArticleBody({ markdown }: ArticleBodyProps) {
  const slug = createSlugger();
  const components: Components = {
    h2: ({ children }) => <h2 id={slug(nodeToText(children))}>{children}</h2>,
    h3: ({ children }) => <h3 id={slug(nodeToText(children))}>{children}</h3>,
  };

  return (
    <div className="prose prose-lg blog-prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
