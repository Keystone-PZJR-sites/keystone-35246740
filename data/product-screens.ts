import type { ProductScreensTool } from '@/design-system';
import { MEDIA } from './media';

/*
 * Product Screens — per-tool content.
 *
 * Desktop values verified against Figma node `1087:2360` (file `XRbD11WIevI5szRFiRrguZ`).
 * Mobile values verified against node `1255:1117` (the Leads mobile variant).
 * Per spec 024, the other six tools share the mobile layout with per-tool data overrides.
 *
 * Each tool now has a single screenshot layer — the Figma design was updated to
 * remove all back-layer compositing. screenshotLayers is kept as an array for
 * forward compatibility but always contains exactly one entry.
 */
export const PRODUCT_SCREENS_TOOLS: ProductScreensTool[] = [
  {
    id: 'web',
    label: 'Web',
    cardBg: '#042019',
    copyAccent: '#6ecc8b',
    pillFill: '#65cf78',
    inactiveBorder: '#0a4d3c',
    squareColor: '#65cf78',
    copyText:
      'A fast, conversion-optimized site built to your brand and kept current without you lifting a finger.',
    markColor: '#267D54',
    screenshotLayers: [MEDIA.productScreens.web.src],
    mobileDecoColor: '#031611',
    mobileDecoOpacity: 0.8,
  },
  {
    id: 'leads',
    label: 'Leads',
    cardBg: '#3a2a0e',
    copyAccent: '#f2ba46',
    pillFill: '#f1c131',
    inactiveBorder: '#594117',
    squareColor: '#f1c131',
    copyText:
      'Every inbound lead gets a reply in minutes — 24/7 — so warm interest never goes cold.',
    markColor: '#E0A733',
    screenshotLayers: [MEDIA.productScreens.leads.src],
    mobileCopyText:
      'A team of experts running your marketing while you run your business.',
    mobileInactiveBorder: '#513b2a',
    mobileDecoColor: '#2f2218',
    mobileDecoOpacity: 0.8,
  },
  {
    id: 'ads',
    label: 'Ads',
    cardBg: '#3c1618',
    copyAccent: '#f57e56',
    pillFill: '#f57e56',
    inactiveBorder: '#652528',
    squareColor: '#f57e56',
    copyText:
      'Meta campaigns that target the right customers, in your market, with the right offer at the right moment.',
    markColor: '#9F3722',
    screenshotLayers: [MEDIA.productScreens.ads.src],
    mobileDecoColor: '#2a0f11',
    mobileDecoOpacity: 0.8,
  },
  {
    id: 'social',
    label: 'Social',
    cardBg: '#2f0d3f',
    copyAccent: '#9c65ee',
    pillFill: '#9c65ee',
    inactiveBorder: '#581876',
    squareColor: '#9c65ee',
    copyText:
      'On-brand, consistent posting across your channels — without you writing a single caption.',
    markColor: '#6E3CA7',
    screenshotLayers: [MEDIA.productScreens.social.src],
    mobileDecoColor: '#21092c',
    mobileDecoOpacity: 0.8,
  },
  {
    id: 'sales',
    label: 'Sales',
    cardBg: '#0f223d',
    copyAccent: '#56a6ff',
    pillFill: '#56a6ff',
    inactiveBorder: '#1b3e6f',
    squareColor: '#56a6ff',
    copyText:
      'On-brand, consistent posting across your channels — without you writing a single caption.',
    markColor: '#397DFF',
    screenshotLayers: [MEDIA.productScreens.sales.src],
    mobileDecoColor: '#0a182b',
    mobileDecoOpacity: 0.8,
  },
  {
    id: 'reviews',
    label: 'Reviews',
    cardBg: '#0d2a28',
    copyAccent: '#5bc3b3',
    pillFill: '#5bc3b3',
    inactiveBorder: '#174a46',
    squareColor: '#5bc3b3',
    copyText:
      'On-brand, consistent posting across your channels — without you writing a single caption.',
    markColor: '#399587',
    screenshotLayers: [MEDIA.productScreens.reviews.src],
    mobileDecoColor: '#091d1c',
    mobileDecoOpacity: 0.8,
  },
  {
    id: 'content',
    label: 'Content',
    cardBg: '#3d1324',
    copyAccent: '#f38bb0',
    pillFill: '#f38bb0',
    inactiveBorder: '#611e39',
    squareColor: '#f38bb0',
    copyText: 'Continuous, search-optimized content that builds your visibility over time.',
    markColor: '#DD6F96',
    screenshotLayers: [MEDIA.productScreens.content.src],
    mobileDecoColor: '#2b0d19',
    mobileDecoOpacity: 0.8,
  },
];
