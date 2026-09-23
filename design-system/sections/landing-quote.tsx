/** Landing quote: eyebrow, a hanging blockquote, attribution, closer.
 * Part of the landing kit — see pages/landing.tsx. */

import { CloserRow } from "../primitives/closer-row";
import { Slug } from "../primitives/slug";

export interface LandingQuoteData {
  eyebrow: string;
  /** Written with its own curly quotes; the first hangs into the margin. */
  quote: string;
  attribution: string;
}

/* Lattice: unpainted air, then the flow closer. */
export function LandingQuoteSection({ data }: { data: LandingQuoteData }) {
  return (
    <section className="sec ld-sec ld-quote" aria-label={data.eyebrow} data-landmark="ld-quote">
      <Slug>{data.eyebrow}</Slug>
      <figure className="ld-quote-fig">
        <blockquote className="type ts-display-serif-2xs-plus-extralight ramp-quote ld-quote-body">
          {data.quote}
        </blockquote>
        <figcaption className="type ts-text-md-light ld-quote-attrib">
          {data.attribution}
        </figcaption>
      </figure>
      <CloserRow />
    </section>
  );
}
