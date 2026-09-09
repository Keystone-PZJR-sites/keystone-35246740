/** The production stand-in for devtools-mount.tsx, resolved in by the
 * webpack alias in next.config.ts: a server component with no imports,
 * so the live pages' production graphs carry no devtools code and no
 * chunk edge. Props (the dev mount's expectations) are ignored. */
export default function DevtoolsMount() {
  return null;
}
