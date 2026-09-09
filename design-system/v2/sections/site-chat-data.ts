/** v2 sections — the site chat's configuration (spec 024 §2).
 *
 * Everything the `@keystone-sites/widgets` ChatWidget is told about this
 * site, read from the Figma `chat-bubble` component (`220:8824`, mounted
 * on the 1440 page frame as `153:17373`; read 2026-09-08). The widget
 * exposes exactly these knobs; nothing else about its chrome is the
 * site's to set. Business name and logo come from the data layer
 * (site-chat.tsx), never from here.
 */

export interface SiteChatConfig {
  /** The prompt pill's resting copy (`220:8830`). */
  placeholder: string;
  /** The three suggestion chips, top to bottom (`220:9057` · `220:9070` · `220:9066`). */
  suggestedQuestions: readonly string[];
  /**
   * The widget's single brand accent — it derives the chip tint, chip
   * ink, pill glyph, send button, and visitor bubbles from this one value.
   * A token reference, resolved by the cascade where the widget mounts
   * (inside `.v2-root`); the drawn chip ink is `teal/700`, the only teal
   * the chat frame binds, and the one that keeps the solid send button
   * legible under the widget's white glyph.
   */
  accent: string;
}

export const SITE_CHAT: SiteChatConfig = {
  placeholder: "Ask anything...",
  suggestedQuestions: [
    "What can Keystone do for my business?",
    "How much does Keystone cost?",
    "How is Keystone different than a marketing agency?",
  ],
  accent: "var(--color-teal-700)",
};
