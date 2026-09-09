/** Unsized cards inherit responsive geometry from their section.
 * The title names the decorative art-directed image. */

import { PERSONA_TIERS, personaSrc, type PersonaId } from "../media";
import { PricingTag } from "./pricing-tag";
import type { CSSProperties } from "react";
import type { SliderHue } from "./slider";

export interface PersonaContent {
  id: PersonaId;
  /** Persona hue role. */
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
  /** Optional fixed design size; section mounts leave this unset. */
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
