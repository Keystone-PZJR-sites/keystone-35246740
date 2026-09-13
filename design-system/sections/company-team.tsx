import { GridRegion, type GridBand } from "../grid/region";
import { InterpText } from "../primitives/text";
import { Slug } from "../primitives/slug";
import { teamPortrait } from "../media";
import { COMPANY_TEAM } from "./company-data";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* Lattice: the 1fr grid renders in unpainted air; the flow closer ends
 * the section exactly one tick below the last portrait row. The
 * section is content-sized — the page grid is perceptual, carried by
 * the closer rows. No gutter furniture. */

/** Portrait source, classified once at the boundary. */
export type TeamMemberPortrait =
  | { type: "static"; src: string; width: number; height: number }
  | { type: "live"; url: string }
  | { type: "initials" };

export interface TeamRosterMember {
  /** Live ids are string UUIDs (the package type says number; the
   * boundary accepts both and normalizes to string). */
  id: string;
  name: string;
  position: string;
  portrait: TeamMemberPortrait;
}

/** Validates the getTeamMembers() payload at the boundary: keeps
 * well-formed records and resolves each portrait (static registry by
 * name slug → live photo attachment → initials). Backend order is the
 * designed order; sort_order overrides it only where present. */
export function toTeamRoster(raw: unknown): TeamRosterMember[] {
  if (!Array.isArray(raw)) return [];
  const members: Array<TeamRosterMember & { sort: number }> = [];
  for (const item of raw) {
    if (!isRecord(item) || !isId(item.id) || typeof item.name !== "string") continue;
    members.push({
      id: String(item.id),
      name: item.name,
      position: typeof item.position === "string" ? item.position : "",
      portrait: resolvePortrait(item, item.name),
      sort: typeof item.sort_order === "number" ? item.sort_order : members.length,
    });
  }
  members.sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name));
  return members.map(({ id, name, position, portrait }) => ({ id, name, position, portrait }));
}

function isId(value: unknown): value is string | number {
  return typeof value === "string" || typeof value === "number";
}

function resolvePortrait(item: Record<string, unknown>, name: string): TeamMemberPortrait {
  const asset = teamPortrait(name);
  if (asset) {
    return { type: "static", src: asset.src, width: asset.width, height: asset.height };
  }
  const attachment = Array.isArray(item.photo_attachments) ? item.photo_attachments[0] : undefined;
  const photo = isRecord(attachment) && isRecord(attachment.photo) ? attachment.photo : undefined;
  const url =
    photoString(photo, "medium_url") ??
    photoString(photo, "large_url") ??
    photoString(photo, "original_url");
  return url ? { type: "live", url } : { type: "initials" };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function photoString(photo: Record<string, unknown> | undefined, key: string): string | undefined {
  const value = photo?.[key];
  return typeof value === "string" ? value : undefined;
}

/** First letters of the first and last name words. */
function initials(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1][0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

function Portrait({ member }: { member: TeamRosterMember }) {
  switch (member.portrait.type) {
    case "static":
      return (
        <img
          src={member.portrait.src}
          width={member.portrait.width}
          height={member.portrait.height}
          alt=""
          loading="lazy"
        />
      );
    case "live":
      /* Live photos have no known intrinsic size; the square cell
       * governs layout, so declared dimensions are the cell design. */
      return <img src={member.portrait.url} width={400} height={400} alt="" loading="lazy" />;
    case "initials":
      return (
        <span className="co-cell-initials" aria-hidden="true">
          {initials(member.name)}
        </span>
      );
  }
}

export function CompanyTeamSection({ members }: { members: TeamRosterMember[] }) {
  return (
    <section
      id="team"
      className="sec company-team"
      aria-label="The team"
      data-landmark="company-team"
    >
      <header className="cot-head" data-landmark="head">
        <Slug>{COMPANY_TEAM.eyebrow}</Slug>
        <InterpText as="h2" style="display-serif-xs-extralight" className="co-h2">
          {COMPANY_TEAM.title}
        </InterpText>
        <InterpText as="p" style="text-md-light" className="cot-desc co-body-text">
          {COMPANY_TEAM.description}
        </InterpText>
      </header>

      {/* Names and roles render as visible captions; portraits stay alt="". */}
      <ul className="cot-grid" data-landmark="grid">
        {members.map((member) => (
          <li key={member.id} className="co-cell">
            <span className="co-cell-photo">
              <Portrait member={member} />
            </span>
            <span className="co-cell-name">{member.name}</span>
            {member.position && <span className="co-cell-role">{member.position}</span>}
          </li>
        ))}
      </ul>

      <div className="co-closer" aria-hidden="true">
        <div className="gx co-bleed-grid">
          {BANDS.map((band) => (
            <GridRegion key={band} band={band} gx={0} gy={0} gw={12} />
          ))}
        </div>
      </div>
    </section>
  );
}
