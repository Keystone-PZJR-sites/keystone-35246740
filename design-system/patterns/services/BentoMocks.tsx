import { SearchLg, Star01, Plus } from '@untitledui/icons';

/** Discriminator for the small product mock a bento tile can frame. */
export type BentoMockKind = 'search' | 'product' | 'review' | 'message' | 'metric';

/**
 * A small "search result" mock — a search field above a single result row with
 * an avatar, two copy lines, and a rating. Decorative chrome built entirely from
 * tokens (no real data), framed inside a bento tile. See spec 037.
 */
function SearchMock() {
  return (
    <div className="ks-svc-mock ks-svc-mock--search" aria-hidden="true">
      <div className="ks-svc-mock__field">
        <SearchLg className="ks-svc-mock__field-icon" />
        <span className="ks-svc-mock__field-text">Businesses near me…</span>
      </div>
      <div className="ks-svc-mock__result">
        <span className="ks-svc-mock__thumb" />
        <div className="ks-svc-mock__lines">
          <span className="ks-svc-mock__line ks-svc-mock__line--title" />
          <span className="ks-svc-mock__rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star01 key={i} className="ks-svc-mock__star" />
            ))}
          </span>
          <span className="ks-svc-mock__line" />
          <span className="ks-svc-mock__line ks-svc-mock__line--short" />
        </div>
      </div>
    </div>
  );
}

/**
 * A small "product" mock — a thumbnail above a title, price, and an add button.
 * Decorative chrome built entirely from tokens, framed inside a bento tile.
 * See spec 037.
 */
function ProductMock() {
  return (
    <div className="ks-svc-mock ks-svc-mock--product" aria-hidden="true">
      <span className="ks-svc-mock__photo" />
      <div className="ks-svc-mock__row">
        <div className="ks-svc-mock__lines">
          <span className="ks-svc-mock__line ks-svc-mock__line--title" />
          <span className="ks-svc-mock__line ks-svc-mock__line--short" />
          <span className="ks-svc-mock__price">$13.00</span>
        </div>
        <span className="ks-svc-mock__add">
          <Plus className="ks-svc-mock__add-icon" />
        </span>
      </div>
    </div>
  );
}

/**
 * A small "review" mock — a round avatar beside a name line and a five-star
 * rating, above a few body lines (the review text). Decorative chrome built
 * entirely from tokens, framed inside a bento tile. See spec 045.
 */
function ReviewMock() {
  return (
    <div className="ks-svc-mock ks-svc-mock--review" aria-hidden="true">
      <div className="ks-svc-mock__result">
        <span className="ks-svc-mock__thumb ks-svc-mock__thumb--round" />
        <div className="ks-svc-mock__lines">
          <span className="ks-svc-mock__line ks-svc-mock__line--title" />
          <span className="ks-svc-mock__rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star01 key={i} className="ks-svc-mock__star" />
            ))}
          </span>
        </div>
      </div>
      <div className="ks-svc-mock__lines">
        <span className="ks-svc-mock__line" />
        <span className="ks-svc-mock__line" />
        <span className="ks-svc-mock__line ks-svc-mock__line--short" />
      </div>
    </div>
  );
}

/**
 * A small "message" mock — an inbound chat bubble answered by a brand-colored
 * outbound bubble, the skeleton of a two-way conversation. Decorative chrome
 * built from tokens, framed inside a bento tile. See spec 045.
 */
function MessageMock() {
  return (
    <div className="ks-svc-mock ks-svc-mock--message" aria-hidden="true">
      <span className="ks-svc-mock__bubble ks-svc-mock__bubble--in">
        <span className="ks-svc-mock__line" />
        <span className="ks-svc-mock__line ks-svc-mock__line--short" />
      </span>
      <span className="ks-svc-mock__bubble ks-svc-mock__bubble--out">
        <span className="ks-svc-mock__line" />
      </span>
    </div>
  );
}

/**
 * A small "metric" mock — a stat label above a rising bar chart whose last bar
 * is brand-colored (the result). Decorative chrome built from tokens, framed
 * inside a bento tile. See spec 045.
 */
function MetricMock() {
  return (
    <div className="ks-svc-mock ks-svc-mock--metric" aria-hidden="true">
      <div className="ks-svc-mock__lines">
        <span className="ks-svc-mock__line ks-svc-mock__line--title" />
        <span className="ks-svc-mock__line ks-svc-mock__line--short" />
      </div>
      <div className="ks-svc-mock__bars">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="ks-svc-mock__bar" />
        ))}
      </div>
    </div>
  );
}

export function BentoMock({ kind }: { kind: BentoMockKind }) {
  switch (kind) {
    case 'search':
      return <SearchMock />;
    case 'product':
      return <ProductMock />;
    case 'review':
      return <ReviewMock />;
    case 'message':
      return <MessageMock />;
    case 'metric':
      return <MetricMock />;
  }
}
