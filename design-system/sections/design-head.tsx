/** Design page head and the chapter switcher. */

import { Slug } from "../primitives/slug";

export const DESIGN_CHAPTERS = [
  { id: "foundations", label: "Foundations" },
  { id: "primitives", label: "Primitives" },
  { id: "sections", label: "Sections" },
  { id: "rules", label: "Rules" },
] as const;

export function DesignHeadSection() {
  return (
    <section className="sec ds-sec ds-head" aria-label="Design system" data-landmark="ds-head">
      <Slug>Keystone design system</Slug>
      <h1 className="type ts-display-serif-sm-plus-thin ramp-h1 ds-h1">
        Everything the site is made of, rendered from the source.
      </h1>
      <p className="type ts-text-md-light ramp-body ds-lede">
        Tokens are read from <code>tokens/semantic.css</code>, type styles from{" "}
        <code>tokens/type-styles.json</code>, and the rules from <code>AGENTS.md</code> at build
        time; the components below are the real ones. If this page and the site disagree, the site
        is wrong.
      </p>
    </section>
  );
}

/** The chapter switcher. State is the URL hash: `:target` shows one
 * chapter (design.css), so `/design/#primitives` deep-links and nothing
 * runs on the client. Foundations shows when no chapter is targeted. */
export function DesignTabs() {
  return (
    <nav className="ds-tabs" aria-label="Chapters">
      {DESIGN_CHAPTERS.map((c) => (
        <a key={c.id} className="type type-fixed ts-text-md-medium ds-tab" href={`#${c.id}`}>
          {c.label}
        </a>
      ))}
    </nav>
  );
}
