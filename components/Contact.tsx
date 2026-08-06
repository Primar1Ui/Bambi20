'use client';

import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, Loader2, CheckCircle2 } from 'lucide-react';
import { trackFunnel } from '@/lib/analytics';
import { whatsappContacts } from '@/lib/data';

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validateContactForm(data: { name: string; email: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // Honeypot field - should remain empty
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    if (status !== 'success') return;
    setShowSuccessAnimation(true);
    const t = setTimeout(() => setShowSuccessAnimation(false), 2500);
    return () => clearTimeout(t);
  }, [status]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    trackFunnel.contactFormSubmit();

    const errors = validateContactForm(formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus('error');
      setStatusMessage('Please fix the errors below before sending.');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        trackFunnel.contactFormSuccess();
        setStatus('success');
        setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
        setFieldErrors({});
        setFormData({ name: '', email: '', message: '', website: '' });
      } else {
        trackFunnel.contactFormError(data.errorType || 'unknown');
        setStatus('error');
        // Check if it's a config error (form unavailable)
        if (data.errorType === 'config') {
          setStatusMessage('The contact form is temporarily unavailable. Please reach me directly via WhatsApp or email using the links above.');
        } else if (data.errorType === 'rate_limit') {
          setStatusMessage('You\'ve sent too many messages recently. Please wait a bit before trying again, or contact me directly via WhatsApp or email.');
        } else {
          setStatusMessage(data.error || 'Failed to send message. Please try again or contact me directly via WhatsApp or email.');
        }
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Network error occurred. Please check your connection and try again, or contact me directly via WhatsApp or email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative"
    >
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 1, x: 0, y: 0, opacity: 0.9 }}
                  animate={{
                    scale: 0,
                    x: Math.cos((i / 16) * Math.PI * 2) * 120,
                    y: Math.sin((i / 16) * Math.PI * 2) * 120,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.02 }}
                  className="absolute left-1/2 top-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-blue-400"
                />
              ))}
            </div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-4 relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.15 }}
                className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center"
              >
                <CheckCircle2 className="w-14 h-14 text-green-400" />
              </motion.div>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-lg font-semibold text-white"
              >
                Message sent!
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Let's <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Connect</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Let's build something amazing together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-white">Get in Touch</h3>
              <div className="space-y-4">
                {whatsappContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">
                        WhatsApp · {contact.label}
                        {contact.primary ? ' (primary)' : ''}
                      </p>
                      <a
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackFunnel.whatsappClick(`contact-${contact.id}`)}
                        className="text-white hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] rounded px-1"
                      >
                        {contact.display}
                      </a>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a
                      href="mailto:davidtosin306@gmail.com"
                      onClick={() => trackFunnel.emailClick('contact')}
                      className="text-white hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] rounded px-1"
                    >
                      davidtosin306@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 relative" noValidate>
              {/* Honeypot field - hidden from users */}
              <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (fieldErrors.name) {
                      setFieldErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-900/50 border text-white placeholder-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] transition-colors ${
                    fieldErrors.name
                      ? 'border-red-500/70 focus:border-red-500'
                      : 'border-gray-800 focus:border-blue-500'
                  }`}
                  placeholder="Your name"
                />
                {fieldErrors.name && (
                  <p id="name-error" role="alert" className="mt-2 text-sm text-red-400">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (fieldErrors.email) {
                      setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-900/50 border text-white placeholder-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] transition-colors ${
                    fieldErrors.email
                      ? 'border-red-500/70 focus:border-red-500'
                      : 'border-gray-800 focus:border-blue-500'
                  }`}
                  placeholder="your.email@example.com"
                />
                {fieldErrors.email && (
                  <p id="email-error" role="alert" className="mt-2 text-sm text-red-400">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (fieldErrors.message) {
                      setFieldErrors((prev) => ({ ...prev, message: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-900/50 border text-white placeholder-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] transition-colors resize-none ${
                    fieldErrors.message
                      ? 'border-red-500/70 focus:border-red-500'
                      : 'border-gray-800 focus:border-blue-500'
                  }`}
                  placeholder="Your message..."
                />
                {fieldErrors.message && (
                  <p id="message-error" role="alert" className="mt-2 text-sm text-red-400">
                    {fieldErrors.message}
                  </p>
                )}
              </div>
              {statusMessage && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-2 ${
                    status === 'success'
                      ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                      : 'bg-red-500/20 border border-red-500/50 text-red-400'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {status === 'success' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>⚠️</span>
                  )}
                  <span className="text-sm">{statusMessage}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500 text-center mt-4">
                I usually reply within 24 hours via email or WhatsApp
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

