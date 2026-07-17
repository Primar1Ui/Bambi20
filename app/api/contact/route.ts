import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { notifyContactSubmission } from '@/lib/notifyEmail';

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// In-memory rate limiting (for production, consider using Redis or Supabase)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const RATE_LIMIT_MAX = 5; // Max 5 submissions per hour per IP

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || request.ip || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, resetTime: record.resetTime };
  }

  record.count++;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, website } = body;

    // Honeypot check - if filled, it's likely a bot
    if (website && website.trim() !== '') {
      // Silently reject - don't give bots feedback
      return NextResponse.json(
        { message: 'Message sent successfully!' },
        { status: 200 }
      );
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required', errorType: 'validation' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address', errorType: 'validation' },
        { status: 400 }
      );
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitCheck = checkRateLimit(clientIP);
    if (!rateLimitCheck.allowed) {
      const resetTime = rateLimitCheck.resetTime || Date.now() + RATE_LIMIT_WINDOW;
      const minutesLeft = Math.ceil((resetTime - Date.now()) / (60 * 1000));
      return NextResponse.json(
        {
          error: `Too many requests. Please try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`,
          errorType: 'rate_limit',
        },
        { status: 429 }
      );
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          error: 'Contact form is temporarily unavailable. Please contact me directly via WhatsApp or email.',
          errorType: 'config',
        },
        { status: 503 }
      );
    }

    // Get Supabase client (lazy initialization)
    let supabase;
    try {
      supabase = getSupabaseClient();
    } catch (error) {
      console.error('Supabase client initialization error:', error);
      return NextResponse.json(
        {
          error: 'Contact form is temporarily unavailable. Please contact me directly via WhatsApp or email.',
          errorType: 'config',
        },
        { status: 503 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // Insert into Supabase
    const { error } = await supabase
      .from('contacts')
      .insert([
        {
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      // Check if it's a network/connection error vs config error
      if (error.message?.includes('fetch') || error.message?.includes('network')) {
        return NextResponse.json(
          {
            error: 'Network error. Please check your connection and try again, or contact me directly via WhatsApp or email.',
            errorType: 'network',
          },
          { status: 503 }
        );
      }
      return NextResponse.json(
        {
          error: 'Failed to send message. Please try again or contact me directly via WhatsApp or email.',
          errorType: 'database',
        },
        { status: 500 }
      );
    }

    // Best-effort email ping — never blocks a successful save
    await notifyContactSubmission({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Invalid request format. Please try again.',
          errorType: 'validation',
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: 'An unexpected error occurred. Please try again or contact me directly via WhatsApp or email.',
        errorType: 'server',
      },
      { status: 500 }
    );
  }
}

