# Figma MCP — Workflow & Best Practices

This project uses the Figma Desktop MCP server for design-to-code. These are the conventions to follow.

---

## Setup

The Figma Desktop MCP server runs at `http://127.0.0.1:3845/mcp`. It must be active in the Figma desktop app (Dev Mode → MCP panel → Enable) before any design context calls will work.

Cursor config (already set up):
```json
{
  "mcpServers": {
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

---

## Required workflow for every Figma-driven change

1. **`get_design_context`** — fetch the structured React + Tailwind representation for the target node(s). Pass `clientLanguages: "typescript,css"` and `clientFrameworks: "react,nextjs,tailwindcss"`.
2. **`get_screenshot`** — capture a visual reference for the same node. Always do this; it catches layout details the code output can miss.
3. **`get_metadata`** — use this first if a selection is large or `get_design_context` times out. Get the node map, then re-fetch only the needed sub-nodes.
4. **Implement** — translate the output into this project's conventions (see Implementation rules below).
5. **Validate** — compare the rendered output against the Figma screenshot before marking complete.

---

## Asset handling

The Figma Desktop MCP server serves image and SVG assets from its local endpoint at `http://localhost:3845/assets/{hash}.svg` (or `.png`).

**Use localhost asset URLs directly in code.** Do not download them to `public/`, do not substitute icon packages, do not create placeholders.

```tsx
// correct
<img src="http://localhost:3845/assets/f3804eb48fd93d4cf42f81831549b62ea1800a53.svg" alt="" />

// wrong — don't download and re-host
<img src="/images/ks-logo-nav.svg" alt="" />
```

The localhost server is running whenever Figma Desktop is open. For production builds, assets must be replaced with hosted URLs — but keep localhost URLs in place during development.

**Videos** (`/_videos/v1/{hash}`) are a separate streaming endpoint and are not accessible the same way. Video `src` values must be replaced with real hosted files before deployment.

---

## Image source mode

In the Figma desktop app MCP panel, keep **Image source** set to **Local server** unless you need to bulk-export assets to disk.

The "Download" mode requires a `path` argument that must be configured at the MCP server level — it is not a tool argument and cannot be passed per-call. When it works, downloaded assets land in the configured output directory with file paths substituted in the generated code.

---

## Implementation rules

- Treat `get_design_context` output (React + Tailwind) as a representation of design intent, not final code. Adapt it to this project's conventions.
- Replace Tailwind arbitrary values with CSS tokens from `[data-theme="custom"]` in `custom-overrides.css` where applicable.
- Reuse existing elements and section components instead of duplicating structure.
- Never hardcode content strings in component files — content comes from props passed in `app/page.tsx`.
- Validate the final rendered output against the Figma screenshot for visual parity.

---

## Prompting tips

Be explicit about node IDs from the spec — don't rely on "current selection." Pass `nodeId` directly.

For large sections, break them into sub-nodes:
- Get the section frame for overall layout
- Get individual sub-nodes for fine detail (chip styles, text styles, specific card layouts)

Useful prompt patterns:
- "Get design context for node `915:2680` and implement as `TouchpointSection`"
- "Get screenshot of `950:877` for visual reference"
- "Get variable definitions from node `915:2616` to confirm color tokens"

---

## Rate limits

- Starter plan / View seats: 6 tool calls per month
- Dev or Full seat on Professional/Organization/Enterprise: per-minute limits (same as Figma REST API Tier 1)

Use `get_metadata` first on large nodes to avoid wasting calls on oversized responses.
