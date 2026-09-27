/** Price list footnote (1213:54327 · 54331 · 54343): the range caveat,
 * centred under the table. */

import { PRICE_LIST_NOTE } from "./price-list-note-data";

export function PriceListNoteSection() {
  return (
    <section className="sec un" data-landmark="note">
      <p className="type ts-text-xs-light un-note">{PRICE_LIST_NOTE}</p>
    </section>
  );
}
