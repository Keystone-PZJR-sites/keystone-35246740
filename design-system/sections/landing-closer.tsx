/** Landing closer: eyebrow, h2, one line of copy, the CTA row. The
 * footer's own lattice follows. Part of the landing kit — see
 * pages/landing.tsx. */

import { CtaRow, type CtaLink } from "../primitives/cta-row";
import { Slug } from "../primitives/slug";

export interface LandingCloserData {
  eyebrow: string;
  title: string;
  copy: string;
  cta: CtaLink;
}

export function LandingCloserSection({ data }: { data: LandingCloserData }) {
  return (
    <section className="sec ld-sec ld-close" aria-label={data.eyebrow} data-landmark="ld-close">
      <header className="ld-head" data-landmark="head">
        <Slug>{data.eyebrow}</Slug>
        <h2 className="type ts-display-serif-xs-extralight ramp-h2 ld-h2">{data.title}</h2>
      </header>
      <p className="type ts-text-md-light ramp-body ld-close-copy">{data.copy}</p>
      <CtaRow cta={data.cta} className="ld-close-cta" />
    </section>
  );
}
