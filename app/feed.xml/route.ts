import { NextResponse } from 'next/server';

/** Alias for clients that expect /feed.xml */
export async function GET(request: Request) {
  const url = new URL(request.url);
  url.pathname = '/feed';
  return NextResponse.redirect(url, 308);
}
