import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { NAV_ITEMS } from '../data/tributeData';
import { ArrowUp, Mail, Instagram } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { trackContactClick } from '../utils/analytics';

export const FooterCredits: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.75,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={footerVariants}
      className={`border-t py-16 px-4 sm:px-6 lg:px-12 transition-colors duration-300 ${
        isDark
          ? 'bg-[#07100C] text-[#F5F7F3] border-[#163021]'
          : 'bg-[#EFE8DA] text-[#0A1C14] border-[#D6CEBE]'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col space-y-12">
        {/* Top Tier: Title and Section Navigation */}
        <div
          className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b pb-8 ${
            isDark ? 'border-[#163021]' : 'border-[#D6CEBE]'
          }`}
        >
          <div>
            <span
              className={`font-display text-xl sm:text-2xl uppercase tracking-tight block ${
                isDark ? 'text-[#F5F0E6]' : 'text-[#0A1C14]'
              }`}
            >
              OMOLAYO KOLLEADE
            </span>
            <span
              className={`text-sm font-headline font-bold ${
                isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
              }`}
            >
              A Legacy of Love · Honoring Big Mummy
            </span>
          </div>

          <nav
            className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-wider font-headline font-bold ${
              isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
            }`}
            aria-label="Footer navigation links"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`transition-colors ${
                  isDark ? 'hover:text-[#E6B84A]' : 'hover:text-[#B58218]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Middle Tier: Music Credit & Return to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            className={`text-xs sm:text-sm font-mono tracking-wider uppercase ${
              isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
            }`}
          >
            Music by SUNEXUS, made with SUNO
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className={`flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest p-2 transition-colors cursor-pointer group ${
              isDark
                ? 'text-[#C8D1CB] hover:text-[#E6B84A]'
                : 'text-[#48574D] hover:text-[#B58218]'
            }`}
            aria-label="Back to beginning"
          >
            <span>Return to Top</span>
            <ArrowUp
              className={`w-4 h-4 group-hover:-translate-y-0.5 transition-transform ${
                isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
              }`}
            />
          </button>
        </div>

        {/* Bottom Tier: Exact Required Creator & Connect Information */}
        <div
          className={`pt-8 border-t grid grid-cols-1 md:grid-cols-2 gap-8 text-sm ${
            isDark ? 'border-[#163021]' : 'border-[#D6CEBE]'
          }`}
        >
          {/* Creator Attribution */}
          <div className="space-y-1.5">
            <p
              className={`font-headline font-bold text-base sm:text-lg ${
                isDark ? 'text-[#F5F7F3]' : 'text-[#0A1C14]'
              }`}
            >
              Created with love by Uthman Adesola
            </p>
            <p
              className={`font-headline font-medium text-sm ${
                isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
              }`}
            >
              Creative Director, SUNEXUS
            </p>
            <p
              className={`font-headline font-semibold text-xs tracking-wide ${
                isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
              }`}
            >
              SUNEXUS — Illuminating!
            </p>
          </div>

          {/* Enquiries and Connect Icons */}
          <div className="space-y-3 md:text-right">
            <p
              className={`font-headline font-bold text-xs uppercase tracking-wider ${
                isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
              }`}
            >
              For enquiries or to connect:
            </p>

            {/* Social & Contact Icons */}
            <div className="flex items-center gap-3 md:justify-end">
              {/* WhatsApp Icon */}
              <a
                href="https://wa.me/2349036066187"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick({ channel: 'whatsapp', destination: 'https://wa.me/2349036066187' })}
                aria-label="Chat on WhatsApp (+2349036066187)"
                title="WhatsApp: +2349036066187"
                className={`w-10 h-10 flex items-center justify-center border transition-all duration-200 cursor-pointer shadow-sm group ${
                  isDark
                    ? 'bg-[#10241A] border-[#163021] text-[#E6B84A] hover:bg-[#E6B84A] hover:text-[#07100C] hover:border-[#E6B84A]'
                    : 'bg-[#FAF6EE] border-[#D6CEBE] text-[#B58218] hover:bg-[#B58218] hover:text-[#FAF6EE] hover:border-[#B58218]'
                }`}
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.04-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.17 8.17 0 0 1-1.25-4.48c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.53.61.2 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32z" />
                </svg>
              </a>

              {/* Email Icon */}
              <a
                href="mailto:sunexustech@gmail.com"
                onClick={() => trackContactClick({ channel: 'email', destination: 'mailto:sunexustech@gmail.com' })}
                aria-label="Send email to sunexustech@gmail.com"
                title="Email: sunexustech@gmail.com"
                className={`w-10 h-10 flex items-center justify-center border transition-all duration-200 cursor-pointer shadow-sm group ${
                  isDark
                    ? 'bg-[#10241A] border-[#163021] text-[#E6B84A] hover:bg-[#E6B84A] hover:text-[#07100C] hover:border-[#E6B84A]'
                    : 'bg-[#FAF6EE] border-[#D6CEBE] text-[#B58218] hover:bg-[#B58218] hover:text-[#FAF6EE] hover:border-[#B58218]'
                }`}
              >
                <Mail className="w-5 h-5" />
              </a>

              {/* Instagram Icon */}
              <a
                href="https://www.instagram.com/sir_uthy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick({ channel: 'instagram', destination: 'https://www.instagram.com/sir_uthy' })}
                aria-label="Visit Instagram profile @sir_uthy"
                title="Instagram: @sir_uthy"
                className={`w-10 h-10 flex items-center justify-center border transition-all duration-200 cursor-pointer shadow-sm group ${
                  isDark
                    ? 'bg-[#10241A] border-[#163021] text-[#E6B84A] hover:bg-[#E6B84A] hover:text-[#07100C] hover:border-[#E6B84A]'
                    : 'bg-[#FAF6EE] border-[#D6CEBE] text-[#B58218] hover:bg-[#B58218] hover:text-[#FAF6EE] hover:border-[#B58218]'
                }`}
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <p
              className={`text-xs pt-1 font-sans ${
                isDark ? 'text-[#C8D1CB]/70' : 'text-[#48574D]/80'
              }`}
            >
              © 2026 Uthman Adesola. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
