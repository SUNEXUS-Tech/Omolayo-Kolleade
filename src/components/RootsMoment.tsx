import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { IMAGES } from '../data/tributeData';
import { StoryImage } from './StoryImage';

interface RootsMomentProps {
  onSongJump: () => void;
}

export const RootsMoment: React.FC<RootsMomentProps> = ({ onSongJump }) => {
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

  return (
    <motion.section
      id="roots"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      className="relative py-24 px-4 sm:px-6 lg:px-12 bg-[#F5F0E6] text-[#07100C] border-t border-[#D6CEBE] overflow-hidden"
      aria-label="Roots and Lineage"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* 1. The photograph, integrated into the page background immediately */}
        <motion.div
          variants={photoVariant}
          className="w-full max-w-2xl flex justify-center"
        >
          <StoryImage
            config={IMAGES.roots}
            objectFit="contain"
            maxHeight="max-h-[68vh] sm:max-h-[75vh]"
            theme="ivory"
            blend="ivory-soft"
          />
        </motion.div>

        {/* 2. Strong visual headline associated with that photograph */}
        <div className="w-full text-center mt-6 sm:mt-10">
          <motion.div variants={slideUpVariant}>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#07100C] leading-[0.95] text-balance">
              DAUGHTER OF OLUMINI
            </h2>
            <p className="font-headline font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#10241A] mt-3 tracking-tight">
              Building a Home of Crown
            </p>
          </motion.div>

          {/* 3. The relevant story text (Enlarged body font size) */}
          <motion.div
            variants={slideUpVariant}
            className="mt-8 max-w-3xl mx-auto space-y-6 text-left sm:text-center"
          >
            <p className="font-sans text-xl sm:text-2xl leading-relaxed text-[#07100C] font-medium">
              Every enduring tree begins with deep, unyielding roots. Big Mummy stands as an honored daughter of <strong className="font-bold text-[#07100C]">Olumini Adesola</strong>, carrying forward a lineage built upon noble integrity, faith, and mutual loyalty.
            </p>
            <p className="font-sans text-lg sm:text-xl leading-relaxed text-[#163021] font-normal">
              The family associates the name <strong className="font-semibold text-[#07100C]">Kolleade</strong> with <em className="font-medium text-[#07100C]">&ldquo;building a home of crown&rdquo;</em> — a reflection of how she dignifies her household and crowns her loved ones with honor.
            </p>
            <p className="font-sans text-lg sm:text-xl leading-relaxed text-[#163021]/90 font-normal">
              It is this sacred heritage that directly inspired the title of her celebratory anthem: <strong className="font-bold text-[#07100C]">OLUMINI</strong>.
            </p>
          </motion.div>

          {/* 4. Natural transition into the song section */}
          <motion.div
            variants={slideUpVariant}
            className="mt-12"
          >
            <button
              type="button"
              onClick={onSongJump}
              className="inline-flex items-center gap-2 px-9 py-4 bg-[#07100C] text-[#F5F0E6] hover:bg-[#163021] text-sm font-headline font-extrabold uppercase tracking-widest transition-colors cursor-pointer shadow-lg"
            >
              <span>Listen to OLUMINI</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
