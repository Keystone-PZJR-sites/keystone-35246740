/** v2 sections — the FAQ's content (spec 013 §4/§8.1). Content never
 * lives in components; the island renders these pairs.
 *
 * One copy canon at every band (§4 as amended at build, §9 build
 * record): the file superseded the morning's F2 band split — every
 * anchor frame carries question 4's short string. Curly apostrophes
 * per the 008 canon (none occur).
 *
 * The answers are the designed placeholder (013 §9 F1, owner decision
 * 2026-08-28): answer 1's copy ships under all six questions; the
 * content pass supplies the five real answers before cutover (launch
 * gate G9) — a copy-only change to this module. Drawer heights derive
 * from content at runtime (§4 R7), so longer answers need no code or
 * spec change. */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const PLACEHOLDER_ANSWER =
  "You hear from us first. Set a monthly cap, or turn on auto-reload so nothing stops. Do neither and work pauses until you top up. Your site stays live unless you cancel.";

export const FAQ_HEAD = "Questions we get a lot.";

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "overage",
    question: "What if I use more than usual?",
    answer: PLACEHOLDER_ANSWER,
  },
  {
    id: "lock-in",
    question: "Am I locked in?",
    answer: PLACEHOLDER_ANSWER,
  },
  {
    id: "account-manager",
    question: "Will I have an account manager?",
    answer: PLACEHOLDER_ANSWER,
  },
  {
    id: "credits",
    question: "What happens if I run out of credits?",
    answer: PLACEHOLDER_ANSWER,
  },
  {
    id: "cancel",
    question: "If I cancel, will I keep my website?",
    answer: PLACEHOLDER_ANSWER,
  },
  {
    id: "switch",
    question: "I already have a website. Why switch?",
    answer: PLACEHOLDER_ANSWER,
  },
];
