import { ChatWidget } from "@keystone-sites/widgets/components/ChatWidget";
import type { ChatTeamMember } from "@keystone-sites/widgets/components/ChatWidget";
import { resolveChatBackend } from "@keystone-sites/core/lib/chat-backend";
import { getCompanyInformation, getTeamMembers } from "@keystone-sites/core/lib/server-api";
import type { CompanyInformation, TeamMember } from "@keystone-sites/core/types";
import { SITE_CHAT } from "./site-chat-data";
import { SiteChatOpen } from "./site-chat-open";

/** v2 sections — the site chat (spec 024).
 *
 * Mounts the battle-tested `@keystone-sites/widgets` ChatWidget — the
 * bottom-center prompt pill that expands into the suggestion chips and
 * the chat sheet — with the site's configuration (site-chat-data.ts).
 * The widget owns its chrome; this file owns only what it is told.
 *
 * Server component: it reads the data layer (the customer-site
 * contract — the widget renders only while the account's public
 * `chat_enabled` flag is on; the business name, logo, and team facepile
 * come from the same records) and resolves which chat backend the
 * `/api/chat` proxy targets, so the widget's reply-delivery mode and the
 * route always agree (both read the same env through core).
 *
 * The widget's stylesheet is compiled by `v2/widgets.css` (root layout).
 */
export async function SiteChat() {
  const [company, team] = await Promise.all([getCompanyInformation(), getTeamMembers()]);
  if (!company?.chat_enabled) return null;

  return (
    <>
      <ChatWidget
        chatBackend={resolveChatBackend()}
        accentColor={SITE_CHAT.accent}
        placeholder={SITE_CHAT.placeholder}
        suggestedQuestions={[...SITE_CHAT.suggestedQuestions]}
        businessName={company.company_name}
        businessLogoUrl={logoUrl(company)}
        teamMembers={toChatTeam(team)}
      />
      {/* the site's "Talk to us" buttons open the widget (site-chat-open.tsx) */}
      <SiteChatOpen />
    </>
  );
}

function logoUrl(company: CompanyInformation): string | null {
  const photo = company.logo_photo;
  return photo?.large_url ?? photo?.original_url ?? photo?.medium_url ?? null;
}

/** The team endpoint is typed loosely by core; keep only well-formed
 * records and the fields the widget's facepile reads. The serializer
 * carries a flat `photo_url` the entity type omits; the attachment
 * fallback covers responses that ship the association instead. */
function toChatTeam(raw: unknown): ChatTeamMember[] {
  if (!Array.isArray(raw)) return [];
  const out: ChatTeamMember[] = [];
  for (const item of raw as Array<Partial<TeamMember> & { photo_url?: unknown }>) {
    if (typeof item?.id !== "number" || typeof item.name !== "string") continue;
    const flat = typeof item.photo_url === "string" ? item.photo_url : undefined;
    const attached = item.photo_attachments?.[0]?.photo;
    const photo_url = flat ?? attached?.large_url ?? attached?.medium_url ?? attached?.original_url;
    out.push({
      id: item.id,
      name: item.name,
      position: typeof item.position === "string" ? item.position : undefined,
      photo_url,
    });
  }
  return out;
}
