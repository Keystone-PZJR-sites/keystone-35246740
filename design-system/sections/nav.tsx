import type { CSSProperties } from "react";
import {
  IconArrowRight,
  IconBlog,
  IconCaseStudies,
  IconGrader,
  IconPodcast,
  IconWebsite,
} from "../icons";
import { ButtonFill } from "../primitives/buttons";
import { EXTERNAL_LINK, SITE_LINKS } from "../site-links";
import { NavDesktop } from "./nav-desktop";
import { NavMobile, type NavMobileRow } from "./nav-mobile";

function engineAnchor(id: string): string {
  return `${SITE_LINKS.home}#engine-${id}`;
}

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
    href: SITE_LINKS.resources,
    external: false,
  },
  {
    id: "grader",
    title: "The Grader",
    desc: "A free look at how your business shows up online, and what to fix first.",
    chipLabel: "Grader",
    Icon: IconGrader,
    href: SITE_LINKS.grader,
    external: true,
  },
  {
    id: "podcast",
    title: "The Podcast",
    desc: "Conversations with small business owners building on their own.",
    chipLabel: "Podcast",
    Icon: IconPodcast,
    href: SITE_LINKS.spotify,
    external: true,
  },
] as const;

/* Our Work drawer cards (nav-drawer item=work — 1038:10215 lg, 1039:19063 md).
 * Both icons keep their intrinsic two-tone palettes; the gallery card
 * re-inks IconWebsite teal through the --website-a/b hooks in nav.css. */
const WORK_CARDS = [
  {
    id: "case-studies",
    title: "Case Studies",
    desc: "The leads, bookings, and reviews real businesses saw after switching to Keystone.",
    chipLabel: "Case Studies",
    Icon: IconCaseStudies,
    href: SITE_LINKS.caseStudies,
    external: false,
  },
  {
    id: "gallery",
    title: "The Gallery",
    desc: "Live sites running on Keystone and built for businesses like yours.",
    chipLabel: "The Gallery",
    Icon: IconWebsite,
    href: SITE_LINKS.gallery,
    external: false,
  },
] as const;

interface DecorCircle {
  i: number;
  dx?: number;
  dy?: number;
}
const DECOR_CIRCLES: Record<string, DecorCircle[]> = {
  feature: [{ i: 0 }, { i: 7, dx: -1 }, { i: 10, dx: 1 }],
  blog: [{ i: 0 }, { i: 5, dx: 1 }, { i: 15, dy: -1 }],
  grader: [{ i: 0 }, { i: 7, dx: -1 }, { i: 15, dy: -1 }],
  podcast: [{ i: 0 }, { i: 2, dy: 1 }, { i: 10, dx: 1 }],
  /* Rest cells from 1038:13442 and 1038:13472. The set carries no hover
   * variants for these two cards, so the slides derive from the designed
   * grammar (anchor circle holds; each mover slides one cell toward the
   * hover cells (2,1)/(3,2); bottom-row circles rise) — flagged to design
   * 2026-09-15. */
  "case-studies": [{ i: 0 }, { i: 6 }, { i: 15, dy: -1 }],
  gallery: [{ i: 0 }, { i: 7, dx: -1 }, { i: 13, dy: -1 }],
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

/* Labels and cards carry their reveal order through --i. */
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
        <a className="knav-card knav-fcard knav-blk" style={blk(7)} href={SITE_LINKS.approach}>
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
            href={card.href}
            {...(card.external ? EXTERNAL_LINK : {})}
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

function WorkDrawerContent() {
  return (
    <div className="knav-dcontent" data-content="work">
      <div className="knav-dlabels">
        <span className="knav-dlabel knav-blk" style={blk(0)}>
          Proof, not promises
        </span>
      </div>
      <div className="knav-dbody">
        {WORK_CARDS.map((card, i) => [
          i > 0 && <i key={`d${card.id}`} className="knav-dvr" aria-hidden="true" />,
          <a
            key={card.id}
            className="knav-card knav-rcard knav-blk"
            style={blk(i + 1)}
            data-card={card.id}
            href={card.href}
            {...(card.external ? EXTERNAL_LINK : {})}
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

function EngineChips() {
  return (
    <>
      {ENGINES.map((e) => (
        <a key={e.id} className="knav-chip" href={engineAnchor(e.id)}>
          <i className="knav-chipdot" data-engine={e.id} aria-hidden="true" />
          {e.label}
        </a>
      ))}
      <a className="knav-chip" href={SITE_LINKS.solutions}>
        All
      </a>
    </>
  );
}

function WorkChips() {
  return (
    <>
      {WORK_CARDS.map((card) => (
        <a
          key={card.id}
          className="knav-rchip"
          data-card={card.id}
          href={card.href}
          {...(card.external ? EXTERNAL_LINK : {})}
        >
          <card.Icon className="knav-rchipicon" />
          {card.chipLabel}
        </a>
      ))}
    </>
  );
}

function ResourceChips() {
  return (
    <>
      {RESOURCE_CARDS.map((card) => (
        <a
          key={card.id}
          className="knav-rchip"
          data-card={card.id}
          href={card.href}
          {...(card.external ? EXTERNAL_LINK : {})}
        >
          <card.Icon className="knav-rchipicon" />
          {card.chipLabel}
        </a>
      ))}
    </>
  );
}

const MOBILE_ROWS: NavMobileRow[] = [
  {
    id: "solutions",
    label: "Solutions",
    drawer: <EngineChips />,
    group: { rm: 5, rs: 5, rt: 4 },
    boxTicks: { rm: 5, rs: 4, rt: 4 },
  },
  {
    id: "our-work",
    label: "Our Work",
    drawer: <WorkChips />,
    group: { rm: 4, rs: 4, rt: 4 },
    boxTicks: { rm: 4, rs: 3, rt: 4 },
  },
  { id: "pricing", label: "Pricing", href: SITE_LINKS.pricing },
  { id: "company", label: "Company", href: SITE_LINKS.company },
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
          links={SITE_LINKS}
          solutions={<SolutionsDrawerContent />}
          work={<WorkDrawerContent />}
          resources={<ResourcesDrawerContent />}
        />
        <NavMobile
          homeHref={SITE_LINKS.home}
          rows={MOBILE_ROWS}
          buttons={
            <>
              <ButtonFill size="lg" chrome="teal" shape="pill" href={SITE_LINKS.pricing}>
                Get Started
              </ButtonFill>
              <ButtonFill size="lg" chrome="gray" shape="box" href={SITE_LINKS.login} external>
                Login
              </ButtonFill>
            </>
          }
        />
      </nav>
    </header>
  );
}
