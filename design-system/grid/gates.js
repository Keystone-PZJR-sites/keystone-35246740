/** The band gates, named once. `@container (--rt)` in any stylesheet becomes
 * `@container (min-width: 665px)` at build time; container queries cannot
 * read custom properties, so this is the one preprocessing step in the
 * cascade. Wired in postcss.config.mjs. Bands: rm 384 · rs 576 · rt 768 ·
 * rd1 960 · rd2 1344; a gate is the midpoint that opens the next band. */

const GATES = {
  rs: "(min-width: 470px)",
  rt: "(min-width: 665px)",
  rd1: "(min-width: 860px)",
  rd2: "(min-width: 1130px)",
  "rt-only": "(min-width: 665px) and (max-width: 859.98px)",
  "below-rd1": "(max-width: 859px)",
};

const plugin = () => ({
  postcssPlugin: "keystone-gates",
  AtRule: {
    container(rule) {
      rule.params = rule.params.replace(/\(--([\w-]+)\)/g, (match, name) => {
        const gate = GATES[name];
        if (!gate) throw rule.error(`Unknown gate ${match}; see design-system/grid/gates.js`);
        return gate;
      });
    },
  },
});
plugin.postcss = true;

module.exports = plugin;
module.exports.GATES = GATES;
