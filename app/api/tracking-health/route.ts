import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type ConfigProbe = {
  ok: boolean;
  status: number | null;
  durationMs: number;
  hasMetaPixelId?: boolean;
  metaPixelIdDigits?: number;
  hasPosthogApiKey?: boolean;
  posthogKeyPrefix?: string | null;
  hasGtmContainerId?: boolean;
  environment?: string | null;
  error?: string | null;
};

function jsonHeaders(apiKey: string): HeadersInit {
  return {
    'X-API-Key': apiKey,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

async function probeAdsConfig(apiUrl: string, apiKey: string): Promise<ConfigProbe> {
  const start = Date.now();
  try {
    const res = await fetch(`${apiUrl}/public/ads_config`, {
      headers: jsonHeaders(apiKey),
      cache: 'no-store',
    });
    const durationMs = Date.now() - start;
    if (!res.ok) {
      return { ok: false, status: res.status, durationMs, error: `http_${res.status}` };
    }

    const body = asObject(await res.json());
    const data = asObject(body.data ?? body);
    const rawPixelId = typeof data.meta_pixel_id === 'string' ? data.meta_pixel_id.trim() : '';
    const isNumeric = rawPixelId !== '' && /^\d+$/.test(rawPixelId);

    return {
      ok: true,
      status: res.status,
      durationMs,
      hasMetaPixelId: isNumeric,
      metaPixelIdDigits: isNumeric ? rawPixelId.length : 0,
      error: null,
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      durationMs: Date.now() - start,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function probeAnalyticsConfig(apiUrl: string, apiKey: string): Promise<ConfigProbe> {
  const start = Date.now();
  try {
    const res = await fetch(`${apiUrl}/public/analytics_config`, {
      headers: jsonHeaders(apiKey),
      cache: 'no-store',
    });
    const durationMs = Date.now() - start;
    if (!res.ok) {
      return { ok: false, status: res.status, durationMs, error: `http_${res.status}` };
    }

    const body = asObject(await res.json());
    const data = asObject(body.data ?? body);
    const rawPosthogKey = typeof data.posthog_api_key === 'string' ? data.posthog_api_key.trim() : '';
    const gtmContainer = typeof data.gtm_container_public_id === 'string'
      ? data.gtm_container_public_id.trim()
      : '';
    const environment = typeof data.environment === 'string' ? data.environment.trim() : '';

    return {
      ok: true,
      status: res.status,
      durationMs,
      hasPosthogApiKey: rawPosthogKey !== '',
      posthogKeyPrefix: rawPosthogKey ? rawPosthogKey.slice(0, 10) : null,
      hasGtmContainerId: gtmContainer !== '',
      environment: environment || null,
      error: null,
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      durationMs: Date.now() - start,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function GET(request: Request) {
  const apiUrl = (process.env.API_URL || '').trim();
  const apiKey = (process.env.API_KEY || '').trim();

  const host = request.headers.get('host') || '';
  const url = new URL(request.url);

  const hasApiUrl = apiUrl !== '';
  const hasApiKey = apiKey !== '';
  const apiKeyLength = apiKey.length;

  let adsConfig: ConfigProbe = {
    ok: false,
    status: null,
    durationMs: 0,
    error: 'skipped_missing_api_credentials',
  };
  let analyticsConfig: ConfigProbe = {
    ok: false,
    status: null,
    durationMs: 0,
    error: 'skipped_missing_api_credentials',
  };

  if (hasApiUrl && hasApiKey) {
    const [ads, analytics] = await Promise.all([
      probeAdsConfig(apiUrl, apiKey),
      probeAnalyticsConfig(apiUrl, apiKey),
    ]);
    adsConfig = ads;
    analyticsConfig = analytics;
  }

  return NextResponse.json(
    {
      ok: true,
      site: {
        host,
        pathname: url.pathname,
      },
      runtime: {
        hasApiUrl,
        hasApiKey,
        apiKeyLength,
      },
      adsConfig,
      analyticsConfig,
      checkedAt: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}
