/** Authored copy for /for-dentists. Placeholder marketing copy pending
 * review; no Figma frame exists for this page — it is built from the
 * landing kit (pages/landing.tsx). */

import { heroCarouselPicture } from "../media";
import { SITE_LINKS } from "../site-links";
import type { LandingPageData } from "./landing";

export const FOR_DENTISTS: LandingPageData = {
  meta: {
    title: "Keystone for dental practices | Keystone",
    description:
      "Keystone runs the website, ads, reviews, and follow-ups for dental practices, so the front desk can focus on patients.",
  },
  sections: [
    {
      kind: "hero",
      eyebrow: "Keystone for dental practices",
      title: "Fill the chairs. Skip the marketing meetings.",
      subhead:
        "Your website, ads, reviews, and patient follow-ups, running as one system that books appointments while your team treats patients.",
      cta: { label: "See pricing", href: SITE_LINKS.pricing },
      picture: heroCarouselPicture(3),
    },
    {
      kind: "benefits",
      eyebrow: "Why practices switch",
      title: "Built for how a practice actually fills its schedule.",
      items: [
        {
          id: "found",
          icon: "maps",
          title: "Get found by nearby patients",
          copy: "Local search, maps, and ads tuned to the procedures you want more of, from cleanings to implants.",
        },
        {
          id: "reviews",
          icon: "reviews",
          title: "Turn happy patients into reviews",
          copy: "Automatic review requests after every visit, so new patients see a practice people trust.",
        },
        {
          id: "follow-up",
          icon: "reception",
          title: "Never lose a lead to voicemail",
          copy: "Every call, form, and chat gets a reply and a booking link, nights and weekends included.",
        },
      ],
    },
    {
      kind: "quote",
      eyebrow: "From the chair",
      quote:
        "“We stopped thinking about marketing. New patients just show up on the schedule, and the front desk finally has time for the people in the lobby.”",
      attribution: "Practice owner, general and cosmetic dentistry",
    },
    {
      kind: "closer",
      eyebrow: "Get started",
      title: "See what Keystone would do for your practice.",
      copy: "One plan, one price, everything included. Talk to us or see pricing today.",
      cta: { label: "Get in touch", href: SITE_LINKS.contact },
    },
  ],
};
