import { InterpText } from "../primitives/text";
import type { BlogCardModel } from "./blog-data";

function Eyebrow({ post }: { post: BlogCardModel }) {
  return (
    <p className="blc-eyebrow">
      <InterpText as="span" style="text-nav-label" className="blc-topic">
        {post.topic}
      </InterpText>
      <InterpText as="span" style="text-nav-label" className="blc-time">
        {post.readMinutes} min read
      </InterpText>
    </p>
  );
}

export function ArticleCard({ post }: { post: BlogCardModel }) {
  return (
    <a className="blc" href={`/blog/${post.slug}`}>
      <div className="blc-img">
        <img src={post.imageUrl} alt="" width={704} height={276} loading="lazy" decoding="async" />
      </div>
      <div className="blc-info">
        <Eyebrow post={post} />
        <InterpText as="h4" style="text-md-medium" className="blc-title">
          {post.title}
        </InterpText>
        <InterpText as="p" style="text-md-light" className="blc-desc">
          {post.description}
        </InterpText>
      </div>
    </a>
  );
}

export function FeaturedArticleCard({ post }: { post: BlogCardModel }) {
  return (
    <a className="blf" href={`/blog/${post.slug}`}>
      <div className="blf-img">
        <img src={post.imageUrl} alt="" width={1120} height={672} loading="lazy" decoding="async" />
      </div>
      <div className="blf-info">
        <div className="blf-info-top">
          <Eyebrow post={post} />
          <InterpText as="h3" style="display-serif-xs-extralight" className="blf-title">
            {post.title}
          </InterpText>
        </div>
        <InterpText as="p" style="text-md-light" className="blf-desc">
          {post.description}
        </InterpText>
      </div>
    </a>
  );
}
