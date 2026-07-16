import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Newsletter signup API.
 * Stores emails in Supabase `newsletter_subscribers` when configured.
 * Optional Resend path: set RESEND_API_KEY + RESEND_AUDIENCE_ID later.
 *
 * Expected table:
 * create table newsletter_subscribers (
 *   id uuid primary key default gen_random_uuid(),
 *   email text unique not null,
 *   created_at timestamptz default now()
 * );
 */
export async function POST(request: NextRequest) {
  try {
    const hasSupabase =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    if (!hasSupabase) {
      return NextResponse.json(
        {
          error:
            'Newsletter signup is not available yet. Please reach out via the contact form or WhatsApp.',
          errorType: 'not_configured',
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const website = typeof body?.website === 'string' ? body.website.trim() : '';

    // Honeypot
    if (website) {
      return NextResponse.json({
        success: true,
        message: "Thanks for subscribing! I'll be in touch.",
      });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    const { error } = await supabase.from('newsletter_subscribers').upsert(
      { email },
      { onConflict: 'email', ignoreDuplicates: true }
    );

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Newsletter] Supabase error:', error.message);
      }
      return NextResponse.json(
        {
          error:
            'Could not save your subscription. Please try again later or use the contact form.',
          errorType: 'storage',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for subscribing! I'll be in touch.",
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
