"use client";

import { useEffect } from "react";

const TRIGGER_SELECTOR = '[data-action="open-chat"]';
/** The widget exposes no imperative open API, so activate its accessible control. */
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
