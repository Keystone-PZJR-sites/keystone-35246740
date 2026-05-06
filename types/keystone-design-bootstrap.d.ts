/**
 * Ambient module declarations for keystone-design-bootstrap subpath exports
 * that use wildcard patterns TypeScript's resolver cannot follow at compile time.
 * The bundler resolves these correctly at runtime.
 */

declare module 'keystone-design-bootstrap/utils/countries' {
  type Country = {
    name: string;
    code: string;
    flag: string;
    phoneCode: string;
    phoneMask: string;
  };
  const countries: Country[];
  export default countries;
}
