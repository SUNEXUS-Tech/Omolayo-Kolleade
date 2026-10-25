import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { NAV_ITEMS } from '../data/tributeData';
import { ArrowUp, Mail, MessageCircle } from 'lucide-react';

export const FooterCredits: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

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
      className="bg-[#07100C] text-[#F5F7F3] border-t border-[#163021] py-16 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-6xl mx-auto flex flex-col space-y-12">
        {/* Top Tier: Title and Section Navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#163021] pb-8">
          <div>
            <span className="font-display text-xl sm:text-2xl text-[#F5F0E6] uppercase tracking-tight block">
              OMOLAYO KOLLEADE
            </span>
            <span className="text-sm text-[#E6B84A] font-headline font-bold">
              A Legacy of Love · Honoring Big Mummy
            </span>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-wider font-headline font-bold text-[#C8D1CB]"
            aria-label="Footer navigation links"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="hover:text-[#E6B84A] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Middle Tier: Music Credit & Return to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm font-mono text-[#E6B84A] tracking-wider uppercase">
            Music by SUNEXUS, made with SUNO
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-[#C8D1CB] hover:text-[#E6B84A] p-2 transition-colors cursor-pointer group"
            aria-label="Back to beginning"
          >
            <span>Return to Top</span>
            <ArrowUp className="w-4 h-4 text-[#E6B84A] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Tier: Exact Required Creator & Connect Information */}
        <div className="pt-8 border-t border-[#163021] grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          {/* Creator Attribution */}
          <div className="space-y-1.5">
            <p className="font-headline font-bold text-base sm:text-lg text-[#F5F7F3]">
              Created with love by Uthman Adesola
            </p>
            <p className="font-headline font-medium text-sm text-[#E6B84A]">
              Creative Director, SUNEXUS
            </p>
            <p className="font-headline font-semibold text-xs tracking-wide text-[#C8D1CB]">
              SUNEXUS — Illuminating!
            </p>
          </div>

          {/* Enquiries and Contact Details */}
          <div className="space-y-2 md:text-right">
            <p className="font-headline font-bold text-xs uppercase tracking-wider text-[#C8D1CB]">
              For enquiries or to connect:
            </p>
            <p className="text-sm">
              <span className="text-[#C8D1CB]">Email: </span>
              <a
                href="mailto:sunexustech@gmail.com"
                className="text-[#E6B84A] hover:underline font-mono"
              >
                sunexustech@gmail.com
              </a>
            </p>
            <p className="text-sm">
              <a
                href="https://wa.me/2349036066187"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#E6B84A] hover:underline font-mono"
              >
                <span>wa.me/+2349036066187</span>
              </a>
            </p>
            <p className="text-xs text-[#C8D1CB]/70 pt-2 font-sans">
              © 2026 Uthman Adesola. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
