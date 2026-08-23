import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties } from "react";
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

interface TypeMeta {
  name: string;
  weight?: string;
  size?: string;
  lh?: string;
  family?: string;
  ls?: string;
  opsz?: string;
}

function typeCatalog(): TypeMeta[] {
  const src = readFileSync(join(TOKENS_DIR, "type.css"), "utf8");
  const byName = new Map<string, TypeMeta>();
  for (const m of src.matchAll(/--ts-([\w-]+)-(font|ls|opsz):\s*([^;]+);/g)) {
    const [, name, key, raw] = m;
    const entry = byName.get(name) ?? { name };
    if (key === "font") {
      const font = raw.trim().match(/^(\d+)\s+(\d+)px\/(\d+)px\s+var\(--font-(\w+)\)$/);
      if (font) {
        entry.weight = font[1];
        entry.size = font[2];
        entry.lh = font[3];
        entry.family = font[4];
      }
    } else if (key === "ls") {
      entry.ls = raw.trim();
    } else {
      entry.opsz = raw.trim();
    }
    byName.set(name, entry);
  }
  return [...byName.values()];
}

function showsTypeMeta(name: string): boolean {
  return name.startsWith("display-sans-") || name.startsWith("text-");
}

interface ColorSwatch {
  name: string;
  step: string;
}

interface ColorScale {
  family: string;
  steps: ColorSwatch[];
}

const STATUS_FAMILIES = new Set(["success", "warning", "danger"]);

function parseColorToken(name: string): { family: string; step: string } | null {
  const m = name.match(/^color-(.+)-([0-9]+|[a-z]+)$/);
  return m ? { family: m[1], step: m[2] } : null;
}

function colorScales(names: string[]): ColorScale[] {
  const order: string[] = [];
  const byFamily = new Map<string, ColorSwatch[]>();
  for (const name of names) {
    const parsed = parseColorToken(name);
    if (!parsed || STATUS_FAMILIES.has(parsed.family)) continue;
    if (!byFamily.has(parsed.family)) {
      order.push(parsed.family);
      byFamily.set(parsed.family, []);
    }
    byFamily.get(parsed.family)!.push({ name, step: parsed.step });
  }
  return order.map((family) => ({ family, steps: byFamily.get(family)! }));
}

function stepColumns(scales: ColorScale[]): string[] {
  const seen = new Set<string>();
  const cols: string[] = [];
  for (const scale of scales) {
    for (const { step } of scale.steps) {
      if (seen.has(step)) continue;
      seen.add(step);
      cols.push(step);
    }
  }
  return cols.sort((a, b) => {
    const na = Number(a);
    const nb = Number(b);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
    return a.localeCompare(b);
  });
}

function ScaleRows({ scales }: { scales: ColorScale[] }) {
  const cols = stepColumns(scales);
  return (
    <div className="pv-scales" style={{ "--_cols": cols.length } as CSSProperties}>
      <div className="pv-scale pv-scale-head" aria-hidden="true">
        <span />
        {cols.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
      {scales.map((scale) => {
        const byStep = new Map(scale.steps.map((s) => [s.step, s]));
        return (
          <div key={scale.family} className="pv-scale">
            <span className="pv-scale-name">{scale.family}</span>
            {cols.map((step) => {
              const swatch = byStep.get(step);
              if (!swatch) return <span key={step} className="pv-swatch-empty" />;
              return (
                <div
                  key={step}
                  className="pv-swatch"
                  title={swatch.name}
                  style={{ "--_c": `var(--${swatch.name})` } as CSSProperties}
                >
                  <i />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
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
  const colorPrimitives = colorScales(tokenNames("primitives.css", /--(color-[\w-]+):/g));
  const colorSemantics = colorScales(tokenNames("semantic.css", /--(color-[\w-]+):/g));
  const spacing = tokenNames("semantic.css", /--(space-[\w-]+):/g);
  const radii = tokenNames("semantic.css", /--(radius-[\w-]+):/g);
  const typeStyles = typeCatalog();

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
        <ScaleRows scales={colorSemantics.filter((s) => !s.family.startsWith("alpha-"))} />
        <h4>alpha</h4>
        <ScaleRows scales={colorSemantics.filter((s) => s.family.startsWith("alpha-"))} />
        <h3>primitives</h3>
        <ScaleRows scales={colorPrimitives.filter((s) => s.family === "base")} />
        <ScaleRows
          scales={colorPrimitives.filter((s) => s.family === "lightgray" || s.family === "darkgray")}
        />
        <ScaleRows
          scales={colorPrimitives.filter(
            (s) => s.family !== "base" && s.family !== "lightgray" && s.family !== "darkgray",
          )}
        />
      </section>

      <section className="pv-section">
        <h2>spacing</h2>
        <div className="pv-space-list">
          {spacing.map((name) => (
            <div key={name} className="pv-space" style={{ "--_w": `var(--${name})` } as CSSProperties}>
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
            <div key={name} className="pv-radius" style={{ "--_r": `var(--${name})` } as CSSProperties}>
              <i />
              {name}
            </div>
          ))}
        </div>
      </section>

      <section className="pv-section">
        <h2>type styles</h2>
        <div className="pv-type-list">
          {typeStyles.map((style) => (
            <div key={style.name} className="pv-type">
              <div className="pv-type-meta">
                <code>{style.name}</code>
                {showsTypeMeta(style.name) && (
                  <span>
                    {style.weight} {style.size}/{style.lh} · ls {style.ls}
                    {style.opsz ? ` · opsz ${style.opsz}` : ""}
                  </span>
                )}
              </div>
              <Text style={style.name} as="span">
                Great businesses deserve to be found.
              </Text>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
