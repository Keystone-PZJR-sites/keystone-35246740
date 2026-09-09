import { NextResponse, type NextRequest } from "next/server";
import { applyConsentRegimeCookie } from "@keystone-sites/core/consent/middleware";

/** Consent cookie, plus a permanent alias for the old /gallery bookmarks. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/gallery" || pathname === "/gallery/") {
    const url = request.nextUrl.clone();
    url.pathname = "/our-work/";
    url.searchParams.set("gallery", "1");
    return applyConsentRegimeCookie(request, NextResponse.redirect(url, 308));
  }
  return applyConsentRegimeCookie(request, NextResponse.next());
}
