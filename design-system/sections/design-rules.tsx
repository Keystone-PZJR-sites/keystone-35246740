/** Rules: AGENTS.md rendered as it is in the repo. The document is the
 * source; this is a reading of it. */

import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CloserRow } from "../primitives/closer-row";
import { Slug } from "../primitives/slug";

const PROSE: Components = {
  h1: () => null,
  h2: ({ children }: { children?: ReactNode }) => (
    <h3 className="type type-fixed ts-display-serif-xs-light ds-rules-h2">{children}</h3>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h4 className="type type-fixed ts-text-xl-medium ds-rules-h3">{children}</h4>
  ),
};

export function DesignRulesSection({ markdown }: { markdown: string }) {
  return (
    <section className="sec ds-sec ds-rules" id="rules" aria-label="Rules" data-landmark="ds-rules">
      <header className="ds-sec-head" data-landmark="head">
        <Slug>Rules</Slug>
        <h2 className="type ts-display-serif-xs-extralight ramp-h2 ds-h2">
          AGENTS.md, as committed.
        </h2>
      </header>
      <div className="type type-fixed ts-text-md-light ds-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={PROSE}>
          {markdown}
        </ReactMarkdown>
      </div>
      <CloserRow />
    </section>
  );
}
