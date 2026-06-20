import Image from 'next/image';
import clsx from 'clsx';

interface BlogAvatarProps {
  url: string | null;
  initial: string;
  size?: number;
  className?: string;
}

/** Circular author avatar with a brand-tinted initial fallback. Decorative. */
export function BlogAvatar({ url, initial, size = 36, className }: BlogAvatarProps) {
  return (
    <span
      className={clsx('blog-avatar', className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {url ? (
        <Image src={url} alt="" width={size} height={size} className="blog-avatar__img" />
      ) : (
        <span className="blog-avatar__initial">{initial}</span>
      )}
    </span>
  );
}
