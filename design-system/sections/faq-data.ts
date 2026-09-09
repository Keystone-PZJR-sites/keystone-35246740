/** FAQ content shared by every responsive layout. */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ANSWER =
  "You hear from us first. Set a monthly cap, or turn on auto-reload so nothing stops. Do neither and work pauses until you top up. Your site stays live unless you cancel.";

export const FAQ_HEAD = "Questions we get a lot.";

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "overage",
    question: "What if I use more than usual?",
    answer: FAQ_ANSWER,
  },
  {
    id: "lock-in",
    question: "Am I locked in?",
    answer: FAQ_ANSWER,
  },
  {
    id: "account-manager",
    question: "Will I have an account manager?",
    answer: FAQ_ANSWER,
  },
  {
    id: "credits",
    question: "What happens if I run out of credits?",
    answer: FAQ_ANSWER,
  },
  {
    id: "cancel",
    question: "If I cancel, will I keep my website?",
    answer: FAQ_ANSWER,
  },
  {
    id: "switch",
    question: "I already have a website. Why switch?",
    answer: FAQ_ANSWER,
  },
];
