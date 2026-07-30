// Gallery — /gallery
// ==================
// Server Component. The live-site showcase: a centered header, a vertical
// column of showcase entries (story header + embedded production website),
// and the closing green CTA band. See spec 054.

import type { Metadata } from 'next';
import { CenteredHero, CtaBand } from '@/design-system/sections';
import { GalleryEntry } from '@/design-system/patterns/gallery';
import { GALLERY_PAGE, GALLERY_ENTRIES } from '@/data/gallery-page';

export const metadata: Metadata = {
  title: 'Gallery | Keystone',
  description:
    'Live websites built on the Keystone platform — browse real customer sites and the businesses behind them.',
};

export default function GalleryPage() {
  return (
    <div className="gallery-page" data-theme="custom">
      <CenteredHero
        eyebrow={GALLERY_PAGE.eyebrow}
        title={GALLERY_PAGE.title}
        subtitle={GALLERY_PAGE.subtitle}
      />

      <main className="ks-gallery" aria-label="Websites built with Keystone">
        {GALLERY_ENTRIES.map((entry) => (
          <GalleryEntry key={entry.slug} content={entry} />
        ))}
      </main>

      <CtaBand tone="accent" fullBleed title={GALLERY_PAGE.closingTitle} />
    </div>
  );
}
