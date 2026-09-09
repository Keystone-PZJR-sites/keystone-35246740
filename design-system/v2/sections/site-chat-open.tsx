"use client";

/** v2 sections — the site chat's activation hook.
 *
 * Every "Talk to us" ghost button on the site carries
 * `data-action="open-chat"` (ButtonGhost's `action` prop — the hero's
 * hook, mirrored by the FAQ, pricing, work-header, and case-study
 * CTAs). This island wires that contract: one delegated document click
 * listener (the gallery's `open-gallery` pattern) that activates the
 * widget by pressing its own prompt pill — exactly what a visitor
 * tapping the pill does — so everything after the tap is the widget's
 * standard behaviour: the suggestion chips for a visitor without a
 * conversation, the thread itself for a returning one (its
 * auto-advance), history warming, tracking.
 *
 * The widget exposes no imperative open; the pill's "Open chat" control
 * is its documented, accessible surface (`aria-label`). When the pill is
 * not on screen — the sheet is already open, or the widget did not mount
 * — the click is a no-op. Rendered only alongside the widget (SiteChat),
 * so a site without chat has no listener at all.
 */

import { useEffect } from "react";

/** The trigger contract (ButtonGhost `action="open-chat"`). */
const TRIGGER_SELECTOR = '[data-action="open-chat"]';
/** The widget's prompt-pill control: `ChatPrompt` labels both the pill
 * and its arrow "Open chat" while minimized (@keystone-sites/widgets). */
const PILL_SELECTOR = '.ks-chat-panel button[aria-label="Open chat"]';

export function SiteChatOpen() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const trigger = target?.closest<HTMLElement>(TRIGGER_SELECTOR);
      if (!trigger) return;
      const pill = document.querySelector<HTMLButtonElement>(PILL_SELECTOR);
      if (!pill) return;
      e.preventDefault();
      pill.click();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
