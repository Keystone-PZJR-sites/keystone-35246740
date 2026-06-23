/**
 * Consumer auth proxy handlers — AUTH_API_URL points at Heimdal; API_URL stays on SOR.
 */

import type { NextResponse } from 'next/server';

import { CONSUMER_TOKEN_COOKIE } from './consumer-session';

function clientContextHeaders(_request?: Request): Record<string, string> {
  return {};
}

type NextResponseLike = { json: (body: unknown, init?: ResponseInit) => NextResponse };

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function getApiUrl(): string {
  return process.env.AUTH_API_URL || process.env.API_URL || 'http://localhost:3000/api/v1';
}

function getApiKey(): string {
  return process.env.API_KEY || '';
}

function apiHeaders(request?: Request): Record<string, string> {
  const key = getApiKey();
  return {
    'Content-Type': 'application/json',
    ...(key ? { 'X-API-Key': key } : {}),
    ...(request ? clientContextHeaders(request) : {}),
  };
}

async function handleSendCode(request: Request, NR: NextResponseLike): Promise<NextResponse> {
  const body = await request.json().catch(() => ({})) as Record<string, string>;
  const { phone } = body;
  if (!phone) return NR.json({ error: 'Phone is required.' }, { status: 422 });

  const res = await fetch(`${getApiUrl()}/consumer/auth/send_code`, {
    method: 'POST',
    headers: apiHeaders(request),
    body: JSON.stringify({ phone }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NR.json(
      {
        error: json.error || json.detail?.error || 'Failed to send verification code. Please try again.',
        code: json.code || json.detail?.code,
        retry_in_seconds: json.retry_in_seconds || json.detail?.retry_in_seconds,
      },
      { status: res.status }
    );
  }

  return NR.json({
    resend_available_at: json.data?.resend_available_at ?? null,
  });
}

async function handleVerifyCode(request: Request, NR: NextResponseLike): Promise<NextResponse> {
  const body = await request.json().catch(() => ({})) as Record<string, string>;
  const { phone, code } = body;
  if (!phone || !code) return NR.json({ error: 'Phone and code are required.' }, { status: 422 });

  const res = await fetch(`${getApiUrl()}/consumer/auth/verify_code`, {
    method: 'POST',
    headers: apiHeaders(request),
    body: JSON.stringify({ phone, code }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NR.json(
      { error: json.error || json.detail?.error || 'Verification failed. Please try again.', code: json.code || json.detail?.code },
      { status: res.status }
    );
  }

  return NR.json({
    verification_token: json.data?.verification_token,
    first_name: json.data?.first_name ?? '',
    last_name: json.data?.last_name ?? '',
    email: json.data?.email ?? '',
  });
}

async function handlePasswordlessAuth(request: Request, NR: NextResponseLike): Promise<NextResponse> {
  const body = await request.json().catch(() => ({})) as Record<string, string>;
  const { phone, verification_token, first_name, last_name, email } = body;

  if (!phone) return NR.json({ error: 'Phone is required.' }, { status: 422 });
  if (!verification_token) return NR.json({ error: 'Verification token is required.' }, { status: 422 });
  if (!first_name || !last_name || !email) {
    return NR.json({ error: 'First name, last name, and email are required.' }, { status: 422 });
  }

  const res = await fetch(`${getApiUrl()}/consumer/auth/passwordless_auth`, {
    method: 'POST',
    headers: apiHeaders(request),
    body: JSON.stringify({ phone, verification_token, first_name, last_name, email }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NR.json({ error: json.error || json.detail?.error || 'Authentication failed. Please try again.' }, { status: res.status });
  }

  const token = json.data?.token;
  if (!token) return NR.json({ error: 'No token received.' }, { status: 500 });

  const response = NR.json({});
  response.cookies.set(CONSUMER_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
  return response;
}

async function handleLogout(_request: Request, NR: NextResponseLike): Promise<NextResponse> {
  const response = NR.json({ success: true });
  response.cookies.delete(CONSUMER_TOKEN_COOKIE);
  return response;
}

export function createConsumerAuthHandlers({ NextResponse }: { NextResponse: NextResponseLike }) {
  return {
    POST: async (
      request: Request,
      context: { params: Promise<{ action: string }> }
    ): Promise<NextResponse> => {
      const { action } = await context.params;
      if (action === 'send_code') return handleSendCode(request, NextResponse);
      if (action === 'verify_code') return handleVerifyCode(request, NextResponse);
      if (action === 'passwordless_auth') return handlePasswordlessAuth(request, NextResponse);
      if (action === 'logout') return handleLogout(request, NextResponse);
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    },
  };
}
