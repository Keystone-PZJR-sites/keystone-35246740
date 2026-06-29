// Central "card concept" registry.
// ----------------------------------------------------------------------------
// Feature/benefit cards across the site recur around a small set of concepts
// (website, ads, reviews, the front desk, …). Rather than drawing a flat,
// lifeless icon for each, every concept maps to ONE real visual — a product
// screenshot or a piece of our lifestyle photography — reused everywhere that
// concept appears. This keeps the cards alive and the imagery DRY: change a
// concept's picture here and it updates on every page that uses it.
//
// Each entry is shaped like FeatureItem.image ({ src, alt }), so a card is
// authored as `image: CONCEPT.reviews` instead of `icon: <Star01 />`.

import { MEDIA } from '@/data/media';

export interface ConceptImage {
  src: string;
  alt: string;
}

export const CONCEPT = {
  website: { src: MEDIA.productScreens.web.src, alt: 'The Keystone website manager' },
  social: { src: MEDIA.productScreens.social.src, alt: 'The Keystone social composer and calendar' },
  content: { src: MEDIA.productScreens.content.src, alt: 'The Keystone content and blog tools' },
  ads: { src: MEDIA.productScreens.ads.src, alt: 'The Keystone ad manager' },
  sales: { src: MEDIA.productScreens.sales.src, alt: 'The Keystone sales workspace' },
  frontDesk: { src: MEDIA.productScreens.leads.src, alt: 'The Keystone front-desk inbox' },
  reviews: { src: MEDIA.productScreens.reviews.src, alt: 'The Keystone reviews and reputation dashboard' },
  reporting: { src: MEDIA.businesses.shopOwner.src, alt: 'An owner reviewing results on a laptop' },
  localSearch: { src: MEDIA.scenes.storefrontStreet.src, alt: 'A local storefront on a busy street' },
  retention: { src: MEDIA.scenes.counterConsult.src, alt: 'A returning customer at the counter' },
} satisfies Record<string, ConceptImage>;
