import { ChatWidget } from "@keystone-sites/widgets/components/ChatWidget";
import type { ChatTeamMember } from "@keystone-sites/widgets/components/ChatWidget";
import { resolveChatBackend } from "@keystone-sites/core/lib/chat-backend";
import { getCompanyInformation, getTeamMembers } from "@keystone-sites/core/lib/server-api";
import type { CompanyInformation } from "@keystone-sites/core/types";
import { SITE_CHAT } from "./site-chat-data";
import { SiteChatOpen } from "./site-chat-open";

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
      <SiteChatOpen />
    </>
  );
}

function logoUrl(company: CompanyInformation): string | null {
  const photo = company.logo_photo;
  return photo?.large_url ?? photo?.original_url ?? photo?.medium_url ?? null;
}

/** Keep well-formed records and support both serialized photo shapes. */
function toChatTeam(raw: unknown): ChatTeamMember[] {
  if (!Array.isArray(raw)) return [];
  const out: ChatTeamMember[] = [];
  for (const item of raw) {
    if (!isRecord(item) || typeof item.id !== "number" || typeof item.name !== "string") continue;
    const flat = typeof item.photo_url === "string" ? item.photo_url : undefined;
    const attachment = Array.isArray(item.photo_attachments) ? item.photo_attachments[0] : undefined;
    const photo = isRecord(attachment) && isRecord(attachment.photo) ? attachment.photo : undefined;
    const photo_url = flat ?? photoString(photo, "large_url") ?? photoString(photo, "medium_url") ?? photoString(photo, "original_url");
    out.push({
      id: item.id,
      name: item.name,
      position: typeof item.position === "string" ? item.position : undefined,
      photo_url,
    });
  }
  return out;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function photoString(photo: Record<string, unknown> | undefined, key: string): string | undefined {
  const value = photo?.[key];
  return typeof value === "string" ? value : undefined;
}
