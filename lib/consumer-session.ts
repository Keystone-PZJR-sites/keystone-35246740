/**
 * Patched consumer session helpers — uses AUTH_API_URL for Heimdal consumer endpoints.
 */

export const CONSUMER_TOKEN_COOKIE = 'ks_consumer_token';

export interface Consumer {
  id: number;
  email: string | null;
  phone: string | null;
  primary_identifier: string | null;
  contacts?: Array<{ id: number; display_name: string; account?: { id: number; name: string } }>;
}

export interface ConversationSummary {
  contact_id: number;
  business?: { id: number; name: string; company_name?: string };
  last_message_at: string | null;
  last_message_preview?: string | null;
  message_count: number;
}

export interface Message {
  id: number;
  body: string | null;
  direction: string;
  sender_type: string;
  sender_display_name?: string;
  created_at: string;
}

export interface ContactSummary {
  id: number;
  display_name: string;
  business?: { id: number; name: string; company_name?: string };
}

function getApiUrl(): string {
  return process.env.AUTH_API_URL || process.env.API_URL || 'http://localhost:3000/api/v1';
}

async function consumerFetch<T>(path: string, token: string): Promise<T | null> {
  try {
    const res = await fetch(`${getApiUrl()}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data ?? json) as T;
  } catch {
    return null;
  }
}

export async function fetchConsumerMe(token: string): Promise<Consumer | null> {
  return consumerFetch<Consumer>('/consumer/me', token);
}

export async function fetchConsumerConversations(token: string): Promise<ConversationSummary[]> {
  const apiKey = process.env.API_KEY;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...(apiKey ? { 'X-API-Key': apiKey } : {}),
  };
  try {
    const res = await fetch(`${getApiUrl()}/consumer/me/conversations`, { headers, cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data ?? []) as ConversationSummary[];
  } catch {
    return [];
  }
}

export async function fetchConsumerMessages(
  token: string,
  contactId: number
): Promise<{ messages: Message[]; contact: ContactSummary | null }> {
  try {
    const res = await fetch(
      `${getApiUrl()}/consumer/me/contacts/${contactId}/messages?per_page=100`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }
    );
    if (!res.ok) return { messages: [], contact: null };
    const json = await res.json();
    return {
      messages: (json.data ?? []) as Message[],
      contact: (json.contact ?? null) as ContactSummary | null,
    };
  } catch {
    return { messages: [], contact: null };
  }
}
