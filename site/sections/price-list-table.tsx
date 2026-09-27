/** The usage price list table (price-table 1184:51713 · 52181 · 52452;
 * rows price-list-header 1208:54055, price-list-category 1204:53275,
 * price-list-item 1204:53276): a label band, then each category as a
 * dotted heading over its jobs, each job a hairline row with the driver
 * under the name and the range over its credits at the right. Semantic
 * tables, one per category, so a reader hears "Job, Price range" for
 * every row. */

import {
  PRICE_LIST_CATEGORIES,
  PRICE_LIST_TABLE_LABELS,
  type PriceListCategory,
} from "./price-list-table-data";

function CategoryTable({ category }: { category: PriceListCategory }) {
  const headingId = `price-list-${category.id}`;
  return (
    <section className="ut-cat" id={headingId} data-hue={category.hue}>
      <h2 className="ut-cat-head">
        <i className="ut-dot" aria-hidden="true" />
        <span className="type ts-text-lg-regular ut-cat-name">{category.name}</span>
        <span className="type ts-text-sm-light ut-cat-count">
          {PRICE_LIST_TABLE_LABELS.count(category.jobs.length)}
        </span>
      </h2>
      <table className="ut-table" aria-labelledby={headingId}>
        <colgroup>
          <col />
          <col className="ut-col-price" />
        </colgroup>
        <thead className="hx-sr">
          <tr>
            <th scope="col">{PRICE_LIST_TABLE_LABELS.job}</th>
            <th scope="col">{PRICE_LIST_TABLE_LABELS.price}</th>
          </tr>
        </thead>
        <tbody>
          {category.jobs.map((job) => (
            <tr key={job.name} className="ut-row">
              <th scope="row" className="ut-job">
                <span className="type ts-text-sm-regular ut-job-name">{job.name}</span>
                <span className="type ts-text-xs-light ut-job-driver">{job.driver}</span>
              </th>
              <td className="ut-cost">
                <span className="type ts-text-xs-medium ut-price">{job.price}</span>
                <span className="type ts-text-xs-light ut-credits">{job.credits}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function PriceListTableSection() {
  return (
    <section className="sec ut" data-landmark="table" aria-label="Price list">
      <div className="ut-labels" aria-hidden="true">
        <p className="ut-label">
          <span className="type ts-text-sm-regular ut-label-name">
            {PRICE_LIST_TABLE_LABELS.job}
          </span>
          <span className="type ts-text-xs-light ut-label-sub">
            {PRICE_LIST_TABLE_LABELS.jobSub}
          </span>
        </p>
        <p className="ut-label ut-label-price">
          <span className="type ts-text-sm-regular ut-label-name">
            {PRICE_LIST_TABLE_LABELS.price}
          </span>
          <span className="type ts-text-xs-light ut-label-sub">
            {PRICE_LIST_TABLE_LABELS.priceSub}
          </span>
        </p>
      </div>
      {PRICE_LIST_CATEGORIES.map((category) => (
        <CategoryTable key={category.id} category={category} />
      ))}
    </section>
  );
}
