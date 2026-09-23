/** Accessible CTA copy with an aria-hidden, chip-styled visual duplicate. */

import type { ReactNode } from "react";
import { ButtonFill, ButtonGhost } from "../primitives/buttons";
import { IconChat } from "../icons";
import { CaseStudyLattice } from "./case-study-lattice";

const GET_STARTED_HREF = "/pricing";

function Chip({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span className="csc-chip" data-chip={id}>
      {children}
    </span>
  );
}

function words(text: string) {
  return text.split(" ").map((w, i) => <span key={`${w}${i}`}>{w}</span>);
}

export function CaseStudyCtaSection() {
  return (
    <section className="sec cs-sec csc-sec">
      <CaseStudyLattice section="cta" />
      <div className="cs-content csc-band" data-landmark="cta">
        <p className="type ts-text-lg-light csc-boiler">
          {/* The wordmark is represented as text in the accessibility tree. */}
          <span className="hx-sr">
            keystone powers your website and everything that runs through it: ads social reviews
            content and follow-ups that convert.
          </span>
          <span className="csc-vis" aria-hidden="true">
            <span className="csc-wm" />
            {words("powers your")}
            <Chip id="website">website</Chip>
            {/* Narrow bands break after the website chip. */}
            <i className="csc-br csc-br-a" />
            {words("and everything that runs through it:")}
            {/* Engine chips always begin on a new line. */}
            <i className="csc-br" />
            <Chip id="ads">ads</Chip>
            <Chip id="social">social</Chip>
            <Chip id="reviews">reviews</Chip>
            <Chip id="content">content</Chip>
            {/* Narrow bands break before the final phrase. */}
            <i className="csc-br csc-br-a" />
            <span>and</span>
            <Chip id="follow-ups">follow-ups</Chip>
            {words("that convert.")}
          </span>
        </p>
        {/* The row sets the button size per band. */}
        <div className="csc-ctas csc-cta-row">
          <ButtonFill size="inherit" chrome="gray" shape="pill" href={GET_STARTED_HREF}>
            Get Started
          </ButtonFill>
          <span className="type type-fixed ts-text-md-light csc-q">Got a question?</span>
          <ButtonGhost size="inherit" color="brown" icon={<IconChat />} action="open-chat">
            Talk to us
          </ButtonGhost>
        </div>
      </div>
    </section>
  );
}
