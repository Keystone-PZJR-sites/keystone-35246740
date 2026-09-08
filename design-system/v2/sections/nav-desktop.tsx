"use client";

/** v2 sections — the desktop nav bar and subnav drawer island (spec 005
 * §1–§3, §6.3, §7).
 *
 * The triggers (Solutions, Resources) navigate AND disclose (§7 F11):
 * each is a real link carrying aria-expanded/aria-controls; the drawer
 * opens on hover intent and on focus; activation follows the link;
 * Escape closes and keeps focus on the trigger. Moving between the two
 * triggers swaps content under one open panel. A close-intent delay
 * runs before hiding so the pointer can travel trigger → panel across
 * the 4px gap without flicker.
 *
 * Drawer contents arrive server-rendered; this island owns only the
 * open state and its timing.
 */

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { IconNavTrigger } from "../icons";

/** §6.3 — the pointer may dwell 140ms between trigger and panel. */
const CLOSE_INTENT_MS = 140;

type DrawerItem = "solutions" | "resources";

interface NavLinks {
  home: string;
  ourWork: string;
  solutions: string;
  pricing: string;
  company: string;
  resources: string;
  login: string;
}

export function NavDesktop({
  links,
  solutions,
  resources,
}: {
  links: NavLinks;
  solutions: ReactNode;
  resources: ReactNode;
}) {
  const [item, setItem] = useState<DrawerItem | null>(null);
  /* The drawer keeps rendering the last content while it fades out. */
  const [content, setContent] = useState<DrawerItem>("solutions");
  const closeTimer = useRef<number | null>(null);
  const triggerRefs = useRef<Record<DrawerItem, HTMLAnchorElement | null>>({
    solutions: null,
    resources: null,
  });

  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const open = (next: DrawerItem) => {
    cancelClose();
    setItem(next);
    setContent(next);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setItem(null), CLOSE_INTENT_MS);
  };
  const closeNow = () => {
    cancelClose();
    setItem(null);
  };

  const trigger = (
    id: DrawerItem,
    label: string,
    href: string,
  ) => (
    <a
      ref={(el) => {
        triggerRefs.current[id] = el;
      }}
      className="knav-btn"
      href={href}
      aria-expanded={item === id}
      aria-controls="knav-drawer"
      onMouseEnter={() => open(id)}
      onFocus={() => open(id)}
    >
      <span className="knav-item">
        {label}
        <IconNavTrigger className="knav-tick" variant="chevron" />
      </span>
    </a>
  );

  return (
    <div
      className="knav-d"
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => {
        if (e.key === "Escape" && item !== null) {
          const t = triggerRefs.current[item];
          closeNow();
          t?.focus();
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeNow();
      }}
    >
      <div className="knav-bar">
        <div className="knav-rail" onMouseEnter={cancelClose}>
          <a className="knav-logo" href={links.home} aria-label="Keystone — home">
            <i className="knav-mark" aria-hidden="true" />
          </a>
          <i className="knav-vr" aria-hidden="true" />
          {/* Solutions leads the rail (owner direction 2026-09-08 —
              spec 005 §9 F19; Our Work follows) */}
          {trigger("solutions", "Solutions", links.solutions)}
          <i className="knav-vr" aria-hidden="true" />
          <a className="knav-btn" href={links.ourWork} onMouseEnter={scheduleClose}>
            <span className="knav-item">Our Work</span>
          </a>
          <i className="knav-vr" aria-hidden="true" />
          <a className="knav-btn" href={links.pricing} onMouseEnter={scheduleClose}>
            <span className="knav-item">Pricing</span>
          </a>
          <i className="knav-vr" aria-hidden="true" />
          <a className="knav-btn" href={links.company} onMouseEnter={scheduleClose}>
            <span className="knav-item">Company</span>
          </a>
          <i className="knav-vr" aria-hidden="true" />
          {trigger("resources", "Resources", links.resources)}
        </div>
        <a
          className="knav-btn knav-login"
          href={links.login}
          onMouseEnter={scheduleClose}
        >
          <span className="knav-item">
            Login
            <IconNavTrigger className="knav-tick" variant="arrow" />
          </span>
        </a>
      </div>
      {/* The inline display is the pre-CSS FOUC guard (found 2026-08-25
          on cold dev loads: the drawer painted raw before nav.css
          arrived, then transitioned out). nav.css re-asserts the
          constant `display: grid !important`, which outranks the inline
          value the moment the sheet is present; the [hidden] attribute
          could not do this job — the old design system's Tailwind
          preflight hides [hidden] with a layered !important, which
          beats any unlayered counter-rule. */}
      <div
        id="knav-drawer"
        className="knav-drawer"
        style={{ display: "none" }}
        data-open={item !== null || undefined}
        data-item={content}
        onMouseEnter={cancelClose}
        onClick={(e) => {
          /* a drawer link closes the drawer — a same-page anchor (the
             engine subitems on `/`) jumps without a navigation, and
             the open drawer would otherwise linger over the result */
          if ((e.target as HTMLElement).closest("a")) closeNow();
        }}
      >
        {solutions}
        {resources}
      </div>
    </div>
  );
}
