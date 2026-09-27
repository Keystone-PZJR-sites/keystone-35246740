/** Price list header (head 1184:51689 · 52157 · 52428, intro-row
 * 1184:51712 · intro-stack 52180 · 52451): the crumb back to Pricing,
 * the headline, then the category tags beside the intro at rd1 and
 * under it below. Unpainted; renders settled like the pricing page. */

import { SITE_LINKS } from "@keystone-sites/marketing-design-system/site-links";
import { Slug } from "@keystone-sites/marketing-design-system/primitives/slug";
import { Tag } from "@keystone-sites/marketing-design-system/primitives/tag";
import { PRICE_LIST_HEADER } from "./price-list-header-data";
import { PRICE_LIST_CATEGORIES } from "./price-list-table-data";

export function PriceListHeaderSection() {
  return (
    <section className="sec uh" data-landmark="header">
      <Slug>
        <a href={SITE_LINKS.pricing}>{PRICE_LIST_HEADER.crumbParent}</a>
        <span className="uh-crumb-sep" aria-hidden="true">
          /
        </span>
        <span className="uh-crumb">{PRICE_LIST_HEADER.crumb}</span>
      </Slug>
      <h1 className="type ts-display-serif-sm-extralight uh-h1">{PRICE_LIST_HEADER.headline}</h1>
      <div className="uh-intro">
        <ul className="uh-tags" aria-label="Categories">
          {PRICE_LIST_CATEGORIES.map((category) => (
            <li key={category.id}>
              <Tag hue={category.hue} size="inherit">
                {category.name}
              </Tag>
            </li>
          ))}
        </ul>
        <p className="type ts-text-md-light uh-body">{PRICE_LIST_HEADER.intro}</p>
      </div>
    </section>
  );
}
