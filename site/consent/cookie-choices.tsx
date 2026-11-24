"use client";

import { CookieConsentModal } from "@keystone-sites/widgets/consent/CookieConsentModal";
import { useState, useSyncExternalStore, type ReactNode } from "react";

type Label = { long: string; short: string };

// Under CCPA the way to opt out must be named as the law names it, at every width.
const LABELS: Record<"gdpr" | "ccpa", Label> = {
  gdpr: { long: "Cookie preferences", short: "Cookies" },
  ccpa: {
    long: "Do Not Sell or Share My Personal Information",
    short: "Do Not Sell or Share My Personal Information",
  },
};

const unsubscribed = () => () => {};

/** The layout's bootstrap script stamps the visitor's regime on <html> before hydration. */
function useRegime(): "gdpr" | "ccpa" {
  return useSyncExternalStore(
    unsubscribed,
    () => (document.documentElement.dataset.consentRegime === "ccpa" ? "ccpa" : "gdpr"),
    () => "gdpr",
  );
}

/** The visitor's way back to their cookie choices: what to call it, and the consent bar it opens. */
export function useCookieChoices(): { label: Label; open: () => void; panel: ReactNode } {
  const label = LABELS[useRegime()];
  const [opened, setOpened] = useState(false);
  return {
    label,
    open: () => setOpened(true),
    panel: opened ? <CookieConsentModal forceOpen onClose={() => setOpened(false)} /> : null,
  };
}
