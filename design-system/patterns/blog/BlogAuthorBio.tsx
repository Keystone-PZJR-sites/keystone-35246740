import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { BlogPostAuthor } from 'keystone-design-bootstrap/types';
import { BlogAvatar } from './BlogAvatar';
import { getAuthorAvatar } from './utils';

export interface BlogSocialLinks {
  youtubeUrl?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
}

function socialList(social?: BlogSocialLinks): Array<{ label: string; href: string }> {
  if (!social) return [];
  return (
    [
      social.linkedinUrl && { label: 'LinkedIn', href: social.linkedinUrl },
      social.instagramUrl && { label: 'Instagram', href: social.instagramUrl },
      social.facebookUrl && { label: 'Facebook', href: social.facebookUrl },
      social.youtubeUrl && { label: 'YouTube', href: social.youtubeUrl },
    ] as Array<{ label: string; href: string } | false>
  ).filter(Boolean) as Array<{ label: string; href: string }>;
}

interface BlogAuthorBioProps {
  author: BlogPostAuthor;
  social?: BlogSocialLinks;
}

/** The author card at the end of a post: avatar, name, bio, and social links. */
export function BlogAuthorBio({ author, social }: BlogAuthorBioProps) {
  const { url, initial } = getAuthorAvatar(author);
  const links = socialList(social);

  return (
    <aside className="blog-bio" aria-label={`About ${author.name}`}>
      <BlogAvatar url={url} initial={initial} size={56} className="blog-bio__avatar" />
      <div className="blog-bio__body">
        <p className="blog-bio__name">{author.name}</p>
        {author.bio_markdown && (
          <div className="blog-bio__text">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{author.bio_markdown}</ReactMarkdown>
          </div>
        )}
        {links.length > 0 && (
          <div className="blog-bio__social">
            <span className="blog-bio__social-label">Follow us</span>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="blog-bio__social-link"
                target="_blank"
                rel="noreferrer noopener"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
