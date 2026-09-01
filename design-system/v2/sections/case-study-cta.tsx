/** v2 sections — case-study-cta (spec 017 §3.9). Server component,
 * born settled. The boilerplate band: a top-hairline band carrying
 * the hero's chip-flow boilerplate (spec 006 §3 — the same words,
 * chips, and inks; the wordmark vector; the band's subhead style
 * bound in CSS per the §9 F7 homepage precedent) over the CTA row:
 * the gray ButtonFill Get Started → /pricing (the 014 decision), the
 * material "Got a question?" label (dropped at rm), and the brown
 * ButtonGhost inert on the standing open-chat contract.
 *
 * The accessible copy is the visually-hidden sentence pair (the 006
 * §8 treatment); the visual chip flow is aria-hidden. The drawn line
 * structure (4 lines at rm/rs, 2 at rt+) renders as forced flex
 * breaks — the 012 built-explicit precedent. */

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

function CtaRow({ size }: { size: "md" | "lg" | "xl" }) {
  return (
    <span className={`csc-cta-row csc-cta-${size}`}>
      <ButtonFill size={size} chrome="gray" shape="pill" href={GET_STARTED_HREF}>
        Get Started
      </ButtonFill>
      <span className="csc-q">Got a question?</span>
      <ButtonGhost size={size} color="brown" icon={<IconChat />} action="open-chat">
        Talk to us
      </ButtonGhost>
    </span>
  );
}

export function CaseStudyCtaSection() {
  return (
    <section className="sec cs-sec csc-sec">
      <CaseStudyLattice section="cta" />
      <div className="cs-content csc-band" data-landmark="cta">
        <p className="csc-boiler">
          {/* the sentence pair for the accessibility tree, "keystone"
              included as text (the 006 §8 treatment) */}
          <span className="hx-sr">
            keystone powers your website and everything that runs through
            it: ads social reviews content and follow-ups that convert.
          </span>
          <span className="csc-vis" aria-hidden="true">
            <span className="csc-wm" />
            {words("powers your")}
            <Chip id="website">website</Chip>
            {/* rm/rs: the drawn break after the website chip */}
            <i className="csc-br csc-br-a" />
            {words("and everything that runs through it:")}
            {/* the drawn break before the engine chips at every band */}
            <i className="csc-br" />
            <Chip id="ads">ads</Chip>
            <Chip id="social">social</Chip>
            <Chip id="reviews">reviews</Chip>
            <Chip id="content">content</Chip>
            {/* rm/rs: the drawn break before "and follow-ups" */}
            <i className="csc-br csc-br-a" />
            <span>and</span>
            <Chip id="follow-ups">follow-ups</Chip>
            {words("that convert.")}
          </span>
        </p>
        {/* per-band button sizes (md rm/rs · lg rt/rd1 · xl rd2 — the
            drawn mounts, §9), band-gated rows (the 014 pattern) */}
        <div className="csc-ctas">
          <CtaRow size="md" />
          <CtaRow size="lg" />
          <CtaRow size="xl" />
        </div>
      </div>
    </section>
  );
}
