/** v2 sections — the blog post cards (spec 025 §3/§4). Server
 * components, prop-driven; no fetching.
 *
 * ArticleCard (§3) — the shared unit: image over a white info panel
 * (eyebrow · clamped title · clamped description), the WHOLE card one
 * link to `/blog/{slug}`. Three drawn size constructions ride the
 * band gates in blog-cards.css; the clamps are drawn (`maxLines` in
 * the file — variable copy truncates, never grows a card).
 *
 * FeaturedArticleCard (§4) — image half + info half (side by side
 * from the rt gate, stacked at base), the serif Extralight title, the
 * description bottom-anchored.
 *
 * The hover (§6, the R4 ruling): the card dresses with the standing
 * image-zoom AND the promoted card-shadow pair — this card is that
 * grammar's next consumer (nav feature cards · the Our Work card ·
 * this). Focus-visible parity through the link.
 *
 * Images are backend data (§7): remote URLs on plain `<img>`s,
 * cover-fit in CSS-fixed boxes (no CLS either way); the width/height
 * attributes carry the drawn 1344 boxes at 2× as the intrinsic-ratio
 * hint. `alt=""` — the title names the link (§5).
 */

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
