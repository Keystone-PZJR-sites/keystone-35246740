import { NextResponse } from 'next/server';

const XML_CONTENT_TYPE = 'application/xml; charset=utf-8';

export async function GET() {
  const apiUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;

  if (!apiUrl || !apiKey) {
    return new NextResponse('Missing API_URL or API_KEY for sitemap route', {
      status: 500,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  const response = await fetch(`${apiUrl}/public/sitemap/current`, {
    headers: { 'X-API-Key': apiKey },
    cache: 'no-store',
  });

  const body = await response.text();
  return new NextResponse(body, {
    status: response.status,
    headers: {
      'content-type': XML_CONTENT_TYPE,
      'cache-control': 'public, max-age=300, s-maxage=300',
    },
  });
}
