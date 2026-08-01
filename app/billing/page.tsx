// /billing — Stripe Customer Portal entry (spec 055).
// Server page redirect (not a route-handler + next.config pair) so
// trailingSlash hosts don't loop /billing ↔ /billing/.

import { redirect } from 'next/navigation';
import { STRIPE_BILLING_PORTAL_URL } from '@/data/pricing-page';

export default function BillingPage() {
  redirect(STRIPE_BILLING_PORTAL_URL);
}
