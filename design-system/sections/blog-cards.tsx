import { Text } from "../primitives/text";
import type { BlogCardModel } from "./blog-data";

function Eyebrow({ post }: { post: BlogCardModel }) {
  return (
    <p className="blc-eyebrow">
      <Text as="span" className="blc-topic">
        {post.topic}
      </Text>
      <Text as="span" className="blc-time">
        {post.readMinutes} min read
      </Text>
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
        <Text as="h4" className="blc-title">
          {post.title}
        </Text>
        <Text as="p" className="blc-desc">
          {post.description}
        </Text>
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
          <Text as="h3" className="blf-title">
            {post.title}
          </Text>
        </div>
        <Text as="p" className="blf-desc">
          {post.description}
        </Text>
      </div>
    </a>
  );
}
