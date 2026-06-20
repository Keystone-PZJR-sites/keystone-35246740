/**
 * Render Markdown source as a short plain-text preview. This is a
 * deliberately small, dependency-free reduction for card summaries —
 * not a full Markdown renderer. Strips the common inline/block syntax
 * and collapses whitespace, optionally truncating with an ellipsis.
 */
/**
 * Coerce a value that is typed as a string but may arrive from the API
 * as something else (e.g. an object) into a safe, renderable string.
 * Returns null for anything that is not a non-empty string so callers
 * can skip rendering rather than crash on `[object Object]`.
 */
export function asText(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

export function plainText(markdown: string | null | undefined, max?: number): string {
  if (!markdown) return '';
  const plain = markdown
    .replace(/!\[(.*?)\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`{1,3}([^`]*)`{1,3}/g, '$1')
    .replace(/^[#>\s-]+/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (max && plain.length > max) return `${plain.slice(0, max - 1).trimEnd()}…`;
  return plain;
}
