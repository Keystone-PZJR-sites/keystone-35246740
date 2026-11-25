"use client";

import { Button } from "@keystonepzjr/marketing-design-system/button";
import { Composer, type ComposerState } from "@keystonepzjr/marketing-design-system/composer";
import { Split } from "@keystonepzjr/marketing-design-system/split";
import { Tag } from "@keystonepzjr/marketing-design-system/tag";
import type { CSSProperties, KeyboardEvent } from "react";
import { AskLine, type AskState, Chips } from "./ask";
import { COPY, ENTRIES, WILDCARDS } from "./content";

/** The fold (1b): the line, the composer, and the five ways in under it, each of which drops its
    prompt in and sets its category beside the +. */
export function Hero({ composer, ask }: { composer: ComposerState; ask: AskState }) {
  const set = ask.at;
  // On the empty line the chip is the composer's content: Enter drops its prompt in, Backspace
  // takes it back out.
  const onLineKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!set || composer.value !== "" || !(event.target instanceof HTMLTextAreaElement)) return;
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      event.stopPropagation();
      ask.fill(set);
    } else if (event.key === "Backspace") {
      event.preventDefault();
      ask.clear();
    }
  };
  return (
    <section className="home-hero">
      <div className="home-marks" aria-hidden>
        <span className="home-mark home-mark--sky" data-hue="sky">
          <span className="home-mark__fill" />
          <span className="home-mark__lines" />
        </span>
        <span className="home-mark home-mark--purple" data-hue="purple">
          <span className="home-mark__fill" />
          <span className="home-mark__lines" />
        </span>
      </div>
      <h1 className="ks-h1 home-h1">
        <Split text={COPY.h1[0]} />
        <br />
        <Split text={COPY.h1[1]} from={3} />
      </h1>
      <div className="home-composer" data-hue={set?.hue} onKeyDownCapture={onLineKey}>
        <Composer
          composer={composer}
          placeholder={<AskLine fixed={set} />}
          prompts={WILDCARDS}
          onPrompt={(wildcard) => {
            ask.drop(wildcard.prompt);
          }}
          tools={
            set ? (
              <Tag
                key={set.id}
                hue={set.hue}
                shape={set.shape}
                clearLabel={`Clear ${set.label}`}
                onClear={ask.clear}
              >
                {set.name}
              </Tag>
            ) : null
          }
        />
      </div>
      {/* The row is the end of a sentence: Ask Keystone to, over it. Once one is chosen the rest
          go quiet and the one chosen stays in the row, spent. */}
      <p id="home-ways" className="home-ways">
        Ask Keystone to
      </p>
      <Chips role="group" aria-labelledby="home-ways">
        {ENTRIES.map((each, index) => {
          const on = each.id === set?.id;
          return (
            <Button
              key={each.id}
              variant={set && !on ? "quiet" : "hue"}
              size="lg"
              hue={each.hue}
              shape={each.shape}
              pressed={set ? on : undefined}
              disabled={on}
              style={{ "--i": index } as CSSProperties}
              onClick={() => {
                ask.pick(each);
              }}
            >
              {each.label}
            </Button>
          );
        })}
      </Chips>
    </section>
  );
}
