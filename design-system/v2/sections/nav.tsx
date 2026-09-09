/** v2 sections — the global nav chrome (spec 005). Server component.
 *
 * One component, two structures, gated at the rd1 boundary (§1): a
 * desktop bar (fixed at the viewport top; rail left, Login right, the
 * space between transparent) with a hover-revealed subnav drawer, and a
 * mobile rail (fixed at the viewport top, amended 2026-08-28) with a
 * full-height menu panel carrying footer-grammar drawers.
 *
 * The nav is overlay chrome — it never participates in a section's tick
 * stack; the bar height (44) and all component internals are material.
 * Client code is two islands: the desktop drawer controller
 * (nav-desktop.tsx) and the mobile panel (nav-mobile.tsx). Everything
 * heavy — drawer contents, chips, buttons — is server-rendered here and
 * passed into the islands as nodes.
 *
 * Link targets (decision 2026-08-24, recorded at build per §7): the new
 * sitemap routes; the engine subitems anchor their homepage panels
 * (/#engine-<id> — owner direction 2026-09-08, spec 005 §9 F19; the
 * All chip keeps /solutions); the three resources cards and chips
 * point at their index pages for now; Get Started goes to /pricing;
 * Login goes to the external console (owner decision 2026-08-27, spec
 * 010 §7 F4).
 */

import type { CSSProperties } from "react";
import { IconArrowRight, IconBlog, IconGrader, IconPodcast } from "../icons";
import { ButtonFill } from "../primitives/buttons";
import { NavDesktop } from "./nav-desktop";
import { NavMobile, type NavMobileRow } from "./nav-mobile";

/* ---- link map ---- */

const LINKS = {
  home: "/",
  ourWork: "/our-work",
  solutions: "/solutions",
  pricing: "/pricing",
  company: "/company",
  resources: "/resources",
  login: "https://console.localkeystone.com/login",
  /* the homepage system section, interim until /how-it-works exists
     (owner direction 2026-09-08 — spec 005 §9 F21) */
  approach: "/#system",
  getStarted: "/pricing",
};

/** An engine subitem's target — its homepage panel anchor (owner
 * direction 2026-09-08, spec 005 §9 F19; the ids live on the engine
 * section's stack panels, spec 020 §9 R26). */
function engineAnchor(id: string): string {
  return `${LINKS.home}#engine-${id}`;
}

/* ---- content (§3, transcribed from the sets 2026-08-24) ---- */

/* Engine order is the narrative canon (Brand → Visibility → Ads →
   Reception → Engagement — owner direction 2026-09-08, spec 005 §9
   F20, matching the homepage's post-019-relabel order; the slot hues
   stay orange · yellow · pink · purple · blue). */
const ENGINES = [
  {
    id: "brand",
    label: "Brand",
    desc: "Establish credibility: polished websites, profiles, and reviews.",
  },
  {
    id: "visibility",
    label: "Visibility",
    desc: "Get found: show up everywhere customers search and discover.",
  },
  {
    id: "ads",
    label: "Ads",
    desc: "Bring in new customers: ads that pay for and improve themselves.",
  },
  {
    id: "reception",
    label: "Reception",
    desc: "Never miss a customer: every question answered, on every channel.",
  },
  {
    id: "engagement",
    label: "Engagement",
    desc: "Keep every customer warm: regular touchpoints that bring them back.",
  },
] as const;

const RESOURCE_CARDS = [
  {
    id: "blog",
    title: "The Blog",
    desc: "Practical marketing advice for small business owners who want to grow.",
    chipLabel: "Blog",
    Icon: IconBlog,
  },
  {
    id: "grader",
    title: "The Grader",
    desc: "A free look at how your business shows up online, and what to fix first.",
    chipLabel: "Grader",
    Icon: IconGrader,
  },
  {
    id: "podcast",
    title: "The Podcast",
    desc: "Conversations with small business owners building on their own.",
    chipLabel: "Podcast",
    Icon: IconPodcast,
  },
] as const;

/* Decorative 4×4 card lattices (§3): which cells render full-radius,
   row-major, read from the drawer nodes 2026-08-24. Built like a spec
   002 region — outer border plus single interior lines (per-cell
   borders would double every shared edge) — with the circles overlaid
   line-inclusively on their cells. On hover each non-corner circle
   slides one cell in its designed direction (dx/dy in cells, from the
   nav-feature-card hover set 549:37044, added 2026-08-24 — §9). */
interface DecorCircle {
  i: number;
  dx?: number;
  dy?: number;
}
/* Re-read 2026-08-24 after design normalized the set: every card now
   lands its circles on the same hover cells (0, 6, 11); the starts
   differ per card (pairing by layer identity in the file). */
const DECOR_CIRCLES: Record<string, DecorCircle[]> = {
  feature: [{ i: 0 }, { i: 7, dx: -1 }, { i: 10, dx: 1 }],
  blog: [{ i: 0 }, { i: 5, dx: 1 }, { i: 15, dy: -1 }],
  grader: [{ i: 0 }, { i: 7, dx: -1 }, { i: 15, dy: -1 }],
  podcast: [{ i: 0 }, { i: 2, dy: 1 }, { i: 10, dx: 1 }],
};

function Decor({ variant }: { variant: keyof typeof DECOR_CIRCLES }) {
  const lines = [1, 2, 3];
  return (
    <span className="knav-decor" data-decor={variant} aria-hidden="true">
      {lines.map((n) => (
        <i key={`v${n}`} className="v" style={{ "--n": n } as CSSProperties} />
      ))}
      {lines.map((n) => (
        <i key={`h${n}`} className="h" style={{ "--n": n } as CSSProperties} />
      ))}
      {DECOR_CIRCLES[variant].map(({ i, dx, dy }) => (
        <i
          key={`c${i}`}
          className="c"
          style={
            {
              "--cx": i % 4,
              "--cy": Math.floor(i / 4),
              ...(dx && { "--dx": dx }),
              ...(dy && { "--dy": dy }),
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}

/* Stagger index for the reveal cascade (§6.3): reading order — labels
   and cards each carry --i; blocks start 60ms in, 50ms apart. */
function blk(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

function SolutionsDrawerContent() {
  const cols = [ENGINES.slice(0, 3), ENGINES.slice(3)];
  let i = 1;
  return (
    <div className="knav-dcontent" data-content="solutions">
      <div className="knav-dlabels">
        <span className="knav-dlabel knav-blk" style={blk(0)}>
          Marketing Engines
        </span>
        <span className="knav-dlabel knav-dlabel-b knav-blk" style={blk(6)}>
          How it all works
        </span>
      </div>
      <div className="knav-dbody">
        {cols.map((col, c) => [
          c > 0 && <i key={`d${c}`} className="knav-dvr" aria-hidden="true" />,
          <div key={c} className="knav-dcol">
            {col.map((e) => (
              <a
                key={e.id}
                className="knav-sub knav-blk"
                style={blk(i++)}
                href={engineAnchor(e.id)}
              >
                <span className="knav-subhead">
                  <span className="knav-subtitle">{e.label}</span>
                  <i className="knav-subdot" data-engine={e.id} aria-hidden="true" />
                </span>
                <span className="knav-subdesc">{e.desc}</span>
              </a>
            ))}
          </div>,
        ])}
        <i className="knav-dvr" aria-hidden="true" />
        <a className="knav-card knav-fcard knav-blk" style={blk(7)} href={LINKS.approach}>
          <Decor variant="feature" />
          <span className="knav-fcopy">
            One system, one full picture of your business’s marketing,
            starting with your site.
          </span>
          <span className="knav-frow">
            <span className="knav-flabel">Our approach</span>
            <IconArrowRight />
          </span>
        </a>
      </div>
    </div>
  );
}

function ResourcesDrawerContent() {
  return (
    <div className="knav-dcontent" data-content="resources">
      <div className="knav-dlabels">
        <span className="knav-dlabel knav-blk" style={blk(0)}>
          Resources for small businesses
        </span>
      </div>
      <div className="knav-dbody">
        {RESOURCE_CARDS.map((card, i) => [
          i > 0 && <i key={`d${card.id}`} className="knav-dvr" aria-hidden="true" />,
          <a
            key={card.id}
            className="knav-card knav-rcard knav-blk"
            style={blk(i + 1)}
            data-card={card.id}
            href={LINKS.resources}
          >
            <Decor variant={card.id} />
            <span className="knav-chiprow">
              <span className="knav-cardchip">
                <card.Icon size={16} />
              </span>
            </span>
            <span className="knav-cbody">
              <span className="knav-crow">
                <span className="knav-ctitle">{card.title}</span>
                <IconArrowRight />
              </span>
              <span className="knav-cdesc">{card.desc}</span>
            </span>
          </a>,
        ])}
      </div>
    </div>
  );
}

/* ---- mobile drawer chips (§5) ---- */

function EngineChips() {
  return (
    <>
      {ENGINES.map((e) => (
        <a key={e.id} className="knav-chip" href={engineAnchor(e.id)}>
          <i className="knav-chipdot" data-engine={e.id} aria-hidden="true" />
          {e.label}
        </a>
      ))}
      <a className="knav-chip" href={LINKS.solutions}>
        All
      </a>
    </>
  );
}

function ResourceChips() {
  return (
    <>
      {RESOURCE_CARDS.map((card) => (
        <a key={card.id} className="knav-rchip" data-card={card.id} href={LINKS.resources}>
          <card.Icon className="knav-rchipicon" />
          {card.chipLabel}
        </a>
      ))}
    </>
  );
}

/* ---- the chrome ---- */

/* Menu rows (§4–§5). Drawer rows carry the whole-tick push-down group
   and the box's own whole-tick height per band (from the drawer nodes:
   the designed 160/194·256 and 128/144/256 boxes are 5t/4t/4t and
   4t/3t/4t). At rs the box is smaller than the group — clear space. */
const MOBILE_ROWS: NavMobileRow[] = [
  /* Solutions leads the list (owner direction 2026-09-08 — spec 005
     §9 F19; Our Work follows) */
  {
    id: "solutions",
    label: "Solutions",
    drawer: <EngineChips />,
    group: { rm: 5, rs: 5, rt: 4 },
    boxTicks: { rm: 5, rs: 4, rt: 4 },
  },
  { id: "our-work", label: "Our Work", href: LINKS.ourWork },
  { id: "pricing", label: "Pricing", href: LINKS.pricing },
  { id: "company", label: "Company", href: LINKS.company },
  {
    id: "resources",
    label: "Resources",
    drawer: <ResourceChips />,
    group: { rm: 4, rs: 4, rt: 4 },
    boxTicks: { rm: 4, rs: 3, rt: 4 },
  },
];

export function NavChrome() {
  return (
    <header className="ks-nav">
      <nav aria-label="Primary">
        <NavDesktop
          links={LINKS}
          solutions={<SolutionsDrawerContent />}
          resources={<ResourcesDrawerContent />}
        />
        <NavMobile
          homeHref={LINKS.home}
          rows={MOBILE_ROWS}
          buttons={
            <>
              <ButtonFill size="lg" chrome="teal" shape="pill" href={LINKS.getStarted}>
                Get Started
              </ButtonFill>
              <ButtonFill size="lg" chrome="gray" shape="box" href={LINKS.login}>
                Login
              </ButtonFill>
            </>
          }
        />
      </nav>
    </header>
  );
}
