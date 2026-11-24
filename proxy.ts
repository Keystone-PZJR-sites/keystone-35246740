import { NextResponse, type NextRequest } from "next/server";
import {
  applyConsentRegimeCookie,
  gscVerificationResponse,
} from "@keystone-sites/core/consent/middleware";

/** Stamps the consent-regime cookie on every response. */
export function proxy(request: NextRequest) {
  const verification = gscVerificationResponse(request);
  if (verification) return verification;
  return applyConsentRegimeCookie(request, NextResponse.next());
}
