import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { IMAGES, CARE_PILLARS } from '../data/tributeData';
import { StoryImage } from './StoryImage';

export const CareMoment: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

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
      className="relative py-24 px-4 sm:px-6 lg:px-12 bg-[#10241A] text-[#F5F7F3] border-t border-[#163021] overflow-hidden"
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
            theme="dark"
            blend="dark-bottom"
          />
        </motion.div>

        {/* 2. Strong visual headline associated with that photograph */}
        <div className="w-full text-center mt-6 sm:mt-10">
          <motion.div variants={slideUpVariant}>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F5F7F3] leading-[0.95] text-balance">
              A LIFE OF CARE
            </h2>
            <p className="font-headline font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#E6B84A] mt-3 tracking-tight">
              Registered Nurse & Family Anchor
            </p>
          </motion.div>

          {/* 3. The relevant story text (Enlarged body font size) */}
          <motion.div
            variants={slideUpVariant}
            className="mt-8 max-w-3xl mx-auto space-y-6 text-left sm:text-center"
          >
            <p className="font-sans text-xl sm:text-2xl leading-relaxed text-[#F5F7F3] font-medium">
              Throughout her decades as a registered nurse, Big Mummy’s devotion has never been merely a career — it is the natural extension of who she is. Through clinical expertise and unwavering spiritual warmth, she has comforted distress and protected vulnerable moments.
            </p>
            <p className="font-sans text-lg sm:text-xl leading-relaxed text-[#C8D1CB] font-normal">
              Within the Adesola family, she remains the steady foundation: caring, loving, industrious, virtuous, and unconditionally supportive through every season.
            </p>
          </motion.div>

          {/* Core Virtues Grid — integrated cleanly with subtle staggered motion cards */}
          <div className="mt-12 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {CARE_PILLARS.slice(0, 4).map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="p-7 bg-[#07100C]/70 border border-[#163021] text-[#F5F7F3] transition-colors hover:border-[#E6B84A]/30"
              >
                <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#E6B84A] tracking-tight">
                  {pillar.trait}
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#C8D1CB] mt-3 leading-relaxed font-normal">
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
