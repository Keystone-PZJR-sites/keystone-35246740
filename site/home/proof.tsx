"use client";

import { Icon } from "@keystone-sites/marketing-design-system/icon";
import { useInView, useReducedMotion } from "@keystone-sites/marketing-design-system/motion";
import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Entry, EntryId } from "./content";

/** What each part leaves behind, as the product shows it: one or two pieces of it on the
    photograph's edge, over what the picture can spare (a blurred foreground, a margin), so the
    person at work stays in sight. All of it one business's staged example. Each tells its one
    thing once it comes into view, and holds the result; under reduced motion it starts there. */
export function Proof({ entry }: { entry: Entry }) {
  const Piece = PROOF[entry.id];
  return (
    <figure className="home-proof" data-hue={entry.hue} data-proof={entry.id}>
      <figcaption className="ks-sr">Sample of what Keystone shows: {entry.name}.</figcaption>
      <Piece />
    </figure>
  );
}

/** The beat a piece is on: none until it comes into view, then one more at each time in `at` (ms
    from then). Under reduced motion it is on its last from the start. */
function useBeats(ref: RefObject<HTMLElement | null>, at: readonly number[]): number {
  const reduce = useReducedMotion();
  const seen = useInView(ref);
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (!seen || reduce) return;
    const timers = at.map((ms, index) => window.setTimeout(() => setBeat(index + 1), ms));
    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [seen, reduce, at]);
  return reduce ? at.length : beat;
}

// Three decades of figures, so a column can roll forward past 9 into 0 without running out.
const STRIP = Array.from({ length: 30 }, (_, index) => index % 10);

const digitsOf = (value: number, columns: number) =>
  Array.from({ length: columns }, (_, column) => Math.floor(value / 10 ** column) % 10);

/** A whole number whose digits roll forward to each new value, as a counter's do, the last digit
    first. Each column keeps its place on the strip, so a rise only ever turns forward; a leading
    column the value doesn't reach yet takes no room, and opens as it is reached. `columns` is the
    most digits the number will have. */
function Count({ value, columns }: { value: number; columns: number }) {
  const [shown, setShown] = useState({ value, at: digitsOf(value, columns) });
  if (shown.value !== value) {
    const next = digitsOf(value, columns);
    setShown({
      value,
      at: shown.at.map((at, column) => at + ((next[column]! - (at % 10) + 10) % 10)),
    });
  }
  const reached = Math.max(1, String(value).length);
  return (
    <span className="home-count">
      <span className="ks-sr">{value}</span>
      {shown.at
        .map((at, column) => (
          <span
            key={column}
            className="home-count__digit"
            data-off={column >= reached ? "" : undefined}
            aria-hidden
          >
            <span className="home-count__ghost">{at % 10}</span>
            <span className="home-count__window">
              <span
                className="home-count__strip"
                style={{ "--at": at, "--column": column } as CSSProperties}
              >
                {STRIP.map((figure, index) => (
                  <span key={index}>{figure}</span>
                ))}
              </span>
            </span>
          </span>
        ))
        .reverse()}
    </span>
  );
}

// The Keystone Score as the grade's card sets it: the number over the three bands it falls in,
// a line split where they meet (55 and 75), filled to the score with a knob there, the grade in
// words, and a line per area. In the plate's hue, as every piece is, not the grade's colours.
// It reads the three areas in turn, then gives the score they come to and says what it means.
const SCORE = 46;
const BANDS = [
  { from: 0, to: 55 },
  { from: 55, to: 75 },
  { from: 75, to: 100 },
] as const;
const AREAS = [
  { label: "Google listing", score: 58 },
  { label: "Reviews", score: 52 },
  { label: "Website", score: 31 },
] as const;
const SCORE_BEATS = [300, 750, 1200, 1750, 2650] as const;

const filled = (score: number, band: { from: number; to: number }) =>
  `${String(Math.min(100, Math.max(0, ((score - band.from) / (band.to - band.from)) * 100)))}%`;

function Scorecard() {
  const ref = useRef<HTMLDivElement>(null);
  const beat = useBeats(ref, SCORE_BEATS);
  const scored = beat >= 4;
  const score = scored ? SCORE : 0;
  return (
    <div ref={ref} className="home-sat home-score">
      <span className="home-score__label">Keystone Score</span>
      <span className="home-score__value">
        <b>
          <Count value={score} columns={2} />
        </b>
        <span>of 100</span>
      </span>
      <span className="home-score__scale" aria-hidden>
        {BANDS.map((band) => (
          <i
            key={band.from}
            style={
              { flexGrow: band.to - band.from, "--fill": filled(score, band) } as CSSProperties
            }
          />
        ))}
        <span className="home-score__ride" style={{ "--to": score } as CSSProperties}>
          <span className="home-score__knob" />
        </span>
      </span>
      <span className="home-score__pill" data-in={beat >= 5 ? "" : undefined}>
        <i aria-hidden />
        Needs work
      </span>
      <ul className="home-score__areas">
        {AREAS.map((area, index) => {
          const read = beat > index;
          return (
            <li key={area.label} data-read={read ? "" : undefined}>
              <span>{area.label}</span>
              <i
                aria-hidden
                style={{ "--w": read ? `${String(area.score)}%` : "0%" } as CSSProperties}
              />
              <b>
                <Count value={read ? area.score : 0} columns={2} />
              </b>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const SITES = [
  { file: "aesthetics", name: "House of Aesthetics" },
  { file: "drefadez", name: "DreFadez Barber" },
  { file: "ora", name: "Ōra Medical Clinic" },
  { file: "x2o", name: "X2O Studio" },
  { file: "merin", name: "Miriam Merin, LCSW" },
  { file: "lune", name: "Lune Bodywork" },
] as const;
// The first site loads, then goes live; after that one more loads every few seconds.
const SITE_BEATS = [900, 1500] as const;
const LOAD = 700;
const NEXT = 3600;

/** Sites Keystone built in a quiet browser: the first loads and goes live, then another loads in
    its place every few seconds while it's in view, each with the bar's line running as it does. */
function Browser() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: false });
  const beat = useBeats(ref, SITE_BEATS);
  const [at, setAt] = useState(0);
  const [loads, setLoads] = useState(0);
  const first = seen && beat === 0 && loads === 0;
  useEffect(() => {
    if (reduce || !seen || beat < SITE_BEATS.length) return;
    let swap = 0;
    const id = window.setInterval(() => {
      setLoads((count) => count + 1);
      swap = window.setTimeout(() => setAt((i) => (i + 1) % SITES.length), LOAD);
    }, NEXT);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(swap);
    };
  }, [reduce, seen, beat]);
  return (
    <div ref={ref} className="home-sat home-browser">
      <div className="home-browser__frame">
        <div className="home-browser__bar" aria-hidden>
          <i />
          <i />
          <i />
          {first ? (
            <span
              key="first"
              className="home-browser__load"
              style={{ "--load": `${String(SITE_BEATS[0])}ms` } as CSSProperties}
            />
          ) : null}
          {loads > 0 ? (
            <span
              key={loads}
              className="home-browser__load"
              style={{ "--load": `${String(LOAD)}ms` } as CSSProperties}
            />
          ) : null}
        </div>
        <div className="home-browser__screen" data-in={beat >= 1 ? "" : undefined}>
          {SITES.map((site, i) => (
            <img
              key={site.file}
              src={`/sites/${site.file}.jpg`}
              alt={i === at ? `${site.name}’s website, built by Keystone` : ""}
              className="home-browser__page"
              data-on={i === at || undefined}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
      <span className="home-browser__live" data-hue="green" data-in={beat >= 2 ? "" : undefined}>
        <i aria-hidden />
        Live
      </span>
    </div>
  );
}

// The call comes in and is answered; the text it leads to is typed and sent.
const CALL_BEATS = [900, 1700, 2700] as const;

function Receptionist() {
  const ref = useRef<HTMLDivElement>(null);
  const beat = useBeats(ref, CALL_BEATS);
  const answered = beat >= 1;
  return (
    <>
      <div ref={ref} className="home-sat home-call" data-answered={answered ? "" : undefined}>
        <span className="home-call__icon" aria-hidden>
          <Icon name="phone" />
        </span>
        <span className="home-call__words">
          <span className="home-call__head">
            <span className="home-call__state">
              <b data-on={answered ? undefined : ""}>Incoming call</b>
              <b data-on={answered ? "" : undefined}>
                Call answered<span className="home-call__len">1:12</span>
              </b>
            </span>
            <span className="home-call__time">2:14 PM</span>
          </span>
          <span className="home-call__who">
            <span className="home-call__name">Dana M.</span>
            <span className="home-call__detail" data-on={answered ? "" : undefined}>
              Thursday gel fill
            </span>
          </span>
        </span>
      </div>
      <div className="home-sat home-text" data-in={beat >= 2 ? "" : undefined}>
        <span className="home-text__head">
          <b>Texted Dana</b>
          <span className="home-text__time">2:15 PM</span>
        </span>
        <span className="home-text__slot">
          <span className="home-text__typing" data-on={beat === 2 ? "" : undefined} aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <p className="home-text__bubble" data-on={beat >= 3 ? "" : undefined}>
            Hi Dana, Thursday at 10 AM is open. Book it here:
            <span className="home-text__link">book.studio/thu-10am</span>
          </p>
        </span>
      </div>
    </>
  );
}

// A week of the ad's leads, day by day, to the twelve the card says; then what each one cost.
const LEADS = [1, 2, 1, 3, 2, 1, 2] as const;
const DAILY = 20;
const AD_BEATS = [...LEADS.map((_, day) => 400 + day * 260), 400 + LEADS.length * 260 + 450];

function Ads() {
  const ref = useRef<HTMLDivElement>(null);
  const beat = useBeats(ref, AD_BEATS);
  const days = Math.min(beat, LEADS.length);
  const leads = LEADS.slice(0, days).reduce((sum, count) => sum + count, 0);
  const priced = beat > LEADS.length;
  return (
    <div ref={ref} className="home-sat home-ads">
      <div className="home-ads__head">
        <span>
          <Icon name="meta" />
          Meta ads · $20 a day
        </span>
        <span className="home-ads__when">7 days</span>
      </div>
      <div className="home-ads__main">
        <span className="home-ads__big">
          <b>
            <Count value={leads} columns={2} />
          </b>
          <span>leads</span>
        </span>
        <span className="home-ads__chart" aria-hidden>
          {LEADS.map((count, index) => (
            <i
              key={index}
              style={{ "--h": index < days ? count / 3 : 0 } as CSSProperties}
              data-on={index === days - 1 ? "" : undefined}
            />
          ))}
        </span>
      </div>
      <dl className="home-ads__stats">
        <div>
          <dt>Spent</dt>
          <dd>
            $<Count value={days * DAILY} columns={3} />
          </dd>
        </div>
        <div>
          <dt>Per lead</dt>
          <dd className="home-ads__per">
            <span data-on={priced ? undefined : ""} aria-hidden>
              –
            </span>
            <span data-on={priced ? "" : undefined}>$11.67</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}

// A week on the calendar: the days posted, today, and the posts still to go out, each a crop of
// the florist's own photograph. The posts land in their days in turn.
const WEEK: readonly {
  day: string;
  date: number;
  today?: boolean;
  post?: { at: string; done?: boolean; crop: string };
}[] = [
  { day: "M", date: 17, post: { at: "Posted", done: true, crop: "18% 30%" } },
  { day: "T", date: 18 },
  { day: "W", date: 19, today: true, post: { at: "Posted", done: true, crop: "72% 74%" } },
  { day: "T", date: 20, post: { at: "9 AM", crop: "92% 46%" } },
  { day: "F", date: 21 },
  { day: "S", date: 22, post: { at: "11 AM", crop: "97% 90%" } },
  { day: "S", date: 23 },
];
const POSTS = WEEK.filter((each) => each.post).length;
const POST_BEATS = Array.from({ length: POSTS }, (_, index) => 400 + index * 380);

function Calendar() {
  const ref = useRef<HTMLDivElement>(null);
  const beat = useBeats(ref, POST_BEATS);
  let landed = 0;
  return (
    <div ref={ref} className="home-sat home-cal">
      <div className="home-cal__head">
        <span>
          <Icon name="instagram" />
          Nov 17 – 23
        </span>
        <span className="home-cal__count">
          <Count value={beat} columns={1} /> posts
        </span>
      </div>
      <ol className="home-cal__week">
        {WEEK.map((each) => {
          const order = each.post ? landed++ : -1;
          const on = each.post && beat > order;
          return (
            <li key={each.date} className="home-cal__day" data-today={each.today ? "" : undefined}>
              <span className="home-cal__date">
                {each.day}
                <b>{each.date}</b>
              </span>
              <span className="home-cal__slot">
                {each.post ? (
                  <i
                    className="home-cal__thumb"
                    data-on={on ? "" : undefined}
                    style={{ "--crop": each.post.crop } as CSSProperties}
                    aria-hidden
                  />
                ) : null}
              </span>
              {each.post ? (
                <span
                  className="home-cal__at"
                  data-done={each.post.done ? "" : undefined}
                  data-on={on ? "" : undefined}
                >
                  {each.post.done ? <Icon name="check" label="Posted" /> : each.post.at}
                </span>
              ) : (
                <span className="home-cal__at" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const PROOF: Record<EntryId, () => ReactNode> = {
  grader: Scorecard,
  website: Browser,
  receptionist: Receptionist,
  ads: Ads,
  social: Calendar,
};
