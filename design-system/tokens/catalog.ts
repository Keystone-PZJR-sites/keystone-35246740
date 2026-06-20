// ============================================================
// Keystone Design System — Token catalog (data)
// ============================================================
// A typed mirror of the token CSS, consumed by the /styles
// catalog. When a token changes in tokens.css, update its entry
// here in the same commit so the catalog never drifts. Data only —
// no component renders directly from this file.
// ============================================================

export interface ColorToken {
  /** CSS custom property name, without the leading `--`. */
  variable: string;
  /** The value as authored in tokens.css. */
  value: string;
  /** Where the color is used — the role, never the hue. */
  role: string;
}

// ---- Palette families (ramps) ---------------------------------------------
// Ordered light → dark. Every value is a real, in-use token — these strips
// show the brand's color scale, not invented steps.

export interface RampStep extends ColorToken {
  /** Short step label shown under the swatch. */
  step: string;
}

export interface ColorFamily {
  title: string;
  /** True for tokens scoped to [data-theme="custom"]. */
  themeScoped?: boolean;
  steps: RampStep[];
}

export const COLOR_FAMILIES: ColorFamily[] = [
  {
    title: 'Neutral · cream & ink',
    steps: [
      { step: 'White', variable: 'color-surface-card', value: '#ffffff', role: 'Raised card surface' },
      { step: 'Cream', variable: 'color-bg-primary', value: '#f0eee6', role: 'Page surface' },
      { step: 'Cream 2', variable: 'color-bg-secondary', value: '#e8e2d4', role: 'Raised cream' },
      { step: 'Cream 3', variable: 'color-bg-tertiary', value: '#ddd5c4', role: 'Chips, quiet fills' },
      { step: 'Cream 4', variable: 'color-bg-quaternary', value: '#cfc4b0', role: 'Strongest cream' },
      { step: 'Stone', variable: 'color-border-primary', value: '#c7beac', role: 'Default border' },
      { step: 'Stone 2', variable: 'color-text-placeholder', value: '#8f897d', role: 'Placeholder' },
      { step: 'Stone 3', variable: 'color-text-quaternary', value: '#7d776b', role: 'Faint copy' },
      { step: 'Ink 3', variable: 'color-text-tertiary', value: '#4f4d4a', role: 'Muted copy' },
      { step: 'Ink 2', variable: 'color-text-secondary', value: '#1f3a33', role: 'Secondary copy' },
      { step: 'Ink', variable: 'color-text-primary', value: '#042019', role: 'Primary copy' },
    ],
  },
  {
    title: 'Brand · orange',
    steps: [
      { step: 'Tint', variable: 'color-error-bg', value: '#fff1ef', role: 'Lightest brand tint' },
      { step: 'Soft', variable: 'color-work-chip-bg', value: '#ffbb8a', role: 'Category chip' },
      { step: 'Base', variable: 'color-bg-brand-solid', value: '#f57e56', role: 'Primary button, brand fill' },
      { step: 'Hover', variable: 'color-bg-brand-solid_hover', value: '#d75b42', role: 'Primary button hover' },
      { step: 'Deep', variable: 'color-text-brand-secondary', value: '#9f3722', role: 'Brand text, inline links' },
    ],
  },
  {
    title: 'Brand · green & teal',
    themeScoped: true,
    steps: [
      { step: 'Mint', variable: 'color-pricing-price-primary', value: '#9febd7', role: 'Headline price' },
      { step: 'Accent', variable: 'color-hero-accent', value: '#6ecc8b', role: 'Mint accent, inverse button' },
      { step: 'Teal', variable: 'color-pricing-accent', value: '#5bc3b3', role: 'Accents, checks' },
      { step: 'Teal 2', variable: 'color-pricing-tagline', value: '#4fafa0', role: 'Tagline / eyebrow' },
      { step: 'Teal 3', variable: 'color-pricing-price-secondary', value: '#399587', role: 'Secondary price' },
      { step: 'Pine', variable: 'color-pricing-chip-border', value: '#19524e', role: 'Feature chip border' },
      { step: 'Forest', variable: 'color-social-proof-bg', value: '#0d2a28', role: 'Social proof surface' },
      { step: 'Forest 2', variable: 'color-pricing-bg', value: '#0a1f1e', role: 'Pricing surface' },
      { step: 'Ink raised', variable: 'color-hero-surface', value: '#063126', role: 'Raised ink panel' },
      { step: 'Ink', variable: 'color-hero-bg', value: '#042019', role: 'Dark page base' },
    ],
  },
];

// ---- Functional role groups (swatch grids) --------------------------------

export interface ColorGroup {
  title: string;
  themeScoped?: boolean;
  tokens: ColorToken[];
}

export const TEXT_COLORS: ColorGroup = {
  title: 'Text',
  tokens: [
    { variable: 'color-text-primary', value: '#042019', role: 'Primary copy, headlines' },
    { variable: 'color-text-secondary', value: '#1f3a33', role: 'Supporting copy' },
    { variable: 'color-text-tertiary', value: '#4f4d4a', role: 'Muted copy, labels' },
    { variable: 'color-text-quaternary', value: '#7d776b', role: 'Faint copy, metadata' },
    { variable: 'color-text-placeholder', value: '#8f897d', role: 'Input placeholders' },
    { variable: 'color-text-brand-secondary', value: '#9f3722', role: 'Brand text, inline links' },
  ],
};

export const SURFACE_COLORS: ColorGroup = {
  title: 'Surface & background',
  tokens: [
    { variable: 'color-surface-card', value: '#ffffff', role: 'Raised card / panel' },
    { variable: 'color-bg-primary', value: '#f0eee6', role: 'Page surface' },
    { variable: 'color-bg-secondary', value: '#e8e2d4', role: 'Subtle raised cream' },
    { variable: 'color-bg-tertiary', value: '#ddd5c4', role: 'Chips, quiet fills' },
    { variable: 'color-bg-quaternary', value: '#cfc4b0', role: 'Strongest cream fill' },
    { variable: 'color-bg-brand-solid', value: '#f57e56', role: 'Primary button, brand fill' },
  ],
};

export const BORDER_COLORS: ColorGroup = {
  title: 'Border',
  tokens: [
    { variable: 'color-border-primary', value: '#c7beac', role: 'Default control border' },
    { variable: 'color-border-secondary', value: '#d8cfbe', role: 'Quiet divider' },
    { variable: 'color-border-tertiary', value: '#e5dccb', role: 'Card hairline' },
    { variable: 'color-border-brand', value: '#f57e56', role: 'Brand-emphasized border' },
  ],
};

export const FORM_CONTROL_COLORS: ColorGroup = {
  title: 'Form controls & warm neutrals',
  tokens: [
    { variable: 'color-field-bg', value: '#fcfbf8', role: 'Resting input fill' },
    { variable: 'color-field-border', value: '#e9e7dd', role: 'Resting input border / quiet fill' },
    { variable: 'color-control-strong', value: '#cbc5b4', role: 'Hover / active control border' },
    { variable: 'color-control-muted', value: '#e0ddd1', role: 'Focus ring / quiet control fill' },
    { variable: 'color-control-border', value: '#beb8a7', role: 'Checkbox / textarea-focus border' },
    { variable: 'color-control-underline', value: '#d6d2c2', role: 'Quiet link underline' },
    { variable: 'color-text-muted-warm', value: '#989281', role: 'Quiet body copy' },
    { variable: 'color-text-label', value: '#847f71', role: 'Field labels, placeholders' },
    { variable: 'color-text-quiet', value: '#5d5a56', role: 'Quiet control labels' },
    { variable: 'color-text-strong', value: '#3a3836', role: 'Entered input text' },
    { variable: 'color-pill-label-inactive', value: '#f8f7f2', role: 'Inactive pill label' },
    { variable: 'color-form-accent', value: '#66cc86', role: 'Lead-capture CTA / highlight green' },
    { variable: 'color-form-accent-text', value: '#0f2e18', role: 'Copy on the green CTA' },
    { variable: 'color-form-error', value: '#f6523c', role: 'Error border / text / icon' },
    { variable: 'color-form-error-ring', value: '#fba093', role: 'Error focus ring' },
    { variable: 'color-form-error-border', value: '#c27b5a', role: 'Textarea error border' },
    { variable: 'color-form-error-text', value: '#c0392b', role: 'Form-level error message' },
  ],
};

// ---- Semantic status ------------------------------------------------------

export interface StatusColor {
  name: string;
  bg: string;
  border: string;
  text: string;
  solid: string;
}

export const STATUS_COLORS: StatusColor[] = [
  { name: 'success', bg: '#e3f3e8', border: '#b7ddc6', text: '#1f6b46', solid: '#2e9b63' },
  { name: 'warning', bg: '#fdf2e3', border: '#f0d8ab', text: '#8a5a17', solid: '#d68a2e' },
  { name: 'error', bg: '#fff1ef', border: '#f0b3a6', text: '#9f3722', solid: '#d75b42' },
  { name: 'info', bg: '#e7eef0', border: '#c5d4d6', text: '#1f3a33', solid: '#3f6b62' },
];

// ---- Section-scoped palettes ----------------------------------------------

export const SECTION_COLORS: ColorGroup[] = [
  {
    title: 'Hero / ink',
    themeScoped: true,
    tokens: [
      { variable: 'color-hero-bg', value: '#042019', role: 'Dark "ink" page base' },
      { variable: 'color-hero-surface', value: '#063126', role: 'Raised ink panel / card' },
      { variable: 'color-hero-accent', value: '#6ecc8b', role: 'Mint accent, inverse button' },
      { variable: 'color-hero-accent-hover', value: '#5bb978', role: 'Inverse button hover' },
      { variable: 'color-hero-text', value: '#f0eee6', role: 'Copy on ink surfaces' },
      { variable: 'color-bg-mint-solid', value: '#2f8f63', role: 'Flat mint card fill (SpotlightCard)' },
    ],
  },
  {
    title: 'Work showcase',
    themeScoped: true,
    tokens: [
      { variable: 'color-work-accent', value: '#f57e56', role: 'Section accent' },
      { variable: 'color-work-chip-bg', value: '#ffbb8a', role: 'Category chip fill' },
      { variable: 'color-work-muted', value: '#cbc5b4', role: 'Inactive control' },
      { variable: 'color-work-muted-hover', value: '#b1aa9a', role: 'Inactive control hover' },
      { variable: 'color-work-text', value: '#4f4d4a', role: 'Section body copy' },
    ],
  },
  {
    title: 'Pricing',
    themeScoped: true,
    tokens: [
      { variable: 'color-pricing-bg', value: '#0a1f1e', role: 'Pricing surface' },
      { variable: 'color-pricing-tagline', value: '#4fafa0', role: 'Tagline / eyebrow' },
      { variable: 'color-pricing-price-primary', value: '#9febd7', role: 'Headline price' },
      { variable: 'color-pricing-price-secondary', value: '#399587', role: 'Secondary price' },
      { variable: 'color-pricing-accent', value: '#5bc3b3', role: 'Accents, checks' },
      { variable: 'color-pricing-chip-border', value: '#19524e', role: 'Feature chip border' },
      { variable: 'color-pricing-chip-label', value: '#f8f7f2', role: 'Feature chip label' },
      { variable: 'color-pricing-addon-chip-bg', value: '#0d2a28', role: 'Add-on chip background' },
    ],
  },
  {
    title: 'Footer & social proof',
    themeScoped: true,
    tokens: [
      { variable: 'color-footer-bg', value: '#3d1719', role: 'Oversized footer surface' },
      { variable: 'color-footer-legal', value: '#b24934', role: 'Footer legal links' },
      { variable: 'color-footer-error', value: '#e05252', role: 'Footer signup error' },
      { variable: 'color-social-proof-bg', value: '#0d2a28', role: 'Social proof surface' },
    ],
  },
];

// ---- Typography -----------------------------------------------------------

export interface FontToken {
  name: string;
  variable: string;
  stack: string;
  usage: string;
  /** Weights actually loaded for this family. */
  weights: string;
}

export const FONT_TOKENS: FontToken[] = [
  {
    name: 'FK Screamer',
    variable: 'font-display',
    stack: '"FK Screamer", system-ui, sans-serif',
    usage: 'Display headlines',
    weights: 'Bold 700',
  },
  {
    name: 'FK Grotesk Neue',
    variable: 'font-body',
    stack: '"FK Grotesk Neue", system-ui, sans-serif',
    usage: 'Body, UI, navigation',
    weights: 'Regular 400 · Italic',
  },
  {
    name: 'FK Grotesk Mono',
    variable: 'font-mono',
    stack: '"FK Grotesk Mono", ui-monospace, monospace',
    usage: 'Code, token values',
    weights: 'Regular 400',
  },
  {
    name: 'FK Roman Standard',
    variable: 'font-serif',
    stack: '"FK Roman Standard", Georgia, serif',
    usage: 'Editorial accent (available)',
    weights: 'Light 300 · Regular 400 · Oblique',
  },
];

export interface WeightToken {
  /** Display name in the scale. */
  name: string;
  /** Weight token, without leading `--`. */
  variable: string;
  /** Numeric weight value. */
  value: string;
  /** Where the weight is used. */
  usage: string;
  /** A matching font file ships for this weight; if not, FK Grotesk Neue falls
   *  back to its Regular cut (the browser does not synthesize a heavier weight). */
  real: boolean;
}

export const WEIGHT_TOKENS: WeightToken[] = [
  { name: 'Light', variable: 'font-weight-light', value: '300', usage: 'FK Roman editorial accent', real: true },
  { name: 'Regular', variable: 'font-weight-regular', value: '400', usage: 'Body, UI, captions', real: true },
  { name: 'Medium', variable: 'font-weight-medium', value: '500', usage: 'Pills — no cut, falls back to Regular', real: false },
  { name: 'Semibold', variable: 'font-weight-semibold', value: '600', usage: 'Buttons, eyebrows, body headings — no cut, falls back to Regular', real: false },
  { name: 'Bold', variable: 'font-weight-bold', value: '700', usage: 'Nav, display headings — FK Grotesk Neue Bold + FK Screamer', real: true },
];

export interface TypeStep {
  /** Display name in the scale. */
  name: string;
  /** Font-size token, without leading `--`. */
  sizeToken: string;
  /** Authored font-size value. */
  size: string;
  /** Authored line-height. */
  lineHeight: string;
  /** Font CSS var to render the specimen in. */
  fontVar: string;
  /** Maps to this Heading/Text primitive size/variant. */
  primitive: string;
}

export const DISPLAY_SCALE: TypeStep[] = [
  { name: 'Display', sizeToken: 'type-display', size: '6rem', lineHeight: '1.0', fontVar: 'font-display', primitive: 'Heading size="display"' },
  { name: 'Heading XL', sizeToken: 'type-xl', size: '3.75rem', lineHeight: '1.02', fontVar: 'font-display', primitive: 'Heading size="xl"' },
  { name: 'Heading LG', sizeToken: 'type-lg', size: '2.5rem', lineHeight: '1.05', fontVar: 'font-display', primitive: 'Heading size="lg"' },
  { name: 'Heading MD', sizeToken: 'type-md', size: '1.75rem', lineHeight: '1.1', fontVar: 'font-display', primitive: 'Heading size="md"' },
  { name: 'Heading SM', sizeToken: 'type-sm', size: '1.25rem', lineHeight: '1.15', fontVar: 'font-display', primitive: 'Heading size="sm"' },
];

export const TEXT_SCALE: TypeStep[] = [
  { name: 'Lead', sizeToken: 'type-lead', size: '1.25rem', lineHeight: '1.6', fontVar: 'font-body', primitive: 'Text variant="lead"' },
  { name: 'Body LG', sizeToken: 'type-body-lg', size: '1.0625rem', lineHeight: '1.5', fontVar: 'font-body', primitive: 'Text variant="bodyLg"' },
  { name: 'Body', sizeToken: 'type-body', size: '1rem', lineHeight: '1.65', fontVar: 'font-body', primitive: 'Text variant="body"' },
  { name: 'Small', sizeToken: 'type-small', size: '0.875rem', lineHeight: '1.55', fontVar: 'font-body', primitive: 'Text variant="small"' },
  { name: 'Caption', sizeToken: 'type-caption', size: '0.75rem', lineHeight: '1.5', fontVar: 'font-body', primitive: 'Text variant="caption"' },
  { name: 'Eyebrow', sizeToken: 'type-eyebrow', size: '0.8125rem', lineHeight: '1.0', fontVar: 'font-body', primitive: 'Eyebrow' },
];

// ---- Scales ---------------------------------------------------------------

export interface ScaleToken {
  name: string;
  variable: string;
  value: string;
  note?: string;
}

export const SPACING_TOKENS: ScaleToken[] = [
  { name: '1', variable: 'space-1', value: '4px' },
  { name: '2', variable: 'space-2', value: '8px' },
  { name: '3', variable: 'space-3', value: '12px' },
  { name: '4', variable: 'space-4', value: '16px' },
  { name: '5', variable: 'space-5', value: '20px' },
  { name: '6', variable: 'space-6', value: '24px' },
  { name: '8', variable: 'space-8', value: '32px' },
  { name: '10', variable: 'space-10', value: '40px' },
  { name: '12', variable: 'space-12', value: '48px' },
  { name: '16', variable: 'space-16', value: '64px' },
  { name: '20', variable: 'space-20', value: '80px' },
  { name: '24', variable: 'space-24', value: '96px' },
];

export const RADIUS_TOKENS: ScaleToken[] = [
  { name: 'Input', variable: 'radius-input', value: '0.5rem', note: 'Text fields' },
  { name: 'Component', variable: 'radius-component', value: '0.75rem', note: 'Cards, panels' },
  { name: 'Panel', variable: 'radius-panel', value: '2rem', note: 'Large feature panels' },
  { name: 'Interactive', variable: 'radius-interactive', value: '9999px', note: 'Buttons, pills' },
  { name: 'Badge', variable: 'radius-badge', value: '9999px', note: 'Badges' },
];

export const ELEVATION_TOKENS: ScaleToken[] = [
  { name: 'Card', variable: 'shadow-card', value: 'soft drop', note: 'Resting card' },
  { name: 'Card hover', variable: 'shadow-card-hover', value: 'lifted drop', note: 'Interactive card hover' },
];

export interface GradientToken {
  name: string;
  /** CSS custom property name, without the leading `--`. */
  variable: string;
  note: string;
}

export const GRADIENT_TOKENS: GradientToken[] = [
  { name: 'Scrim', variable: 'gradient-scrim', note: 'Text legibility over media' },
  { name: 'Brand', variable: 'gradient-brand', note: 'Orange brand fill' },
  { name: 'Mint', variable: 'gradient-mint', note: 'Green / teal fill' },
  { name: 'Ink', variable: 'gradient-ink', note: 'Dark ink fill' },
  { name: 'Band accent', variable: 'gradient-band-accent', note: 'Deep green CTA band' },
];

export const MOTION_TOKENS: ScaleToken[] = [
  { name: 'Standard ease', variable: 'ease-standard', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  { name: 'Emphasized ease', variable: 'ease-emphasized', value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  { name: 'Fast', variable: 'duration-fast', value: '0.16s' },
  { name: 'Base', variable: 'duration-base', value: '0.24s' },
  { name: 'Slow', variable: 'duration-slow', value: '0.4s' },
];

export const Z_INDEX_TOKENS: ScaleToken[] = [
  { name: 'Base', variable: 'z-base', value: '0', note: 'Document flow' },
  { name: 'Raised', variable: 'z-raised', value: '10', note: 'In-section overlays' },
  { name: 'Sticky', variable: 'z-sticky', value: '20', note: 'In-section pinned UI' },
  { name: 'Nav', variable: 'z-nav', value: '50', note: 'Site navigation' },
  { name: 'Modal', variable: 'z-modal', value: '100', note: 'Modal dialog' },
  { name: 'Portal', variable: 'z-portal', value: '9999', note: 'Above ScrollSmoother' },
];
