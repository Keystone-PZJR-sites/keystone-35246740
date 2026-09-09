export interface SiteChatConfig {
  placeholder: string;
  suggestedQuestions: readonly string[];
  /** The widget derives all chat accent colors from this token. */
  accent: string;
}

export const SITE_CHAT: SiteChatConfig = {
  placeholder: "Ask anything...",
  suggestedQuestions: [
    "What can Keystone do for my business?",
    "How much does Keystone cost?",
    "How is Keystone different than a marketing agency?",
  ],
  accent: "var(--color-teal-250)",
};
