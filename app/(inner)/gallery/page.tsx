// Gallery — /gallery
// ==================
// Server Component. The live-site showcase: a centered header, a paginated
// column of showcase entries (3 per page), the shared "Trusted by owners"
// proof rail, and the closing green CTA band. See spec 054.

import type { Metadata } from 'next';
import { CenteredHero, CtaBand, TestimonialCarousel } from '@/design-system/sections';
import { Pagination } from '@/design-system/components/Pagination';
import { GalleryEntry } from '@/design-system/patterns/gallery';
import { GALLERY_PAGE, GALLERY_PAGE_SIZE, GALLERY_ENTRIES } from '@/data/gallery-page';
import { SHARED_TESTIMONIALS_SECTION } from '@/data/shared-sections';

export const metadata: Metadata = {
  title: 'Gallery | Keystone',
  description:
    'Sales and marketing systems built on Keystone — website as the foundation, with agents, ads, and content on top. Browse live customer systems.',
};

interface GalleryPageProps {
  searchParams: Promise<{ page?: string }>;
}

function galleryHrefForPage(page: number): string {
  return page <= 1 ? '/gallery' : `/gallery?page=${page}`;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { page: pageParam } = await searchParams;
  const totalPages = Math.max(1, Math.ceil(GALLERY_ENTRIES.length / GALLERY_PAGE_SIZE));
  const currentPage = Math.max(1, Math.min(Number(pageParam) || 1, totalPages));
  const entries = GALLERY_ENTRIES.slice(
    (currentPage - 1) * GALLERY_PAGE_SIZE,
    currentPage * GALLERY_PAGE_SIZE,
  );

  return (
    <div className="gallery-page" data-theme="custom">
      <CenteredHero
        eyebrow={GALLERY_PAGE.eyebrow}
        title={GALLERY_PAGE.title}
        subtitle={GALLERY_PAGE.subtitle}
      />

      <main
        className="ks-gallery"
        aria-label={`Sales and marketing systems built with Keystone${
          currentPage > 1 ? `, page ${currentPage}` : ''
        }`}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hrefForPage={galleryHrefForPage}
          ariaLabel="Gallery pagination, top"
        />

        {entries.map((entry) => (
          <GalleryEntry key={entry.slug} content={entry} />
        ))}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hrefForPage={galleryHrefForPage}
          ariaLabel="Gallery pagination, bottom"
        />
      </main>

      <TestimonialCarousel
        title={SHARED_TESTIMONIALS_SECTION.title}
        cards={SHARED_TESTIMONIALS_SECTION.cards}
      />

      <CtaBand tone="accent" fullBleed title={GALLERY_PAGE.closingTitle} />
    </div>
  );
}
