"use client";

import Link from "next/link";
import { GridField } from "@keystone-sites/marketing-design-system/grid/field";
import { LEGAL_EYEBROW } from "@/site/pages/legal-data";

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
            <p className="type type-fixed ts-text-nav-label legal-eyebrow">{LEGAL_EYEBROW}</p>
            <h1 className="type type-fixed ts-display-serif-md-extralight legal-h1">
              Something went wrong
            </h1>
          </header>
          <div className="type type-fixed ts-text-md-light legal-prose">
            <p>This page hit an error. Trying again usually fixes it.</p>
            <p>
              <button type="button" onClick={reset}>
                Try again
              </button>{" "}
              · <Link href="/">Back to the home page</Link>
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
