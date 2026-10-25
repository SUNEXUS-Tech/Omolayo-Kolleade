import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { IMAGES, SITE_METADATA } from '../data/tributeData';
import { StoryImage } from './StoryImage';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface OpeningHeroProps {
  onExploreClick: () => void;
}

export const OpeningHero: React.FC<OpeningHeroProps> = ({ onExploreClick }) => {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  // Container variants with subtle staggered children reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  // Subtle slide-up reveal
  const slideUpVariant: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  // Gentle fade-in for photography
  const photoVariant: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.9,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.section
      id="opening"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={`relative min-h-screen flex flex-col justify-between pt-20 pb-16 px-4 sm:px-6 lg:px-12 transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#07100C] text-[#F5F7F3]' : 'bg-[#FAF6EE] text-[#0A1C14]'
      }`}
      aria-label="A Legacy of Love"
    >
      {/* Dedicated Introduction Banner */}
      <motion.div
        variants={slideUpVariant}
        className="w-full max-w-4xl mx-auto pt-2 pb-2 flex justify-center text-center"
      >
        <div
          className={`inline-flex items-center gap-2 py-2.5 px-6 border text-xs sm:text-sm md:text-base font-headline font-bold tracking-wide shadow-md transition-colors ${
            isDark
              ? 'bg-[#10241A] border-[#E6B84A]/50 text-[#E6B84A]'
              : 'bg-[#EFE8DA] border-[#B58218]/50 text-[#B58218]'
          }`}
        >
          <span>{SITE_METADATA.dedicationIntro}</span>
        </div>
      </motion.div>

      {/* 1. The photograph, integrated into the page background immediately */}
      <motion.div
        variants={photoVariant}
        className="w-full max-w-4xl mx-auto pt-2 sm:pt-4 flex justify-center"
      >
        <StoryImage
          config={IMAGES.opening}
          priority={true}
          objectFit="contain"
          maxHeight="max-h-[62vh] sm:max-h-[68vh]"
          blend="dark-bottom"
        />
      </motion.div>

      {/* 2. Strong visual headline banner associated with photograph */}
      <div className="w-full max-w-5xl mx-auto text-center -mt-8 sm:-mt-12 z-10 relative">
        <motion.div variants={slideUpVariant}>
          <h1
            className={`font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.92] text-balance transition-colors ${
              isDark ? 'text-[#F5F7F3]' : 'text-[#0A1C14]'
            }`}
          >
            OMOLAYO KOLLEADE
          </h1>
          <p
            className={`font-headline font-extrabold text-2xl sm:text-3xl md:text-4xl mt-3 tracking-tight transition-colors ${
              isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
            }`}
          >
            A Legacy of Love
          </p>
        </motion.div>

        {/* 3. The relevant story text (Enlarged body font size, text-justify) */}
        <motion.div
          variants={slideUpVariant}
          className="mt-8 max-w-3xl mx-auto space-y-5 text-justify"
        >
          <p
            className={`text-xl sm:text-2xl font-medium leading-relaxed text-justify transition-colors ${
              isDark ? 'text-[#F5F7F3]' : 'text-[#0A1C14]'
            }`}
          >
            Celebrating{' '}
            <span className={`font-bold ${isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'}`}>
              {SITE_METADATA.honoree}
            </span>
            , known to all whose lives she touches as{' '}
            <strong
              className={`font-headline font-extrabold text-2xl sm:text-3xl ${
                isDark ? 'text-[#F5F7F3]' : 'text-[#0A1C14]'
              }`}
            >
              {SITE_METADATA.nickname}
            </strong>
            .
          </p>
          <p
            className={`text-lg sm:text-xl leading-relaxed font-normal text-justify transition-colors ${
              isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
            }`}
          >
            A woman of commanding dignity, boundless maternal warmth, and lifelong healing. Here, through memory, lineage, and the song{' '}
            <span className={`font-bold ${isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'}`}>
              OLUMINI
            </span>
            , we celebrate an extraordinary soul whose very presence has been a sanctuary for our family.
          </p>
        </motion.div>
      </div>

      {/* 4. Natural transition into the next section */}
      <motion.div variants={slideUpVariant} className="w-full pt-8 flex justify-center">
        <button
          type="button"
          onClick={onExploreClick}
          className={`group flex flex-col items-center gap-1.5 text-xs font-headline font-bold uppercase tracking-widest transition-colors cursor-pointer ${
            isDark
              ? 'text-[#C8D1CB] hover:text-[#E6B84A]'
              : 'text-[#48574D] hover:text-[#B58218]'
          }`}
          aria-label="Continue reading Big Mummy's story"
        >
          <span>Continue Story</span>
          <ChevronDown
            className={`w-4 h-4 animate-bounce ${isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'}`}
          />
        </button>
      </motion.div>
    </motion.section>
  );
};
