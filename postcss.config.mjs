import { fileURLToPath } from "node:url";

/** Tailwind compiles the utilities shipped by `@keystone-sites/widgets`
 * (source scanning is confined in the design system's `widgets.css`). The gates
 * plugin resolves `@container (--rt)` to its width; see grid/gates.cjs.
 * Next requires plugins by name, so the local one is given by absolute path. */
const gates = fileURLToPath(
  new URL("./node_modules/@keystone-sites/marketing-design-system/grid/gates.cjs", import.meta.url),
);

const config = {
  plugins: {
    [gates]: {},
    "@tailwindcss/postcss": {},
  },
};

export default config;
