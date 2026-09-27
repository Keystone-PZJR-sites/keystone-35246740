/** Usage price list header (head 1184:51689 · 52157 · 52428, intro-row
 * 1184:51712 · intro-stack 52180 · 52451): the crumb back to Pricing,
 * the headline, then the category tags beside the intro at rd1 and
 * under it below. Unpainted; renders settled like the pricing page. */

import { SITE_LINKS } from "@keystone-sites/marketing-design-system/site-links";
import { Slug } from "@keystone-sites/marketing-design-system/primitives/slug";
import { Tag } from "@keystone-sites/marketing-design-system/primitives/tag";
import { USAGE_HEADER } from "./usage-header-data";
import { USAGE_CATEGORIES } from "./usage-table-data";

export function UsageHeaderSection() {
  return (
    <section className="sec uh" data-landmark="header">
      <Slug>
        <a href={SITE_LINKS.pricing}>{USAGE_HEADER.crumbParent}</a>
        <span className="uh-crumb-sep" aria-hidden="true">
          /
        </span>
        <span className="uh-crumb">{USAGE_HEADER.crumb}</span>
      </Slug>
      <h1 className="type ts-display-serif-sm-extralight uh-h1">{USAGE_HEADER.headline}</h1>
      <div className="uh-intro">
        <ul className="uh-tags" aria-label="Categories">
          {USAGE_CATEGORIES.map((category) => (
            <li key={category.id}>
              <Tag hue={category.hue} size="inherit">
                {category.name}
              </Tag>
            </li>
          ))}
        </ul>
        <p className="type ts-text-md-light uh-body">{USAGE_HEADER.intro}</p>
      </div>
    </section>
  );
}
