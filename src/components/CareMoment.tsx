import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { IMAGES, CARE_PILLARS } from '../data/tributeData';
import { StoryImage } from './StoryImage';
import { useTheme } from '../context/ThemeContext';

export const CareMoment: React.FC = () => {
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

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.65,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.section
      id="care"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      className={`relative py-24 px-4 sm:px-6 lg:px-12 border-t transition-colors duration-300 overflow-hidden ${
        isDark
          ? 'bg-[#10241A] text-[#F5F7F3] border-[#163021]'
          : 'bg-[#FAF6EE] text-[#0A1C14] border-[#D6CEBE]'
      }`}
      aria-label="A Life of Care"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* 1. The photograph, integrated into the page background immediately */}
        <motion.div
          variants={photoVariant}
          className="w-full max-w-3xl flex justify-center"
        >
          <StoryImage
            config={IMAGES.care}
            objectFit="contain"
            maxHeight="max-h-[64vh] sm:max-h-[70vh]"
            blend="dark-bottom"
          />
        </motion.div>

        {/* 2. Strong visual headline associated with that photograph */}
        <div className="w-full text-center mt-6 sm:mt-10">
          <motion.div variants={slideUpVariant}>
            <h2
              className={`font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.95] text-balance transition-colors ${
                isDark ? 'text-[#F5F7F3]' : 'text-[#0A1C14]'
              }`}
            >
              A LIFE OF CARE
            </h2>
            <p
              className={`font-headline font-extrabold text-xl sm:text-2xl lg:text-3xl mt-3 tracking-tight transition-colors ${
                isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
              }`}
            >
              Registered Nurse & Family Anchor
            </p>
          </motion.div>

          {/* 3. The relevant story text (Enlarged body font size, text-justify) */}
          <motion.div
            variants={slideUpVariant}
            className="mt-8 max-w-3xl mx-auto space-y-6 text-justify"
          >
            <p
              className={`font-sans text-xl sm:text-2xl leading-relaxed font-medium text-justify transition-colors ${
                isDark ? 'text-[#F5F7F3]' : 'text-[#0A1C14]'
              }`}
            >
              Throughout her decades as a registered nurse, Big Mummy’s devotion has never been merely a career — it is the natural extension of who she is. Through clinical expertise and unwavering spiritual warmth, she has comforted distress and protected vulnerable moments.
            </p>
            <p
              className={`font-sans text-lg sm:text-xl leading-relaxed font-normal text-justify transition-colors ${
                isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
              }`}
            >
              Within the Adesola family, she remains the steady foundation: caring, loving, industrious, virtuous, and unconditionally supportive through every season.
            </p>
          </motion.div>

          {/* Core Virtues Grid */}
          <div className="mt-12 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {CARE_PILLARS.slice(0, 4).map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={`p-7 border transition-colors ${
                  isDark
                    ? 'bg-[#07100C]/70 border-[#163021] text-[#F5F7F3] hover:border-[#E6B84A]/30'
                    : 'bg-[#EFE8DA] border-[#D6CEBE] text-[#0A1C14] hover:border-[#B58218]/40 shadow-sm'
                }`}
              >
                <h3
                  className={`font-headline font-bold text-xl sm:text-2xl tracking-tight ${
                    isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
                  }`}
                >
                  {pillar.trait}
                </h3>
                <p
                  className={`font-sans text-base sm:text-lg mt-3 leading-relaxed font-normal text-justify ${
                    isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
                  }`}
                >
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
