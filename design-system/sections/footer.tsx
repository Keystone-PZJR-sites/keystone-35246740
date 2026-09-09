import { CookiePreferencesLink } from "@keystone-sites/widgets/consent/CookiePreferencesLink";
import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { GraderInput } from "../primitives/grader";
import { FooterItem } from "../primitives/footer-item";
import { MEDIA } from "../media";
import { SITE_LINKS } from "../site-links";
import { FooterNav, type FooterNavGroup } from "./footer-nav";

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}
interface Orn extends R {
  shape: "square" | "circle" | "outline";
}
interface BandMap {
  regions: R[];
  ornaments: Orn[];
}

const SECTION_MAP: Record<GridBand, BandMap> = {
  rm: {
    regions: [
      { gx: 0, gy: 0, gw: 12, gh: 1 },
      { gx: 11, gy: 1, gw: 1, gh: 17 },
    ],
    ornaments: [
      { gx: 1, gy: 0, shape: "circle" },
      { gx: 11, gy: 7, shape: "outline" },
    ],
  },
  rs: {
    regions: [
      { gx: 0, gy: 0, gw: 12, gh: 1 },
      { gx: 0, gy: 1, gw: 1, gh: 14 },
      { gx: 11, gy: 1, gw: 1, gh: 14 },
    ],
    ornaments: [
      { gx: 1, gy: 0, shape: "circle" },
      { gx: 11, gy: 6, shape: "outline" },
    ],
  },
  rt: {
    regions: [
      { gx: 0, gy: 0, gw: 12, gh: 1 },
      { gx: 0, gy: 1, gw: 1, gh: 5 },
      { gx: 11, gy: 1, gw: 1, gh: 5 },
    ],
    ornaments: [
      { gx: 0, gy: 2, shape: "circle" },
      { gx: 3, gy: 9, shape: "outline" },
    ],
  },
  rd1: {
    regions: [{ gx: 0, gy: 0, gw: 12, gh: 1 }],
    ornaments: [
      { gx: 1, gy: 0, shape: "circle" },
      { gx: 3, gy: 6, shape: "outline" },
    ],
  },
  rd2: {
    regions: [{ gx: 0, gy: 0, gw: 12, gh: 1 }],
    ornaments: [
      { gx: 3, gy: 0, shape: "circle" },
      { gx: 3, gy: 5, shape: "outline" },
    ],
  },
};

/* Logo maps use block-local tick coordinates. */
function logoMap(r5Cells: number | null): BandMap {
  return {
    regions: [
      { gx: 0, gy: 0, gw: 12, gh: 1 },
      { gx: 0, gy: 1, gw: 1, gh: 3 },
      { gx: 11, gy: 1, gw: 1, gh: 3 },
      r5Cells === null
        ? { gx: 0, gy: 4, gw: 12, gh: 1 }
        : { gx: 0, gy: 4, gw: r5Cells, gh: 1 },
    ],
    ornaments: [
      { gx: 8, gy: 0, shape: "square" },
      { gx: 3, gy: 4, shape: "circle" },
    ],
  };
}
const LOGO_MAP: Record<GridBand, BandMap> = {
  rm: logoMap(null),
  rs: logoMap(null),
  rt: logoMap(6),
  rd1: logoMap(7),
  rd2: logoMap(7),
};

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

function Overlay({ maps }: { maps: Record<GridBand, BandMap> }) {
  return (
    <div className="gx" aria-hidden="true">
      {BANDS.map((band) => [
        ...maps[band].regions.map((r, i) => (
          <GridRegion key={`${band}-r${i}`} band={band} {...r} />
        )),
        ...maps[band].ornaments.map((o, i) => (
          <GridDecor key={`${band}-o${i}`} band={band} gx={o.gx} gy={o.gy}>
            <span
              className={
                o.shape === "square"
                  ? "f-cell fill"
                  : o.shape === "circle"
                    ? "f-cell fill round"
                    : "f-cell round"
              }
            />
          </GridDecor>
        )),
      ])}
    </div>
  );
}

export interface FooterSocial {
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

interface NavItem {
  label: string;
  href: string;
  arrow?: boolean;
  chrome?: "light" | "dark";
}

function navGroups(social: FooterSocial): Array<{
  id: string;
  label: string;
  openRm: number;
  openRs: number;
  items: NavItem[];
}> {
  const socialItems: NavItem[] = [];
  if (social.linkedin) socialItems.push({ label: "LinkedIn", href: social.linkedin });
  if (social.facebook) socialItems.push({ label: "Facebook", href: social.facebook });
  if (social.instagram) socialItems.push({ label: "Instagram", href: social.instagram });
  if (social.youtube) socialItems.push({ label: "YouTube", href: social.youtube });

  return [
    {
      id: "product",
      label: "Product",
      openRm: 7,
      openRs: 6,
      items: [
        { label: "Our Approach", href: SITE_LINKS.approach },
        { label: "Solutions", href: SITE_LINKS.solutions },
        { label: "Our Work", href: SITE_LINKS.ourWork },
        { label: "Case Studies", href: SITE_LINKS.caseStudies },
        { label: "Pricing", href: SITE_LINKS.pricing },
        { label: "Login", href: SITE_LINKS.login, arrow: true, chrome: "dark" },
      ],
    },
    {
      id: "resources",
      label: "Resources",
      openRm: 5,
      openRs: 5,
      items: [
        { label: "Blog", href: SITE_LINKS.blog },
        { label: "Podcast", href: SITE_LINKS.spotify },
        { label: "Marketing Report", href: SITE_LINKS.marketingReport },
      ],
    },
    {
      id: "company",
      label: "Company",
      openRm: 5,
      openRs: 5,
      items: [
        { label: "Our Story", href: SITE_LINKS.about },
        { label: "Leadership", href: SITE_LINKS.leadership },
        { label: "Careers", href: SITE_LINKS.careers },
      ],
    },
    {
      id: "findus",
      label: "Find Us",
      openRm: 8,
      openRs: 7,
      items: [
        ...socialItems,
        { label: "Spotify", href: SITE_LINKS.spotify },
        { label: "Apple Podcast", href: SITE_LINKS.applePodcasts },
      ],
    },
  ];
}

export function FooterSection({ social = {} }: { social?: FooterSocial }) {
  const groups: FooterNavGroup[] = navGroups(social).map((g) => ({
    id: g.id,
    label: g.label,
    openRm: g.openRm,
    openRs: g.openRs,
    list: (
      <ul className="fnav-list">
        {g.items.map((item) => (
          <li key={item.label}>
            <FooterItem
              size="md"
              chrome={item.chrome ?? "light"}
              href={item.href}
              arrow={item.arrow}
            >
              {item.label}
            </FooterItem>
          </li>
        ))}
      </ul>
    ),
  }));

  const lockup = MEDIA.brand.lockup;

  return (
    <footer className="sec f-footer">
      <Overlay maps={SECTION_MAP} />

      <div className="f-top" data-landmark="top">
        <div className="f-ti">
          <div className="f-tag">
            <div className="f-tagrow">
              <span className="f-dot f-dot-tag" aria-hidden="true" />
              <p className="f-tagline">
                Great businesses
                <br className="f-brk-a" /> deserve
                <br className="f-brk-b" /> to be found.
              </p>
            </div>
          </div>
          <div className="f-inp">
            <div className="f-inpcol">
              <div className="f-promptrow">
                <span className="f-dot f-dot-prompt" aria-hidden="true" />
                <p className="f-prompt">
                  {/* Keep the phrase together at this comma. */}
                  Show us your site,{"\u00a0"} we’ll show
                  <br className="f-brk-c" /> you the rest.
                </p>
              </div>
            <div className="f-grader" id="grader">
                <GraderInput size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterNav groups={groups} />

      <div className="f-logo" data-landmark="logo">
        <Overlay maps={LOGO_MAP} />
        <div className="f-lockband">
          <div
            className="f-lockup"
            role="img"
            aria-label={lockup.alt}
          />
        </div>
        <div className="f-copy">
          <span>© 2026 Keystone</span>
          <div className="f-legal-links">
            <a href={SITE_LINKS.terms}>Terms of Service</a>
            <a href={SITE_LINKS.privacy}>Privacy Policy</a>
            <a href={SITE_LINKS.accessibility}>Accessibility</a>
            <CookiePreferencesLink label="Cookie preferences" className="f-legal-preferences" />
          </div>
        </div>
      </div>
    </footer>
  );
}
