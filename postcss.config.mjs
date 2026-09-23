import { fileURLToPath } from "node:url";

/** Tailwind compiles the utilities shipped by `@keystone-sites/widgets`
 * (source scanning is confined in `design-system/widgets.css`). The gates
 * plugin resolves `@container (--rt)` to its width; see grid/gates.js.
 * Next requires plugins by name, so the local one is given by absolute path. */
const gates = fileURLToPath(new URL("./design-system/grid/gates.js", import.meta.url));

const config = {
  plugins: {
    [gates]: {},
    "@tailwindcss/postcss": {},
  },
};

export default config;
