/** The design page reads its facts from the system's own source files at
 * build time — tokens from `tokens/semantic.css`, type styles from
 * `tokens/type-styles.json`, the rules from `AGENTS.md` — so the page
 * cannot drift from the code it documents. Server-only. */

import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
/** The installed design system; its source files are the catalog's facts. */
const DS = path.join(ROOT, "node_modules/@keystone-sites/marketing-design-system");

export interface TokenRow {
  name: string;
  value: string;
  /** The trailing comment on the declaration, when the source has one. */
  note?: string;
}

export interface TokenGroup {
  id: string;
  title: string;
  rows: TokenRow[];
}

const TOKEN_GROUPS: { id: string; title: string; prefix: RegExp }[] = [
  { id: "bg", title: "Background", prefix: /^--color-bg-/ },
  { id: "text", title: "Text", prefix: /^--color-text-/ },
  { id: "border", title: "Border", prefix: /^--color-border-/ },
  { id: "status", title: "Status", prefix: /^--color-(success|warning|danger)-/ },
  { id: "space", title: "Spacing", prefix: /^--space-/ },
  { id: "radius", title: "Radius", prefix: /^--radius-/ },
  { id: "delays", title: "Entrance delays", prefix: /^--hx-d-/ },
];

const DECLARATION = /^\s*(--[a-z0-9-]+):\s*([^;]+);\s*(?:\/\*\s*(.*?)\s*\*\/)?/;

export async function readTokens(): Promise<TokenGroup[]> {
  const css = await readFile(path.join(DS, "tokens/semantic.css"), "utf8");
  const rows: TokenRow[] = [];
  for (const line of css.split("\n")) {
    const m = DECLARATION.exec(line);
    if (m) rows.push({ name: m[1], value: m[2].trim(), note: m[3] || undefined });
  }
  return TOKEN_GROUPS.map((g) => ({
    id: g.id,
    title: g.title,
    rows: rows.filter((r) => g.prefix.test(r.name)),
  }));
}

export interface TypeStyle {
  name: string;
  /** The `ts-…` class the generator emits for this style. */
  className: string;
  family: string;
  style: string;
  size: number;
  lh: number;
  ls: string;
}

/** Mirrors the design system's scripts/generate-type-css.mjs. */
function typeClass(name: string): string {
  return `ts-${name.toLowerCase().replaceAll("/", "-").replaceAll("+", "-plus")}`;
}

export async function readTypeStyles(): Promise<TypeStyle[]> {
  const raw = await readFile(path.join(DS, "tokens/type-styles.json"), "utf8");
  const json = JSON.parse(raw) as { styles: Omit<TypeStyle, "className">[] };
  return json.styles.map((s) => ({ ...s, className: typeClass(s.name) }));
}

/** The framework's auto-managed block at the end is tooling, not rules. */
const GENERATED_BLOCK = /<!-- BEGIN:nextjs-agent-rules -->[\s\S]*?<!-- END:nextjs-agent-rules -->/g;

export async function readRules(): Promise<string> {
  const md = await readFile(path.join(ROOT, "AGENTS.md"), "utf8");
  return md.replace(GENERATED_BLOCK, "").trimEnd();
}
