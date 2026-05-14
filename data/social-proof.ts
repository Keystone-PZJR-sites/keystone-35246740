import type {
  SocialProofSlide,
  SocialProofThumbnail,
  MobileSocialProofThumbnail,
} from '@/components/sections';

// Positions are px values at the 1440×1024 Figma canvas.
// Each thumbnail owns its marker badge — center sits on the top-right corner.
// sizes strings are derived from thumb.width / 1440 (canvas width) — the section
// is always full-viewport-width and only shown at ≥768px (md:block).
const T = '/social-proof/thumbnails';
export const SOCIAL_THUMBNAILS: SocialProofThumbnail[] = [
  {
    thumbnail: {
      src:    `${T}/socialproof-thumb-01-desktop-764w.webp`,
      srcSet: `${T}/socialproof-thumb-01-desktop-250w.webp 250w, ${T}/socialproof-thumb-01-desktop-500w.webp 500w, ${T}/socialproof-thumb-01-desktop-764w.webp 764w`,
      sizes:  '27vw',
    },
    width: 382, height: 215, initialLeft: 226, initialTop: 61,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    thumbnail: {
      src:    `${T}/socialproof-thumb-02-desktop-556w.webp`,
      srcSet: `${T}/socialproof-thumb-02-desktop-250w.webp 250w, ${T}/socialproof-thumb-02-desktop-500w.webp 500w, ${T}/socialproof-thumb-02-desktop-556w.webp 556w`,
      sizes:  '20vw',
    },
    width: 278, height: 156, initialLeft: 833, initialTop: 88,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    thumbnail: {
      src:    `${T}/socialproof-thumb-03-desktop-356w.webp`,
      srcSet: `${T}/socialproof-thumb-03-desktop-250w.webp 250w, ${T}/socialproof-thumb-03-desktop-356w.webp 356w`,
      sizes:  '13vw',
    },
    width: 178, height: 100, initialLeft: 1238, initialTop: 287,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    thumbnail: {
      src:    `${T}/socialproof-thumb-04-desktop-550w.webp`,
      srcSet: `${T}/socialproof-thumb-04-desktop-250w.webp 250w, ${T}/socialproof-thumb-04-desktop-500w.webp 500w, ${T}/socialproof-thumb-04-desktop-550w.webp 550w`,
      sizes:  '20vw',
    },
    width: 275, height: 214, initialLeft: -10, initialTop: 503.5,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    thumbnail: {
      src:    `${T}/socialproof-thumb-05-desktop-762w.webp`,
      srcSet: `${T}/socialproof-thumb-05-desktop-250w.webp 250w, ${T}/socialproof-thumb-05-desktop-500w.webp 500w, ${T}/socialproof-thumb-05-desktop-762w.webp 762w`,
      sizes:  '27vw',
    },
    width: 381, height: 268, initialLeft: 934, initialTop: 684.69,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    thumbnail: {
      src:    `${T}/socialproof-thumb-06-desktop-356w.webp`,
      srcSet: `${T}/socialproof-thumb-06-desktop-250w.webp 250w, ${T}/socialproof-thumb-06-desktop-356w.webp 356w`,
      sizes:  '13vw',
    },
    width: 178, height: 100, initialLeft: 368, initialTop: 768,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
];

// Mobile thumbnail positions are px values at the 393×852 Figma mobile canvas.
// Each entry maps to a slide by slideIndex (0-based).
// sizes strings are derived from thumb.width / 393 (canvas width) — the section
// is always full-viewport-width and only shown at <768px (md:hidden).
export const MOBILE_SOCIAL_THUMBNAILS: MobileSocialProofThumbnail[] = [
  { thumbnail: { src: `${T}/socialproof-thumb-01-mobile-400w.webp`,  srcSet: `${T}/socialproof-thumb-01-mobile-250w.webp 250w, ${T}/socialproof-thumb-01-mobile-400w.webp 400w`,  sizes: '51vw' }, width: 200, height: 112, left: 24,  top: 32,  markerSrc: '/social-proof/social-proof-marker-cross.svg', slideIndex: 0 },
  { thumbnail: { src: `${T}/socialproof-thumb-02-mobile-288w.webp`,  srcSet: `${T}/socialproof-thumb-02-mobile-250w.webp 250w, ${T}/socialproof-thumb-02-mobile-288w.webp 288w`,  sizes: '37vw' }, width: 144, height: 96,  left: 229, top: 164, markerSrc: '/social-proof/social-proof-marker-cross.svg', slideIndex: 1 },
  { thumbnail: { src: `${T}/socialproof-thumb-03-mobile-336w.webp`,  srcSet: `${T}/socialproof-thumb-03-mobile-250w.webp 250w, ${T}/socialproof-thumb-03-mobile-336w.webp 336w`,  sizes: '43vw' }, width: 168, height: 87,  left: 16,  top: 271, markerSrc: '/social-proof/social-proof-marker-cross.svg', slideIndex: 2 },
  { thumbnail: { src: `${T}/socialproof-thumb-04-mobile-224w.webp`,  srcSet: `${T}/socialproof-thumb-04-mobile-224w.webp 224w`,                                                    sizes: '29vw' }, width: 112, height: 64,  left: 265, top: 544, markerSrc: '/social-proof/social-proof-marker-cross.svg', slideIndex: 3 },
  { thumbnail: { src: `${T}/socialproof-thumb-05-mobile-228w.webp`,  srcSet: `${T}/socialproof-thumb-05-mobile-228w.webp 228w`,                                                    sizes: '29vw' }, width: 114, height: 64,  left: 16,  top: 615, markerSrc: '/social-proof/social-proof-marker-cross.svg', slideIndex: 4 },
  { thumbnail: { src: `${T}/socialproof-thumb-06-mobile-432w.webp`,  srcSet: `${T}/socialproof-thumb-06-mobile-250w.webp 250w, ${T}/socialproof-thumb-06-mobile-432w.webp 432w`,  sizes: '47vw' }, width: 184, height: 129, left: 177, top: 668, markerSrc: '/social-proof/social-proof-marker-cross.svg', slideIndex: 5 },
];

// Quote shared by slides 1, 2, 4, 6
const QUOTE_CANVA: SocialProofSlide['quoteSegments'] = [
  { text: "I used to spend Sunday nights writing social captions. I haven’t opened Canva in " },
  { text: 'four months', oblique: true },
  { text: '.' },
];

// Quote shared by slides 3, 5
const QUOTE_MARKETING: SocialProofSlide['quoteSegments'] = [
  { text: 'The weird part', oblique: true },
  { text: ' is I think about marketing less than I did before I had a marketing team.' },
];

export const SOCIAL_SLIDES: SocialProofSlide[] = [
  {
    video:          { webm: '/social-proof/social-proof-video-1.webm', mp4: '/social-proof/social-proof-video-1.mp4' },
    cardBgColor:    '#56A6FF',
    textColor:      '#0F223D',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    location:       'Boulder, CO',
    namePillBg:     '#0F223D', namePillText:     '#DBF1FF',
    locationPillBg: '#9DCBFF', locationPillText: '#0F223D',
  },
  {
    video:          { webm: '/social-proof/social-proof-video-2.webm', mp4: '/social-proof/social-proof-video-2.mp4' },
    cardBgColor:    '#D8C2FF',
    textColor:      '#2F0D3F',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    location:       'Boulder, CO',
    namePillBg:     '#F0E8FF', namePillText:     '#2F0D3F',
    locationPillBg: '#9C65EE', locationPillText: '#F0E8FF',
  },
  {
    video:          { webm: '/social-proof/social-proof-video-3.webm', mp4: '/social-proof/social-proof-video-3.mp4' },
    cardBgColor:    '#F38BB0',
    textColor:      '#3D1324',
    quoteSegments:  QUOTE_MARKETING,
    personName:     'Kristen Lovely',
    location:       'Boulder, CO',
    namePillBg:     '#3D1324', namePillText:     '#F9DCE4',
    locationPillBg: '#FEAAC8', locationPillText: '#3D1324',
  },
  {
    video:          { webm: '/social-proof/social-proof-video-4.webm', mp4: '/social-proof/social-proof-video-4.mp4' },
    cardBgColor:    '#F2BA46',
    textColor:      '#3A2A0E',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    location:       'Boulder, CO',
    namePillBg:     '#3A2A0E', namePillText:     '#FAEEC8',
    locationPillBg: '#F2D474', locationPillText: '#3A2A0E',
  },
  {
    video:          { webm: '/social-proof/social-proof-video-5.webm', mp4: '/social-proof/social-proof-video-5.mp4' },
    cardBgColor:    '#6ECC8B',
    textColor:      '#063126',
    quoteSegments:  QUOTE_MARKETING,
    personName:     'Kristen Lovely',
    location:       'Boulder, CO',
    namePillBg:     '#063126', namePillText:     '#DCFBD9',
    locationPillBg: '#DCFBD9', locationPillText: '#063126',
  },
  {
    video:          { webm: '/social-proof/social-proof-video-6.webm', mp4: '/social-proof/social-proof-video-6.mp4' },
    cardBgColor:    '#F57E56',
    textColor:      '#3C1618',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    location:       'Boulder, CO',
    namePillBg:     '#FFEBD9', namePillText:     '#3C1618',
    locationPillBg: '#9F3722', locationPillText: '#FFEBD9',
  },
];
