"use client";

import { Chip } from "@keystone-sites/marketing-design-system/chip";
import {
  prefersReducedMotion,
  useScrollProgress,
} from "@keystone-sites/marketing-design-system/motion";
import { Photo } from "@keystone-sites/marketing-design-system/photo";
import { Shape } from "@keystone-sites/marketing-design-system/shape";
import { type CSSProperties, useRef, useState } from "react";
import { ENTRIES, type Entry } from "./content";
import { Proof } from "./proof";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** The platform (Figma › 02 Timeline): 1a's five outcomes on 22's stage. The stage pins inside its
    block while the empty track after it turns the five, then scrolls off with the block. Words on
    the left beside a hairline the scroll travels; on the right the photograph on its grounds, with
    the piece of the product that outcome leaves behind. The red diamond sits on the section's top
    rule, where the fold shows it. */
export function Platform({ onChoose }: { onChoose: (entry: Entry) => void }) {
  const stage = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useScrollProgress(
    track,
    (_, node) => {
      const travel = node.offsetHeight;
      // 0 as the stage pins (the track's top at the window's foot), 1 as the next sheet arrives.
      const progress =
        travel > 0 ? clamp01((window.innerHeight - node.getBoundingClientRect().top) / travel) : 0;
      stage.current?.style.setProperty("--home-p", progress.toFixed(4));
      setActive(Math.min(ENTRIES.length - 1, Math.floor(progress * ENTRIES.length)));
    },
    "pass",
  );

  const toPart = (index: number) => {
    const node = track.current;
    if (!node) return;
    const top = node.getBoundingClientRect().top + window.scrollY - window.innerHeight;
    window.scrollTo({
      top: top + (node.offsetHeight * (index + 0.5)) / ENTRIES.length,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const current = ENTRIES[active] ?? ENTRIES[0]!;

  return (
    <>
      <span id="platform" className="home-anchor" aria-hidden />
      <span className="home-plat__rule" aria-hidden>
        <span className="home-mark home-mark--red" data-hue="red">
          <span className="home-mark__fill" />
          <span className="home-mark__lines" />
        </span>
      </span>
      <section
        ref={stage}
        className="home-plat"
        data-hue={current.hue}
        aria-label="What Keystone does"
      >
        <div className="home-plat__split ks-page">
          <div className="home-plat__left">
            {/* The way around: the hairline is five lengths, one to a part, and the bar rides it. */}
            <nav className="home-clock" aria-label="Parts of the platform">
              <span className="home-clock__bar" aria-hidden />
              {ENTRIES.map((each, index) => (
                <button
                  key={each.id}
                  type="button"
                  className="home-clock__item"
                  aria-current={active === index ? "step" : undefined}
                  aria-label={`${each.n}. ${each.name}`}
                  onClick={() => {
                    toPart(index);
                  }}
                />
              ))}
            </nav>
            <Story key={current.id} entry={current} onChoose={onChoose} />
          </div>

          <div className="home-plat__right">
            <Plate entry={current} reel={ENTRIES} at={active} />
          </div>
        </div>
      </section>
      <div ref={track} className="home-plat__track" aria-hidden />

      {/* Without the pin (a narrow window, or reduced motion): the five one after another. */}
      <div className="home-plat__list">
        {ENTRIES.map((each) => (
          <article key={each.id} className="home-plat__item" data-hue={each.hue}>
            <Story entry={each} onChoose={onChoose} />
            <div className="home-plat__pic">
              <Plate entry={each} reel={[each]} at={0} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

// One part in words (Figma › 02 Timeline › Container): its shape on a tile of the hue's light, the
// outcome, two lines on how, and the button that hands it to the composer.
function Story({ entry, onChoose }: { entry: Entry; onChoose: (entry: Entry) => void }) {
  return (
    <div className="home-story" data-hue={entry.hue}>
      <span className="home-story__tile" aria-hidden>
        <Shape name={entry.shape} />
      </span>
      <h2 className="home-story__title">
        {entry.lines.map((line) => (
          <span key={line}>{line} </span>
        ))}
      </h2>
      <p className="home-story__body">{entry.body}</p>
      <Chip
        variant="hue"
        hue={entry.hue}
        icon="arrow-up"
        className="home-story__ask"
        onClick={() => {
          onChoose(entry);
        }}
      >
        {entry.label}
      </Chip>
    </div>
  );
}

// The picture half (Figma › 02 Timeline › Container): a sheet of the hue's full, a corner of its
// light lattice, the photograph a cell down and right of both, and a strip of lattice under the
// photograph's foot. `reel` is every photograph the window can show and `at` the one showing.
// Over the photograph's corner, what Keystone made.
function Plate({ entry, reel, at }: { entry: Entry; reel: readonly Entry[]; at: number }) {
  return (
    <div className="home-plate" data-hue={entry.hue}>
      <div className="home-plate__art" aria-hidden>
        <div className="home-plate__sheet ks-ground" data-ground="full" />
        <div
          className="home-plate__peek ks-ground"
          data-ground="light"
          data-lattice=""
          data-edge=""
        />
        <div className="home-plate__window">
          <div className="home-plate__reel" style={{ "--at": at } as CSSProperties}>
            {reel.map((each, index) => (
              <Photo
                key={each.id}
                src={each.photo}
                focus={each.focus}
                eager={index === 0}
                className="home-plate__photo"
              />
            ))}
          </div>
        </div>
        <div className="home-plate__strip ks-ground" data-ground="light" />
      </div>
      <Proof key={entry.id} entry={entry} />
    </div>
  );
}
