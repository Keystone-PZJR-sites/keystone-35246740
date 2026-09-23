/** Sections: the landing kit's kinds, rendered for real from sample data
 * with the fields each one takes, so a page author sees what a `kind`
 * produces before writing a data module. */

import { Fragment } from "react";
import { renderLandingSection, type LandingSection } from "../pages/landing";
import { FOR_DENTISTS } from "../pages/for-dentists-data";
import { CloserRow } from "../primitives/closer-row";
import { Slug } from "../primitives/slug";

const FIELDS: Record<LandingSection["kind"], string> = {
  hero: "eyebrow · title · subhead · cta { label, href } · picture: PictureSet",
  benefits: "eyebrow · title · items[] { id, icon?, title, copy }",
  quote: "eyebrow · quote (with its own curly quotes) · attribution",
  closer: "eyebrow · title · copy · cta { label, href }",
};

const SHARED = [
  { name: "NavChrome", file: "sections/nav.tsx" },
  { name: "FooterSection", file: "sections/footer.tsx" },
  { name: "LegalContentSection", file: "sections/legal-content.tsx" },
  { name: "LoadOrchestrator", file: "sections/load-orchestrator.tsx" },
];

export function DesignSectionsSection() {
  /* The first of each kind from the reference data module. */
  const samples = (["hero", "benefits", "quote", "closer"] as const).map((kind) =>
    FOR_DENTISTS.sections.find((s) => s.kind === kind)!,
  );

  return (
    <section
      className="sec ds-sec ds-sections"
      id="sections"
      aria-label="Sections"
      data-landmark="ds-sections"
    >
      <header className="ds-sec-head" data-landmark="head">
        <Slug>Sections</Slug>
        <h2 className="type ts-display-serif-xs-extralight ramp-h2 ds-h2">
          The landing kit, one kind at a time.
        </h2>
        <p className="type ts-text-md-light ramp-body ds-copy">
          A landing page is <code>meta</code> plus an ordered <code>sections</code> list of{" "}
          <code>{"{ kind, …data }"}</code> (<code>pages/landing.tsx</code>). Any order, any count.
          Each kind below is rendered from <code>pages/for-dentists-data.ts</code>.
        </p>
      </header>

      <div className="ds-kinds">
        {samples.map((section) => (
          <Fragment key={section.kind}>
            <div className="ds-kind-label" id={`kind-${section.kind}`}>
              <code className="type type-fixed ts-text-md-medium ds-code">
                kind: &quot;{section.kind}&quot;
              </code>
              <span className="type type-fixed ts-text-sm-light ds-kind-fields">
                {FIELDS[section.kind]}
              </span>
              <code className="type type-fixed ts-text-sm-regular ds-code ds-kind-file">
                sections/landing-{section.kind}.tsx
              </code>
            </div>
            <div className="ds-kind-frame">{renderLandingSection(section)}</div>
          </Fragment>
        ))}
      </div>

      <h3 className="type type-fixed ts-text-xl-medium ds-h3 ds-shared-head">
        Shared across every page
      </h3>
      <table className="ds-table">
        <tbody className="type type-fixed ts-text-sm-light">
          {SHARED.map((s) => (
            <tr key={s.name}>
              <td>
                <code className="ds-code">{s.name}</code>
              </td>
              <td>
                <code className="ds-code">{s.file}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="type type-fixed ts-text-md-light ds-note">
        Every other section in <code>sections/</code> belongs to one designed page (homepage,
        pricing, our work, company, blog, case studies) and is composed only there.
      </p>

      <CloserRow />
    </section>
  );
}
