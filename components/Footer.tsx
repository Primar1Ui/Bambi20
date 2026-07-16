'use client';

import { MessageCircle, Mail, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackFunnel } from '@/lib/analytics';
import { whatsappContacts } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm"
          >
            © David — All rights reserved
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 flex-wrap justify-center"
          >
            <a
              href="mailto:davidtosin306@gmail.com"
              onClick={() => trackFunnel.emailClick('footer')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">davidtosin306@gmail.com</span>
            </a>

            <a
              href="https://t.me/mar_gdd"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackFunnel.telegramClick('footer')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
              aria-label="Telegram"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="text-sm font-medium">Telegram</span>
            </a>

            <a
              href="https://github.com/Primar1Ui"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackFunnel.githubClick('footer')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">GitHub</span>
            </a>

            {whatsappContacts.map((contact) => (
              <a
                key={contact.id}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackFunnel.whatsappClick(`footer-${contact.id}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                aria-label={`WhatsApp ${contact.label}`}
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">
                  {contact.countryCode} · {contact.display}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
