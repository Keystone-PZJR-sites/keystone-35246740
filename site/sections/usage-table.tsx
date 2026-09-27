/** The usage price list table (price-table 1184:51713 · 52181 · 52452):
 * a label row, then each category as a swatched heading over its jobs,
 * each job a hairline row with the driver under the name and the range
 * over the credits. Semantic tables, one per category, so a reader
 * hears "Job, Price range" for every row. */

import { USAGE_CATEGORIES, USAGE_TABLE_LABELS, type UsageCategory } from "./usage-table-data";

function CategoryTable({ category }: { category: UsageCategory }) {
  const headingId = `usage-${category.id}`;
  return (
    <section className="ut-cat" id={headingId} data-hue={category.hue}>
      <h2 className="ut-cat-head">
        <i className="ut-swatch" aria-hidden="true" />
        <span className="type ts-text-lg-regular ut-cat-name">{category.name}</span>
        <span className="type ts-text-sm-light ut-cat-count">
          {USAGE_TABLE_LABELS.count(category.jobs.length)}
        </span>
      </h2>
      <table className="ut-table" aria-labelledby={headingId}>
        <colgroup>
          <col />
          <col className="ut-col-price" />
        </colgroup>
        <thead className="hx-sr">
          <tr>
            <th scope="col">{USAGE_TABLE_LABELS.job}</th>
            <th scope="col">{USAGE_TABLE_LABELS.price}</th>
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
                <span className="type ts-text-sm-medium ut-price">{job.price}</span>
                <span className="type ts-text-xs-light ut-credits">{job.credits}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function UsageTableSection() {
  return (
    <section className="sec ut" data-landmark="table" aria-label="Usage price list">
      <div className="ut-labels" aria-hidden="true">
        <p className="ut-label">
          <span className="type ts-text-sm-medium ut-label-name">{USAGE_TABLE_LABELS.job}</span>
          <span className="type ts-text-xs-regular ut-label-sub">{USAGE_TABLE_LABELS.jobSub}</span>
        </p>
        <p className="ut-label ut-label-price">
          <span className="type ts-text-sm-medium ut-label-name">{USAGE_TABLE_LABELS.price}</span>
          <span className="type ts-text-xs-regular ut-label-sub">
            {USAGE_TABLE_LABELS.priceSub}
          </span>
        </p>
      </div>
      {USAGE_CATEGORIES.map((category) => (
        <CategoryTable key={category.id} category={category} />
      ))}
      <i className="ut-end" aria-hidden="true" />
    </section>
  );
}
