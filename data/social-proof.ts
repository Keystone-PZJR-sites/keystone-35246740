import type {
  SocialProofSlide,
  SocialProofThumbnail,
  MobileSocialProofThumbnail,
} from '@/components/sections';

// Positions are px values at the 1440×1024 Figma canvas.
// Each thumbnail owns its marker badge — center sits on the top-right corner.
export const SOCIAL_THUMBNAILS: SocialProofThumbnail[] = [
  {
    videoSrc: '/social-proof/social-proof-video-1.mp4',
    width: 382, height: 215, initialLeft: 226, initialTop: 61,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    videoSrc: '/social-proof/social-proof-video-2.mp4',
    width: 278, height: 156, initialLeft: 833, initialTop: 88,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    videoSrc: '/social-proof/social-proof-video-3.mp4',
    width: 178, height: 100, initialLeft: 1238, initialTop: 287,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    videoSrc: '/social-proof/social-proof-video-4.mp4',
    width: 275, height: 214, initialLeft: 0, initialTop: 503.5,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    videoSrc: '/social-proof/social-proof-video-5.mp4',
    width: 381, height: 268, initialLeft: 934, initialTop: 684.69,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
  {
    videoSrc: '/social-proof/social-proof-video-6.mp4',
    width: 178, height: 100, initialLeft: 328, initialTop: 768,
    markerSrc: '/social-proof/social-proof-marker-cross.svg',
  },
];

// Mobile thumbnail positions are px values at the 393×852 Figma mobile canvas.
// Each entry maps to a slide by slideIndex (0-based).
export const MOBILE_SOCIAL_THUMBNAILS: MobileSocialProofThumbnail[] = [
  { videoSrc: '/social-proof/social-proof-video-1.mp4', width: 200, height: 112, left: 24,  top: 32,  markerSrc: '/social-proof/social-proof-marker-cross.svg', slideIndex: 0 },
  { videoSrc: '/social-proof/social-proof-video-2.mp4', width: 144, height: 96,  left: 229, top: 164, markerSrc: '/social-proof/social-proof-marker-cross.svg', slideIndex: 1 },
  { videoSrc: '/social-proof/social-proof-video-3.mp4', width: 168, height: 87,  left: 16,  top: 271, markerSrc: '/social-proof/social-proof-marker-cross.svg', slideIndex: 2 },
  { videoSrc: '/social-proof/social-proof-video-4.mp4', width: 112, height: 64,  left: 265, top: 544, markerSrc: '/social-proof/social-proof-marker-cross.svg', slideIndex: 3 },
  { videoSrc: '/social-proof/social-proof-video-5.mp4', width: 114, height: 64,  left: 16,  top: 615, markerSrc: '/social-proof/social-proof-marker-cross.svg', slideIndex: 4 },
  { videoSrc: '/social-proof/social-proof-video-6.mp4', width: 216, height: 152, left: 147, top: 668, markerSrc: '/social-proof/social-proof-marker-cross.svg', slideIndex: 5 },
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
    videoSrc:       '/social-proof/social-proof-video-1.mp4',
    cardBgColor:    '#d8c2ff',
    textColor:      '#2f0d3f',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    businessName:   'Lean & Lovely Medspa',
    location:       'Boulder, CO',
    namePillBg:     '#f0e8ff', namePillText:     '#2f0d3f',
    businessPillBg: '#2f0d3f', businessPillText: '#f0eee6',
    locationPillBg: '#9c65ee', locationPillText: '#d8c2ff',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-2.mp4',
    cardBgColor:    '#f57e56',
    textColor:      '#3e181a',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    businessName:   'Lean & Lovely Medspa',
    location:       'Boulder, CO',
    namePillBg:     '#ffebd9', namePillText:     '#3c1618',
    businessPillBg: '#3c1618', businessPillText: '#f0eee6',
    locationPillBg: '#9f3722', locationPillText: '#ffbb8a',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-3.mp4',
    cardBgColor:    '#6ecc8b',
    textColor:      '#063126',
    quoteSegments:  QUOTE_MARKETING,
    personName:     'Kristen Lovely',
    businessName:   'Lean & Lovely Medspa',
    location:       'Boulder, CO',
    namePillBg:     '#063126', namePillText:     '#dcfbd9',
    businessPillBg: '#56b373', businessPillText: '#063126',
    locationPillBg: '#dcfbd9', locationPillText: '#063126',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-4.mp4',
    cardBgColor:    '#F2D474',
    textColor:      '#835F20',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    businessName:   'Lean & Lovely Medspa',
    location:       'Boulder, CO',
    namePillBg:     '#F2BA46', namePillText:     '#835F20',
    businessPillBg: '#835F20', businessPillText: '#F2D474',
    locationPillBg: '#F2BA46', locationPillText: '#835F20',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-5.mp4',
    cardBgColor:    '#AAE0D2',
    textColor:      '#318175',
    quoteSegments:  QUOTE_MARKETING,
    personName:     'Kristen Lovely',
    businessName:   'Lean & Lovely Medspa',
    location:       'Boulder, CO',
    namePillBg:     '#399587', namePillText:     '#AAE0D2',
    businessPillBg: '#318175', businessPillText: '#AAE0D2',
    locationPillBg: '#AAE0D2', locationPillText: '#318175',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-6.mp4',
    cardBgColor:    '#9DCBFF',
    textColor:      '#055CFF',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    businessName:   'Lean & Lovely Medspa',
    location:       'Boulder, CO',
    namePillBg:     '#56a6ff', namePillText:     '#f0eee6',
    businessPillBg: '#055CFF', businessPillText: '#9DCBFF',
    locationPillBg: '#9DCBFF', locationPillText: '#055CFF',
  },
];
