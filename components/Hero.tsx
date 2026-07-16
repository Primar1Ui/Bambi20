'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Rocket, Mail, MessageCircle, ArrowRight, Download } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { trackFunnel } from '@/lib/analytics';
import { portfolioStats, primaryWhatsApp } from '@/lib/data';

const TEXTS = [
  "Full-Stack Developer",
  "Embedded System Analyst",
  "Community Builder",
  "SaaS Builder"
];

export default function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(TEXTS[0]);
      setShowCursor(false);
      setIsDeleting(false);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let timeout: NodeJS.Timeout;
    const currentText = TEXTS[currentTextIndex];
    
    if (!isDeleting && displayedText.length < currentText.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, 100);
    } else if (!isDeleting && displayedText.length === currentText.length) {
      // Finished typing, wait before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length - 1));
      }, 50);
    } else if (isDeleting && displayedText.length === 0) {
      // Finished deleting, move to next text
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % TEXTS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [prefersReducedMotion]);

  const handleViewProjects = () => {
    trackFunnel.heroViewProjects();
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 md:pt-24"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 blur-xl opacity-50 animate-pulse" />
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-cyan-400/50 overflow-hidden shadow-2xl shadow-cyan-500/20">
              {!imageError ? (
                <Image
                  src="/images/profile.jpg"
                  alt="David - Full-Stack Developer"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-4xl" role="img" aria-label="David - Full-Stack Developer">
                  <span className="text-white font-bold">D</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <span className="text-2xl md:text-3xl">👋</span>
          <span className="text-lg md:text-xl text-gray-300">Hello, I'm</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            David
          </span>
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.4 }}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 min-h-[3rem]"
        >
          <span className="text-gray-300">I'm a </span>
          <span className="text-cyan-400">{displayedText}</span>
          <span className={`text-cyan-400 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
            |
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.5 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Passionate about building{' '}
          <span className="text-cyan-400 font-semibold">intelligent</span>,{' '}
          <span className="text-cyan-400 font-semibold">efficient</span>, and{' '}
          <span className="text-cyan-400 font-semibold">meaningful</span> tech solutions.
          Turning ideas into reality through code, creativity, and collaboration.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={handleViewProjects}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl font-semibold text-black hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
          >
            <Rocket className="w-5 h-5" />
            <span>View My Projects</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href={primaryWhatsApp.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFunnel.whatsappClick('hero-cta')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 border-2 border-blue-400 rounded-xl font-semibold text-white hover:bg-blue-600 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href="/cv.pdf"
            download
            onClick={() => trackFunnel.heroDownloadCV()}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl font-semibold text-white hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
          >
            <Download className="w-5 h-5" />
            <span>Download CV</span>
          </a>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.7 }}
          className="flex items-center justify-center gap-8 md:gap-12 mb-8"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">
              {portfolioStats.projects}+
            </div>
            <div className="text-sm md:text-base text-gray-400">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1">
              {portfolioStats.clients}+
            </div>
            <div className="text-sm md:text-base text-gray-400">Clients</div>
          </div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="mailto:davidtosin306@gmail.com"
            onClick={() => trackFunnel.emailClick('hero')}
            className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700 hover:border-blue-400 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
            aria-label="Email"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href={primaryWhatsApp.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFunnel.whatsappClick('hero-icon')}
            className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-green-400 hover:bg-gray-700 hover:border-green-400 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
            aria-label={`WhatsApp (${primaryWhatsApp.label})`}
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://t.me/mar_gdd"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFunnel.telegramClick('hero')}
            className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-blue-400 hover:bg-gray-700 hover:border-blue-400 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
            aria-label="Telegram"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
