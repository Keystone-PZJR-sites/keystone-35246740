// ============================================================
// Keystone Design System — Components barrel
// ============================================================
// Composite, reusable UI assembled from primitives: site
// navigation, footer, lead-capture modal. Site chrome shared
// across many pages lives here.
// ============================================================

export { HeroNav } from './site-nav';
export {
  SITE_NAV_ITEMS,
  SITE_NAV_LOGIN_LABEL,
  SITE_NAV_LOGIN_HREF,
  SITE_NAV_CTA_LABEL,
} from './site-nav';
export type {
  HeroNavProps,
  NavItem,
  NavDirectItem,
  NavDropdownItem,
  NavCategory,
  NavLeafLink,
  NavPromoTile,
  NavPromoTone,
} from './site-nav';

export { OversizedFooter } from './footer/OversizedFooter';
export type { OversizedFooterProps } from './footer/OversizedFooter';
export { MobileFooter } from './footer/MobileFooter';
export type { MobileFooterProps } from './footer/MobileFooter';
export { FOOTER_COPY, FOOTER_VIDEOS_DESKTOP, FOOTER_VIDEOS_MOBILE } from './footer/footer-content';

export { LeadCaptureProvider, LeadCaptureStandalone, useLeadCapture } from './LeadCaptureModal';
export { LEAD_CAPTURE_COPY } from './lead-capture-content';
export type {
  LeadCaptureCloseReason,
  LeadCaptureProviderProps,
  LeadCaptureStandaloneProps,
} from './LeadCaptureModal';

export { InnerPageShell } from './InnerPageShell';
export type { InnerPageShellProps } from './InnerPageShell';

export { CtaModalButton } from './CtaModalButton';
export type { CtaModalButtonProps } from './CtaModalButton';

export { SpotlightCard } from './SpotlightCard';
export type { SpotlightCardProps, SpotlightBackground } from './SpotlightCard';
export { CardGrid, CardGridItem } from './CardGrid';
export type { CardGridProps, CardGridItemProps } from './CardGrid';
export { Marquee } from './Marquee';
export type { MarqueeProps } from './Marquee';

export { HeroBusinessSearch } from './HeroBusinessSearch';
export type { HeroBusinessSearchProps } from './HeroBusinessSearch';
