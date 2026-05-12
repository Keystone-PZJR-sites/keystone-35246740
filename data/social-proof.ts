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
    cardBgColor:    '#56A6FF',
    textColor:      '#0F223D',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    location:       'Boulder, CO',
    namePillBg:     '#0F223D', namePillText:     '#DBF1FF',
    locationPillBg: '#9DCBFF', locationPillText: '#0F223D',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-2.mp4',
    cardBgColor:    '#D8C2FF',
    textColor:      '#2F0D3F',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    location:       'Boulder, CO',
    namePillBg:     '#F0E8FF', namePillText:     '#2F0D3F',
    locationPillBg: '#9C65EE', locationPillText: '#F0E8FF',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-3.mp4',
    cardBgColor:    '#F38BB0',
    textColor:      '#3D1324',
    quoteSegments:  QUOTE_MARKETING,
    personName:     'Kristen Lovely',
    location:       'Boulder, CO',
    namePillBg:     '#3D1324', namePillText:     '#F9DCE4',
    locationPillBg: '#FEAAC8', locationPillText: '#3D1324',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-4.mp4',
    cardBgColor:    '#F2BA46',
    textColor:      '#3A2A0E',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    location:       'Boulder, CO',
    namePillBg:     '#3A2A0E', namePillText:     '#FAEEC8',
    locationPillBg: '#F2D474', locationPillText: '#3A2A0E',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-5.mp4',
    cardBgColor:    '#6ECC8B',
    textColor:      '#063126',
    quoteSegments:  QUOTE_MARKETING,
    personName:     'Kristen Lovely',
    location:       'Boulder, CO',
    namePillBg:     '#063126', namePillText:     '#DCFBD9',
    locationPillBg: '#DCFBD9', locationPillText: '#063126',
  },
  {
    videoSrc:       '/social-proof/social-proof-video-6.mp4',
    cardBgColor:    '#F57E56',
    textColor:      '#3C1618',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen Lovely',
    location:       'Boulder, CO',
    namePillBg:     '#FFEBD9', namePillText:     '#3C1618',
    locationPillBg: '#9F3722', locationPillText: '#FFEBD9',
  },
];
