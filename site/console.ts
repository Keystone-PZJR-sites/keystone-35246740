import type { Surface } from "@keystonepzjr/web-product-analytics";
import { analytics } from "@/site/analytics";

// Next inlines a NEXT_PUBLIC_ variable only where it is read by its full literal name.
const origin = process.env.NEXT_PUBLIC_CONSOLE_URL;
if (!origin) throw new Error("NEXT_PUBLIC_CONSOLE_URL is not set.");

declare global {
  interface Window {
    /** The console's move from a composer into Keystone (`HANDOFF_SCRIPT`), once it has loaded. */
    KSHandoff?: {
      launch: (options: { prompt: string; from: HTMLElement | null; url: string }) => void;
    };
  }
}

/** A page of Keystone's console, the app a visitor is sent into. */
export function consoleUrl(path: string): string {
  return new URL(path, origin).toString();
}

/** Where a customer signs in. */
export const LOGIN_URL = consoleUrl("/login");

/** The console's own drawing of the move into it, served by the console so it draws the shell the
    console has now. */
export const HANDOFF_SCRIPT = consoleUrl("/handoff.js");

/** Opens Keystone with a prompt: the guest arrival, which answers whatever was asked. The composer
    it was sent from grows into Keystone on the way, once the console's script is here, and the
    visitor goes in as who they were here, so the console's analytics carry on with them. */
export function launch(prompt: string, from: HTMLElement | null, surface: Surface) {
  analytics.track(
    "message_sent",
    { sender: "person", surface, characters: prompt.length },
    { now: true },
  );
  const url = analytics.carry(consoleUrl(`/guest?prompt=${encodeURIComponent(prompt)}`));
  if (window.KSHandoff) window.KSHandoff.launch({ prompt, from, url });
  else window.location.assign(url);
}
