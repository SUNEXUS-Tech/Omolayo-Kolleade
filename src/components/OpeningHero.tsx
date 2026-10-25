import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { IMAGES, SITE_METADATA } from '../data/tributeData';
import { StoryImage } from './StoryImage';
import { ChevronDown } from 'lucide-react';

interface OpeningHeroProps {
  onExploreClick: () => void;
}

export const OpeningHero: React.FC<OpeningHeroProps> = ({ onExploreClick }) => {
  const shouldReduceMotion = useReducedMotion();

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
      className="relative min-h-screen flex flex-col justify-between pt-20 pb-16 px-4 sm:px-6 lg:px-12 bg-[#07100C] text-[#F5F7F3] overflow-hidden"
      aria-label="A Legacy of Love"
    >
      {/* Dedicated Introduction Banner */}
      <motion.div
        variants={slideUpVariant}
        className="w-full max-w-4xl mx-auto pt-2 pb-2 flex justify-center text-center"
      >
        <div className="inline-flex items-center gap-2 py-2.5 px-6 bg-[#10241A] border border-[#E6B84A]/50 text-xs sm:text-sm md:text-base font-headline font-bold text-[#E6B84A] tracking-wide shadow-md">
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
          theme="dark"
          blend="dark-bottom"
        />
      </motion.div>

      {/* 2. Strong visual headline banner associated with photograph */}
      <div className="w-full max-w-5xl mx-auto text-center -mt-8 sm:-mt-12 z-10 relative">
        <motion.div variants={slideUpVariant}>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F5F7F3] uppercase leading-[0.92] text-balance">
            OMOLAYO KOLLEADE
          </h1>
          <p className="font-headline font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#E6B84A] mt-3 tracking-tight">
            A Legacy of Love
          </p>
        </motion.div>

        {/* 3. The relevant story text (Enlarged body font size) */}
        <motion.div
          variants={slideUpVariant}
          className="mt-8 max-w-3xl mx-auto space-y-5"
        >
          <p className="text-xl sm:text-2xl text-[#F5F7F3] font-medium leading-relaxed">
            Celebrating <span className="font-bold text-[#E6B84A]">{SITE_METADATA.honoree}</span>, known to all whose lives she touches as{' '}
            <strong className="font-headline font-extrabold text-[#F5F7F3] text-2xl sm:text-3xl">
              {SITE_METADATA.nickname}
            </strong>.
          </p>
          <p className="text-lg sm:text-xl text-[#C8D1CB] leading-relaxed font-normal">
            A woman of commanding dignity, boundless maternal warmth, and lifelong healing. Here, through memory, lineage, and the song <span className="text-[#E6B84A] font-bold">OLUMINI</span>, we celebrate an extraordinary soul whose very presence has been a sanctuary for our family.
          </p>
        </motion.div>
      </div>

      {/* 4. Natural transition into the next section */}
      <motion.div
        variants={slideUpVariant}
        className="w-full pt-8 flex justify-center"
      >
        <button
          type="button"
          onClick={onExploreClick}
          className="group flex flex-col items-center gap-1.5 text-xs font-headline font-bold uppercase tracking-widest text-[#C8D1CB] hover:text-[#E6B84A] transition-colors cursor-pointer"
          aria-label="Continue reading Big Mummy's story"
        >
          <span>Continue Story</span>
          <ChevronDown className="w-4 h-4 text-[#E6B84A] animate-bounce" />
        </button>
      </motion.div>
    </motion.section>
  );
};
