"use client";

import {
  KS_CONSENT_CHANGED_EVENT,
  getStoredChoice,
  getStoredConsentRegime,
  getStoredGranularChoice,
  resolveConsentGate,
} from "@keystone-sites/core/consent";
import { useEffect } from "react";
import { analytics } from "@/site/analytics";

/** Starts the site's analytics and holds it to the visitor's choice on the consent bar, as they
    change it. */
export function AnalyticsConsent() {
  useEffect(() => {
    analytics.start();
    const follow = () => {
      const gate = resolveConsentGate({
        regime: getStoredConsentRegime(),
        ccpaChoice: getStoredChoice(),
        granular: getStoredGranularChoice(),
      });
      analytics.consent(gate.analyticsAllowed);
    };
    follow();
    window.addEventListener(KS_CONSENT_CHANGED_EVENT, follow);
    return () => window.removeEventListener(KS_CONSENT_CHANGED_EVENT, follow);
  }, []);
  return null;
}
