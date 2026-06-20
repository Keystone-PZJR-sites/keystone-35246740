import type { PillData, MobileEveryChannelPillData } from '@/design-system';

// Pill positions are percentage of section width × section height (100vh).
// Source: Figma node 1087:1973 (1440×1024 desktop canvas).
export const EVERY_CHANNEL_PILLS: PillData[] = [
  { label: 'Ads',      color: '#ff7c1f', left: '32.2%', top: '14.0%', beatIndex: 0 },
  { label: 'Sales',    color: '#56a6ff', left: '61.5%', top: '38.0%', beatIndex: 1 },
  { label: 'Web',      color: '#5bc3b3', left: '5.4%',  top: '48.7%', beatIndex: 2 },
  { label: 'Leads',    color: '#f2ba46', left: '19.7%', top: '79.2%', beatIndex: 3 },
  { label: 'Reviews',  color: '#f6523c', left: '76.8%', top: '70.5%', beatIndex: 4 },
  { label: 'Content',  color: '#f38bb0', left: '86.6%', top: '27.7%', beatIndex: 5 },
  { label: 'Social',   color: '#9c65ee', left: '39.8%', top: '55.3%', beatIndex: 6 },
];

// Mobile pill positions — same labels, repositioned for the 393×853 canvas.
// Source: Figma node 1277:460.
export const MOBILE_EVERY_CHANNEL_PILLS: MobileEveryChannelPillData[] = [
  { label: 'Sales',   color: '#56a6ff', left: '78.4%', top: '5.4%',  beatIndex: 0 },
  { label: 'Leads',   color: '#f2ba46', left: '5.6%',  top: '13.0%', beatIndex: 1, dotColor: 'rgba(58,42,14,0.8)' },
  { label: 'Reviews', color: '#f6523c', left: '62.1%', top: '23.0%', beatIndex: 2 },
  { label: 'Ads',     color: '#ff7c1f', left: '77.9%', top: '35.9%', beatIndex: 3 },
  { label: 'Social',  color: '#9c65ee', left: '31.8%', top: '67.3%', beatIndex: 4 },
  { label: 'Web',     color: '#5bc3b3', left: '4.1%',  top: '85.8%', beatIndex: 5 },
  { label: 'Content', color: '#f38bb0', left: '75.8%', top: '93.0%', beatIndex: 6 },
];
