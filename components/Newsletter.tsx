'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2, Check, AlertCircle } from 'lucide-react';

const NEWSLETTER_ENABLED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!NEWSLETTER_ENABLED || !email.trim()) return;
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), website }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('success');
        setEmail('');
        setMessage(data.message ?? 'Thanks for subscribing!');
      } else {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50"
    >
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Stay in the loop
        </h2>
        <p className="text-gray-400 mb-6">
          {NEWSLETTER_ENABLED
            ? 'Get occasional updates on new posts and projects. No spam.'
            : 'Newsletter coming soon. For now, use the contact form or WhatsApp. I reply within 24 hours.'}
        </p>
        {NEWSLETTER_ENABLED ? (
          <>
            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="newsletter-website">Website</label>
                <input
                  id="newsletter-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={status === 'loading'}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Subscribing…
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
            {message && (
              <p
                className={`mt-4 text-sm flex items-center justify-center gap-2 ${
                  status === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
                role="status"
                aria-live="polite"
              >
                {status === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {message}
              </p>
            )}
          </>
        ) : (
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background"
          >
            Contact me instead
          </a>
        )}
      </div>
    </motion.section>
  );
}
