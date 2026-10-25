import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { IMAGES, SONG_DATA } from '../data/tributeData';
import { StoryImage } from './StoryImage';
import { OluminiPlayer } from './OluminiPlayer';
import { useTheme } from '../context/ThemeContext';

export const SongMoment: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

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
      id="song"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      className={`relative py-24 px-4 sm:px-6 lg:px-12 border-t transition-colors duration-300 overflow-hidden ${
        isDark
          ? 'bg-[#07100C] text-[#F5F7F3] border-[#163021]'
          : 'bg-[#FAF6EE] text-[#0A1C14] border-[#D6CEBE]'
      }`}
      aria-label="OLUMINI Anthem"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* 1. The photograph, integrated into the page background immediately */}
        <motion.div
          variants={photoVariant}
          className="w-full max-w-md flex justify-center"
        >
          <StoryImage
            config={IMAGES.olumini}
            objectFit="contain"
            maxHeight="max-h-[50vh] sm:max-h-[55vh]"
            blend="dark-soft"
          />
        </motion.div>

        {/* 2. Strong visual headline banner associated with that photograph */}
        <div className="w-full text-center mt-6 sm:mt-10">
          <motion.div variants={slideUpVariant}>
            <h2
              className={`font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.92] text-balance transition-colors ${
                isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
              }`}
            >
              OLUMINI
            </h2>
            <p
              className={`font-headline font-extrabold text-xl sm:text-2xl mt-3 tracking-tight transition-colors ${
                isDark ? 'text-[#F5F7F3]' : 'text-[#0A1C14]'
              }`}
            >
              The Birthday Anthem by SUNEXUS
            </p>
          </motion.div>

          {/* 3. The relevant story text (Enlarged body font size, text-justify) */}
          <motion.div
            variants={slideUpVariant}
            className="mt-8 max-w-3xl mx-auto space-y-3 text-justify"
          >
            <p
              className={`font-sans text-lg sm:text-xl md:text-2xl leading-relaxed font-normal text-justify transition-colors ${
                isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
              }`}
            >
              {SONG_DATA.dedication}
            </p>
          </motion.div>

          {/* 4. The Real Music Player listening experience */}
          <motion.div variants={slideUpVariant} className="mt-12 w-full">
            <OluminiPlayer />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
