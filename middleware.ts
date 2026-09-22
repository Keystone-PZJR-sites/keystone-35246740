import { NextResponse, type NextRequest } from "next/server";
import { applyConsentRegimeCookie } from "@keystone-sites/core/consent/middleware";

/** Stamps the consent-regime cookie on every response. Redirects live in
 * `next.config.ts` and run before this. Stays on the `middleware` convention
 * (edge runtime): OpenNext cannot yet bundle a Node-runtime `proxy.ts` when
 * `@opentelemetry/api` is installed, which `@keystone-sites/services` pulls in. */
export function middleware(request: NextRequest) {
  return applyConsentRegimeCookie(request, NextResponse.next());
}
