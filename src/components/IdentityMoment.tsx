import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { IMAGES } from '../data/tributeData';
import { StoryImage } from './StoryImage';

export const IdentityMoment: React.FC = () => {
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
      id="identity"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      className="relative py-24 px-4 sm:px-6 lg:px-12 bg-[#F5F0E6] text-[#07100C] overflow-hidden"
      aria-label="The Meaning of Joy"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* 1. The photograph, integrated into the page background immediately */}
        <motion.div
          variants={photoVariant}
          className="w-full max-w-3xl flex justify-center"
        >
          <StoryImage
            config={IMAGES.identity}
            objectFit="contain"
            maxHeight="max-h-[64vh] sm:max-h-[70vh]"
            theme="ivory"
            blend="ivory-soft"
          />
        </motion.div>

        {/* 2. Strong visual headline associated with that photograph */}
        <div className="w-full text-center mt-6 sm:mt-10">
          <motion.div variants={slideUpVariant}>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#07100C] leading-[0.95] text-balance">
              A CHILD IS JOY
            </h2>
            <p className="font-headline font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#10241A] mt-3 tracking-tight">
              The Living Spirit of Omolayo
            </p>
          </motion.div>

          {/* 3. The relevant story text (Enlarged body font size) */}
          <motion.div
            variants={slideUpVariant}
            className="mt-8 max-w-3xl mx-auto space-y-6 text-left sm:text-center"
          >
            <p className="font-sans text-xl sm:text-2xl leading-relaxed text-[#10241A] font-medium">
              In the cherished words shared by the Adesola family, the name <strong className="font-bold text-[#07100C]">Omolayo</strong> carries a profound blessing: <em className="font-bold text-[#07100C]">&ldquo;A child is joy.&rdquo;</em>
            </p>
            <p className="font-sans text-lg sm:text-xl leading-relaxed text-[#163021] font-normal">
              From her earliest days to this golden celebration, Big Mummy has not merely borne that name — she has lived it as a living reality. She has stood as an enduring source of laughter, steadfast moral reassurance, and a radiant light that brightens every room she steps into.
            </p>
            <p className="font-sans text-lg sm:text-xl leading-relaxed text-[#163021]/90 font-normal italic">
              Her life demonstrates that when joy is rooted in genuine affection, it becomes a shelter beneath which everyone can rest.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
