import clsx from 'clsx';

interface BlogMetaProps {
  /** Ordered meta fragments (author, reading time, date); falsy values are dropped. */
  parts: Array<string | null | undefined | false>;
  tone?: 'muted' | 'inverse';
  className?: string;
}

/**
 * The small "author · 6 min read · date" line shared by every blog card,
 * row, and hero. Renders only the fragments that exist, with dot separators
 * between them so there is never a dangling separator.
 */
export function BlogMeta({ parts, tone = 'muted', className }: BlogMetaProps) {
  const items = parts.filter(Boolean) as string[];
  if (items.length === 0) return null;
  return (
    <div className={clsx('blog-meta', `blog-meta--${tone}`, className)}>
      {items.map((part, i) => (
        <span key={i} className="blog-meta__item">
          {i > 0 && (
            <span className="blog-meta__sep" aria-hidden="true">
              ·
            </span>
          )}
          {part}
        </span>
      ))}
    </div>
  );
}
