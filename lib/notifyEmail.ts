import { Resend } from 'resend';

const DEFAULT_NOTIFY_EMAIL = 'davidtosin306@gmail.com';
const DEFAULT_FROM = 'Portfolio <onboarding@resend.dev>';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sends an owner notification email via Resend.
 * Non-blocking for callers: returns quietly if Resend is not configured.
 * Never throws — form submissions should succeed even if email fails.
 */
export async function notifyOwner(options: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { sent: false, reason: 'not_configured' };
  }

  const to = process.env.NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
    });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[notifyOwner] Resend error:', error);
      }
      return { sent: false, reason: error.message };
    }

    return { sent: true };
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[notifyOwner] unexpected error:', err);
    }
    return { sent: false, reason: 'send_failed' };
  }
}

export async function notifyContactSubmission(input: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const message = escapeHtml(input.message).replace(/\n/g, '<br />');

  await notifyOwner({
    subject: `New portfolio contact from ${input.name}`,
    replyTo: input.email,
    text: `New contact form submission\n\nName: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
    html: `
      <div style="font-family: system-ui, sans-serif; line-height: 1.5; color: #0f172a;">
        <h2 style="margin: 0 0 12px;">New portfolio contact</h2>
        <p style="margin: 0 0 8px;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
        <p style="margin: 0; padding: 12px; background: #f1f5f9; border-radius: 8px;">${message}</p>
      </div>
    `,
  });
}

export async function notifyNewsletterSignup(email: string): Promise<void> {
  const safeEmail = escapeHtml(email);

  await notifyOwner({
    subject: `New newsletter signup: ${email}`,
    replyTo: email,
    text: `Someone subscribed to the portfolio newsletter.\n\nEmail: ${email}`,
    html: `
      <div style="font-family: system-ui, sans-serif; line-height: 1.5; color: #0f172a;">
        <h2 style="margin: 0 0 12px;">New newsletter signup</h2>
        <p style="margin: 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      </div>
    `,
  });
}
