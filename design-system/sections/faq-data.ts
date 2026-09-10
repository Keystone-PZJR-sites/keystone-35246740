/** FAQ content shared by every responsive layout. */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const CREDITS_ANSWER =
  "You hear from us first. Set a monthly cap, or turn on auto-reload so nothing stops. Do neither and work pauses until you top up. Your site stays live unless you cancel.";

export const FAQ_HEAD = "Questions we get a lot.";

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "overage",
    question: "What if I use more than usual?",
    answer: CREDITS_ANSWER,
  },
  {
    id: "lock-in",
    question: "Am I locked in?",
    answer: "No. Every plan is month-to-month, so you can change or cancel anytime.",
  },
  {
    id: "account-manager",
    question: "Will I have an account manager?",
    answer: "Every client gets a real human who knows digital marketing and is available when you need them.",
  },
  {
    id: "credits",
    question: "What happens if I run out of credits?",
    answer: CREDITS_ANSWER,
  },
  {
    id: "cancel",
    question: "If I cancel, will I keep my website?",
    answer:
      "We are happy to send you the code, but you will need another company to host and manage it — like building a house and then turning off the power and water.",
  },
  {
    id: "switch",
    question: "I already have a website. Why switch?",
    answer:
      "We rebuild everything you have into a modern marketing engine with more content, pages, and SEO configuration so you actually show up for the searches that matter — plus sales chat and the platform underneath.",
  },
];
