import type { BlogCardModel } from "./blog-data";

function Eyebrow({ post }: { post: BlogCardModel }) {
  return (
    <p className="blc-eyebrow">
      <span className="type blc-topic">{post.topic}</span>
      <span className="type blc-time">{post.readMinutes} min read</span>
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
        <h4 className="type blc-title">{post.title}</h4>
        <p className="type blc-desc">{post.description}</p>
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
          <h3 className="type blf-title">{post.title}</h3>
        </div>
        <p className="type blf-desc">{post.description}</p>
      </div>
    </a>
  );
}
