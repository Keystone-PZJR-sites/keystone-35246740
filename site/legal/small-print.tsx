"use client";

import { useCookieChoices } from "@/site/consent/cookie-choices";
import { LEGAL_DOCUMENTS } from "./documents";

/** The foot's links: each legal document, then the visitor's cookie choices. */
export function SmallPrint() {
  const cookies = useCookieChoices();
  return (
    <>
      {Object.values(LEGAL_DOCUMENTS).map((document) => (
        <a key={document.href} href={document.href}>
          {document.title}
        </a>
      ))}
      <button type="button" onClick={cookies.open}>
        {cookies.label.long}
      </button>
      {cookies.panel}
    </>
  );
}
