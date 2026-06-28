// Content shared across the business-type landing pages (spec 050 + 053).
// Each page is authored in its own file (health-wellness.tsx, …) and pulls
// these common pieces in, so the per-page files stay focused on positioning.

import type { IndustryResource } from '@/design-system/patterns/industries';
import { MEDIA } from '@/data/media';

/** Live blog posts that apply across every business type. */
export const SHARED_RESOURCES: IndustryResource[] = [
  {
    title: 'The 3-day conversion window: turn new leads into booked appointments',
    href: '/blog/the-3-day-conversion-window-a-tactical-sequencing-playbook-to-turn-new-leads-into-paid-appointments',
    image: MEDIA.scenes.ownerCall.src,
    alt: 'A business owner taking a call by the window',
  },
  {
    title: 'The local ads waste audit: 8 checks to cut waste and double ROI',
    href: '/blog/the-local-ads-waste-audit-8-exact-checks-to-cut-waste-and-double-booking-roi',
    image: MEDIA.scenes.storefrontStreet.src,
    alt: 'A storefront on a city street',
  },
  {
    title: 'Smart availability: fill your calendar without discounting',
    href: '/blog/smart-availability-how-to-structure-schedules-slots-and-pricing-to-fill-your-calendar-without-discounting',
    image: MEDIA.scenes.counterConsult.src,
    alt: 'Owners reviewing work at a shop counter',
  },
];

/** The standard pricing answer, shared by every business type's FAQ. */
export const PRICING_FAQ_ANSWER =
  'One simple plan at $249/month per location with every tool included — no contracts and no negotiation.';
