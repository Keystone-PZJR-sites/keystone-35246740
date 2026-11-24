// Next inlines a NEXT_PUBLIC_ variable only where it is read by its full literal name.
const origin = process.env.NEXT_PUBLIC_CONSOLE_URL;
if (!origin) throw new Error("NEXT_PUBLIC_CONSOLE_URL is not set.");

/** A page of Keystone's console, the app a visitor is sent into. */
export function consoleUrl(path: string): string {
  return new URL(path, origin).toString();
}

/** Where a customer signs in. */
export const LOGIN_URL = consoleUrl("/login");

/** Opens Keystone with a prompt: the guest arrival, which answers whatever was asked. */
export function launch(prompt: string) {
  window.location.assign(consoleUrl(`/guest?prompt=${encodeURIComponent(prompt)}`));
}
