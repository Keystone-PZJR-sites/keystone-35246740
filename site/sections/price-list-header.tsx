/** Price list header (header 1213:54246 · 54245 · 54244): the crumb
 * back to Pricing, the headline, then the category tags beside the intro
 * at rd1 and under it below. Unpainted; renders settled like the
 * pricing page. */

import { SITE_LINKS } from "@keystone-sites/marketing-design-system/site-links";
import { Breadcrumb } from "@keystone-sites/marketing-design-system/primitives/breadcrumb";
import { Tag } from "@keystone-sites/marketing-design-system/primitives/tag";
import { PRICE_LIST_CHIP_ORDER, PRICE_LIST_HEADER } from "./price-list-header-data";
import { PRICE_LIST_CATEGORIES } from "./price-list-table-data";

const CHIPS = PRICE_LIST_CHIP_ORDER.flatMap((id) =>
  PRICE_LIST_CATEGORIES.filter((category) => category.id === id),
);

export function PriceListHeaderSection() {
  return (
    <section className="sec uh" data-landmark="header">
      <Breadcrumb
        items={[
          { label: PRICE_LIST_HEADER.crumbParent, href: SITE_LINKS.pricing },
          { label: PRICE_LIST_HEADER.crumb },
        ]}
      />
      <h1 className="type ts-display-serif-sm-extralight uh-h1">{PRICE_LIST_HEADER.headline}</h1>
      <div className="uh-intro">
        <ul className="uh-tags" aria-label="Categories">
          {CHIPS.map((category) => (
            <li key={category.id}>
              <Tag hue={category.hue} size="inherit">
                {category.chip ?? category.name}
              </Tag>
            </li>
          ))}
        </ul>
        <p className="type ts-text-md-light uh-body">{PRICE_LIST_HEADER.intro}</p>
      </div>
    </section>
  );
}
