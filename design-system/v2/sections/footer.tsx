/** v2 sections — the footer (spec 004). Server component.
 *
 * Anatomy (§1): top block (exposed top row + tagline/grader) · nav (one
 * DOM: accordion rows below 768, columns from 768) · logo block. All
 * structure is ticks; the exposure maps and ornament cells transcribe
 * §2 (per-band, section-local). The only client code is the accordion
 * island (footer-nav.tsx).
 *
 * §2 erratum, recorded 2026-08-23: the rd2 map lists logo-r5 at gy 9 and
 * its filled circle at (3,9) — off by one against §1's block totals
 * (top 3t + nav 3t + logo 5t: r1 at gy 6, sides gy 7–10, r5 at gy 10)
 * and the 1344 node read (505:14569: r1 112 + middle 336 + r5 112).
 * Built from the node: r5 at gy 10, circle at (3,10).
 */

import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { GraderInput } from "../primitives/grader";
import { FooterItem } from "../primitives/footer-item";
import { MEDIA_V2 } from "../media";
import { FooterNav, type FooterNavGroup } from "./footer-nav";

/* ---- §2 exposure maps, section-local ticks ---- */

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
      { gx: 11, gy: 0, shape: "square" },
      { gx: 0, gy: 2, shape: "circle" },
      /* (11,2) is a plain rail cell — the Figma circle there is an
         error (decision 2026-08-24, spec §9) */
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

/* Logo-block maps are logo-local (the block is whole-tick tall and starts
   on a tick, so local anchoring stays in phase — v5 §4). rm/rs share one
   map; rt/rd differ only in the r5 cell count (6 / 7 / 7). */
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

/* ---- nav content (§4) ---- */

/* Podcast destinations carried from the shipping site's footer content
   (design-system/components/footer/footer-content.ts). */
const PODCAST_URL =
  "https://open.spotify.com/show/41MuXEI3TIvCAQW20Ko9cX?si=777efb21569d4d94";
const APPLE_PODCASTS_URL =
  "https://podcasts.apple.com/us/podcast/made-locally/id1895736090";

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

/* Internal targets follow the rebuild sitemap where the page exists on
   this site today, and the sitemap slug where it does not yet. */
function navGroups(social: FooterSocial): Array<{
  id: string;
  label: string;
  openRm: number;
  openRs: number;
  items: NavItem[];
}> {
  return [
    {
      id: "product",
      label: "Product",
      openRm: 7,
      openRs: 6,
      items: [
        { label: "Our Approach", href: "/how-it-works" },
        { label: "Solutions", href: "/solutions" },
        { label: "Our Work", href: "/our-work" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Pricing", href: "/pricing" },
        { label: "Login", href: "/portal", arrow: true, chrome: "dark" },
      ],
    },
    {
      id: "resources",
      label: "Resources",
      openRm: 5,
      openRs: 5,
      items: [
        { label: "Blog", href: "/blog" },
        { label: "Podcast", href: PODCAST_URL },
        { label: "Marketing Report", href: "/marketing-report" },
      ],
    },
    {
      id: "company",
      label: "Company",
      openRm: 5,
      openRs: 5,
      items: [
        { label: "Our Story", href: "/about" },
        { label: "Leadership", href: "/about/team" },
        { label: "Careers", href: "/about/careers" },
      ],
    },
    {
      id: "findus",
      label: "Find Us",
      openRm: 7,
      openRs: 6,
      items: [
        { label: "LinkedIn", href: social.linkedin ?? "#" },
        { label: "Facebook", href: social.facebook ?? "#" },
        { label: "Instagram", href: social.instagram ?? "#" },
        { label: "YouTube", href: social.youtube ?? "#" },
        { label: "Spotify", href: PODCAST_URL },
        { label: "Apple Podcast", href: APPLE_PODCASTS_URL },
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

  const lockup = MEDIA_V2.brand.lockup;

  return (
    <footer className="sec f-footer">
      <Overlay maps={SECTION_MAP} />

      {/* top block: exposed top row (overlay) + tagline / prompt / grader */}
      <div className="f-top">
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
                  Show us your site,&nbsp; we&rsquo;ll show
                  <br className="f-brk-c" /> you the rest.
                </p>
              </div>
              <div className="f-grader">
                <GraderInput size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* nav: one DOM, two structures; client accordion island */}
      <FooterNav groups={groups} />

      {/* logo block: cell rows (overlay) + lockup + copyright */}
      <div className="f-logo">
        <Overlay maps={LOGO_MAP} />
        <div className="f-lockband">
          {/* 8t at every anchor (§6) — pure tick structure */}
          <div
            className="f-lockup"
            role="img"
            aria-label={lockup.alt}
          />
        </div>
        <div className="f-copy">
          <span>&copy; 2026 Keystone</span>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
