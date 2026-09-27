/** FAQ content (Pricing v2 faq, 1161:26591). Questions follow the
 * design's order; answers are the approved copy, edited for tone. The
 * first answer links the à la carte menu, so the module is TSX. */

import type { FaqItem } from "@keystone-sites/marketing-design-system/sections/faq";
import { A_LA_CARTE } from "./pricing-includes-data";

export type { FaqItem };

export const FAQ_HEAD = "Questions we get a lot.";

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "custom",
    question: "What if I need custom work?",
    answer: (
      <>
        Add it to your plan any time from the <a href={A_LA_CARTE.href}>à la carte menu</a>. Extra
        work costs credits; buy more in the Keystone console, or turn on auto-reload and never think
        about it.
      </>
    ),
  },
  {
    id: "lock-in",
    question: "Am I locked in?",
    answer: "No. Every plan is month-to-month, so you can change or cancel anytime.",
  },
  {
    id: "account-manager",
    question: "Will I have an account manager?",
    answer:
      "Every client can reach our support team by email. Growth and Scale clients also get a dedicated Growth Partner: a real digital marketer who handles everything from strategy to campaign setup and monitoring, and who cares about independent businesses winning.",
  },
  {
    id: "credits",
    question: "What happens if I run out of credits?",
    answer:
      "You hear from us first. Buy more credits in the Keystone console, or turn on auto-reload with a monthly cap. Do neither and work pauses until you top up. Your site stays live unless you cancel.",
  },
  {
    id: "cancel",
    question: "If I cancel, will I keep my website?",
    answer:
      "Yes. We send you all of the website code, and you can host and manage it yourself or hand it to another company.",
  },
  {
    id: "switch",
    question: "I already have a website. Why switch?",
    answer:
      "We rebuild everything to modern design standards and web technologies, with our marketing engine built in. It audits and improves your site continuously, so more people find you and trust what they find. Your social media, ads, maps profiles, and articles all run through the same system.",
  },
];
