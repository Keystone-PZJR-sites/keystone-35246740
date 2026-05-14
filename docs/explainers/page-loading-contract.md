# Page Loading Contract

The homepage is heavy by design, so media is opt-in by priority, proximity, or
interaction. Server-rendered text, headings, CTAs, and navigation should be
visible immediately for users and crawlers; large visual media should not join
the initial network wave unless it is needed for the hero.

## Initial Network Window

Allowed during initial load:

- HTML document and critical CSS.
- Critical above-the-fold FK font preloads.
- Hero poster image.
- Exactly one video preload: `/videos/hero-autoloop-clips/hero-01.webm`.
- Core JavaScript required for hydration and above-the-fold interaction.

Not allowed during initial load:

- Google font declarations for decorative mock cards.
- Non-first hero clips.
- WorkShowcase card images.
- EveryChannel videos.
- SocialProof thumbnail or modal videos.
- Footer videos.
- Media from a CSS-hidden desktop/mobile counterpart.

## Hero

The first hero video is the only video with document-level preload priority.
The actual hero `<video>` elements still render with `preload="none"` so the
carousel hook owns sequencing. The hook may unlock clip 0 immediately for the
active viewport variant, then one clip ahead after playback starts.

Desktop and mobile hero variants must be media-query gated in JavaScript. A
CSS-hidden hero must not unlock its carousel after hydration.

## WorkShowcase

WorkShowcase card visuals are rasterized WebP state images. Live HTML remains
for the section headline, industry labels, sublabels, buttons, and carousel
semantics.

Card images should not be requested before the section approaches the viewport.
Before that point, render same-size placeholders so Embla measurements are
stable. Once near, load the active industry and the next likely industry; further
industries load on tab selection or idle prefetch.

Do not reintroduce global `next/font/google` imports for WorkShowcase-only
decorative type. Rasterized card text is not SEO content.

## Below-Fold Videos

EveryChannel videos render `preload="none"` and start only when the section is
near the viewport.

SocialProof thumbnail videos render `preload="none"` and start only when the
section is near the viewport. Full testimonial/modal videos render
`preload="none"` and load only when the modal opens.

Footer videos render `preload="none"` and start only when the footer is near the
viewport. Footer media should never compete with the hero.

## Validation Checklist

Use a HAR after major loading changes. A healthy trace should show:

- No Google font burst from WorkShowcase.
- `hero-01.webm` starts in the first wave.
- `hero-02.webm` through `hero-06.webm` do not all start together.
- WorkShowcase card images wait until section proximity.
- EveryChannel, SocialProof, and Footer videos wait for proximity or interaction.
- Hidden mobile/desktop variants do not emit eager media requests.
