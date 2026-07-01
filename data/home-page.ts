// Homepage copy. The strings the homepage composes inline (hero, every-channel
// banner, value-props headline, social-proof headline) live here so app/page.tsx
// stays focused on layout. Structured section data (cards, pills, slides) keeps
// living in its own per-section modules; this file holds only the loose copy.
//
// Footer and lead-capture copy are site-wide chrome and live with their
// components (FOOTER_COPY, the LeadCaptureProvider), not here.

export interface HomePageContent {
  hero: {
    headline: string;
    subheadline: string;
    /** Placeholder for the Grader search field. */
    searchPlaceholder: string;
    /** Label/aria-label for the Grader search submit button. */
    searchButtonLabel: string;
    /** Shorter mobile placeholder for the Grader search field. */
    mobileSearchPlaceholder: string;
    /** Shorter mobile label/aria-label for the Grader search submit button. */
    mobileSearchButtonLabel: string;
  };
  everyChannel: {
    line1: string;
    line2: string;
    line3: string;
  };
  valueProps: {
    headlinePreamble: string;
    headlineItalic: string;
    learnMoreLabel: string;
    getStartedLabel: string;
    getStartedHref: string;
    mobileHeadlineLine1: string;
    mobileHeadlineLine2: string;
  };
  socialProof: {
    headlineLine1: string;
    headlineLine2: string;
  };
}

export const HOME_PAGE: HomePageContent = {
  hero: {
    headline: 'The best growth system for local businesses.',
    subheadline: 'Keystone runs your sales and marketing while you run your business.',
    searchPlaceholder: 'Find your business',
    searchButtonLabel: 'Free custom marketing report',
    mobileSearchPlaceholder: 'Find your business',
    mobileSearchButtonLabel: 'Get report',
  },
  everyChannel: {
    line1: 'Ads to sales.',
    line2: 'Every channel.',
    line3: 'Optimized.',
  },
  valueProps: {
    headlinePreamble: 'Not an agency. Not software. Something ',
    headlineItalic: 'better',
    learnMoreLabel: 'Get in touch',
    getStartedLabel: 'Services and pricing',
    getStartedHref: '/pricing',
    mobileHeadlineLine1: 'Not an Agency, Not Software.',
    mobileHeadlineLine2: 'Something Better.',
  },
  socialProof: {
    headlineLine1: 'Great BUSINESSES ',
    headlineLine2: 'deserve to be found.',
  },
};
