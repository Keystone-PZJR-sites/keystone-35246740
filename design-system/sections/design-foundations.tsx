/** Foundations: the grid, color roles, the type scale and ramps, spacing,
 * radius, and the entrance clock — each rendered from its live token so
 * a swatch, bar, or specimen is the value the site uses. */

import type { ReactNode } from "react";
import { GridRegion, type GridBand } from "../grid/region";
import { CloserRow } from "../primitives/closer-row";
import { Slug } from "../primitives/slug";
import type { TokenGroup, TypeStyle } from "../pages/design-source";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

const BAND_TABLE = [
  { band: "rm", anchor: 384, tick: 32, opens: "—" },
  { band: "rs", anchor: 576, tick: 48, opens: "470" },
  { band: "rt", anchor: 768, tick: 64, opens: "665" },
  { band: "rd1", anchor: 960, tick: 80, opens: "860" },
  { band: "rd2", anchor: 1344, tick: 112, opens: "1130" },
];

const RAMPS = [
  { cls: "ramp-h1", base: "ts-display-serif-sm-plus-thin", from: "36/42", to: "72/78", el: "h1" },
  { cls: "ramp-h2", base: "ts-display-serif-xs-extralight", from: "24/30", to: "56/62", el: "h2" },
  { cls: "ramp-body", base: "ts-text-md-light", from: "16/22", to: "20/26", el: "p" },
  {
    cls: "ramp-quote",
    base: "ts-display-serif-2xs-plus-extralight",
    from: "20/24",
    to: "36/42",
    el: "blockquote",
  },
] as const;

function Chapter({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <div className="ds-chapter" id={id}>
      <h3 className="type type-fixed ts-text-xl-medium ds-h3">{title}</h3>
      {children}
    </div>
  );
}

function TokenTable({ group, swatch }: { group: TokenGroup; swatch: "color" | "length" | "time" }) {
  return (
    <table className="ds-table" id={`token-${group.id}`}>
      <caption className="type type-fixed ts-text-md-medium ds-caption">{group.title}</caption>
      <tbody>
        {group.rows.map((row) => (
          <tr key={row.name}>
            <td className="ds-cell-swatch">
              {swatch === "color" && (
                <i
                  className="ds-swatch"
                  style={{ "--sw": `var(${row.name})` }}
                  aria-hidden="true"
                />
              )}
              {swatch === "length" && (
                <i className="ds-bar" style={{ "--bar": `var(${row.name})` }} aria-hidden="true" />
              )}
            </td>
            <td className="ds-cell-name">
              <code className="type type-fixed ts-text-sm-regular ds-code">{row.name}</code>
              {row.note && (
                <span className="type type-fixed ts-text-sm-light ds-cell-note">{row.note}</span>
              )}
            </td>
            <td className="type type-fixed ts-text-sm-light ds-cell-val">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface Props {
  tokens: TokenGroup[];
  typeStyles: TypeStyle[];
}

export function DesignFoundationsSection({ tokens, typeStyles }: Props) {
  const group = (id: string) => tokens.find((g) => g.id === id)!;
  const serif = typeStyles.filter((s) => s.name.startsWith("display-serif/"));
  const sans = typeStyles.filter((s) => !s.name.startsWith("display-serif/"));

  return (
    <section
      className="sec ds-sec ds-foundations"
      id="foundations"
      aria-label="Foundations"
      data-landmark="ds-foundations"
    >
      <header className="ds-sec-head" data-landmark="head">
        <Slug>Foundations</Slug>
        <h2 className="type ts-display-serif-xs-extralight ramp-h2 ds-h2">
          The grid, the palette, the type, the clock.
        </h2>
      </header>

      <Chapter id="grid" title="Grid">
        <p className="type ts-text-md-light ramp-body ds-copy">
          The page is twelve columns of one tick, <code>--t</code> = page width ÷ 12, capped at
          112px. Structure is written in ticks; a section sits in unpainted air, seats a frame on
          the lattice, or closes with a painted row. Gates are named by the band they open, never a
          pixel width.
        </p>
        <table className="ds-table ds-table-bands">
          <thead className="type type-fixed ts-text-sm-medium">
            <tr>
              <th>Band</th>
              <th>Anchor</th>
              <th>Tick</th>
              <th>Gate opens at</th>
            </tr>
          </thead>
          <tbody className="type type-fixed ts-text-sm-light">
            {BAND_TABLE.map((b) => (
              <tr key={b.band}>
                <td>
                  <code className="ds-code">@container (--{b.band})</code>
                </td>
                <td>{b.anchor}</td>
                <td>{b.tick}px</td>
                <td>{b.opens}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <figure className="ds-lattice" aria-label="A seated 12 by 2 frame">
          <div className="gx ds-bleed" aria-hidden="true">
            {BANDS.map((band) => (
              <GridRegion key={band} band={band} gx={0} gy={0} gw={12} gh={2} />
            ))}
          </div>
          <figcaption className="type type-fixed ts-text-sm-light ds-fig-cap">
            <code className="ds-code">{"<GridRegion gx={0} gy={0} gw={12} gh={2} />"}</code> — a
            line-inclusive frame, <code className="ds-code">k·t + 1px</code>, seated on the page
            lattice.
          </figcaption>
        </figure>
      </Chapter>

      <Chapter id="color" title="Color">
        <p className="type ts-text-md-light ramp-body ds-copy">
          Roles, not hues. Sections use these; the palette they resolve to lives in{" "}
          <code>tokens/primitives.css</code>.
        </p>
        <div className="ds-tables">
          <TokenTable group={group("bg")} swatch="color" />
          <TokenTable group={group("text")} swatch="color" />
          <TokenTable group={group("border")} swatch="color" />
          <TokenTable group={group("status")} swatch="color" />
        </div>
      </Chapter>

      <Chapter id="type" title="Type">
        <p className="type ts-text-md-light ramp-body ds-copy">
          Every text node is <code>type ts-&lt;style&gt;</code>. The class carries the Figma style
          at 384; the element&rsquo;s own rule sets its 1344 size and the size runs fluidly between
          (<code>primitives/text.css</code>). <code>type-fixed</code> holds a material size.
        </p>
        <h4 className="type type-fixed ts-text-md-medium ds-h4">Ramps</h4>
        <ul className="ds-ramps">
          {RAMPS.map((r) => {
            const Tag = r.el;
            return (
              <li key={r.cls} className="ds-ramp">
                <code className="type type-fixed ts-text-sm-regular ds-code">
                  type {r.base} {r.cls}
                </code>
                <span className="type type-fixed ts-text-sm-light ds-ramp-meta">
                  {r.from} → {r.to}
                </span>
                <Tag className={`type ${r.base} ${r.cls} ds-ramp-spec`}>
                  {r.el === "blockquote"
                    ? "“Type that grows with the page, not in steps.”"
                    : "Type that grows with the page, not in steps."}
                </Tag>
              </li>
            );
          })}
        </ul>
        <h4 className="type type-fixed ts-text-md-medium ds-h4">Display serif · PP Kyoto</h4>
        <ul className="ds-specimens">
          {serif.map((s) => (
            <li key={s.name} className="ds-specimen">
              <span className={`type type-fixed ${s.className} ds-spec`}>Keystone</span>
              <span className="ds-spec-meta">
                <code className="type type-fixed ts-text-sm-regular ds-code">{s.className}</code>
                <span className="type type-fixed ts-text-sm-light">
                  {s.size}/{s.lh} · {s.ls}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <h4 className="type type-fixed ts-text-md-medium ds-h4">Text · GT Standard</h4>
        <ul className="ds-specimens">
          {sans.map((s) => (
            <li key={s.name} className="ds-specimen">
              <span className={`type type-fixed ${s.className} ds-spec`}>
                Local businesses deserve to be found.
              </span>
              <span className="ds-spec-meta">
                <code className="type type-fixed ts-text-sm-regular ds-code">{s.className}</code>
                <span className="type type-fixed ts-text-sm-light">
                  {s.size}/{s.lh} · {s.ls}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter id="space" title="Spacing, radius, and the clock">
        <p className="type ts-text-md-light ramp-body ds-copy">
          Material distances inside a section come from the spacing scale; distances between
          sections are ticks. The entrance delays are the beats of the page load, consumed by{" "}
          <code>hx-rise</code>.
        </p>
        <div className="ds-tables">
          <TokenTable group={group("space")} swatch="length" />
          <TokenTable group={group("radius")} swatch="length" />
          <TokenTable group={group("delays")} swatch="time" />
        </div>
      </Chapter>

      <CloserRow />
    </section>
  );
}
