/** SANDBOX — the engine section remounted with the FREE scroll island.
 *
 * A byte-for-byte copy of engines.tsx (spec 020 server component) with
 * exactly one change: it mounts EnginesFreeScroll (the free-scroll
 * experiment island) instead of EnginesScroll (the canonical §9 R20
 * paged island). Mounted ONLY by /engines-free; the canonical section,
 * /engines-next, and the home-next composition are untouched.
 *
 * The markup keeps the canonical class names, so engines.css styles it
 * with no CSS changes. If the free contract is adopted, this file is
 * deleted and the ruling lands in spec 020 §9 — this copy is never the
 * source of truth. See engines.tsx for the full section commentary.
 */

import { GridDecor, GridRegion, type GridBand } from "../grid/region";
import { InterpText } from "../primitives/text";
import { ENGINE_V2_CUTS, ENGINE_V2_MD_MEDIA, engineV2PlaceholderSrc } from "../media";
import { ENGINES_V2, ENGINES_V2_SLUG, type EngineV2Copy } from "./engines-data";
import { EnginesFreeScroll } from "./engines-scroll-free";

const STACK_BANDS: GridBand[] = ["rm", "rs"];
const IO_BANDS: GridBand[] = ["rd1", "rd2"];

/** The ten stage states in scroll order (§4/§6). */
const STAGE_STATES = ENGINES_V2.flatMap((engine) =>
  (["01", "02"] as const).map((state) => ({ engine, state })),
);

function EngineCopyBlock({ engine }: { engine: EngineV2Copy }) {
  return (
    <div className="e2-text">
      <InterpText as="h3" style="display-serif-md-plus-extralight" className="e2-name">
        {engine.name}
      </InterpText>
      <div className="e2-desc">
        <InterpText as="p" style="text-md-light">
          {engine.tagline}
        </InterpText>
        <InterpText as="p" style="text-md-light">
          {engine.body[0]}
        </InterpText>
        <InterpText as="p" style="text-md-light">
          {engine.body[1]}
        </InterpText>
      </div>
    </div>
  );
}

export function EnginesFreeSection() {
  return (
    <section
      className="sec v2-engines"
      aria-label="Five marketing engines"
      data-landmark="engines"
    >
      <div className="gx" aria-hidden="true">
        {STACK_BANDS.map((band) => [
          <GridRegion key={`${band}-seam`} band={band} gx={0} gy={0} gw={12} gh={1} />,
          <GridDecor key={`${band}-orn`} band={band} gx={11} gy={0}>
            <span className="f-cell fill round" />
          </GridDecor>,
          <GridRegion key={`${band}-rail`} band={band} gx={11} gy={1} gw={1} gh={127} />,
        ])}
        <GridRegion band="rt" gx={0} gy={0} gw={12} gh={1} />
        <GridRegion band="rt" gx={10} gy={1} gw={2} gh={96} />
        {IO_BANDS.map((band) => (
          <GridRegion key={`${band}-seam`} band={band} gx={0} gy={0} gw={12} gh={1} />
        ))}
      </div>

      <div className="e2-seam" aria-hidden="true" />

      {/* ---- the interactive construction (rd1/rd2 — §1/§4/§6) ---- */}
      <div className="e2-io">
        <div className="e2-slugrow">
          <p className="e2-slug">
            <span className="e2-marker" aria-hidden="true" />
            <InterpText as="span" style="text-sm-medium" className="e2-sluglabel">
              {ENGINES_V2_SLUG}
            </InterpText>
          </p>
        </div>
        <div className="e2-body">
          <div className="e2-pinhost" aria-hidden="true">
            <div className="e2-pin">
              {IO_BANDS.map((band) => [
                <GridRegion key={`${band}-field`} band={band} gx={7} gy={0} gw={5} gh={5} />,
                <GridRegion key={`${band}-wide`} band={band} gx={6} gy={5} gw={6} gh={2} />,
                <GridDecor key={`${band}-o1`} band={band} gx={8} gy={0}>
                  <span className="f-cell round" />
                </GridDecor>,
                <GridDecor key={`${band}-o2`} band={band} gx={11} gy={5}>
                  <span className="f-cell round" />
                </GridDecor>,
              ])}
            </div>
          </div>

          <div className="e2-vp">
            <ul className="e2-col">
              {ENGINES_V2.map((engine, i) => (
                <li
                  className="e2-panel"
                  key={engine.id}
                  data-engine={engine.id}
                  data-lit={i === 0 ? "" : undefined}
                >
                  <div className="e2-card">
                    <span className="e2-dot" aria-hidden="true" />
                    <EngineCopyBlock engine={engine} />
                    <span className="e2-bc" aria-hidden="true">
                      <i className="e2-bc-track">
                        <b className="e2-bc-fill" />
                      </i>
                      <i className="e2-bc-track">
                        <b className="e2-bc-fill" />
                      </i>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="e2-rail">
            <div className="e2-stage" aria-hidden="true">
              {STAGE_STATES.map(({ engine, state }, i) => (
                <div
                  className="e2-drawing"
                  key={`${engine.id}-${state}`}
                  data-stage-index={i}
                  data-active={i === 0 ? "" : undefined}
                >
                  <img
                    src={engineV2PlaceholderSrc(engine.id, state)}
                    width={ENGINE_V2_CUTS.xl.width}
                    height={ENGINE_V2_CUTS.xl.height}
                    alt=""
                    loading={i <= 1 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---- the static stack (base/rs/rt — §5) ---- */}
      <div className="e2-stack">
        <div className="e2-stackslug">
          <p className="e2-slug">
            <span className="e2-marker" aria-hidden="true" />
            <InterpText as="span" style="text-xs-regular" className="e2-sluglabel">
              {ENGINES_V2_SLUG}
            </InterpText>
          </p>
        </div>
        <ul className="e2-stacklist">
          {ENGINES_V2.map((engine) => (
            <li className="e2-spanel" key={engine.id} data-engine={engine.id}>
              <div className="e2-sbox">
                <div className="e2-scard">
                  <span className="e2-dot" aria-hidden="true" />
                  <EngineCopyBlock engine={engine} />
                </div>
              </div>
              <div className="e2-svisual" aria-hidden="true">
                <div className="e2-strack">
                  {(["01", "02"] as const).map((state) => (
                    <div
                      className="e2-sdrawing"
                      key={state}
                      data-active={state === "01" ? "" : undefined}
                    >
                      <picture>
                        <source
                          media={ENGINE_V2_MD_MEDIA}
                          srcSet={engineV2PlaceholderSrc(engine.id, state, "md")}
                          width={ENGINE_V2_CUTS.md.width}
                          height={ENGINE_V2_CUTS.md.height}
                        />
                        <img
                          src={engineV2PlaceholderSrc(engine.id, state, "xs")}
                          width={ENGINE_V2_CUTS.xs.width}
                          height={ENGINE_V2_CUTS.xs.height}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    </div>
                  ))}
                </div>
                <span className="e2-bc e2-sbc">
                  <i className="e2-bc-track">
                    <b className="e2-bc-fill" />
                  </i>
                  <i className="e2-bc-track">
                    <b className="e2-bc-fill" />
                  </i>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <EnginesFreeScroll />
    </section>
  );
}
