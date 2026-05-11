import type { ValuePropCard } from '@/components/sections';

// Placeholder videos use existing footer assets so the cards render with real
// content while the final value-props clips are being prepared. Replace
// videoSrc with the actual paths under /value-props/ when they are ready.
// (videoLeft / videoWidth can be added back then for precise Figma-matched crops.)
export const VALUE_PROP_CARDS: ValuePropCard[] = [
  {
    id: 'sales-marketing',
    videoSrc: '/footer/footer-video-businesswoman.mp4',
    cardBg: '#4FAFA0',
    textColor: '#0d2a28',
    headline: 'SALES & MARKETING EXPERTISE',
    copy: 'Your Growth Partner knows your trade and your market, providing strategy and oversight from someone fluent in your business.',
  },
  {
    id: 'quality-focused',
    videoSrc: '/footer/footer-video-ceramics.mp4',
    cardBg: '#E0A733',
    textColor: '#3a2a0e',
    headline: 'QUALITY\nFOCUSED',
    copy: 'Every output earns your name on it, websites, ads, social, follow-ups, etc. Each built to the same standard you set for your services.',
  },
  {
    id: 'local-experience',
    videoSrc: '/footer/footer-video-storefront.mp4',
    cardBg: '#DD6F96',
    textColor: '#3d1324',
    headline: 'LOCAL BUSINESS\nEXPERIENCE',
    copy: "For every vertical we serve, we've done the work to understand. You get strategy and deliverables informed by deep context.",
  },
];
