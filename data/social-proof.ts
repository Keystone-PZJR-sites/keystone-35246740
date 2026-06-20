import type {
  SocialProofSlide,
  SocialProofThumbnail,
  MobileSocialProofThumbnail,
} from '@/design-system';
import { MEDIA } from './media';

// Media (responsive sources + intrinsic sizes) lives in the central registry.
// This module owns only the layout — canvas positions, marker badges, and the
// quote/identity content paired with each clip.
const D = MEDIA.socialProof.thumbsDesktop;
const Mb = MEDIA.socialProof.thumbsMobile;
const CROSS = MEDIA.socialProof.markerCross.src;
const SV = MEDIA.socialProof.videos;

// Positions are px values at the 1440×1024 Figma canvas.
// Each thumbnail owns its marker badge — center sits on the top-right corner.
// sizes strings are derived from thumb.width / 1440 (canvas width) — the section
// is always full-viewport-width and only shown at ≥985px (md:block).
export const SOCIAL_THUMBNAILS: SocialProofThumbnail[] = [
  { thumbnail: { src: D.t01.src, srcSet: D.t01.srcSet, sizes: D.t01.sizes }, width: D.t01.width, height: D.t01.height, initialLeft: 226, initialTop: 61, markerSrc: CROSS },
  { thumbnail: { src: D.t02.src, srcSet: D.t02.srcSet, sizes: D.t02.sizes }, width: D.t02.width, height: D.t02.height, initialLeft: 833, initialTop: 88, markerSrc: CROSS },
  { thumbnail: { src: D.t03.src, srcSet: D.t03.srcSet, sizes: D.t03.sizes }, width: D.t03.width, height: D.t03.height, initialLeft: 1238, initialTop: 287, markerSrc: CROSS },
  { thumbnail: { src: D.t04.src, srcSet: D.t04.srcSet, sizes: D.t04.sizes }, width: D.t04.width, height: D.t04.height, initialLeft: -10, initialTop: 503.5, markerSrc: CROSS },
  { thumbnail: { src: D.t05.src, srcSet: D.t05.srcSet, sizes: D.t05.sizes }, width: D.t05.width, height: D.t05.height, initialLeft: 934, initialTop: 684.69, markerSrc: CROSS },
  { thumbnail: { src: D.t06.src, srcSet: D.t06.srcSet, sizes: D.t06.sizes }, width: D.t06.width, height: D.t06.height, initialLeft: 368, initialTop: 768, markerSrc: CROSS },
];

// Mobile thumbnail positions are px values at the 393×852 Figma mobile canvas.
// Each entry maps to a slide by slideIndex (0-based).
// sizes strings are derived from thumb.width / 393 (canvas width) — the section
// is always full-viewport-width and only shown at <985px (md:hidden).
export const MOBILE_SOCIAL_THUMBNAILS: MobileSocialProofThumbnail[] = [
  { thumbnail: { src: Mb.m01.src, srcSet: Mb.m01.srcSet, sizes: Mb.m01.sizes }, width: Mb.m01.width, height: Mb.m01.height, left: 24, top: 32, markerSrc: CROSS, slideIndex: 0 },
  { thumbnail: { src: Mb.m02.src, srcSet: Mb.m02.srcSet, sizes: Mb.m02.sizes }, width: Mb.m02.width, height: Mb.m02.height, left: 229, top: 164, markerSrc: CROSS, slideIndex: 1 },
  { thumbnail: { src: Mb.m03.src, srcSet: Mb.m03.srcSet, sizes: Mb.m03.sizes }, width: Mb.m03.width, height: Mb.m03.height, left: 16, top: 271, markerSrc: CROSS, slideIndex: 2 },
  { thumbnail: { src: Mb.m04.src, srcSet: Mb.m04.srcSet, sizes: Mb.m04.sizes }, width: Mb.m04.width, height: Mb.m04.height, left: 265, top: 544, markerSrc: CROSS, slideIndex: 3 },
  { thumbnail: { src: Mb.m05.src, srcSet: Mb.m05.srcSet, sizes: Mb.m05.sizes }, width: Mb.m05.width, height: Mb.m05.height, left: 16, top: 615, markerSrc: CROSS, slideIndex: 4 },
  { thumbnail: { src: Mb.m06.src, srcSet: Mb.m06.srcSet, sizes: Mb.m06.sizes }, width: Mb.m06.width, height: Mb.m06.height, left: 177, top: 668, markerSrc: CROSS, slideIndex: 5 },
];

// Quote for slide 1
const QUOTE_WEIRDPART: SocialProofSlide['quoteSegments'] = [
  { text: 'The weird part', oblique: true },
  { text: ' is I think about my marketing less than I did before I had Keystone as my marketing team.' },
];

// Quote for slide 2
const QUOTE_CANVA: SocialProofSlide['quoteSegments'] = [
  { text: "I used to spend Sunday nights writing social captions. I haven’t opened Canva in " },
  { text: 'four months', oblique: true },
  { text: '.' },
];

// Quote for slide 3
const QUOTE_COSTPERLEAD: SocialProofSlide['quoteSegments'] = [
  { text: 'I know my cost per lead, my best-performing channel, and my close rate. I learned all of it ' },
  { text: 'after I stopped doing it myself', oblique: true },
  { text: '.' },
];

// Quote for slide 4
const QUOTE_GOODWORK: SocialProofSlide['quoteSegments'] = [
  { text: 'We always did good work. ' },
  { text: 'Now people can tell', oblique: true },
  { text: ' before we show up.' },
];

// Quote for slide 5
const QUOTE_FOLLOWUP: SocialProofSlide['quoteSegments'] = [
  { text: "Handing off the follow-up was hard at first. Like, these are my customers. They still are, " },
  { text: "I just don\u2019t lose them anymore", oblique: true },
  { text: '.' },
];

// Quote for slide 6
const QUOTE_LOGINS: SocialProofSlide['quoteSegments'] = [
  { text: 'I had five logins, three vendors, and zero answers. Now I have ' },
  { text: 'one conversation', oblique: true },
  { text: '.' },
];

export const SOCIAL_SLIDES: SocialProofSlide[] = [
  {
    video:          SV[0],
    cardBgColor:    '#56A6FF',
    textColor:      '#0F223D',
    quoteSegments:  QUOTE_WEIRDPART,
    personName:     'Dexter H.',
    location:       'Fremont, CA',
    namePillBg:     '#0F223D', namePillText:     '#DBF1FF',
    locationPillBg: '#9DCBFF', locationPillText: '#0F223D',
  },
  {
    video:          SV[1],
    cardBgColor:    '#D8C2FF',
    textColor:      '#2F0D3F',
    quoteSegments:  QUOTE_CANVA,
    personName:     'Kristen L.',
    location:       'Boulder, CO',
    namePillBg:     '#F0E8FF', namePillText:     '#2F0D3F',
    locationPillBg: '#9C65EE', locationPillText: '#F0E8FF',
  },
  {
    video:          SV[2],
    cardBgColor:    '#F38BB0',
    textColor:      '#3D1324',
    quoteSegments:  QUOTE_COSTPERLEAD,
    personName:     'Estefany C.',
    location:       'Bordentown, NJ',
    namePillBg:     '#3D1324', namePillText:     '#F9DCE4',
    locationPillBg: '#FEAAC8', locationPillText: '#3D1324',
  },
  {
    video:          SV[3],
    cardBgColor:    '#F2BA46',
    textColor:      '#3A2A0E',
    quoteSegments:  QUOTE_GOODWORK,
    personName:     'Bruce B.',
    location:       'New London, CT',
    namePillBg:     '#3A2A0E', namePillText:     '#FAEEC8',
    locationPillBg: '#F2D474', locationPillText: '#3A2A0E',
  },
  {
    video:          SV[4],
    cardBgColor:    '#6ECC8B',
    textColor:      '#063126',
    quoteSegments:  QUOTE_FOLLOWUP,
    personName:     'Kelly L.',
    location:       'Palm Coast, FL',
    namePillBg:     '#063126', namePillText:     '#DCFBD9',
    locationPillBg: '#DCFBD9', locationPillText: '#063126',
  },
  {
    video:          SV[5],
    cardBgColor:    '#F57E56',
    textColor:      '#3C1618',
    quoteSegments:  QUOTE_LOGINS,
    personName:     'Jessica R.',
    location:       'Portland, CT',
    namePillBg:     '#FFEBD9', namePillText:     '#3C1618',
    locationPillBg: '#9F3722', locationPillText: '#FFEBD9',
  },
];
