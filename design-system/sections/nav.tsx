import type { CSSProperties } from "react";
import { IconArrowRight, IconBlog, IconGrader, IconPodcast } from "../icons";
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
  { id: "our-work", label: "Our Work", href: SITE_LINKS.ourWork },
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
