/** PostCSS — present for one reason: `@keystone-sites/widgets` ships its
 * chat widget as Tailwind v4 utility classes with no compiled CSS, so the
 * host compiles them (the package's documented prerequisite). The
 * compiler is confined to `design-system/v2/widgets.css` (spec 024): it
 * scans only the package's source and emits only that stylesheet's
 * layers. The site's own CSS is untouched hand-authored v2 layers. */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
