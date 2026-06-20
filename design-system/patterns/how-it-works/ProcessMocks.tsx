import {
  Users01,
  CalendarCheck01,
  Globe01,
  Star01,
  MarkerPin01,
  Target04,
  TrendUp01,
  MessageChatCircle,
  Gift01,
  RefreshCcw05,
  Zap,
} from '@untitledui/icons';

/**
 * The decorative step visual a how-it-works step frames. Each is built entirely
 * from tokens (no real data, no imagery) and is hidden from assistive tech — the
 * meaning lives in the step's title and copy. See spec 040.
 */
export type ProcessMockKind =
  | 'discover'
  | 'presence'
  | 'leads'
  | 'convert'
  | 'loyalty'
  | 'engine';

function DiscoverMock() {
  return (
    <div className="ks-hiw-mock ks-hiw-mock--discover" aria-hidden="true">
      <div className="ks-hiw-mock__head">
        <span className="ks-hiw-mock__avatar">
          <Users01 />
        </span>
        <div className="ks-hiw-mock__head-lines">
          <span className="ks-hiw-mock__line ks-hiw-mock__line--title" />
          <span className="ks-hiw-mock__line ks-hiw-mock__line--short" />
        </div>
      </div>
      <ul className="ks-hiw-mock__checks">
        {['Your goals', 'What you run today', 'Your customers'].map((label) => (
          <li key={label} className="ks-hiw-mock__check">
            <CalendarCheck01 className="ks-hiw-mock__check-icon" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PresenceMock() {
  return (
    <div className="ks-hiw-mock ks-hiw-mock--presence" aria-hidden="true">
      <div className="ks-hiw-mock__browser">
        <span className="ks-hiw-mock__dot" />
        <span className="ks-hiw-mock__dot" />
        <span className="ks-hiw-mock__dot" />
        <span className="ks-hiw-mock__url">
          <Globe01 className="ks-hiw-mock__url-icon" />
          yourbusiness.com
        </span>
      </div>
      <div className="ks-hiw-mock__hero" />
      <div className="ks-hiw-mock__row">
        <span className="ks-hiw-mock__stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star01 key={i} className="ks-hiw-mock__star" />
          ))}
        </span>
        <span className="ks-hiw-mock__chip">
          <MarkerPin01 className="ks-hiw-mock__chip-icon" />
          On the map
        </span>
      </div>
    </div>
  );
}

function LeadsMock() {
  return (
    <div className="ks-hiw-mock ks-hiw-mock--leads" aria-hidden="true">
      <div className="ks-hiw-mock__stat">
        <div className="ks-hiw-mock__stat-text">
          <span className="ks-hiw-mock__stat-label">New leads</span>
          <span className="ks-hiw-mock__stat-value">+38%</span>
        </div>
        <span className="ks-hiw-mock__badge ks-hiw-mock__badge--up">
          <TrendUp01 />
        </span>
      </div>
      <div className="ks-hiw-mock__bars">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="ks-hiw-mock__bar" />
        ))}
      </div>
      <span className="ks-hiw-mock__chip">
        <Target04 className="ks-hiw-mock__chip-icon" />
        Reaching new customers
      </span>
    </div>
  );
}

function ConvertMock() {
  return (
    <div className="ks-hiw-mock ks-hiw-mock--convert" aria-hidden="true">
      <div className="ks-hiw-mock__convo">
        <span className="ks-hiw-mock__bubble ks-hiw-mock__bubble--in">
          <MessageChatCircle className="ks-hiw-mock__bubble-icon" />
        </span>
        <span className="ks-hiw-mock__bubble ks-hiw-mock__bubble--out" />
        <span className="ks-hiw-mock__bubble ks-hiw-mock__bubble--in ks-hiw-mock__bubble--sm" />
      </div>
      <span className="ks-hiw-mock__success">
        <CalendarCheck01 className="ks-hiw-mock__success-icon" />
        Booked
      </span>
    </div>
  );
}

function LoyaltyMock() {
  return (
    <div className="ks-hiw-mock ks-hiw-mock--loyalty" aria-hidden="true">
      <div className="ks-hiw-mock__head">
        <span className="ks-hiw-mock__avatar ks-hiw-mock__avatar--accent">
          <Gift01 />
        </span>
        <div className="ks-hiw-mock__head-lines">
          <span className="ks-hiw-mock__line ks-hiw-mock__line--title" />
          <span className="ks-hiw-mock__line ks-hiw-mock__line--short" />
        </div>
      </div>
      <div className="ks-hiw-mock__progress">
        <span className="ks-hiw-mock__progress-fill" />
      </div>
      <div className="ks-hiw-mock__row">
        <span className="ks-hiw-mock__stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star01 key={i} className="ks-hiw-mock__star" />
          ))}
        </span>
        <span className="ks-hiw-mock__pts">+120 pts</span>
      </div>
    </div>
  );
}

function EngineMock() {
  return (
    <div className="ks-hiw-mock ks-hiw-mock--engine" aria-hidden="true">
      <span className="ks-hiw-mock__orbit">
        <span className="ks-hiw-mock__orbit-core">
          <RefreshCcw05 />
        </span>
      </span>
      <div className="ks-hiw-mock__engine-text">
        <span className="ks-hiw-mock__chip ks-hiw-mock__chip--solid">
          <Zap className="ks-hiw-mock__chip-icon" />
          Auto-optimizing
        </span>
        <span className="ks-hiw-mock__engine-metric">
          <TrendUp01 className="ks-hiw-mock__engine-metric-icon" />
          Getting better every day
        </span>
      </div>
    </div>
  );
}

export function ProcessMock({ kind }: { kind: ProcessMockKind }) {
  switch (kind) {
    case 'discover':
      return <DiscoverMock />;
    case 'presence':
      return <PresenceMock />;
    case 'leads':
      return <LeadsMock />;
    case 'convert':
      return <ConvertMock />;
    case 'loyalty':
      return <LoyaltyMock />;
    case 'engine':
      return <EngineMock />;
  }
}
