/** v2 sections — the global nav chrome (spec 005). Server component.
 *
 * One component, two structures, gated at the rd1 boundary (§1): a
 * desktop bar (fixed at the viewport top; rail left, Login right, the
 * space between transparent) with a hover-revealed subnav drawer, and a
 * mobile rail (absolute at the page top, scrolls away) with a
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
 * sitemap routes; the engine subitems and all three resources cards and
 * chips point at their index pages for now; Get Started goes to
 * /pricing; Login keeps /portal.
 */

import type { CSSProperties, ReactNode } from "react";
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
  login: "/portal",
  approach: "/how-it-works",
  getStarted: "/pricing",
};

/* ---- content (§3, transcribed from the sets 2026-08-24) ---- */

const ENGINES = [
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
    id: "brand",
    label: "Brand",
    desc: "Establish credibility: polished websites, profiles, and reviews.",
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
   row-major, read from the drawer nodes 2026-08-24. */
const DECOR_ROUND: Record<string, number[]> = {
  feature: [0, 1, 11],
  blog: [0, 3, 9],
  grader: [0, 5, 15],
  podcast: [0, 7, 9],
};

function Decor({ variant }: { variant: keyof typeof DECOR_ROUND }) {
  return (
    <span className="knav-decor" data-decor={variant} aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <i key={i} className={DECOR_ROUND[variant].includes(i) ? "round" : undefined} />
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
                href={LINKS.solutions}
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
            One system, one full picture of your business&rsquo;s marketing,
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
        <a key={e.id} className="knav-chip" href={LINKS.solutions}>
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
   heights (ticks) and the designed open box heights (px) per anchor. */
const MOBILE_ROWS: NavMobileRow[] = [
  { id: "our-work", label: "Our Work", href: LINKS.ourWork },
  {
    id: "solutions",
    label: "Solutions",
    drawer: <EngineChips />,
    group: { rm: 5, rs: 5, rt: 4 },
    box: { rm: 160, rs: 194, rt: 256 },
  },
  { id: "pricing", label: "Pricing", href: LINKS.pricing },
  { id: "company", label: "Company", href: LINKS.company },
  {
    id: "resources",
    label: "Resources",
    drawer: <ResourceChips />,
    group: { rm: 4, rs: 4, rt: 4 },
    box: { rm: 128, rs: 144, rt: 256 },
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
