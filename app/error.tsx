"use client";

import { GridField } from "@/design-system/grid/field";
import { LEGAL_EYEBROW } from "@/design-system/pages/legal-data";

/** The route error boundary. Next requires a client component here; it
 * stays markup-only on the legal-page classes so the shared chunk carries
 * no extra weight. */
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="page legal-page">
      <GridField />
      <main>
        <article className="sec legal-section">
          <header className="legal-header">
            <p className="type type-fixed legal-eyebrow">{LEGAL_EYEBROW}</p>
            <h1 className="type type-fixed legal-h1">Something went wrong</h1>
          </header>
          <div className="type type-fixed legal-prose">
            <p>This page hit an error. Trying again usually fixes it.</p>
            <p>
              <button type="button" onClick={reset}>
                Try again
              </button>{" "}
              · <a href="/">Back to the home page</a>
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
