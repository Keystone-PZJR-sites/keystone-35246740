// /billing — Stripe Customer Portal entry (spec 055).
// A real route (not only next.config redirects) so OpenNext / trailing-slash
// production hosts always resolve and 307 to the portal login URL.

import { NextResponse } from 'next/server';
import { STRIPE_BILLING_PORTAL_URL } from '@/data/pricing-page';

export function GET() {
  return NextResponse.redirect(STRIPE_BILLING_PORTAL_URL, 307);
}
