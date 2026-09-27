/** Design page head and the chapter switcher. */

import { Slug } from "@keystone-sites/marketing-design-system/primitives/slug";

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

/** The chapter switcher: a radio group. `:has(:checked)` shows the chosen
 * chapter (design.css), so a click changes nothing but state — no scroll,
 * nothing on the client. Until a tab is clicked, a hash deep link
 * (`/design/#primitives`, `/design/#p-slug`) picks the chapter; with
 * neither, Foundations shows. */
export function DesignTabs() {
  return (
    <fieldset className="ds-tabs">
      <legend className="hx-sr">Chapter</legend>
      {DESIGN_CHAPTERS.map((c) => (
        <label key={c.id} className="type type-fixed ts-text-md-medium ds-tab">
          <input type="radio" name="ds-chapter" value={c.id} className="ds-tab-input" />
          {c.label}
        </label>
      ))}
    </fieldset>
  );
}
