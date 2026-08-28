/** v2 primitives — PersonaCard (spec 012 §5, set 615:25245). The card
 * box (image band over cost card) with the hanging tag below and the
 * inactive-state click overlay. Prop-driven — content arrives from the
 * section's data module, never hardcoded.
 *
 * Interior sizing is var-driven (--pc-* consumed against the --pcard-u
 * unit, persona-card.css): an unsized card takes its numbers from its
 * mount, so one DOM instance per persona rides the section's band
 * restatements as weight-riding band constants (§1 units). The `size`
 * prop renders a designed anchor size statically for the /primitives
 * catalog. The box geometry (image-band and box heights, the card
 * width) is tick geometry the section owns.
 *
 * The image is an art-directed <picture> tier set on the structural
 * gates (§5.2): xs as the <img> fallback, one media-gated <source> per
 * tier above it, lazy, alt="" (the title carries the meaning). The
 * inactive click target is a real <button> overlay — never a handler
 * on the card div (§8.7); the section island wires it. */

import { PERSONA_TIERS, personaSrc, type PersonaId } from "../media";
import { PricingTag } from "./pricing-tag";
import type { CSSProperties } from "react";
import type { SliderHue } from "./slider";

export interface PersonaContent {
  id: PersonaId;
  /** The persona's hue role (§5): pink · blue · purple. */
  hue: SliderHue;
  title: string;
  estimate: string;
  story: string;
  chips: string[];
  tagLabel: string;
}

interface PersonaCardProps {
  persona: PersonaContent;
  state?: "active" | "inactive";
  /** Designed-size render for the /primitives catalog only; section
   * mounts leave it unset and ride the band vars. */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function PersonaCard({ persona, state = "active", size }: PersonaCardProps) {
  const hueVar = { "--pcard-hue": `var(--color-${persona.hue}-400)` } as CSSProperties;
  return (
    <article className="pcard" data-persona={persona.id} data-state={state} data-size={size} style={hueVar}>
      <div className="pcard-box">
        <div className="pcard-image">
          <picture>
            {PERSONA_TIERS.filter((t) => t.media !== null).map((t) => (
              <source key={t.cut} media={t.media ?? undefined} srcSet={personaSrc(persona.id, t.cut)} />
            ))}
            <img
              src={personaSrc(persona.id, "xs")}
              width={PERSONA_TIERS[PERSONA_TIERS.length - 1].width}
              height={PERSONA_TIERS[PERSONA_TIERS.length - 1].height}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </picture>
          <h3 className="pcard-title">{persona.title}</h3>
        </div>
        <div className="pcard-cost">
          <div className="pcard-desc">
            <p className="pcard-est">{persona.estimate}</p>
            <p className="pcard-story">{persona.story}</p>
          </div>
          <ul className="pcard-chips">
            {persona.chips.map((chip) => (
              <li key={chip}>
                <PricingTag>{chip}</PricingTag>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <span className="pcard-tag">{persona.tagLabel}</span>
      <button type="button" className="pcard-overlay" aria-label={`Show the ${persona.tagLabel} example`} />
    </article>
  );
}
