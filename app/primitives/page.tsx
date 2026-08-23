import { readFileSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { MEDIA_V2 } from "@/design-system/v2/media";
import { ButtonArrow, ButtonFill, ButtonGhost } from "@/design-system/v2/primitives/buttons";
import { GraderInput } from "@/design-system/v2/primitives/grader";
import { Text } from "@/design-system/v2/primitives/text";
import {
  IconApproach,
  IconArrowLeft,
  IconArrowRight,
  IconCaseStudies,
  IconChat,
  IconLoadingCircle,
  IconNavMenu,
  IconNavTrigger,
  IconProjects,
  IconSparkle,
} from "@/design-system/v2/icons";

/** /primitives — the spec 003 §8 QA matrix plus the token catalog.
 * The catalog enumerates the committed token files at render time, so it
 * can never drift from them. */

const TOKENS_DIR = join(process.cwd(), "design-system/v2/tokens");

function tokenNames(file: string, pattern: RegExp): string[] {
  const src = readFileSync(join(TOKENS_DIR, file), "utf8");
  return [...src.matchAll(pattern)].map((m) => m[1]);
}

const FILL_SIZES = ["xl", "lg", "md", "sm"] as const;
const GHOST_SIZES = ["xl", "lg", "md", "sm", "xs"] as const;
const ARROW_SIZES = ["lg", "md", "sm"] as const;

const GHOST_COLORS = [
  { color: "brown", label: "Our work", icon: <IconProjects /> },
  { color: "teal", label: "Our approach", icon: <IconApproach /> },
  { color: "gray", label: "Case studies", icon: <IconCaseStudies /> },
] as const;

export default function PrimitivesPage() {
  const colorPrimitives = tokenNames("primitives.css", /--(color-[\w-]+):/g);
  const colorSemantics = tokenNames("semantic.css", /--(color-[\w-]+):/g);
  const spacing = tokenNames("semantic.css", /--(space-[\w-]+):/g);
  const radii = tokenNames("semantic.css", /--(radius-[\w-]+):/g);
  const typeStyles = tokenNames("type.css", /--ts-([\w-]+)-font:/g);

  return (
    <main className="pv-page">
      <section className="pv-section">
        <h2>button-fill</h2>
        {(["pill", "box"] as const).map((shape) =>
          (["teal", "gray"] as const).map((chrome) => (
            <div key={`${shape}-${chrome}`}>
              <h3>
                {shape} · {chrome}
              </h3>
              <div className="pv-row">
                {FILL_SIZES.map((size) => (
                  <div key={size} className="pv-cell">
                    <span>{size}</span>
                    <ButtonFill size={size} chrome={chrome} shape={shape}>
                      Get Started
                    </ButtonFill>
                    <ButtonFill size={size} chrome={chrome} shape={shape} forceState="hover">
                      Get Started
                    </ButtonFill>
                    <ButtonFill size={size} chrome={chrome} shape={shape} forceState="focus">
                      Get Started
                    </ButtonFill>
                  </div>
                ))}
              </div>
            </div>
          )),
        )}
      </section>

      <section className="pv-section">
        <h2>button-ghost</h2>
        {GHOST_COLORS.map(({ color, label, icon }) => (
          <div key={color}>
            <h3>{color}</h3>
            <div className="pv-row">
              {GHOST_SIZES.map((size) => (
                <div key={size} className="pv-cell">
                  <span>{size}</span>
                  <ButtonGhost size={size} color={color} icon={icon}>
                    {label}
                  </ButtonGhost>
                  <ButtonGhost size={size} color={color} icon={icon} forceState="hover">
                    {label}
                  </ButtonGhost>
                  <ButtonGhost size={size} color={color} icon={icon} forceState="focus">
                    {label}
                  </ButtonGhost>
                  {color === "gray" && (
                    <ButtonGhost size={size} color={color} icon={icon} disabled>
                      {label}
                    </ButtonGhost>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="pv-section">
        <h2>button-arrow</h2>
        {(["teal", "gray"] as const).map((chrome) => (
          <div key={chrome}>
            <h3>{chrome}</h3>
            <div className="pv-row">
              {ARROW_SIZES.map((size) => (
                <div key={size} className="pv-cell">
                  <span>{size}</span>
                  <div className="pv-row">
                    <ButtonArrow size={size} chrome={chrome} label="Submit" />
                    <ButtonArrow size={size} chrome={chrome} label="Submit" forceState="hover" />
                    <ButtonArrow size={size} chrome={chrome} label="Submit" disabled />
                    <ButtonArrow size={size} chrome={chrome} label="Submit" loading />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="pv-section">
        <h2>grader-input</h2>
        {(["lg", "md", "sm"] as const).map((size) => (
          <div key={size} className="pv-grader-grid">
            <h3>{size}</h3>
            <GraderInput size={size} />
            <GraderInput size={size} forceState="hover" />
            <GraderInput size={size} forceState="focus" />
            <GraderInput size={size} forceState="active" defaultValue="yourbusiness.com" />
            <GraderInput size={size} defaultValue="yourbusiness.com" />
            <GraderInput size={size} defaultValue="yourbusiness.com" error="Error message here." />
            <GraderInput size={size} defaultValue="yourbusiness.com" loading />
          </div>
        ))}
      </section>

      <section className="pv-section">
        <h2>icons</h2>
        <div className="pv-icons">
          <IconProjects />
          <IconApproach />
          <IconCaseStudies />
          <IconChat />
          <IconSparkle />
          <IconArrowLeft />
          <IconArrowRight />
          <IconNavTrigger variant="chevron" />
          <IconNavTrigger variant="arrow" />
          <IconNavTrigger variant="hover" />
          <IconNavMenu />
          <IconNavMenu open />
          <IconLoadingCircle />
        </div>
      </section>

      <section className="pv-section">
        <h2>brand marks</h2>
        <div className="pv-icons">
          {Object.entries(MEDIA_V2.brand).map(([key, asset]) => (
            <Image key={key} src={asset.src} width={asset.width} height={asset.height} alt={asset.alt} unoptimized />
          ))}
        </div>
      </section>

      <section className="pv-section">
        <h2>color tokens</h2>
        <h3>semantic</h3>
        <div className="pv-swatches">
          {colorSemantics.map((name) => (
            <div key={name} className="pv-swatch" style={{ "--_c": `var(--${name})` } as React.CSSProperties}>
              <i />
              {name}
            </div>
          ))}
        </div>
        <h3>primitives</h3>
        <div className="pv-swatches">
          {colorPrimitives.map((name) => (
            <div key={name} className="pv-swatch" style={{ "--_c": `var(--${name})` } as React.CSSProperties}>
              <i />
              {name}
            </div>
          ))}
        </div>
      </section>

      <section className="pv-section">
        <h2>spacing</h2>
        <div className="pv-space-list">
          {spacing.map((name) => (
            <div key={name} className="pv-space" style={{ "--_w": `var(--${name})` } as React.CSSProperties}>
              <i />
              {name}
            </div>
          ))}
        </div>
      </section>

      <section className="pv-section">
        <h2>radii</h2>
        <div className="pv-radius-list">
          {radii.map((name) => (
            <div key={name} className="pv-radius" style={{ "--_r": `var(--${name})` } as React.CSSProperties}>
              <i />
              {name}
            </div>
          ))}
        </div>
      </section>

      <section className="pv-section">
        <h2>type styles</h2>
        <div className="pv-type-list">
          {typeStyles.map((name) => (
            <div key={name} className="pv-type">
              <code>{name}</code>
              <Text style={name} as="span">
                Great businesses deserve to be found.
              </Text>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
