import { NextRequest, NextResponse } from 'next/server';

/**
 * Newsletter signup API.
 * Enable by setting RESEND_API_KEY and RESEND_AUDIENCE_ID in .env,
 * then wire the Resend contacts.create call below.
 */
export async function POST(request: NextRequest) {
  try {
    const configured =
      Boolean(process.env.RESEND_API_KEY) && Boolean(process.env.RESEND_AUDIENCE_ID);

    if (!configured) {
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
    const email = typeof body?.email === 'string' ? body.email.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // TODO: integrate Resend (or another provider) when keys are set:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.contacts.create({ email, audienceId: process.env.RESEND_AUDIENCE_ID! });

    if (process.env.NODE_ENV === 'development') {
      console.log('[Newsletter] Signup (provider configured but not wired):', email);
    }

    return NextResponse.json(
      {
        error:
          'Newsletter provider is configured but not wired yet. Please use the contact form.',
        errorType: 'not_wired',
      },
      { status: 503 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
