"use client";

import { Icon } from "@keystone-sites/marketing-design-system/icon";
import { useInView, useReducedMotion } from "@keystone-sites/marketing-design-system/motion";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import type { Entry, EntryId } from "./content";

/** What each part leaves behind, as the product shows it: one or two pieces of it on the
    photograph's edge, over what the picture can spare (a blurred foreground, a margin), so the
    person at work stays in sight. All of it one business's staged example. */
export function Proof({ entry }: { entry: Entry }) {
  return (
    <figure className="home-proof" data-hue={entry.hue} data-proof={entry.id}>
      <figcaption className="ks-sr">Sample of what Keystone shows: {entry.name}.</figcaption>
      {PROOF[entry.id]}
    </figure>
  );
}

// The Keystone Score as the grade's card sets it: the number over the three bands it falls in,
// a line split where they meet (55 and 75), filled to the score with a knob there, the grade in
// words, and a line per area. In the plate's hue, as every piece is, not the grade's colours.
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

const filled = (score: number, band: { from: number; to: number }) =>
  `${String(Math.min(100, Math.max(0, ((score - band.from) / (band.to - band.from)) * 100)))}%`;

function Scorecard() {
  return (
    <div className="home-sat home-score">
      <span className="home-score__label">Keystone Score</span>
      <span className="home-score__value">
        <b>{SCORE}</b>
        <span>of 100</span>
      </span>
      <span className="home-score__scale" aria-hidden>
        {BANDS.map((band) => (
          <i
            key={band.from}
            style={
              { flexGrow: band.to - band.from, "--fill": filled(SCORE, band) } as CSSProperties
            }
          />
        ))}
        <span className="home-score__knob" style={{ left: `${String(SCORE)}%` }} />
      </span>
      <span className="home-score__pill">
        <i aria-hidden />
        Needs work
      </span>
      <ul className="home-score__areas">
        {AREAS.map((area) => (
          <li key={area.label}>
            <span>{area.label}</span>
            <i aria-hidden style={{ "--w": `${String(area.score)}%` } as CSSProperties} />
            <b>{area.score}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

// A week of the ad's leads, day by day, to the twelve the card says.
const LEADS = [1, 2, 1, 3, 2, 1, 2] as const;

// A week on the calendar: the days posted, today, and the posts still to go out, each a crop of
// the florist's own photograph.
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

const SITES = [
  { file: "aesthetics", name: "House of Aesthetics" },
  { file: "drefadez", name: "DreFadez Barber" },
  { file: "ora", name: "Ōra Medical Clinic" },
  { file: "x2o", name: "X2O Studio" },
  { file: "merin", name: "Miriam Merin, LCSW" },
  { file: "lune", name: "Lune Bodywork" },
] as const;

/** Sites Keystone built, one after another in a quiet browser while it's in view. */
function Browser() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: false });
  const [at, setAt] = useState(0);
  useEffect(() => {
    if (reduce || !seen) return;
    const id = window.setInterval(() => setAt((i) => (i + 1) % SITES.length), 3200);
    return () => window.clearInterval(id);
  }, [reduce, seen]);
  return (
    <div ref={ref} className="home-sat home-browser">
      <div className="home-browser__frame">
        <div className="home-browser__bar" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <div className="home-browser__screen">
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
      <span className="home-browser__live" data-hue="green">
        <i aria-hidden />
        Live
      </span>
    </div>
  );
}

const PROOF: Record<EntryId, ReactNode> = {
  grader: <Scorecard />,
  website: <Browser />,
  receptionist: (
    <>
      <div className="home-sat home-call">
        <span className="home-call__icon" aria-hidden>
          <Icon name="phone" />
        </span>
        <span className="home-call__words">
          <span className="home-call__head">
            <b>Call answered · 1:12</b>
            <span className="home-call__time">2:14 PM</span>
          </span>
          <span>Dana M. · a Thursday gel fill</span>
        </span>
      </div>
      <div className="home-sat home-text">
        <span className="home-text__head">Texted Dana · 2:15 PM</span>
        <p className="home-text__bubble">
          Hi Dana, Thursday at 10 AM is open. Book it here:
          <span className="home-text__link">book.studio/thu-10am</span>
        </p>
      </div>
    </>
  ),
  ads: (
    <div className="home-sat home-ads">
      <div className="home-ads__head">
        <span>
          <Icon name="meta" />
          Meta ads · $20 a day
        </span>
        <span className="home-ads__when">7 days</span>
      </div>
      <div className="home-ads__main">
        <span className="home-ads__big">
          <b>12</b>
          <span>leads</span>
        </span>
        <span className="home-ads__chart" aria-hidden>
          {LEADS.map((count, index) => (
            <i
              key={index}
              style={{ "--h": count / 3 } as CSSProperties}
              data-on={index === LEADS.length - 1 ? "" : undefined}
            />
          ))}
        </span>
      </div>
      <dl className="home-ads__stats">
        <div>
          <dt>Spent</dt>
          <dd>$140</dd>
        </div>
        <div>
          <dt>Per lead</dt>
          <dd>$11.67</dd>
        </div>
      </dl>
    </div>
  ),
  social: (
    <div className="home-sat home-cal">
      <div className="home-cal__head">
        <span>
          <Icon name="instagram" />
          Nov 17 – 23
        </span>
        <span className="home-cal__count">4 posts</span>
      </div>
      <ol className="home-cal__week">
        {WEEK.map((each) => (
          <li key={each.date} className="home-cal__day" data-today={each.today ? "" : undefined}>
            <span className="home-cal__date">
              {each.day}
              <b>{each.date}</b>
            </span>
            {each.post ? (
              <>
                <i
                  className="home-cal__thumb"
                  style={{ "--crop": each.post.crop } as CSSProperties}
                  aria-hidden
                />
                <span className="home-cal__at" data-done={each.post.done ? "" : undefined}>
                  {each.post.done ? <Icon name="check" label="Posted" /> : each.post.at}
                </span>
              </>
            ) : (
              <i className="home-cal__thumb" data-empty="" aria-hidden />
            )}
          </li>
        ))}
      </ol>
    </div>
  ),
};
