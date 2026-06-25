// Full site navigation — shared types (Spec 034).
// Content is prop-driven: the page supplies the nav structure from `@/data`.

/** A single leaf link inside a dropdown content column. Title only — no description. */
export interface NavLeafLink {
  label: string;
  href: string;
  /** Opens in a new tab (e.g. the cross-domain Grader app). */
  external?: boolean;
}

/** A titled group of leaf links inside a dropdown content zone. */
export interface NavCategory {
  heading: string;
  links: NavLeafLink[];
}

/** Promo tiles use Keystone green/orange treatments for rhythm — no new brand colors. */
export type NavPromoTone = 'green' | 'orange';

/** A promo card in a dropdown's right rail. */
export interface NavPromoTile {
  copy: string;
  href: string;
  tone: NavPromoTone;
  /** Opens in a new tab (e.g. the cross-domain Grader app). */
  external?: boolean;
}

/**
 * A direct top-level link (Pricing, How it works). When `scrollToPricing` is
 * set, clicking scrolls to the homepage pricing area instead of navigating —
 * the `href` is the no-JS fallback.
 */
export interface NavDirectItem {
  type: 'link';
  label: string;
  href: string;
  scrollToPricing?: boolean;
}

/**
 * A top-level item that opens a dropdown (Services, Company, Resources).
 * `wide` is the Services mega menu; `compact` is the Company/Resources menu.
 */
export interface NavDropdownItem {
  type: 'dropdown';
  label: string;
  variant: 'wide' | 'compact';
  categories: NavCategory[];
  promos: NavPromoTile[];
}

export type NavItem = NavDirectItem | NavDropdownItem;

export interface HeroNavProps {
  /** Centered top-level navigation, in order. */
  items: NavItem[];
  /** Right-side secondary link. */
  loginLabel: string;
  loginHref: string;
  /** Right-side primary CTA. Behaves like every other "Get in touch" CTA on the site. */
  ctaLabel: string;
  /** Keystone wordmark color. */
  wordmarkColor?: string;
  /** Accessible label for the mobile menu toggle when closed/open. */
  openMenuLabel?: string;
  closeMenuLabel?: string;
}
