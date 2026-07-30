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
    'Sales and marketing systems built on Keystone — website as the foundation, with agents, ads, and content on top. Browse live customer systems.',
};

export default function GalleryPage() {
  return (
    <div className="gallery-page" data-theme="custom">
      <CenteredHero
        eyebrow={GALLERY_PAGE.eyebrow}
        title={GALLERY_PAGE.title}
        subtitle={GALLERY_PAGE.subtitle}
      />

      <main className="ks-gallery" aria-label="Sales and marketing systems built with Keystone">
        {GALLERY_ENTRIES.map((entry) => (
          <GalleryEntry key={entry.slug} content={entry} />
        ))}
      </main>

      <CtaBand tone="accent" fullBleed title={GALLERY_PAGE.closingTitle} />
    </div>
  );
}
