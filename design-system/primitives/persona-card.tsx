/** persona-card (1150:25363 set): an art-directed image with the
 * persona's title, then the plan chip, price, and story; the tag hangs
 * under the card. The mount sets `--pcard-size` (sm · md · lg) and
 * `--pcard-u` per band; `size` pins one design for the catalog. */

import { PERSONA_TIERS, personaSrc, type PersonaId } from "../media";

export type PersonaHue = "pink" | "teal" | "blue" | "purple";

export interface PersonaContent {
  id: PersonaId;
  hue: PersonaHue;
  title: string;
  /** The plan chip, "On Starter" … "Custom". */
  plan: string;
  price: string;
  story: string;
  tagLabel: string;
}

interface PersonaCardProps {
  persona: PersonaContent;
  state?: "active" | "inactive";
  /** Optional fixed design size; section mounts leave this unset. */
  size?: "sm" | "md" | "lg";
}

export function PersonaCard({ persona, state = "active", size }: PersonaCardProps) {
  return (
    <article
      className="pcard"
      data-persona={persona.id}
      data-hue={persona.hue}
      data-state={state}
      data-size={size}
    >
      <div className="pcard-box">
        <div className="pcard-image">
          <picture>
            {PERSONA_TIERS.filter((t) => t.media !== null).map((t) => (
              <source
                key={t.cut}
                media={t.media ?? undefined}
                srcSet={personaSrc(persona.id, t.cut)}
              />
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
          <h3 className="type pcard-title">{persona.title}</h3>
        </div>
        <div className="pcard-cost">
          <p className="pcard-row">
            <span className="type pcard-plan">{persona.plan}</span>
            <span className="type pcard-price">{persona.price}</span>
          </p>
          <p className="type pcard-story">{persona.story}</p>
        </div>
        <span className="type pcard-tag">{persona.tagLabel}</span>
      </div>
      <button
        type="button"
        className="pcard-overlay"
        aria-label={`Show the ${persona.tagLabel} example`}
      />
    </article>
  );
}
