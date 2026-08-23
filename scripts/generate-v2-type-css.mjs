// Generates design-system/v2/tokens/type.css from type-styles.json.
// Run after every re-extraction of the Figma text styles:
//   node scripts/generate-v2-type-css.mjs
// Deterministic: same JSON in, same CSS out (the acceptance diff relies
// on this — see docs/rebuild/specs/001_foundations.md).

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "design-system/v2/tokens/type-styles.json");
const out = join(root, "design-system/v2/tokens/type.css");

const { styles, extracted } = JSON.parse(readFileSync(src, "utf8"));

const WEIGHTS = {
  Thin: 100,
  Extralight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  Semibold: 600,
};

// GT Standard is a variable font. CSS sets wght and opsz independently;
// Figma's L/M/S named instances are ignored for opsz. Pins decided
// 2026-08-23 (design), not read from the Figma instance prefix.
const TEXT_OPSZ = {
  "3xs": 24,
  "2xs": 24,
  xs: 24,
  "nav-label": 24,
  sm: 26,
  md: 26,
  lg: 26,
  xl: 26,
  "2xl": 26,
};
const DISPLAY_SANS_OPSZ = {
  "2xs": 28,
};

function weightName(style) {
  const [head, ...rest] = style.split(" ");
  if (head === "S" || head === "M" || head === "L") return rest.join(" ");
  return style;
}

function gtOpsz(name) {
  const [family, step] = name.split("/");
  if (family === "text") {
    if (!(step in TEXT_OPSZ)) throw new Error(`unknown text step: ${name}`);
    return TEXT_OPSZ[step];
  }
  if (family === "display-sans") {
    return DISPLAY_SANS_OPSZ[step] ?? 30;
  }
  throw new Error(`unknown GT style: ${name}`);
}

function parseStyle(s) {
  const weight = WEIGHTS[weightName(s.style)];
  if (!weight) throw new Error(`unknown weight in ${s.name}: ${s.style}`);
  if (s.family === "PP Kyoto") {
    return { font: "var(--font-serif)", weight, opsz: null };
  }
  if (s.family !== "GT Standard Standard VF") {
    throw new Error(`unknown family: ${s.family}`);
  }
  return { font: "var(--font-sans)", weight, opsz: gtOpsz(s.name) };
}

function varBase(name) {
  return `--ts-${name.toLowerCase().replaceAll("/", "-").replaceAll("+", "-plus")}`;
}

function em(percent) {
  const n = parseFloat(percent) / 100;
  return n === 0 ? "0em" : `${Number(n.toFixed(4))}em`;
}

const lines = [];
lines.push(`/* v2 tokens — type styles. GENERATED FILE, do not edit.`);
lines.push(`   Source: type-styles.json (Figma text styles, extracted ${extracted}).`);
lines.push(`   Regenerate: node scripts/generate-v2-type-css.mjs`);
lines.push(``);
lines.push(`   Per style: -font is a CSS font shorthand (weight size/lh family);`);
lines.push(`   -ls is letter-spacing; -opsz is the pinned GT Standard optical`);
lines.push(`   size (consume as font-variation-settings: "opsz" var(...) with`);
lines.push(`   font-optical-sizing: none); -ps is Figma paragraph spacing; -case`);
lines.push(`   is text-transform. Kyoto styles have no -opsz.`);
lines.push(``);
lines.push(`   opsz is set on the variable font directly (not via Figma L/M/S`);
lines.push(`   named instances): text 3xs/2xs/xs/nav-label = 24; text sm–2xl`);
lines.push(`   = 26; display-sans 2xs = 28; display-sans xs and up = 30. */`);
lines.push(``);
lines.push(`:root {`);

for (const s of styles) {
  const { font, weight, opsz } = parseStyle(s);
  const b = varBase(s.name);
  lines.push(`  ${b}-font: ${weight} ${s.size}px/${s.lh}px ${font};`);
  lines.push(`  ${b}-ls: ${em(s.ls)};`);
  if (opsz !== null) lines.push(`  ${b}-opsz: ${opsz};`);
  if (s.ps) lines.push(`  ${b}-ps: ${s.ps}px;`);
  if (s.case === "UPPER") lines.push(`  ${b}-case: uppercase;`);
}

lines.push(`}`);
lines.push(``);

writeFileSync(out, lines.join("\n"));
console.log(`wrote ${out} (${styles.length} styles)`);
