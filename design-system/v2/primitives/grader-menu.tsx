/** v2 primitives — GraderSelectMenu. The set's `grader-select-menu`: a
 * listbox of business rows (name over address) under the active pill,
 * in the Grader API's two groups — Google Places, then independent
 * websites — each under a small label. Purely presentational: the island
 * owns which row is active and what a choice does. Rows are buttons so
 * pointer users get a real target; they never take focus (the input
 * keeps it, the combobox pattern). Row indices run flat across the
 * groups in display order, matching the hook's `results`.
 */

import type { GraderSuggestion } from "../lib/grader";
import type { GraderSearchGroups } from "../lib/use-grader-search";

export interface GraderMenuLabels {
  places: string;
  web: string;
}

export interface GraderSelectMenuProps {
  id: string;
  label: string;
  groups: GraderSearchGroups;
  groupLabels: GraderMenuLabels;
  activeIndex: number;
  optionId: (index: number) => string;
  onActivate: (index: number) => void;
  onChoose: (item: GraderSuggestion) => void;
}

export function GraderSelectMenu({
  id,
  label,
  groups,
  groupLabels,
  activeIndex,
  optionId,
  onActivate,
  onChoose,
}: GraderSelectMenuProps) {
  const sections = [
    { key: "places", label: groupLabels.places, items: groups.places, offset: 0 },
    { key: "web", label: groupLabels.web, items: groups.web, offset: groups.places.length },
  ].filter((s) => s.items.length > 0);

  return (
    <ul className="grader-menu" id={id} role="listbox" aria-label={label}>
      {sections.map((section) => {
        const labelId = `${id}-${section.key}`;
        return (
          <li key={section.key} className="grader-group" role="group" aria-labelledby={labelId}>
            <span className="grader-group-label" id={labelId}>
              {section.label}
            </span>
            <ul className="grader-group-rows" role="presentation">
              {section.items.map((item, i) => {
                const index = section.offset + i;
                const active = index === activeIndex;
                return (
                  <li key={item.id} role="presentation">
                    <button
                      type="button"
                      className="grader-option"
                      role="option"
                      id={optionId(index)}
                      aria-selected={active}
                      data-active={active || undefined}
                      tabIndex={-1}
                      // keep focus (and the open menu) on the input through the click
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseEnter={() => onActivate(index)}
                      onClick={() => onChoose(item)}
                    >
                      <span className="grader-option-name">{item.name}</span>
                      <span className="grader-option-sub">{item.address}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
