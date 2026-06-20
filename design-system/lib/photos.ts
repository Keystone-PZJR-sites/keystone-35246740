import type { PhotoAttachment } from 'keystone-design-bootstrap/types';

export interface ResolvedPhoto {
  url: string;
  alt: string;
}

/**
 * Pick the best display image from an API `photo_attachments` array:
 * featured first, then sort order, then the most appropriate size.
 * Returns null when there is no usable image so callers can fall back.
 */
export function primaryPhoto(attachments?: PhotoAttachment[]): ResolvedPhoto | null {
  if (!attachments || attachments.length === 0) return null;

  const sorted = [...attachments].sort((a, b) => {
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });

  for (const attachment of sorted) {
    const photo = attachment.photo;
    const url =
      photo?.medium_url || photo?.large_url || photo?.original_url || photo?.thumbnail_url;
    if (url) return { url, alt: photo?.alt_text ?? '' };
  }
  return null;
}

/** Initials fallback for avatars when no photo is available. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
