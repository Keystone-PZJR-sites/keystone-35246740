import type { ValuePropCard } from '@/design-system';
import { MEDIA } from './media';

export const VALUE_PROP_CARDS: ValuePropCard[] = [
  {
    id: 'sales-marketing',
    imageSrc: MEDIA.valueProps.expertise.src,
    cardBg: '#4FAFA0',
    textColor: '#0d2a28',
    headline: 'SALES & MARKETING EXPERTISE',
    copy: 'Your Growth Partner knows your trade and your market, providing strategy and oversight from someone fluent in your business.',
  },
  {
    id: 'quality-focused',
    imageSrc: MEDIA.valueProps.quality.src,
    cardBg: '#E0A733',
    textColor: '#3a2a0e',
    headline: 'QUALITY\nFOCUSED',
    copy: 'Every output earns your name on it, websites, ads, social, follow-ups, etc. Each built to the same standard you set for your services.',
  },
  {
    id: 'local-experience',
    imageSrc: MEDIA.valueProps.experience.src,
    cardBg: '#DD6F96',
    textColor: '#3d1324',
    headline: 'LOCAL BUSINESS\nEXPERIENCE',
    copy: "For every vertical we serve, we've done the work to understand. You get strategy and deliverables informed by deep context.",
  },
];
