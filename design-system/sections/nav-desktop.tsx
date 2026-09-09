"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { IconNavTrigger } from "../icons";
import { EXTERNAL_LINK } from "../site-links";

/** Allows the pointer to cross the trigger-to-panel gap without flicker. */
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
          {...EXTERNAL_LINK}
        >
          <span className="knav-item">
            Login
            <IconNavTrigger className="knav-tick" variant="arrow" />
          </span>
        </a>
      </div>
      {/* Inline display prevents an unstyled drawer flash before CSS loads. */}
      <div
        id="knav-drawer"
        className="knav-drawer"
        data-open={item !== null || undefined}
        data-item={content}
        onMouseEnter={cancelClose}
        onClick={(e) => {
          /* Close before a same-page target appears beneath the drawer. */
          if ((e.target as HTMLElement).closest("a")) closeNow();
        }}
      >
        {solutions}
        {resources}
      </div>
    </div>
  );
}
