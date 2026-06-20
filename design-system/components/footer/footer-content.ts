// Shared footer content: the FK Screamer collage copy, CTA labels, brand
// colors, and the desktop/mobile video clip sets. Lives in one place so the
// real inner-page chrome (InnerPageShell) and the /styles catalog preview
// render the footer from identical data. Company social URLs are fetched per
// request and passed in separately by the caller.

import { MEDIA } from '@/data/media';

export const FOOTER_VIDEOS_DESKTOP = MEDIA.footerClips.desktop;
export const FOOTER_VIDEOS_MOBILE = MEDIA.footerClips.mobile;

export const FOOTER_COPY = {
  line1: 'FOR BUSINESSES',
  line2: 'THAT ARE',
  line3: ' DONE FIGURING',
  line4: 'IT OUT THEMSELVES',
  leftTagline: 'The modern growth team for local business.',
  rightTagline: 'Stay informed about our latest features and product releases',
  cta1Href: '/blog',
  cta2Label: 'Services and pricing',
  emailPlaceholder: 'Email Address',
  signUpLabel: 'Sign Up',
  podcastUrl: 'https://open.spotify.com/show/41MuXEI3TIvCAQW20Ko9cX?si=777efb21569d4d94',
  applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/made-locally/id1895736090',
  keystoneMarkColor: 'var(--color-bg-brand-solid,#f57e56)',
  ctaArrowSrc: MEDIA.ui.footerCtaArrow.src,
  keystoneWordmarkColor: 'var(--color-bg-brand-solid,#f57e56)',
} as const;
