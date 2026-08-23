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
// GT Standard optical-size masters, from the binary's named instances.
const OPSZ = { S: 10, M: 18, L: 30 };

function parseStyle(family, style) {
  if (family === "PP Kyoto") {
    if (!(style in WEIGHTS)) throw new Error(`unknown Kyoto style: ${style}`);
    return { font: "var(--font-serif)", weight: WEIGHTS[style], opsz: null };
  }
  const [prefix, ...rest] = style.split(" ");
  const weightName = rest.join(" ");
  if (!(prefix in OPSZ) || !(weightName in WEIGHTS)) {
    throw new Error(`unknown GT Standard style: ${style}`);
  }
  return {
    font: "var(--font-sans)",
    weight: WEIGHTS[weightName],
    opsz: OPSZ[prefix],
  };
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
lines.push(`   is text-transform. Kyoto styles have no -opsz. */`);
lines.push(``);
lines.push(`:root {`);

for (const s of styles) {
  const { font, weight, opsz } = parseStyle(s.family, s.style);
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
