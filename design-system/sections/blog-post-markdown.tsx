import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { SITE_URL } from "../site";
import { EXTERNAL_LINK } from "../site-links";

function opensExternally(href: string | undefined): boolean {
  if (!href?.startsWith("http://") && !href?.startsWith("https://")) return false;
  return new URL(href).origin !== SITE_URL;
}

const BODY_COMPONENTS: Components = {
  h1: "h3",
  h2: "h3",
  h3: "h3",
  a: ({ href, title, children }) => (
    <a href={href} title={title} {...(opensExternally(href) ? EXTERNAL_LINK : {})}>
      {children}
    </a>
  ),
  img: ({ alt, ...props }) => (
    <img {...props} alt={alt ?? ""} width={672} height={378} loading="lazy" decoding="async" />
  ),
};

export interface BlogPostMarkdownProps {
  markdown: string;
  variant: "lede" | "body";
}

export function BlogPostMarkdown({ markdown, variant }: BlogPostMarkdownProps) {
  if (!markdown) return null;
  return (
    <div className={`bp-markdown bp-markdown-${variant}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={BODY_COMPONENTS}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
