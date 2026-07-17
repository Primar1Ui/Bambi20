import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Safe config check — returns booleans only, never secret values.
 * Visit /api/health on the live site after setting Vercel env vars.
 */
export async function GET() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim() ||
    '';
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    '';

  const hasUrl = Boolean(url);
  const hasAnonKey = Boolean(anonKey);
  const looksLikeSupabaseUrl = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url);
  const looksLikeAnonJwt = anonKey.startsWith('eyJ');

  return NextResponse.json({
    ok: hasUrl && hasAnonKey && looksLikeSupabaseUrl && looksLikeAnonJwt,
    supabase: {
      hasUrl,
      hasAnonKey,
      looksLikeSupabaseUrl,
      looksLikeAnonJwt,
      // Helpful without leaking secrets
      urlHost: hasUrl ? (() => { try { return new URL(url).host; } catch { return 'invalid'; } })() : null,
      anonKeyPrefix: hasAnonKey ? anonKey.slice(0, 3) : null,
    },
    resend: {
      hasApiKey: Boolean(process.env.RESEND_API_KEY?.trim()),
      hasNotifyEmail: Boolean(process.env.NOTIFY_EMAIL?.trim()),
    },
  });
}
