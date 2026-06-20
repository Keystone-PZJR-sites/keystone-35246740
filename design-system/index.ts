// ============================================================
// Keystone Design System — Top-level barrel
// ============================================================
// The single import surface for the brand UI. Pages compose
// from here (or from a specific layer barrel when they want to
// be explicit). Layers build up strictly:
//
//   tokens  →  primitives  →  components  →  sections
//
// Patterns (page-specific component groups like blog and legal)
// are intentionally NOT re-exported here; import them directly
// from '@/design-system/patterns/<name>' so the main surface
// stays focused on reusable parts.
// ============================================================

export * from './primitives';
export * from './components';
export * from './sections';
export * from './providers';
